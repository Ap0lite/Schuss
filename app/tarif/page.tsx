"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';

export default function PricingPage() {
  
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-schuss-red selection:text-white">
      
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-schuss-blue transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Retour</span>
          </Link>
          
          {/* LOGO IDENTIQUE LANDING PAGE */}
          <Link href="/" className="group cursor-pointer">
             <span className="font-black text-3xl italic tracking-tighter transform -skew-x-6 inline-block text-schuss-blue">
               SCHUSS
               <span className="text-schuss-red inline-block transform skew-x-6 group-hover:rotate-12 transition-transform">.</span>
             </span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-schuss-blue">Skiez plus. Payez moins.</h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto">
            La version gratuite suffit à 90% des skieurs. <br/>
            La version Alpiniste est pour ceux qui veulent dompter la montagne.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          
          {/* Plan Gratuit */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2 text-slate-900">Touriste</h2>
            <div className="text-4xl font-black mb-6 text-slate-900">0 CHF <span className="text-lg font-normal text-slate-400">/an</span></div>
            <p className="text-slate-500 mb-8">Parfait pour les skieurs du dimanche et les familles.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3"><Check className="text-green-600 shrink-0" /> <span className="text-slate-700">Itinéraires CFF + Remontées</span></li>
              <li className="flex gap-3"><Check className="text-green-600 shrink-0" /> <span className="text-slate-700">Météo en direct</span></li>
              <li className="flex gap-3"><Check className="text-green-600 shrink-0" /> <span className="text-slate-700">Gestion Magic Pass simple</span></li>
              <li className="flex gap-3 text-slate-400"><X className="shrink-0" /> Cartes Hors-Ligne</li>
              <li className="flex gap-3 text-slate-400"><X className="shrink-0" /> Risques Avalanches Précis</li>
            </ul>
            
            <button className="w-full py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors">
              Télécharger Gratuitement
            </button>
          </motion.div>

          {/* Plan Premium */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white border border-schuss-red/20 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-schuss-red/10 transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 bg-schuss-red text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
              Populaire
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-schuss-blue">Alpiniste</h2>
            <div className="text-4xl font-black mb-6 text-slate-900">29 CHF <span className="text-lg font-normal text-slate-400">/an</span></div>
            <p className="text-slate-500 mb-8">Pour les freeriders et les passionnés de tech.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3"><Check className="text-schuss-red shrink-0" /> <span className="text-slate-900 font-medium">Tout le pack Touriste</span></li>
              <li className="flex gap-3"><Check className="text-schuss-red shrink-0" /> <span className="text-slate-700">Cartes Swisstopo 100% Hors-ligne</span></li>
              <li className="flex gap-3"><Check className="text-schuss-red shrink-0" /> <span className="text-slate-700">Calques Avalanches & Pente 30°</span></li>
              <li className="flex gap-3"><Check className="text-schuss-red shrink-0" /> <span className="text-slate-700">Alertes Poudreuse (Push)</span></li>
              <li className="flex gap-3"><Check className="text-schuss-red shrink-0" /> <span className="text-slate-700">Support Prioritaire</span></li>
            </ul>
            
            <button className="w-full py-4 rounded-xl bg-schuss-red hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-500/30">
              Essayer 14 jours gratuits sur l'app
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">Annulable à tout moment.</p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}