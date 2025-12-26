export const stations = [
  // --- VALAIS (VS) ---
  {
    slug: "verbier",
    name: "Verbier 4Vallées",
    canton: "VS",
    lat: 46.0961,
    lon: 7.2286,
    alt: 1500,
    meteoswissCode: "SIO",
    slfCode: "VER2",
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-01",
      closing: "2025-04-15"
    },
    website: "https://verbier4vallees.ch/en/useful-information/live-information-winter",
    liftCount: 82,
    slopeKm: 410
  },
  {
    slug: "zermatt",
    name: "Zermatt Matterhorn",
    canton: "VS",
    lat: 46.0207,
    lon: 7.7491,
    alt: 1620,
    meteoswissCode: "ZER",
    slfCode: "ZER2",
    avalancheRegion: 1243,
    openingHours: {
      weekdays: "08:30 - 16:40",
      weekends: "08:30 - 16:40"
    },
    season: {
      opening: "2024-11-23",
      closing: "2025-05-04"
    },
    website: "https://www.zermatt.ch/en/skiing-snowboarding",
    liftCount: 54,
    slopeKm: 360
  },
  {
    slug: "crans-montana",
    name: "Crans-Montana",
    canton: "VS",
    lat: 46.3113,
    lon: 7.4765,
    alt: 1500,
    meteoswissCode: "SIO",
    avalancheRegion: 1222,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-21"
    },
    website: "https://www.crans-montana.ch/en/",
    liftCount: 28,
    slopeKm: 140
  },
  {
    slug: "saas-fee",
    name: "Saas-Fee",
    canton: "VS",
    lat: 46.1092,
    lon: 7.9292,
    alt: 1800,
    slfCode: "SAS2",
    avalancheRegion: 1242,
    openingHours: {
      weekdays: "08:30 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-07-01",
      closing: "2025-04-27"
    },
    website: "https://www.saas-fee.ch/en/",
    liftCount: 22,
    slopeKm: 100
  },
  {
    slug: "nendaz",
    name: "Nendaz",
    canton: "VS",
    lat: 46.1825,
    lon: 7.2933,
    alt: 1400,
    meteoswissCode: "SIO",
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-01",
      closing: "2025-04-15"
    },
    website: "https://www.nendaz.ch/en/",
    liftCount: 25,
    slopeKm: 200
  },
  {
    slug: "veysonnaz",
    name: "Veysonnaz",
    canton: "VS",
    lat: 46.1916,
    lon: 7.3361,
    alt: 1350,
    meteoswissCode: "SIO",
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-01",
      closing: "2025-04-15"
    },
    website: "https://www.veysonnaz.ch/",
    liftCount: 12,
    slopeKm: 80
  },
  {
    slug: "aletsch",
    name: "Aletsch Arena",
    canton: "VS",
    lat: 46.4087,
    lon: 8.0583,
    alt: 1925,
    slfCode: "RIE2",
    avalancheRegion: 1232,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-20"
    },
    website: "https://www.aletscharena.ch/en/",
    liftCount: 35,
    slopeKm: 104
  },
  {
    slug: "leukerbad",
    name: "Leukerbad",
    canton: "VS",
    lat: 46.3833,
    lon: 7.6333,
    alt: 1411,
    meteoswissCode: "SIO",
    avalancheRegion: 1222,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.leukerbad.ch/en/",
    liftCount: 14,
    slopeKm: 53
  },
  {
    slug: "anzere",
    name: "Anzère",
    canton: "VS",
    lat: 46.2967,
    lon: 7.3958,
    alt: 1500,
    avalancheRegion: 1222,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.anzere.ch/",
    liftCount: 12,
    slopeKm: 58
  },
  {
    slug: "val-danniviers",
    name: "Grimentz-Zinal",
    canton: "VS",
    lat: 46.1764,
    lon: 7.5708,
    alt: 1570,
    avalancheRegion: 1241,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-20"
    },
    website: "https://www.valdanniviers.ch/en/",
    liftCount: 21,
    slopeKm: 115
  },
  {
    slug: "champery",
    name: "Champéry (PDS)",
    canton: "VS",
    lat: 46.1739,
    lon: 6.8722,
    alt: 1050,
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:30 - 17:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-21"
    },
    website: "https://www.champery.ch/en/",
    liftCount: 196,
    slopeKm: 580
  },
  {
    slug: "morgins",
    name: "Morgins (PDS)",
    canton: "VS",
    lat: 46.2361,
    lon: 6.8528,
    alt: 1333,
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-21"
    },
    website: "https://www.morgins.ch/",
    liftCount: 196,
    slopeKm: 580
  },
  {
    slug: "ovronnaz",
    name: "Ovronnaz",
    canton: "VS",
    lat: 46.2000,
    lon: 7.1667,
    alt: 1350,
    avalancheRegion: 1223,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:15"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-23"
    },
    website: "https://www.ovronnaz.ch/",
    liftCount: 7,
    slopeKm: 25
  },
  {
    slug: "vercorin",
    name: "Vercorin",
    canton: "VS",
    lat: 46.2500,
    lon: 7.5333,
    alt: 1334,
    avalancheRegion: 1222,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:15"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-30"
    },
    website: "https://www.vercorin.ch/",
    liftCount: 8,
    slopeKm: 35
  },
  {
    slug: "grachen",
    name: "Grächen",
    canton: "VS",
    lat: 46.1950,
    lon: 7.8386,
    alt: 1619,
    avalancheRegion: 1242,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-20"
    },
    website: "https://www.graechen.ch/",
    liftCount: 10,
    slopeKm: 42
  },
  {
    slug: "belalp",
    name: "Belalp",
    canton: "VS",
    lat: 46.3833,
    lon: 7.9833,
    alt: 2094,
    avalancheRegion: 1232,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-13"
    },
    website: "https://www.belalp.ch/",
    liftCount: 9,
    slopeKm: 60
  },
  {
    slug: "lauchernalp",
    name: "Lauchernalp (Lötschental)",
    canton: "VS",
    lat: 46.4000,
    lon: 7.7667,
    alt: 1968,
    avalancheRegion: 1231,
    openingHours: {
      weekdays: "08:30 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-21"
    },
    website: "https://www.loetschental.ch/",
    liftCount: 7,
    slopeKm: 55
  },

  // --- VAUD (VD) ---
  {
    slug: "leysin",
    name: "Leysin - Les Mosses",
    canton: "VD",
    lat: 46.3423,
    lon: 7.0134,
    alt: 1263,
    meteoswissCode: "AIG",
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.leysin.ch/en/",
    liftCount: 13,
    slopeKm: 60
  },
  {
    slug: "villars",
    name: "Villars - Gryon",
    canton: "VD",
    lat: 46.2978,
    lon: 7.0573,
    alt: 1300,
    meteoswissCode: "AIG",
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-21"
    },
    website: "https://www.villars.ch/en/",
    liftCount: 44,
    slopeKm: 125
  },
  {
    slug: "diablerets",
    name: "Les Diablerets",
    canton: "VD",
    lat: 46.3506,
    lon: 7.1572,
    alt: 1200,
    meteoswissCode: "AIG",
    slfCode: "DIA2",
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:45 - 16:30"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-21"
    },
    website: "https://www.diablerets.ch/en/",
    liftCount: 23,
    slopeKm: 48
  },
  {
    slug: "glacier-3000",
    name: "Glacier 3000",
    canton: "VD",
    lat: 46.3333,
    lon: 7.2167,
    alt: 3000,
    meteoswissCode: "AIG",
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:15"
    },
    season: {
      opening: "2024-10-26",
      closing: "2025-05-11"
    },
    website: "https://www.glacier3000.ch/en/",
    liftCount: 7,
    slopeKm: 25
  },
  {
    slug: "sainte-croix",
    name: "Les Rasses",
    canton: "VD",
    lat: 46.8167,
    lon: 6.5000,
    alt: 1100,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:30"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-16"
    },
    website: "https://www.lesrasses.ch/",
    liftCount: 5,
    slopeKm: 15
  },
  {
    slug: "vallee-de-joux",
    name: "Vallée de Joux",
    canton: "VD",
    lat: 46.6000,
    lon: 6.2333,
    alt: 1000,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:30"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-09"
    },
    website: "https://www.myvalleedejoux.ch/",
    liftCount: 8,
    slopeKm: 20
  },
  {
    slug: "rochers-de-naye",
    name: "Rochers de Naye",
    canton: "VD",
    lat: 46.4314,
    lon: 6.9758,
    alt: 2042,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 15:45",
      weekends: "09:00 - 15:45"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://www.rochersdenaye.ch/en/",
    liftCount: 2,
    slopeKm: 8
  },
  {
    slug: "la-dole",
    name: "La Dôle (Jura sur Léman)",
    canton: "VD",
    lat: 46.4250,
    lon: 6.1000,
    alt: 1160,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:30",
      weekends: "09:00 - 16:30"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-16"
    },
    website: "https://www.jurasurleman.com/",
    liftCount: 8,
    slopeKm: 30
  },

  // --- BERNE (BE) ---
  {
    slug: "gstaad",
    name: "Gstaad Mountain Rides",
    canton: "BE",
    lat: 46.4718,
    lon: 7.2866,
    alt: 1050,
    meteoswissCode: "GSB",
    avalancheRegion: 1227,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-13"
    },
    website: "https://www.gstaad.ch/en/",
    liftCount: 53,
    slopeKm: 220
  },
  {
    slug: "grindelwald",
    name: "Grindelwald - Wengen",
    canton: "BE",
    lat: 46.6242,
    lon: 8.0414,
    alt: 1034,
    meteoswissCode: "GRH",
    slfCode: "WFJ2",
    avalancheRegion: 3211,
    openingHours: {
      weekdays: "08:00 - 16:15",
      weekends: "08:00 - 16:15"
    },
    season: {
      opening: "2024-11-30",
      closing: "2025-04-27"
    },
    website: "https://www.jungfrau.ch/en-gb/",
    liftCount: 44,
    slopeKm: 213
  },
  {
    slug: "murren",
    name: "Mürren - Schilthorn",
    canton: "BE",
    lat: 46.5594,
    lon: 7.8928,
    alt: 1650,
    meteoswissCode: "GRH",
    avalancheRegion: 3211,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-20"
    },
    website: "https://www.schilthorn.ch/en/",
    liftCount: 11,
    slopeKm: 54
  },
  {
    slug: "adelboden",
    name: "Adelboden - Lenk",
    canton: "BE",
    lat: 46.4914,
    lon: 7.5611,
    alt: 1350,
    meteoswissCode: "GSB",
    avalancheRegion: 1228,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-13"
    },
    website: "https://www.adelboden.ch/en/",
    liftCount: 57,
    slopeKm: 210
  },
  {
    slug: "meiringen",
    name: "Meiringen - Hasliberg",
    canton: "BE",
    lat: 46.7292,
    lon: 8.1861,
    alt: 1060,
    avalancheRegion: 4222,
    openingHours: {
      weekdays: "08:00 - 16:00",
      weekends: "08:00 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-13"
    },
    website: "https://www.meiringen-hasliberg.ch/en/",
    liftCount: 24,
    slopeKm: 60
  },
  {
    slug: "kandersteg",
    name: "Kandersteg",
    canton: "BE",
    lat: 46.4950,
    lon: 7.6733,
    alt: 1174,
    avalancheRegion: 1228,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:00"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-30"
    },
    website: "https://www.kandersteg.ch/en/",
    liftCount: 6,
    slopeKm: 15
  },

  // --- FRIBOURG (FR) ---
  {
    slug: "moleson",
    name: "Moléson-sur-Gruyères",
    canton: "FR",
    lat: 46.5500,
    lon: 7.0333,
    alt: 1100,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:30",
      weekends: "09:00 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-16"
    },
    website: "https://www.moleson.ch/",
    liftCount: 4,
    slopeKm: 30
  },
  {
    slug: "charmey",
    name: "Charmey",
    canton: "FR",
    lat: 46.6167,
    lon: 7.1667,
    alt: 900,
    avalancheRegion: 1226,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:15"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-16"
    },
    website: "https://www.charmey.ch/",
    liftCount: 6,
    slopeKm: 30
  },
  {
    slug: "les-paccots",
    name: "Les Paccots",
    canton: "FR",
    lat: 46.5167,
    lon: 6.9667,
    alt: 1061,
    avalancheRegion: 1225,
    openingHours: {
      weekdays: "09:00 - 16:15",
      weekends: "09:00 - 16:15"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-09"
    },
    website: "https://www.les-paccots.ch/",
    liftCount: 11,
    slopeKm: 20
  },
    
  // --- GRISONS (GR) ---
  {
    slug: "davos",
    name: "Davos Klosters",
    canton: "GR",
    lat: 46.8027,
    lon: 9.8360,
    alt: 1560,
    meteoswissCode: "DAV",
    slfCode: "DAV2",
    avalancheRegion: 5123,
    openingHours: {
      weekdays: "08:15 - 16:30",
      weekends: "08:15 - 16:30"
    },
    season: {
      opening: "2024-11-30",
      closing: "2025-04-13"
    },
    website: "https://www.davos.ch/en/winter/ski-area/",
    liftCount: 53,
    slopeKm: 300
  },
  {
    slug: "st-moritz",
    name: "St. Moritz - Corviglia",
    canton: "GR",
    lat: 46.4908,
    lon: 9.8355,
    alt: 1822,
    meteoswissCode: "SIA",
    slfCode: "STM2",
    avalancheRegion: 5234,
    openingHours: {
      weekdays: "07:45 - 16:30",
      weekends: "07:45 - 16:30"
    },
    season: {
      opening: "2024-11-09",
      closing: "2025-04-28"
    },
    website: "https://www.stmoritz.ch/en/",
    liftCount: 56,
    slopeKm: 350
  },
  {
    slug: "laax",
    name: "Flims Laax Falera",
    canton: "GR",
    lat: 46.8226,
    lon: 9.2632,
    alt: 1100,
    meteoswissCode: "NAP",
    avalancheRegion: 5112,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-11-30",
      closing: "2025-04-21"
    },
    website: "https://www.laax.com/en/",
    liftCount: 28,
    slopeKm: 235
  },
  {
    slug: "lenzerheide",
    name: "Arosa Lenzerheide",
    canton: "GR",
    lat: 46.7283,
    lon: 9.5575,
    alt: 1473,
    meteoswissCode: "DAV",
    avalancheRegion: 5122,
    openingHours: {
      weekdays: "08:20 - 16:30",
      weekends: "08:20 - 16:30"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-20"
    },
    website: "https://arosalenzerheide.swiss/en/",
    liftCount: 43,
    slopeKm: 225
  },
  {
    slug: "scuol",
    name: "Scuol",
    canton: "GR",
    lat: 46.7961,
    lon: 10.2981,
    alt: 1250,
    meteoswissCode: "SIA",
    avalancheRegion: 5221,
    openingHours: {
      weekdays: "08:15 - 16:30",
      weekends: "08:15 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-13"
    },
    website: "https://www.scuol.ch/en/",
    liftCount: 14,
    slopeKm: 80
  },
  {
    slug: "samnaun",
    name: "Samnaun / Ischgl",
    canton: "GR",
    lat: 46.9419,
    lon: 10.3611,
    alt: 1840,
    slfCode: "SAM2",
    avalancheRegion: 5223,
    openingHours: {
      weekdays: "08:00 - 16:00",
      weekends: "08:00 - 16:00"
    },
    season: {
      opening: "2024-11-23",
      closing: "2025-05-04"
    },
    website: "https://www.samnaun.ch/en/",
    liftCount: 45,
    slopeKm: 239
  },
  {
    slug: "diavolezza",
    name: "Diavolezza",
    canton: "GR",
    lat: 46.4114,
    lon: 9.9639,
    alt: 2978,
    slfCode: "DIA2",
    avalancheRegion: 5234,
    openingHours: {
      weekdays: "08:20 - 16:20",
      weekends: "08:20 - 16:20"
    },
    season: {
      opening: "2024-10-26",
      closing: "2025-05-11"
    },
    website: "https://www.diavolezza.ch/en/",
    liftCount: 4,
    slopeKm: 20
  },
  {
    slug: "savognin",
    name: "Savognin",
    canton: "GR",
    lat: 46.5964,
    lon: 9.5950,
    alt: 1200,
    meteoswissCode: "SAV",
    avalancheRegion: 5132,
    openingHours: {
      weekdays: "08:30 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://valsurses.ch/en",
    liftCount: 12,
    slopeKm: 80
  },
  {
    slug: "obersaxen",
    name: "Obersaxen Mundaun",
    canton: "GR",
    lat: 46.7450,
    lon: 9.1060,
    alt: 1201,
    avalancheRegion: 5111,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://www.obersaxen-mundaun.ch/",
    liftCount: 17,
    slopeKm: 120
  },
  {
    slug: "disentis",
    name: "Disentis 3000",
    canton: "GR",
    lat: 46.7000,
    lon: 8.8500,
    alt: 1227,
    avalancheRegion: 4233,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-21"
    },
    website: "https://www.disentis.fun/",
    liftCount: 11,
    slopeKm: 60
  },
  
  // --- SUISSE CENTRALE (OW, NW, UR, LU, SZ) ---
  {
    slug: "engelberg",
    name: "Engelberg-Titlis",
    canton: "OW",
    lat: 46.8200,
    lon: 8.4070,
    alt: 1000,
    meteoswissCode: "ENG",
    slfCode: "ENG2",
    avalancheRegion: 4222,
    openingHours: {
      weekdays: "08:30 - 17:00",
      weekends: "08:30 - 17:00"
    },
    season: {
      opening: "2024-10-12",
      closing: "2025-05-18"
    },
    website: "https://www.engelberg.ch/en/",
    liftCount: 28,
    slopeKm: 82
  },
  {
    slug: "melchsee-frutt",
    name: "Melchsee-Frutt",
    canton: "OW",
    lat: 46.7770,
    lon: 8.2720,
    alt: 1920,
    avalancheRegion: 4221,
    openingHours: {
      weekdays: "08:20 - 16:30",
      weekends: "08:20 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.melchsee-frutt.ch/",
    liftCount: 15,
    slopeKm: 36
  },
  {
    slug: "andermatt",
    name: "Andermatt Sedrun",
    canton: "UR",
    lat: 46.6366,
    lon: 8.5947,
    alt: 1444,
    meteoswissCode: "AND",
    slfCode: "AND2",
    avalancheRegion: 4223,
    openingHours: {
      weekdays: "08:30 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-11-23",
      closing: "2025-04-28"
    },
    website: "https://www.andermatt.ch/en/",
    liftCount: 22,
    slopeKm: 120
  },
  {
    slug: "stoos",
    name: "Stoos",
    canton: "SZ",
    lat: 46.9833,
    lon: 8.6667,
    alt: 1305,
    avalancheRegion: 4212,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://stoos-muotatal.ch/en/",
    liftCount: 8,
    slopeKm: 35
  },
  {
    slug: "hoch-ybrig",
    name: "Hoch-Ybrig",
    canton: "SZ",
    lat: 47.0167,
    lon: 8.8167,
    alt: 1050,
    avalancheRegion: 4213,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:15 - 16:15"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-06"
    },
    website: "https://www.hoch-ybrig.ch/",
    liftCount: 12,
    slopeKm: 50
  },
  {
    slug: "sorenberg",
    name: "Sörenberg",
    canton: "LU",
    lat: 46.8160,
    lon: 8.0330,
    alt: 1166,
    avalancheRegion: 4221,
    openingHours: {
      weekdays: "08:30 - 16:15",
      weekends: "08:30 - 16:15"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://www.soerenberg.ch/",
    liftCount: 16,
    slopeKm: 53
  },

  // --- SAINT-GALL (SG) & GLARIS (GL) ---
  {
    slug: "flumserberg",
    name: "Flumserberg",
    canton: "SG",
    lat: 47.0911,
    lon: 9.2833,
    alt: 1220,
    meteoswissCode: "SAE",
    avalancheRegion: 7124,
    openingHours: {
      weekdays: "08:00 - 16:45",
      weekends: "08:00 - 16:45"
    },
    season: {
      opening: "2024-12-07",
      closing: "2025-04-13"
    },
    website: "https://www.flumserberg.ch/en/",
    liftCount: 17,
    slopeKm: 65
  },
  {
    slug: "toggenburg",
    name: "Toggenburg",
    canton: "SG",
    lat: 47.1950,
    lon: 9.2783,
    alt: 900,
    avalancheRegion: 7115,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:15 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.toggenburg.org/en/",
    liftCount: 17,
    slopeKm: 60
  },
  {
    slug: "pizol",
    name: "Pizol",
    canton: "SG",
    lat: 47.0030,
    lon: 9.4260,
    alt: 1600,
    avalancheRegion: 7123,
    openingHours: {
      weekdays: "08:15 - 16:00",
      weekends: "08:15 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://pizol.com/",
    liftCount: 11,
    slopeKm: 50
  },
  {
    slug: "elm",
    name: "Elm",
    canton: "GL",
    lat: 46.9167,
    lon: 9.1667,
    alt: 977,
    avalancheRegion: 7122,
    openingHours: {
      weekdays: "08:30 - 16:00",
      weekends: "08:30 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://www.elm.ch/",
    liftCount: 6,
    slopeKm: 40
  },
  {
    slug: "braunwald",
    name: "Braunwald",
    canton: "GL",
    lat: 46.9333,
    lon: 8.9833,
    alt: 1256,
    avalancheRegion: 7122,
    openingHours: {
      weekdays: "08:00 - 16:15",
      weekends: "08:00 - 16:15"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-23"
    },
    website: "https://braunwald.ch/en/",
    liftCount: 8,
    slopeKm: 30
  },

  // --- TESSIN (TI) ---
  {
    slug: "airolo",
    name: "Airolo Pesciüm",
    canton: "TI",
    lat: 46.5290,
    lon: 8.6110,
    alt: 1175,
    avalancheRegion: 6222,
    openingHours: {
      weekdays: "08:45 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-04-06"
    },
    website: "https://www.airolo.ch/",
    liftCount: 7,
    slopeKm: 30
  },
  {
    slug: "bosco-gurin",
    name: "Bosco Gurin",
    canton: "TI",
    lat: 46.3167,
    lon: 8.5000,
    alt: 1506,
    avalancheRegion: 6223,
    openingHours: {
      weekdays: "09:00 - 16:00",
      weekends: "09:00 - 16:00"
    },
    season: {
      opening: "2024-12-14",
      closing: "2025-03-30"
    },
    website: "https://boscomonte.ch/",
    liftCount: 6,
    slopeKm: 30
  },
  {
    slug: "nara",
    name: "Nara",
    canton: "TI",
    lat: 46.4667,
    lon: 8.9333,
    alt: 1450,
    avalancheRegion: 6214,
    openingHours: {
      weekdays: "08:30 - 16:30",
      weekends: "08:30 - 16:30"
    },
    season: {
      opening: "2024-12-21",
      closing: "2025-03-16"
    },
    website: "https://nara.ch/",
    liftCount: 5,
    slopeKm: 30
  }
];