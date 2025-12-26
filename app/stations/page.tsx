"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, CloudSnow, Sun, ArrowLeft, Loader2, CloudRain, MapPin, 
  ChevronRight, X, Calendar, ExternalLink, Train, AlertTriangle, 
  Info, Shield, Mountain, Clock
} from 'lucide-react';

// Import des stations
import { stations } from '../data/stations';

// --- TYPES ---
interface WeatherData {
  temp: number;
  wind: number;
  weatherCode: number;
  snowDepth: number;
  source: 'meteoswiss' | 'slf' | 'openmeteo' | 'hybrid';
  reliability: 'high' | 'medium' | 'low';
}

interface AvalancheRisk {
  level: number;
  levelText: string;
  region: string;
  description: string;
  validDate: string;
}

interface Station {
  slug: string;
  name: string;
  canton: string;
  lat: number;
  lon: number;
  alt: number;
  meteoswissCode?: string;
  slfCode?: string;
  avalancheRegion?: number;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  season: {
    opening: string;
    closing: string;
  };
  website: string;
  liftCount: number;
  slopeKm: number;
}

interface StationUI extends Station {
  weather?: WeatherData;
  avalancheRisk?: AvalancheRisk;
  status: 'Ouvert' | 'Fermé' | 'Partiel' | 'Inconnu';
  isInSeason: boolean;
}

interface ForecastDay {
  date: string;
  max: number;
  min: number;
  snow: number;
  code: number;
}

const SKI_RESORTS: Station[] = stations;

// --- LOGIQUE MÉTÉO ---
async function fetchMeteoSwiss(stationCode: string): Promise<Partial<WeatherData> | null> {
  try {
    const response = await fetch(
      `https://data.geo.admin.ch/ch.meteoschweiz.messwerte-aktuell/VQHA80.csv`,
      { next: { revalidate: 600 } }
    );
    
    if (!response.ok) return null;
    
    const csvText = await response.text();
    const lines = csvText.split('\n');
    const stationLine = lines.find(line => line.startsWith(stationCode + ';'));
    
    if (!stationLine) return null;
    
    const parts = stationLine.split(';');
    const temp = parseFloat(parts[2]);
    const windAvg = parseFloat(parts[10]);
    const windGust = parseFloat(parts[9]);
    
    if (isNaN(temp)) return null;
    
    return {
      temp: Math.round(temp),
      wind: Math.round(windAvg || windGust || 0),
      source: 'meteoswiss',
      reliability: 'high'
    };
  } catch (error) {
    return null;
  }
}

async function fetchSLF(stationCode: string): Promise<Partial<WeatherData> | null> {
  try {
    const response = await fetch(
      `https://measurement-api.slf.ch/api/stations/${stationCode}/measurements/latest`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return {
      snowDepth: data.hs ? Math.round(data.hs) : 0,
      temp: data.ta ? Math.round(data.ta) : undefined,
      wind: data.vw ? Math.round(data.vw) : undefined,
      source: 'slf',
      reliability: 'high'
    };
  } catch (error) {
    return null;
  }
}

async function fetchOpenMeteo(lat: number, lon: number): Promise<Partial<WeatherData> | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,snow_depth&timezone=Europe%2FZurich`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return {
      temp: Math.round(data.current.temperature_2m),
      wind: Math.round(data.current.wind_speed_10m),
      weatherCode: data.current.weather_code,
      snowDepth: Math.max(0, data.current.snow_depth ? Math.round(data.current.snow_depth * 100) : 0),
      source: 'openmeteo',
      reliability: 'low'
    };
  } catch (error) {
    return null;
  }
}

async function fetchAvalancheRisk(regionId: number): Promise<AvalancheRisk | null> {
  try {
    const response = await fetch(
      `https://www.slf.ch/avalanche/bulletin/api/bulletins/latest`,
      { next: { revalidate: 21600 } }
    );
    
    if (!response.ok) return null;
    
    const bulletins = await response.json();
    const regionBulletin = bulletins.find((b: any) => 
      b.regions?.includes(regionId) || b.regionId === regionId
    );
    
    if (!regionBulletin) return null;
    
    const levelMapping: Record<number, string> = {
      1: "Faible",
      2: "Limité", 
      3: "Marqué",
      4: "Fort",
      5: "Très fort"
    };
    
    const level = regionBulletin.dangerRating || regionBulletin.dangerLevel || 2;
    
    return {
      level: level,
      levelText: levelMapping[level] || "Limité",
      region: regionBulletin.regionName || `Région ${regionId}`,
      description: regionBulletin.highlights || regionBulletin.dangerDescription || "Conditions variables selon altitude et orientation.",
      validDate: regionBulletin.validTime?.startTime || new Date().toISOString()
    };
  } catch (error) {
    return null;
  }
}

async function fetchHybridWeather(station: Station): Promise<WeatherData | null> {
  const results: Partial<WeatherData>[] = [];
  
  if (station.meteoswissCode) {
    const msData = await fetchMeteoSwiss(station.meteoswissCode);
    if (msData) results.push(msData);
  }
  
  if (station.slfCode) {
    const slfData = await fetchSLF(station.slfCode);
    if (slfData) results.push(slfData);
  }
  
  const omData = await fetchOpenMeteo(station.lat, station.lon);
  if (omData) results.push(omData);
  
  if (results.length === 0) return null;
  
  const combined: WeatherData = {
    temp: results.find(r => r.source === 'meteoswiss')?.temp 
      ?? results.find(r => r.source === 'slf')?.temp 
      ?? results.find(r => r.source === 'openmeteo')?.temp 
      ?? 0,
    snowDepth: results.find(r => r.source === 'slf')?.snowDepth 
      ?? results.find(r => r.source === 'openmeteo')?.snowDepth 
      ?? 0,
    wind: results.find(r => r.source === 'meteoswiss')?.wind 
      ?? results.find(r => r.source === 'slf')?.wind 
      ?? results.find(r => r.source === 'openmeteo')?.wind 
      ?? 0,
    weatherCode: results.find(r => r.source === 'openmeteo')?.weatherCode ?? 1,
    source: 'hybrid',
    reliability: (results.some(r => r.source === 'meteoswiss') && results.some(r => r.source === 'slf')) 
      ? 'high' 
      : (results.some(r => r.source === 'meteoswiss') || results.some(r => r.source === 'slf')) 
      ? 'medium' 
      : 'low'
  };
  
  return combined;
}

function calculateStationStatus(
  station: Station, 
  weather?: WeatherData, 
  avalancheRisk?: AvalancheRisk
): { status: 'Ouvert' | 'Fermé' | 'Partiel' | 'Inconnu', isInSeason: boolean } {
  const now = new Date();
  const opening = new Date(station.season.opening);
  const closing = new Date(station.season.closing);
  
  const isInSeason = now >= opening && now <= closing;
  
  if (!isInSeason) {
    return { status: 'Fermé', isInSeason: false };
  }
  
  if (avalancheRisk && avalancheRisk.level >= 4) {
    return { status: 'Fermé', isInSeason: true };
  }
  
  if (weather) {
    if (weather.snowDepth < 10 || weather.wind > 70) {
      return { status: 'Fermé', isInSeason: true };
    }
    
    if (
      weather.snowDepth < 30 || 
      weather.wind > 40 ||
      (avalancheRisk && avalancheRisk.level === 3)
    ) {
      return { status: 'Partiel', isInSeason: true };
    }
    
    return { status: 'Ouvert', isInSeason: true };
  }
  
  return { status: 'Inconnu', isInSeason: true };
}

// --- COMPONENT ---
export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});
  const [avalancheMap, setAvalancheMap] = useState<Record<number, AvalancheRisk>>({});
  const [loadingCount, setLoadingCount] = useState(0);
  
  const [selectedStation, setSelectedStation] = useState<StationUI | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loadingForecast, setLoadingForecast] = useState(false);

useEffect(() => {
  const fetchAllData = async () => {
    setLoadingCount(SKI_RESORTS.length);
    
    const chunkSize = 5;
    for (let i = 0; i < SKI_RESORTS.length; i += chunkSize) {
      const chunk = SKI_RESORTS.slice(i, i + chunkSize);
      
      await Promise.all(chunk.map(async (resort) => {
        try {
          const weather = await fetchHybridWeather(resort);
          if (weather) {
            setWeatherMap(prev => ({ ...prev, [resort.slug]: weather }));
          }
          
          if (resort.avalancheRegion) {
            const avalanche = await fetchAvalancheRisk(resort.avalancheRegion);
            if (avalanche) {
              setAvalancheMap(prev => ({ ...prev, [resort.avalancheRegion!]: avalanche }));
            }
          }
        } catch (e) {
          console.warn(`Data unavailable for ${resort.name}`);
        } finally {
          setLoadingCount(prev => Math.max(0, prev - 1));
        }
      }));
      
      if (i + chunkSize < SKI_RESORTS.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  fetchAllData();
}, []); // ← IMPORTANT : tableau vide pour n'exécuter qu'une seule fois


  const displayStations = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase().trim();
    
    return SKI_RESORTS.filter(s => 
      s.name.toLowerCase().includes(lowerTerm) || 
      s.canton.toLowerCase().includes(lowerTerm)
    ).map(station => {
      const weather = weatherMap[station.slug];
      const avalancheRisk = station.avalancheRegion ? avalancheMap[station.avalancheRegion] : undefined;
      
      const { status, isInSeason } = calculateStationStatus(station, weather, avalancheRisk);

      return {
        ...station,
        weather,
        avalancheRisk,
        status,
        isInSeason
      } as StationUI;
    });
  }, [searchTerm, weatherMap, avalancheMap]);

  const handleStationClick = async (station: StationUI) => {
    setSelectedStation(station);
    setLoadingForecast(true);
    setForecast([]);

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum&timezone=Europe%2FZurich`
      );
      const data = await res.json();
      
      const days = data.daily.time.slice(0, 7).map((date: string, i: number) => ({
        date: new Date(date).toLocaleDateString('fr-CH', { weekday: 'short', day: 'numeric' }),
        max: Math.round(data.daily.temperature_2m_max[i]),
        min: Math.round(data.daily.temperature_2m_min[i]),
        snow: data.daily.snowfall_sum[i],
        code: data.daily.weather_code[i]
      }));
      
      setForecast(days);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingForecast(false);
    }
  };

  const WeatherIcon = ({ code, className }: { code?: number, className?: string }) => {
    if (code === undefined) return <Loader2 size={18} className={`animate-spin text-slate-300 ${className}`} />;
    if (code <= 1) return <Sun size={18} className={`text-yellow-500 ${className}`} />;
    if (code <= 3) return <CloudSnow size={18} className={`text-slate-400 ${className}`} />;
    if (code >= 71) return <CloudSnow size={18} className={`text-blue-400 ${className}`} />;
    if (code >= 51) return <CloudRain size={18} className={`text-blue-600 ${className}`} />;
    return <Sun size={18} className={`text-yellow-500 ${className}`} />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Ouvert') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'Fermé') return 'bg-red-100 text-red-700 border-red-300';
    if (status === 'Partiel') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-slate-100 text-slate-400 border-slate-300';
  };

  const getReliabilityBadge = (reliability?: string) => {
    if (reliability === 'high') return { text: 'Données officielles', color: 'bg-green-50 text-green-700 border-green-200' };
    if (reliability === 'medium') return { text: 'Données partielles', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    return { text: 'Données modélisées', color: 'bg-orange-50 text-orange-700 border-orange-200' };
  };

  const getAvalancheColor = (level: number) => {
    if (level === 1) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: '🟢' };
    if (level === 2) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: '🟡' };
    if (level === 3) return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: '🟠' };
    if (level === 4) return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: '🔴' };
    return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', icon: '🟣' };
  };

  const getCurrentSchedule = (station: Station) => {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    return isWeekend ? station.openingHours.weekends : station.openingHours.weekdays;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-schuss-blue transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Retour</span>
          </Link>
          <Link href="/" className="group cursor-pointer">
             <span className="font-black text-3xl italic tracking-tighter transform -skew-x-6 inline-block text-schuss-blue">
               SCHUSS<span className="text-schuss-red inline-block transform skew-x-6">.</span>
             </span>
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-32 px-6 pb-20">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-schuss-blue">Stations Suisses</h1>
          <p className="text-slate-500 text-lg mb-6">
            {SKI_RESORTS.length} stations • Conditions, horaires & risques en temps réel
          </p>
          
          <div className="max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="text-left text-sm text-blue-900">
              <p className="font-bold mb-1">Calcul intelligent du statut</p>
              <p className="text-blue-700">
                Prend en compte : saison d'ouverture, enneigement, vent, risque avalanche (SLF).
              </p>
            </div>
          </div>
        </div>

        <div className="relative max-w-2xl mx-auto mb-12 group sticky top-24 z-40">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-schuss-red transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher (ex: Verbier, Valais...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-5 rounded-2xl border border-slate-200 shadow-xl focus:outline-none focus:ring-4 focus:ring-schuss-blue/10 focus:border-schuss-blue text-lg transition-all bg-white/90 backdrop-blur-md"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {loadingCount > 0 && (
          <div className="flex items-center justify-center gap-3 mb-6 text-slate-500 text-sm">
            <Loader2 size={16} className="animate-spin" />
            <span>Chargement : {SKI_RESORTS.length - loadingCount}/{SKI_RESORTS.length}</span>
          </div>
        )}

        {displayStations.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayStations.map((station) => {
              const reliabilityBadge = station.weather ? getReliabilityBadge(station.weather.reliability) : null;
              
              return (
                <motion.div 
                  layout
                  key={station.slug}
                  onClick={() => handleStationClick(station)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-schuss-blue/30 transition-all cursor-pointer group relative"
                >
                  {reliabilityBadge && (
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold border ${reliabilityBadge.color}`}>
                      {reliabilityBadge.text}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4 pr-24">
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-lg group-hover:text-schuss-blue transition-colors line-clamp-1">{station.name}</h3>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md w-fit mt-1">
                        <MapPin size={10} /> {station.canton} • {station.alt}m
                      </span>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 border ${getStatusColor(station.status)}`}>
                    {!station.isInSeason && <span className="text-[10px]">❄️</span>}
                    {station.status}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 min-h-[45px]">
                    {station.weather ? (
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                           <div className="flex items-center gap-1 text-slate-700 font-bold">
                              <WeatherIcon code={station.weather.weatherCode} />
                              <span>{station.weather.temp}°</span>
                           </div>
                           <span className="text-[10px] text-slate-400 uppercase">Air</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100"></div>
                        <div className="flex flex-col">
                           <div className="flex items-center gap-1 text-blue-600 font-bold font-mono">
                              <CloudSnow size={16} />
                              <span>{station.weather.snowDepth}cm</span>
                           </div>
                           <span className="text-[10px] text-slate-400 uppercase">Neige</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Loader2 size={14} className="animate-spin" /> Chargement...
                      </div>
                    )}
                    
                    <div className="bg-slate-50 p-2 rounded-full group-hover:bg-schuss-blue group-hover:text-white transition-colors">
                       <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertTriangle className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg">Aucune station trouvée pour "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* MODALE */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-slate-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center z-10">
               <button 
                 onClick={() => setSelectedStation(null)}
                 className="flex items-center gap-2 text-slate-500 hover:text-schuss-blue font-bold"
               >
                 <ArrowLeft size={20} /> Retour
               </button>
               <button 
                 onClick={() => setSelectedStation(null)}
                 className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
               <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest">
                      {selectedStation.canton} — Suisse
                    </div>
                    {selectedStation.weather && (
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getReliabilityBadge(selectedStation.weather.reliability).color}`}>
                        {getReliabilityBadge(selectedStation.weather.reliability).text}
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black text-schuss-blue mb-4">{selectedStation.name}</h1>
                  
                  <div className="flex flex-wrap gap-4 text-slate-500 font-medium mb-6">
                     <span className="flex items-center gap-2"><MapPin size={18}/> {selectedStation.alt}m altitude</span>
                     <span className="flex items-center gap-2"><Mountain size={18}/> {selectedStation.liftCount} remontées</span>
                     <span className="flex items-center gap-2"><Mountain size={18}/> {selectedStation.slopeKm}km pistes</span>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedStation.status)}`}>
                       {selectedStation.status}
                     </span>
                  </div>

                  {/* HORAIRES + SAISON */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="text-schuss-blue" size={20} />
                        <h3 className="font-bold text-slate-900">Horaires aujourd'hui</h3>
                      </div>
                      <p className="text-2xl font-black text-schuss-blue mb-1">
                        {getCurrentSchedule(selectedStation)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date().getDay() === 0 || new Date().getDay() === 6 ? 'Week-end' : 'Semaine'}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="text-schuss-blue" size={20} />
                        <h3 className="font-bold text-slate-900">Saison 2024/25</h3>
                      </div>
                      <p className="text-sm text-slate-700 mb-1">
                        <strong>Ouverture :</strong> {new Date(selectedStation.season.opening).toLocaleDateString('fr-CH')}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Fermeture :</strong> {new Date(selectedStation.season.closing).toLocaleDateString('fr-CH')}
                      </p>
                    </div>
                  </div>

                  {/* SOURCES */}
                  {selectedStation.weather && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-600 mb-6">
                      <p className="font-bold text-slate-900 mb-2">Sources des données :</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStation.meteoswissCode && (
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">
                            MeteoSwiss {selectedStation.meteoswissCode}
                          </span>
                        )}
                        {selectedStation.slfCode && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">
                            SLF IMIS {selectedStation.slfCode}
                          </span>
                        )}
                        {(!selectedStation.meteoswissCode && !selectedStation.slfCode) && (
                          <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium border border-orange-200">
                            Open-Meteo (modélisé)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
               </div>

               {/* RISQUE AVALANCHE */}
               {selectedStation.avalancheRisk && (
                 <div className={`mb-8 p-6 rounded-3xl border-2 ${getAvalancheColor(selectedStation.avalancheRisk.level).bg} ${getAvalancheColor(selectedStation.avalancheRisk.level).border}`}>
                   <div className="flex items-start gap-4">
                     <div className="text-4xl">
                       {getAvalancheColor(selectedStation.avalancheRisk.level).icon}
                     </div>
                     <div className="flex-1">
                       <div className="flex items-center gap-3 mb-2">
                         <Shield size={24} className={getAvalancheColor(selectedStation.avalancheRisk.level).text} />
                         <h2 className={`text-2xl font-black ${getAvalancheColor(selectedStation.avalancheRisk.level).text}`}>
                           Risque Avalanche : {selectedStation.avalancheRisk.level}/5
                         </h2>
                       </div>
                       <p className={`text-lg font-bold mb-2 ${getAvalancheColor(selectedStation.avalancheRisk.level).text}`}>
                         {selectedStation.avalancheRisk.levelText}
                       </p>
                       <p className="text-sm text-slate-700 mb-3">
                         {selectedStation.avalancheRisk.description}
                       </p>
                       <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                         <span className="flex items-center gap-1">
                           <Mountain size={14} /> Région : {selectedStation.avalancheRisk.region}
                         </span>
                         <span className="flex items-center gap-1">
                           <Calendar size={14} /> Publié : {new Date(selectedStation.avalancheRisk.validDate).toLocaleDateString('fr-CH')}
                         </span>
                       </div>
                       <a 
                         href="https://www.slf.ch/fr/bulletin-davalanches-et-situation-nivologique.html" 
                         target="_blank"
                         rel="noopener noreferrer"
                         className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-colors ${getAvalancheColor(selectedStation.avalancheRisk.level).text} hover:underline`}
                       >
                         Voir bulletin complet SLF <ExternalLink size={14} />
                       </a>
                     </div>
                   </div>
                 </div>
               )}

               {/* PRÉVISIONS */}
               <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                     <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                        <Calendar className="text-schuss-blue" /> Prévisions 7 Jours
                     </h2>
                     
                     <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                        {loadingForecast ? (
                           [...Array(7)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>)
                        ) : (
                           forecast.map((day, i) => (
                              <div key={i} className={`flex flex-col items-center p-3 rounded-xl border ${i === 0 ? 'bg-blue-50 border-blue-200' : 'bg-transparent border-transparent'}`}>
                                 <span className="text-xs font-bold text-slate-500 uppercase mb-2">{day.date}</span>
                                 <WeatherIcon code={day.code} className="mb-2" />
                                 <div className="flex gap-1 text-xs font-medium">
                                    <span className="text-slate-900">{day.max}°</span>
                                    <span className="text-slate-400">{day.min}°</span>
                                 </div>
                                 {day.snow > 0 && (
                                    <div className="mt-2 text-[10px] font-bold text-blue-500 flex items-center bg-blue-100 px-1.5 py-0.5 rounded">
                                       {day.snow}cm
                                    </div>
                                 )}
                              </div>
                           ))
                        )}
                     </div>
                  </div>

                  <div className="flex flex-col gap-4">
                     <div className="bg-schuss-blue text-white p-8 rounded-3xl shadow-lg flex-1 flex flex-col justify-between min-h-[200px]">
                        <div>
                           <h2 className="text-xl font-bold mb-2">Y aller</h2>
                           <p className="text-blue-200 text-sm mb-6">Itinéraire CFF depuis votre position.</p>
                        </div>
                        <a
                          href={`https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml?nach=${encodeURIComponent(selectedStation.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white text-schuss-blue py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                        >
                           <Train size={18} /> Itinéraire CFF
                        </a>
                     </div>
                     
                     <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                           <p className="text-slate-500 text-xs uppercase font-bold">Neige au sol</p>
                           <p className="text-3xl font-black text-schuss-blue">
                             {selectedStation.weather?.snowDepth ?? '-'} 
                             <span className="text-lg text-slate-400 font-normal">cm</span>
                           </p>
                        </div>
                        <CloudSnow size={40} className="text-blue-200" />
                     </div>

                     <a 
                       href={selectedStation.website}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-schuss-blue transition-colors flex items-center justify-between group"
                     >
                       <span className="text-sm font-bold text-slate-700 group-hover:text-schuss-blue">Site officiel</span>
                       <ExternalLink size={16} className="text-slate-400 group-hover:text-schuss-blue" />
                     </a>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
