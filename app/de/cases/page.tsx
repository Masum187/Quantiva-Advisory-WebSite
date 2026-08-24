'use client';

import React from 'react';
import casesData from '../../lib/data/cases.json';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';
import CommandPalette from '../../components/CommandPalette';
import Navigation from '../../components/Navigation';
import ProjectRoadmap from '../../components/ProjectRoadmap';
import '../../components/ProjectRoadmap.css';
import { 
  Brain, 
  Cog, 
  Database, 
  Shield, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  Code, 
  Layers, 
  Workflow, 
  Bot,
  Users
} from 'lucide-react';

export default function CasesPage() {
  // Navigation items for German
  const navigationItems = [
    { id: 'home', label: 'Home', href: '/de' },
    { id: 'about', label: 'Über uns', href: '/de/about' },
    { id: 'services', label: 'Services', href: '/de#services' },
    { id: 'search', label: 'Suche', href: '/de/search' },
    { id: 'cases', label: 'Projekte', href: '/de/cases' },
    { id: 'team', label: 'Team', href: '/de/team' },
    { id: 'career', label: 'Karriere', href: '/de#career' },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Projekte & Innovation - Quantiva Advisory</title>
        <meta name="description" content="Entdecken Sie unsere innovativen KI-Projekte: QA.Orchestrator, PromptSAP und RecruAI. Zukunftsweisende Technologien für die digitale Transformation." />
        <meta name="keywords" content="KI-Projekte, SAP-Beratung, QA.Orchestrator, PromptSAP, RecruAI, Innovation, Quantiva Advisory" />
        <meta property="og:title" content="Projekte & Innovation - Quantiva Advisory" />
        <meta property="og:description" content="Entdecken Sie unsere innovativen KI-Projekte und zukunftsweisende Technologien für die digitale Transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quantivaadvisory-masum187s-projects.vercel.app/de/cases" />
        <meta property="og:image" content="https://quantivaadvisory-masum187s-projects.vercel.app/assets/og/cases.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projekte & Innovation - Quantiva Advisory" />
        <meta name="twitter:description" content="Entdecken Sie unsere innovativen KI-Projekte und zukunftsweisende Technologien." />
        <meta name="twitter:image" content="https://quantivaadvisory-masum187s-projects.vercel.app/assets/og/cases.jpg" />
        <link rel="canonical" href="https://quantivaadvisory-masum187s-projects.vercel.app/de/cases" />
        <link rel="alternate" hrefLang="de" href="https://quantivaadvisory-masum187s-projects.vercel.app/de/cases" />
        <link rel="alternate" hrefLang="en" href="https://quantivaadvisory-masum187s-projects.vercel.app/en/cases" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Projekte & Innovation - Quantiva Advisory",
              "description": "Entdecken Sie unsere innovativen KI-Projekte und zukunftsweisende Technologien für die digitale Transformation.",
              "url": "https://quantivaadvisory-masum187s-projects.vercel.app/de/cases",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "CreativeWork",
                    "position": 1,
                    "name": "QA.Orchestrator",
                    "description": "Agentisches Testsystem für SAP mit KI-gestützter Prozess-Orchestrierung",
                    "creator": {
                      "@type": "Organization",
                      "name": "Quantiva Advisory"
                    }
                  },
                  {
                    "@type": "CreativeWork", 
                    "position": 2,
                    "name": "PromptSAP",
                    "description": "KI-Agent für SAP mit natürlicher Sprachverarbeitung",
                    "creator": {
                      "@type": "Organization",
                      "name": "Quantiva Advisory"
                    }
                  },
                  {
                    "@type": "CreativeWork",
                    "position": 3,
                    "name": "RecruAI",
                    "description": "KI-gestütztes Recruiting-System für intelligente Personalauswahl",
                    "creator": {
                      "@type": "Organization",
                      "name": "Quantiva Advisory"
                    }
                  }
                ]
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Startseite",
                    "item": "https://quantivaadvisory-masum187s-projects.vercel.app/de"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Projekte",
                    "item": "https://quantivaadvisory-masum187s-projects.vercel.app/de/cases"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Zum Hauptinhalt springen
      </a>

      {/* Command Palette */}
      <CommandPalette />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Navigation */}
        <Navigation lang="de" items={navigationItems} />
        
        {/* Background Video */}
        <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/dbrisux8i/video/upload/v1762103900/grok-video-dda3f51a-7efb-453a-a311-9467a101e4a0_rteefh.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Section - Solana Style */}
        <section id="main-content" className="relative text-white py-24 z-10 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
              {/* Main Headline */}
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  KI-Projekte für die
                  <br />
                  <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Enterprise-Welt
                  </span>
                </h2>
                
                {/* Subtitle */}
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Von der Idee zur Realität. Quantiva verwandelt komplexe KI-Konzepte in messbare Business-Ergebnisse.
                </p>
                
                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const projectSection = document.querySelector('.project-stats-section');
                    if (projectSection) {
                      projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto uppercase tracking-wide"
                >
                  GO TO PROJECTS
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
            
            {/* Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {/* Stat 1 */}
              <div className="bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-2xl p-8 border border-teal-500/30">
                <div className="text-4xl font-bold text-teal-400 mb-2">50+</div>
                <div className="text-white text-sm">Erfolgreiche Projekte</div>
              </div>
              
              {/* Stat 2 */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
                <div className="text-white text-sm">Innovative Plattformen</div>
              </div>
              
              {/* Stat 3 */}
              <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl p-8 border border-pink-500/30">
                <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-white text-sm">KI-Integration</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Roadmap Projects Section */}
        <ProjectRoadmap />

        {/* Community Banner */}
        <section className="relative py-16 overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent z-10"></div>
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{
              x: ["100%", "-100%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].map((_, i) => ( // Duplicate content for seamless loop
              <div key={i} className="flex items-center gap-12 px-6">
                <h2 className="text-5xl font-bold text-white">Join a thriving community.</h2>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-pink-400 mb-2">50+</div>
                    <div className="text-white text-sm">Projekte</div>
                  </div>
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"
                      alt="Team Collaboration"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-2">3</div>
                    <div className="text-white text-sm">Plattformen</div>
                  </div>
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop"
                      alt="Code Development"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">100%</div>
                    <div className="text-white text-sm">KI-Integration</div>
                  </div>
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=500&auto=format&fit=crop"
                      alt="AI Integration"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">24/7</div>
                    <div className="text-white text-sm">Support</div>
                  </div>
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500&auto=format&fit=crop"
                      alt="24/7 Support"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Lassen Sie uns gemeinsam Ihre Success Story schreiben
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
            </p>
            <Link
              href="/de#contact"
              className="inline-block px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Jetzt Kontakt aufnehmen
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}