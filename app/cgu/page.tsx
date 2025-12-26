"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CGUPage() {
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
        <h1 className="text-4xl font-black text-slate-900 mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-slate-500 mb-12">Entrée en vigueur : 26 Décembre 2025</p>

        <div className="prose prose-slate prose-lg max-w-none">
          <section className="mb-10 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-schuss-blue mb-4">⚠️ Clause de non-responsabilité (Montagne)</h2>
            <p className="text-slate-600 text-sm font-medium">
              Le ski et la montagne comportent des risques inhérents. Schuss est un outil d'aide à la décision et ne remplace en aucun cas :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 text-sm">
              <li>Le balisage officiel des pistes.</li>
              <li>Les instructions des patrouilleurs.</li>
              <li>Votre jugement personnel et votre bon sens.</li>
            </ul>
            <p className="text-slate-600 text-sm mt-4 font-bold">
              L'éditeur décline toute responsabilité en cas d'accident, d'égarement ou de dommage survenant lors de l'utilisation de l'application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Objet</h2>
            <p>
              Les présentes CGU régissent l'utilisation de l'application mobile et du site web "Schuss". En accédant à nos services, vous acceptez ces conditions sans réserve.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Services</h2>
            <p>
              Schuss fournit des informations sur les transports (CFF), la météo et les domaines skiables. Ces données proviennent de sources tierces (Open Data). Nous ne garantissons pas l'exactitude absolue des horaires ou des conditions météorologiques en temps réel.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Compte Utilisateur</h2>
            <p>
              L'accès à certaines fonctionnalités (comme la sauvegarde des favoris ou l'offre "Alpiniste") nécessite la création d'un compte. Vous êtes responsable de la confidentialité de vos identifiants.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Propriété Intellectuelle</h2>
            <p>
              La marque "Schuss", le logo, le design de l'interface et l'algorithme "Door-to-Slope" sont la propriété exclusive de Schuss App Switzerland. Toute reproduction non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Droit Applicable</h2>
            <p>
              Les présentes conditions sont soumises au droit suisse. Le for juridique est à Lausanne (Vaud).
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12 text-center text-slate-400 text-sm">
        © 2025 Schuss App Switzerland.
      </footer>
    </div>
  );
}