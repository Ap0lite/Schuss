"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-schuss-red selection:text-white">
      
      {/* Header Simple */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-schuss-blue">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-slate-900">Retour à l'accueil</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pt-32 pb-24 px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Politique de Confidentialité</h1>
        <p className="text-slate-500 mb-12">Dernière mise à jour : 26 Décembre 2025</p>

        <div className="prose prose-slate prose-lg max-w-none">
          <section className="mb-10 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-schuss-blue mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              La protection de vos données personnelles est au cœur des valeurs de Schuss. 
              En tant qu'application suisse, nous respectons strictement la Loi fédérale sur la protection des données (LPD) 
              et le RGPD européen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Données collectées</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Géolocalisation :</strong> Uniquement lorsque l'application est active pour la navigation sur les pistes. Aucune donnée n'est stockée sur nos serveurs.</li>
              <li><strong>Email :</strong> Collecté uniquement pour la liste d'attente (Bêta) avec votre consentement explicite.</li>
              <li><strong>Analytique :</strong> Données anonymisées pour améliorer les performances de l'application (crash reports).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Partage des données</h2>
            <p className="text-slate-600 mb-4">
              Nous ne vendons <strong>jamais</strong> vos données. Les seules transmissions effectuées le sont pour le fonctionnement technique :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-schuss-blue text-sm">CFF / SBB</h3>
                  <p className="text-xs text-slate-500 mt-1">Requêtes d'horaires anonymes</p>
               </div>
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-schuss-blue text-sm">Swisstopo</h3>
                  <p className="text-xs text-slate-500 mt-1">Chargement des tuiles cartographiques</p>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Contact</h2>
            <p className="text-slate-600">
              Pour toute demande concernant vos données ou pour exercer votre droit à l'oubli, contactez notre DPO à : <br/>
              <a href="mailto:privacy@schuss.ch" className="text-schuss-red font-bold hover:underline">privacy@schuss.ch</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12 text-center text-slate-400 text-sm">
        © 2025 Schuss App Switzerland. Tous droits réservés.
      </footer>
    </div>
  );
}