"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { 
  Smartphone, Map, Zap, ArrowRight, Sun, Menu, X, 
  ChevronDown, Train, Wallet, CheckCircle2, Lock, Instagram, 
  Play, Star, AlertCircle
} from 'lucide-react';
// IMPORT DU SPLASH SCREEN
import SplashScreen from '@/app/components/SplashScreen';

export default function LandingPage() {
  // --- STATE SPLASH SCREEN ---
  const [isLoading, setIsLoading] = useState(true);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  // Form State
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Accessibilité & Performance
  const shouldReduceMotion = useReducedMotion();

  // --- GESTION DU CHARGEMENT (SPLASH SCREEN) ---
  useEffect(() => {
    // On simule un temps de chargement pour laisser l'animation du splash screen se jouer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 secondes d'animation

    return () => clearTimeout(timer);
  }, []);

  // --- CONFIGURATION NAVIGATION ---
  const navLinks = [
    { name: 'Fonctionnalités', href: '#features', type: 'anchor' },
    { name: 'Stations', href: '/stations', type: 'page' },
    { name: 'Tarifs', href: '/tarif', type: 'page' },
  ];

  // --- 1. OPTIMISATIONS PERFORMANCE & SCROLL ---
  
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/api/waitlist';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowStickyCTA(scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
  }, [mobileMenuOpen]);

  // --- 2. LOGIQUE MÉTIER ---

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, type: string }) => {
    if (link.type === 'anchor') {
      e.preventDefault();
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  }, []);

  const handleHeroScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }, []);

  const validateEmail = useCallback((email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, []);

  const handleWaitlistSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }
    setIsSubmitted(true);
  }, [email, validateEmail]);

  // Données statiques
  const faqData = useMemo(() => [
    { q: "L'application est-elle compatible avec le Magic Pass ?", a: "Absolument. Entrez votre numéro de Magic Pass et Schuss vous indique automatiquement les stations incluses et la validité." },
    { q: "Est-ce que le GPS fonctionne sans réseau (Hors ligne) ?", a: "Oui. Vous pouvez télécharger les cartes Swisstopo pour une utilisation 100% hors-ligne en haute montagne." },
    { q: "Comment sont calculés les temps de trajet CFF ?", a: "Nous utilisons l'API officielle OpenTransportData Swiss pour une précision à la minute près." },
    { q: "L'application est-elle gratuite ?", a: "Une version gratuite complète existe. Une version 'Alpiniste' avec fonctions avancées sera proposée ultérieurement." }
  ], []);

  const testimonials = useMemo(() => [
    { quote: "Enfin une app qui comprend qu'on vient en train ! Le timing est parfait.", name: "Marc D.", role: "Skieur à Lausanne" },
    { quote: "La carte d'ensoleillement a changé mes journées à Verbier. Fini l'ombre.", name: "Sarah L.", role: "Saisonnière" },
    { quote: "Indispensable pour le Magic Pass. Je sais exactement où aller.", name: "Thomas W.", role: "Famille de 4" }
  ], []);

  // --- 3. ANIMATIONS GPU OPTIMISÉES ---
  
  const fadeInUp = useMemo(() => shouldReduceMotion ? {} : {
    hidden: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    visible: { 
      opacity: 1, 
      transform: "translate3d(0, 0, 0)", 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.4 } } 
    }
  }, [shouldReduceMotion]);

  const scaleUp = useMemo(() => shouldReduceMotion ? {} : {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "backOut" } }
  }, [shouldReduceMotion]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0, when: "beforeChildren" } }
  };

  const viewportConfig = { once: true, amount: 0.3, margin: "0px 0px -100px 0px" };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-schuss-red selection:text-white overflow-x-hidden">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* --- INTEGRATION SPLASH SCREEN --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* --- NAVBAR --- */}
      <nav role="navigation" className={`fixed w-full z-50 top-0 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <div 
            className="z-50 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-schuss-red/50 rounded-lg" 
            tabIndex={0}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour à l'accueil"
          >
             <span className={`font-black text-3xl italic tracking-tighter transform -skew-x-6 transition-colors duration-300 ${isScrolled ? 'text-schuss-blue' : 'text-white'}`}>
               SCHUSS
               <span className="text-schuss-red inline-block transform skew-x-6 group-hover:rotate-12 transition-transform">.</span>
             </span>
          </div>

          <div className={`hidden md:flex gap-8 font-medium text-sm ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="hover:text-schuss-red transition-colors relative group focus:outline-none focus:text-schuss-red p-2"
              >
                {link.name}
                <span className="absolute bottom-1 left-2 w-0 h-0.5 bg-schuss-red transition-all group-hover:w-[calc(100%-16px)]"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button data-track="nav-cta" className="hidden md:flex bg-schuss-red hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300">
              Rejoindre la Bêta
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`md:hidden p-3 rounded-full focus:outline-none focus:ring-4 focus:ring-schuss-red/50 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div 
              role="dialog" aria-modal="true" aria-label="Menu de navigation"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl p-8 flex flex-col gap-8 md:hidden"
            >
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-schuss-red rounded-full">
                  <X size={32} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-2xl font-bold text-slate-900">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="focus:text-schuss-red outline-none"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <button className="w-full bg-schuss-red text-white py-5 rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-transform">
                  Rejoindre la Bêta
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-schuss-blue">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-schuss-blue to-black pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
         
         <motion.div 
           initial="hidden" animate="visible" variants={fadeInUp}
           className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center w-full"
         >
            <div role="status" className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-schuss-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-schuss-red"></span>
              </span>
              Bêta : Places limitées
            </div>

            <h1 className="font-extrabold text-5xl md:text-7xl lg:text-9xl text-white leading-[1.0] tracking-tight drop-shadow-2xl">
              LE SKI SUISSE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-schuss-red to-orange-400">
                NOUVELLE GÉNÉRATION
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-blue-50/90 max-w-2xl mx-auto font-light leading-relaxed">
              Synchronisation CFF. Cartes Swisstopo 3D. <br className="hidden md:block"/>
              Comparateur de forfaits Magic Pass en temps réel.
            </p>

            <div className="w-full max-w-md mx-auto pt-8 px-2">
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" placeholder="votre@email.com" aria-label="Adresse email" aria-invalid={!!emailError} required
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className={`flex-1 px-6 py-4 rounded-2xl bg-white/10 border ${emailError ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-schuss-red focus:bg-white/20 transition-all backdrop-blur-sm shadow-xl`}
                    />
                    <button type="submit" className="bg-schuss-red hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-red-500/40 transition-all whitespace-nowrap focus:ring-4 focus:ring-white/30">
                      Rejoindre
                    </button>
                  </div>
                  {emailError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-300 text-sm font-medium">
                      <AlertCircle size={14} /> {emailError}
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/20 border border-green-500/50 text-white p-4 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md shadow-xl">
                  <CheckCircle2 className="text-green-400" /> <span className="font-bold">Vous êtes sur la liste ! ⛷️</span>
                </motion.div>
              )}
            </div>

            <button className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium mt-4 group p-2 rounded-lg focus:outline-none focus:bg-white/10">
               <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm"><Play size={14} fill="currentColor" /></span>
               Voir la démo vidéo
            </button>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, transform: "translate3d(0, -20px, 0)" }} 
           animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }} 
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-10 w-full flex justify-center z-20 pointer-events-none"
         >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="pointer-events-auto cursor-pointer"
            >
              <a href="#partners" onClick={handleHeroScroll} className="text-white/50 hover:text-white transition-colors flex flex-col items-center gap-2 p-4 focus:outline-none focus:text-white">
                 <span className="text-xs uppercase tracking-widest font-bold">Découvrir</span>
                 <ChevronDown size={32} />
              </a>
            </motion.div>
         </motion.div>
      </header>

      {/* --- PARTNERS --- */}
      <section id="partners" className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Basé sur les données Open Data & Standards Suisses
          </p>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer} className="flex flex-wrap justify-center gap-8 md:gap-16 cursor-default">
             {[
               { main: "SBB CFF FFS", sub: "Open Transport Data", hover: "group-hover:text-[#EB0000]" },
               { main: "swisstopo", sub: "Géodonnées Fédérales", hover: "group-hover:text-[#DC0018]" },
               { main: "MétéoSuisse", sub: "Données Climat", hover: "group-hover:text-blue-600" },
               { main: "MAGIC PASS", sub: "Compatible", hover: "group-hover:text-[#1D3C57]" },
             ].map((partner, i) => (
               <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center justify-center group">
                  <span className={`font-bold text-xl text-slate-800 font-mono tracking-tighter ${partner.hover} transition-colors`}>{partner.main}</span>
                  <span className="text-[10px] text-slate-400 uppercase mt-1">{partner.sub}</span>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={fadeInUp} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-schuss-blue font-extrabold text-3xl md:text-5xl mb-6">Tout ce dont un skieur a besoin.</h2>
            <p className="text-slate-500 text-lg">Nous avons combiné 4 applications en une seule. Navigation, Transports, Météo et Guide local.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[400px] auto-rows-[340px]">
            {/* Feature 1: Train */}
            <motion.div variants={fadeInUp} className="md:col-span-2 rounded-[2.5rem] bg-white p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:border-schuss-blue/20 transition-all hover:translate-y-[-4px] duration-300" tabIndex={0}>
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><Train size={200} /></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                   <motion.div variants={scaleUp} className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-schuss-blue"><Train size={28} /></motion.div>
                   <h3 className="text-3xl font-bold text-slate-900 mb-4">Door-to-Slope.</h3>
                   <p className="text-slate-500 max-w-md">L'algorithme Schuss™ calcule votre itinéraire depuis votre porte jusqu'au premier télésiège, en synchronisant les horaires CFF et CarPostal.</p>
                 </div>
                 <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 max-w-sm mt-8 group-hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-2">
                       <span className="font-bold text-slate-700">Lausanne</span>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">À l'heure</span>
                       <span className="font-bold text-slate-700">Verbier</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden"><div className="bg-schuss-blue w-2/3 h-full rounded-full"></div></div>
                 </div>
               </div>
            </motion.div>

            {/* Feature 2: Map */}
            <motion.div variants={fadeInUp} className="row-span-1 md:row-span-2 rounded-[2.5rem] bg-schuss-blue text-white p-8 md:p-10 shadow-xl relative overflow-hidden group hover:translate-y-[-4px] transition-transform duration-300" tabIndex={0}>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
               <div className="relative z-20 h-full flex flex-col">
                 <motion.div variants={scaleUp} className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6"><Map size={28} className="text-white" /></motion.div>
                 <h3 className="text-3xl font-bold mb-4">Swisstopo 3D</h3>
                 <p className="text-white/70 mb-8">Visualisez le relief, l'exposition au soleil et les zones de danger avec une précision militaire.</p>
                 <div className="mt-auto bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-sm font-bold">Risque Avalanche: 3/5</span>
                    </div>
                    <p className="text-xs text-white/60">Pente {'>'} 30° détectée.</p>
                 </div>
               </div>
            </motion.div>

            {/* Feature 3: Wallet */}
            <motion.div variants={fadeInUp} className="rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-schuss-red/20 transition-all hover:translate-y-[-4px] duration-300" tabIndex={0}>
               <motion.div variants={scaleUp} className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-schuss-red"><Wallet size={28} /></motion.div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Le bon plan.</h3>
               <p className="text-slate-500 text-sm mb-6">Comparez le prix des forfaits et trouvez les restaurants les moins chers.</p>
               <div className="flex items-center gap-2 text-sm font-bold text-schuss-red group-hover:gap-3 transition-all"><span>Voir l'économie</span> <ArrowRight size={16} /></div>
            </motion.div>

             {/* Feature 4: Weather */}
             <motion.div variants={fadeInUp} className="rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-yellow-400/20 transition-all hover:translate-y-[-4px] duration-300" tabIndex={0}>
               <motion.div variants={scaleUp} className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-600"><Sun size={28} /></motion.div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Chasseur de soleil.</h3>
               <p className="text-slate-500 text-sm">Notre carte vous montre quelles pistes sont au soleil en temps réel.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={viewportConfig} variants={fadeInUp} className="text-3xl font-bold text-center mb-16 text-slate-900">
            Ils ne skient plus sans Schuss
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.1 }} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-lg">
                <div className="flex gap-1 text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="text-slate-700 mb-6 italic text-lg">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-schuss-blue to-schuss-red text-white flex items-center justify-center font-bold text-xl">{t.name.charAt(0)}</div>
                  <div><p className="font-bold text-slate-900">{t.name}</p><p className="text-sm text-slate-500">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ INTERACTIVE --- */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={viewportConfig} variants={fadeInUp} className="text-3xl font-bold text-center mb-12 text-slate-900">
            Questions Fréquentes
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={staggerContainer} className="space-y-4">
             {faqData.map((item, i) => (
               <motion.div key={i} variants={fadeInUp} className={`border rounded-2xl p-6 transition-all cursor-pointer group bg-white ${openFAQ === i ? 'border-schuss-blue shadow-md' : 'border-slate-200 hover:border-schuss-blue/30'}`} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} onKeyDown={(e) => e.key === 'Enter' && setOpenFAQ(openFAQ === i ? null : i)} tabIndex={0} role="button" aria-expanded={openFAQ === i}>
                 <div className="flex justify-between items-center">
                   <h3 className="font-bold text-slate-800 group-hover:text-schuss-blue transition-colors">{item.q}</h3>
                   <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openFAQ === i ? 'rotate-180 text-schuss-blue' : ''}`} />
                 </div>
                 <AnimatePresence>
                   {openFAQ === i && (
                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                       <p className="text-slate-600 pt-4 text-sm leading-relaxed">{item.a}</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* --- STICKY MOBILE CTA --- */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pb-safe">
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-schuss-red text-white py-4 rounded-xl font-bold shadow-lg text-lg active:scale-[0.98] transition-transform">
               Rejoindre la Bêta
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CTA FINAL --- */}
      <section className="py-24 px-6 bg-schuss-blue relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-schuss-red/20 rounded-full blur-[120px] pointer-events-none"></div>
         <motion.div initial="hidden" whileInView="visible" viewport={viewportConfig} variants={fadeInUp} className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Prêt à schusser ?</h2>
            <p className="text-xl text-blue-50/80 mb-10 max-w-2xl mx-auto">Rejoignez les 15'000 premiers skieurs suisses qui utilisent déjà Schuss.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-schuss-red hover:bg-white hover:text-schuss-red text-white text-xl font-bold py-5 px-12 rounded-full transition-all shadow-2xl hover:shadow-white/20 focus:outline-none focus:ring-4 focus:ring-white/50">
              Rejoindre la Bêta
            </motion.button>
            <p className="mt-6 text-sm text-white/40">iOS & Android. Pas de carte de crédit requise.</p>
         </motion.div>
      </section>

      {/* --- FOOTER CONNECTÉ --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
           <div className="col-span-2 md:col-span-1">
              <span className="text-white font-bold text-2xl tracking-widest uppercase block mb-4">Schuss</span>
              <p className="mb-4">Made in Switzerland 🇨🇭 with love & cheese.</p>
              <div className="flex gap-4">
                 <a href="#" aria-label="Instagram" className="p-3 -ml-3 hover:text-white transition-colors"><Instagram size={20} /></a>
              </div>
           </div>
           
           {[
             { title: "Produit", links: [{ label: "Fonctionnalités", href: "#features" }, { label: "Stations couvertes", href: "/stations" }, { label: "Premium", href: "/tarif" }] },
             { title: "Société", links: [{ label: "À propos", href: "/a-propos" }, { label: "Contact", href: "mailto:hello@schuss.ch" }] },
             { title: "Légal", links: [{ label: "Conditions d'utilisation (CGU)", href: "/cgu" }, { label: "Mentions légales", href: "/mentions-legales" }, { label: "Confidentialité", href: "/confidentialite" }] }
           ].map((col, i) => (
             <div key={i}>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">{col.title}</h4>
                <ul className="space-y-3">
                   {col.links.map(link => (
                     <li key={link.label}>
                       <Link href={link.href} className="hover:text-white transition-colors py-1 block">
                         {link.label}
                       </Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
           <p>© 2025 Schuss App Switzerland. Tous droits réservés.</p>
           <div className="flex items-center gap-2 mt-4 md:mt-0 opacity-50">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Système Opérationnel</span>
           </div>
        </div>
      </footer>

    </div>
  );
}