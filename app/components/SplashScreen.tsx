"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  finishLoading: () => void;
}

export default function SplashScreen({ finishLoading }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A2342] overflow-hidden"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      onAnimationComplete={(definition) => {
        if (definition === "exit") finishLoading();
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* FOND RADIAL SUBTIL */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#16325B] to-[#0A2342]" />
        
        {/* GRILLE DE FOND (Effet Vitesse) */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center">
          
          {/* ICONE ANIMÉE (Traces de ski) */}
          <div className="relative w-48 h-48 mb-6">
             <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                {/* Trace Rouge (Vitesse) */}
                <motion.path
                  d="M40,20 Q120,100 40,220"
                  stroke="#FF2D2D"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "circIn" }}
                />
                
                {/* Trace Blanche (Parallèle) */}
                <motion.path
                  d="M80,20 Q160,100 80,220"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "circIn" }}
                />

                {/* Explosion de Neige (Particules) */}
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="120"
                    r={Math.random() * 4 + 2}
                    fill="white"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      x: (Math.random() - 0.5) * 250,
                      y: (Math.random() - 0.5) * 250,
                      opacity: [1, 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
             </svg>
          </div>

          {/* LOGO TEXTE */}
          <div className="overflow-hidden relative p-2">
            <motion.h1 
              className="font-black text-7xl md:text-9xl italic tracking-tighter text-white transform -skew-x-12"
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              SCHUSS
            </motion.h1>
            
            {/* Effet "Flash" Rouge qui passe sur le texte */}
            <motion.div
              className="absolute inset-0 bg-[#FF2D2D] mix-blend-color-dodge"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.4, delay: 0.9, ease: "easeInOut" }}
            />
          </div>

          <motion.div 
            className="flex items-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div className="h-[2px] w-8 bg-[#FF2D2D]" />
            <p className="text-white/80 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
              Swiss Precision
            </p>
            <div className="h-[2px] w-8 bg-[#FF2D2D]" />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}