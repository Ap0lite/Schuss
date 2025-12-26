"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-schuss-blue flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
      
      {/* Fond animé subtil */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg"
      >
        {/* Icone Danger */}
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/10">
            <AlertTriangle className="text-schuss-red w-12 h-12" />
        </div>

        <h1 className="text-8xl font-black text-white mb-2 tracking-tighter opacity-90">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Oups ! Vous êtes hors-piste.</h2>
        
        <p className="text-blue-100/70 text-lg mb-10 leading-relaxed">
          Cette piste n'est pas balisée ou a été fermée par les patrouilleurs. 
          Il est plus prudent de faire demi-tour.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-schuss-red hover:bg-white hover:text-schuss-red text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Home size={20} />
          Retour à la station
        </Link>
      </motion.div>

      {/* Footer minimaliste */}
      <div className="absolute bottom-8 text-white/20 text-xs">
        Code erreur: PISTE_INCONNUE
      </div>
    </div>
  );
}