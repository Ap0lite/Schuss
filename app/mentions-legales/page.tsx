"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-schuss-red selection:text-white">
      
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-schuss-blue transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Retour</span>
          </Link>
          <span className="font-black text-xl italic tracking-tighter text-schuss-blue ml-auto">
            SCHUSS<span className="text-schuss-red">.</span>
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pt-32 pb-24 px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-12">Mentions Légales</h1>

        <div className="grid gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-schuss-blue mb-4 uppercase tracking-wider text-xs">Éditeur du site</h2>
            <p className="text-slate-900 font-bold text-xl mb-2">Schuss App Switzerland</p>
            <p className="text-slate-600">
              Société à responsabilité limitée (SARL) <br/>
              IDE : CHE-123.456.789 (Fictif pour démo) <br/>
              Siège social : Avenue de la Gare 1, 1003 Lausanne, Suisse
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-schuss-blue mb-4 uppercase tracking-wider text-xs">Contact</h2>
            <p className="text-slate-600">
              Email : <a href="mailto:hello@schuss.ch" className="text-schuss-red hover:underline">hello@schuss.ch</a> <br/>
              Téléphone : +41 21 000 00 00
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-schuss-blue mb-4 uppercase tracking-wider text-xs">Hébergement</h2>
            <p className="text-slate-600">
              Ce site est hébergé par : <br/>
              <strong>Vercel Inc.</strong> <br/>
              340 S Lemon Ave #4133 <br/>
              Walnut, CA 91789, USA
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-schuss-blue mb-4 uppercase tracking-wider text-xs">Données Cartographiques</h2>
            <p className="text-slate-600 text-sm">
              © Swisstopo - Office fédéral de topographie <br/>
              © OpenStreetMap contributors
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}