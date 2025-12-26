"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mountain, Zap, Heart, Map, ShieldCheck, Code2 } from 'lucide-react';

export default function AboutPage() {
  
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-schuss-red selection:text-white">
      
      {/* Navbar Transparente au début */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-32 px-6 bg-schuss-blue overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-schuss-red/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Notre Mission
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Le ski suisse méritait <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-schuss-red to-orange-400">
                mieux qu'un PDF.
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              Nous construisons l'outil que nous avons toujours rêvé d'avoir dans nos poches sur le télésiège. Simple, rapide, et suisse.
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- STORYTELLING SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="prose prose-lg prose-slate first-letter:text-5xl first-letter:font-black first-letter:text-schuss-red first-letter:mr-3 first-letter:float-left"
          >
            <p className="text-2xl font-light leading-relaxed text-slate-700 mb-8">
              Tout a commencé un samedi matin à la gare de Lausanne. Entre l'application CFF pour les horaires, MétéoSuisse pour le soleil, et un site web de station pas adapté aux mobiles pour le plan des pistes, nous passions plus de temps sur nos téléphones qu'à regarder la montagne.
            </p>
            <p>
              C'est là qu'est née l'idée de <strong>Schuss</strong>. Une application unique, centrale, qui agrège toutes les données essentielles pour le skieur moderne. Pas de fioritures, pas de publicités intrusives. Juste l'information pure, au bon moment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VALEURS (BENTO GRID STYLE) --- */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-center mb-16 text-schuss-blue"
          >
            Nos Valeurs Fondamentales
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
             {/* Carte 1 */}
             <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 text-schuss-red rounded-2xl flex items-center justify-center mb-6">
                   <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Swiss Privacy</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                   Vos données restent en Suisse. Pas de tracking publicitaire, pas de revente. La confidentialité n'est pas une option, c'est la base.
                </p>
             </motion.div>

             {/* Carte 2 */}
             <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 text-schuss-blue rounded-2xl flex items-center justify-center mb-6">
                   <Code2 size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Open Data</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                   Nous croyons en la transparence. Nous utilisons et contribuons aux données ouvertes (CFF, Swisstopo) pour un écosystème plus riche.
                </p>
             </motion.div>

             {/* Carte 3 */}
             <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-6">
                   <Zap size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900">Mobilité Douce</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                   Le futur du ski passe par le train. Notre algorithme favorise toujours les connexions ferroviaires pour réduire l'empreinte carbone.
                </p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block relative"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-schuss-red to-orange-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden">
                 {/* Placeholder Avatar */}
                 <div className="w-full h-full bg-slate-800 flex items-center justify-center text-4xl">👨‍💻</div>
              </div>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             <h2 className="text-3xl font-bold text-slate-900 mb-2">Dany</h2>
             <p className="text-schuss-blue font-medium mb-6 uppercase tracking-wider text-xs">Fondateur & Développeur</p>
             <p className="text-slate-600 text-lg italic max-w-lg mx-auto">
                "J'ai codé la première version de Schuss dans le train entre Lausanne et Zermatt, parce que je n'arrivais pas à savoir si la liaison était assurée."
             </p>
           </motion.div>
        </div>
      </section>

      {/* --- FOOTER SIMPLE --- */}
      <footer className="bg-schuss-blue text-white/40 py-12 text-center text-sm border-t border-white/5">
         <p className="mb-2">Fait avec <Heart size={12} className="inline text-schuss-red mx-1" fill="currentColor" /> dans le canton de Vaud.</p>
         <p>© 2025 Schuss App Switzerland.</p>
      </footer>
    </div>
  );
}