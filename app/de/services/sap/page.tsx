'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Database, ArrowLeft, CheckCircle, Users, Target, Zap } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import WhitepaperCard from '../../../components/WhitepaperCard';

function SlideIn({ children, direction = 'up', delay = 0, duration = 0.8, className }: { children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number; duration?: number; className?: string }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
}

export default function SAPServicePage() {
  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const videos = useMemo(() => [
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435643/kling_20251014_Text_to_Video_Title__The_4174_0_b3juos.mp4',
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435639/kling_20251014_Text_to_Video_Title__The_4165_1_t3grxn.mp4',
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435634/kling_20251014_Text_to_Video_Title__The_4174_2_llyqsp.mp4'
  ], []);

  // Rotate videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % videos.length;
        console.log(`Switching to video ${nextIndex + 1}/${videos.length}`);
        return nextIndex;
      });
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [videos]);

  // Handle video play when currentVideoIndex changes
  useEffect(() => {
    // Pause all videos first
    videos.forEach((video, index) => {
      const videoElement = document.querySelector(`video[src="${video}"]`) as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
      }
    });

    // Start current video
    const currentVideo = document.querySelector(`video[src="${videos[currentVideoIndex]}"]`) as HTMLVideoElement;
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch((error) => {
        console.log(`Failed to play video ${currentVideoIndex + 1}:`, error);
      });
    }
  }, [currentVideoIndex, videos]);

  // Debug current video
  useEffect(() => {
    console.log(`Current video index: ${currentVideoIndex}, Video: ${videos[currentVideoIndex]}`);
  }, [currentVideoIndex, videos]);
  const offerings = [
    {
      icon: Database,
      title: 'SAP S/4HANA Beratung',
      description: 'Strategische Beratung für Ihre SAP S/4HANA Transformation mit Fokus auf hybride Ansätze und KI-Integration.',
      features: ['Greenfield vs. Brownfield Analyse', 'ROI-Berechnung', 'Migrationsstrategie', 'Change Management', 'KI-Integration'],
      details: 'Wir unterstützen Sie beim Umstieg sowie der Migration zu SAP S/4HANA – von Strategie über Prozessdesign bis Umsetzung. Laut aktueller Studien setzen bereits zwei Drittel der Unternehmen in der DACH-Region auf S/4HANA, wobei hybride Ansätze dominieren. Die größten Herausforderungen bleiben IT-Landschaftsanpassung und Stammdatenmanagement; der Stellenwert von KI-Integration zur Effizienzsteigerung steigt rapide.',
      benefits: ['Strategische Transformation', 'Hybride Migrationsansätze', 'KI-Integration', 'Reduzierte Risiken', 'Optimierte Prozesse']
    },
    {
      icon: Target,
      title: 'SAP BTP (Business Technology Platform)',
      description: 'Individuelle, integrierte Lösungen auf SAP BTP für Entwicklung, Integration und Analytics.',
      features: ['Entwicklung & Integration', 'Analytics & Reporting', 'Best Practices', 'Automatisierung', 'Erweiterbarkeit'],
      details: 'Wir realisieren für Sie individuelle, integrierte Lösungen auf SAP BTP – für alle Herausforderungen rund um Entwicklung, Integration und Analytics. Moderne Best Practices, Automatisierung und Erweiterbarkeit sind unser Standard.',
      benefits: ['Individuelle Lösungen', 'Nahtlose Integration', 'Moderne Best Practices', 'Automatisierung', 'Skalierbare Architektur']
    },
    {
      icon: Users,
      title: 'SAP Cloud ALM',
      description: 'Application Lifecycle Management speziell für Cloud- und hybride SAP-Umgebungen.',
      features: ['Cloud-basiertes ALM', 'Fiori-UX', 'Best Practices', 'Zentrale Steuerung', 'Nahtlose Integration'],
      details: 'Mit SAP Cloud ALM bieten wir Application Lifecycle Management speziell für Cloud- und hybride SAP-Umgebungen. Das Ganze cloudbasiert und mit moderner Fiori-UX – für eine schnelle Time-to-Value und reduzierten Betriebsaufwand. Zentrale Vorteile: Best Practices, zentrale Steuerung, nahtlose Integration und höchste Transparenz.',
      benefits: ['Schnelle Time-to-Value', 'Reduzierter Betriebsaufwand', 'Zentrale Steuerung', 'Höchste Transparenz', 'Moderne UX']
    },
    {
      icon: Zap,
      title: 'SAP Joule KI-Agenten',
      description: 'Integration intelligenter Agenten für Entwicklung, Testautomatisierung und Prozessautomation.',
      features: ['Entwicklung & Testautomatisierung', 'Prozessautomation', 'SAP Fiori Integration', 'UX-Optimierung', 'KI-Integration'],
      details: 'Unsere Expert:innen integrieren Joule als intelligente Agenten für Entwicklung, Testautomatisierung, Prozessautomation sowie für SAP Fiori und UX – und holen so das Maximum aus Ihren SAP-Investitionen heraus. Diese KI-Integration macht den Wechsel zwischen Tools überflüssig, beschleunigt Innovationen und sorgt für bessere Erkennbarkeit und Steuerbarkeit von Geschäftsprozessen.',
      benefits: ['Maximale SAP-Investitionen', 'Beschleunigte Innovationen', 'Bessere Prozesssteuerung', 'Tool-Integration', 'KI-gestützte Automatisierung']
    },
    {
      icon: CheckCircle,
      title: 'SAP Test Services & Automation',
      description: 'Automatisierung Ihrer SAP-Tests von der Anforderungsaufnahme bis zum Monitoring.',
      features: ['Testautomatisierung', 'Best Practice-Frameworks', 'Cloud & Hybrid', 'Monitoring', 'Nachhaltige Absicherung'],
      details: 'Wir automatisieren Ihre SAP-Tests von der Anforderungsaufnahme bis zum Monitoring. Dabei setzen wir auf Best Practice-Frameworks und sorgen für eine nachhaltige Absicherung Ihrer Projekte – gerade in Cloud- und hybriden Umgebungen.',
      benefits: ['Automatisierte Tests', 'Best Practice-Frameworks', 'Nachhaltige Absicherung', 'Cloud-optimiert', 'Reduzierte Risiken']
    },
    {
      icon: Users,
      title: 'SAP Fiori & UX',
      description: 'Intuitive und moderne Benutzeroberflächen auf Basis von SAP Fiori und neuesten UX-Standards.',
      features: ['SAP Fiori Design', 'SAPUI5 Entwicklung', 'UX-Standards', 'Intuitive Oberflächen', 'Produktivitätsschub'],
      details: 'Wir gestalten intuitive und moderne Benutzeroberflächen auf Basis von SAP Fiori, SAPUI5 und neuesten UX-Standards. Das Ergebnis: optimaler Zugang zu Systemen, hohe Akzeptanz und nachhaltiger Produktivitätsschub für Ihre Teams.',
      benefits: ['Intuitive Benutzeroberflächen', 'Hohe Akzeptanz', 'Produktivitätsschub', 'Moderne UX-Standards', 'Optimale Systemzugriffe']
    }
  ];

  const whitepapers = [
    {
      title: 'SAP S/4HANA Transformation Guide 2025',
      description: 'Umfassender Leitfaden für die S/4HANA-Transformation mit Best Practices, ROI-Berechnung und Migrationsstrategien.',
      topic: 'S/4HANA Transformation',
      date: '2025',
      image: '/assets/whitepapers/sap/s4hana.jpg',
      slug: 'sap-s4hana-transformation'
    },
    {
      title: 'SAP BTP Integration Patterns Whitepaper',
      description: 'Moderne Integrationsmuster und Best Practices für SAP Business Technology Platform mit Architektur-Entscheidungen.',
      topic: 'BTP Integration',
      date: '2025',
      image: '/assets/whitepapers/sap/btp.jpg',
      slug: 'sap-btp-integration'
    },
    {
      title: 'SAP Cloud ALM Best Practices',
      description: 'Application Lifecycle Management für Cloud- und hybride SAP-Umgebungen mit praktischen Implementierungshilfen.',
      topic: 'Cloud ALM',
      date: '2025',
      image: '/assets/whitepapers/sap/cloud-alm.jpg',
      slug: 'sap-cloud-alm'
    },
    {
      title: 'KI & SAP Joule Integration Guide',
      description: 'Roadmap zur Integration von GenAI/Joule in SAP-Lösungen mit Best Practices und Implementierungsstrategien.',
      topic: 'KI & Joule Integration',
      date: '2025',
      image: '/assets/whitepapers/sap/ki-joule.jpg',
      slug: 'sap-ki-joule'
    },
    {
      title: 'SAP Fiori UX Design Guidelines 2025',
      description: 'Neueste UX-Standards und Design-Prinzipien für SAP Fiori Anwendungen mit User Experience Best Practices.',
      topic: 'Fiori UX Design',
      date: '2025',
      image: '/assets/whitepapers/sap/fiori-ux.jpg',
      slug: 'sap-fiori-ux'
    },
    {
      title: 'SAP Test Automation Framework',
      description: 'Best Practices für automatisierte SAP-Tests von der Anforderungsaufnahme bis zum Monitoring in Cloud-Umgebungen.',
      topic: 'Test Automation',
      date: '2025',
      image: '/assets/whitepapers/sap/test-automation.jpg',
      slug: 'sap-test-automation'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Service Navigation */}
      <ServiceNavigation lang="de" serviceTitle="SAP Services" serviceId="sap" />
      
      {/* Rotating Background Videos */}
      <div className="fixed inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={`video-${index}`}
            src={video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            muted
            loop
            playsInline
            preload="auto"
            onLoadStart={() => {
              console.log(`Video ${index + 1} started loading: ${video.split('/').pop()}`);
            }}
            onCanPlay={() => {
              console.log(`Video ${index + 1} can play: ${video.split('/').pop()}`);
            }}
            onPlay={() => {
              console.log(`Video ${index + 1} started playing: ${video.split('/').pop()}`);
            }}
            onError={(e) => {
              console.error(`Video ${index + 1} error:`, e);
            }}
          />
        ))}
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/5 z-20"></div>
        
        {/* Video Indicator (for debugging) */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-30">
          Video {currentVideoIndex + 1}/{videos.length}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <Link 
                href="/de"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Hauptseite
              </Link>
              
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-8">
                      <Database className="w-6 h-6 text-blue-400" />
                      <span className="text-blue-300 text-sm font-semibold tracking-wider">SAP SERVICES</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                      SAP{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Services
                      </span>
                    </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                End-to-End Beratung für Ihre digitale Transformation mit SAP S/4HANA, Cloud Services, KI-Integration und optimaler UX.
              </p>

              <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  Als erfahrenes Beratungsunternehmen begleiten wir Sie bei allen Herausforderungen rund um SAP – von der SAP S/4HANA Transformation über innovative Cloud Services, KI-Integration bis hin zur Automatisierung und optimalen UX.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">SAP S/4HANA:</strong> Strategische Transformation mit hybriden Ansätzen und KI-Integration.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">SAP BTP:</strong> Individuelle Lösungen für Entwicklung, Integration und Analytics.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">SAP Cloud ALM:</strong> Application Lifecycle Management für Cloud- und hybride Umgebungen.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">SAP Joule:</strong> KI-Agenten für Entwicklung, Testautomatisierung und Prozessautomation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Unsere{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  SAP-Services
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professionelle SAP-Beratung für moderne Unternehmen
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              const iconColors = [
                    { bg: 'from-blue-500/30 to-cyan-500/30', border: 'border-blue-400/60', glow: 'shadow-blue-500/30', icon: 'text-blue-300', hover: 'text-blue-200' },
                    { bg: 'from-purple-500/30 to-pink-500/30', border: 'border-purple-400/60', glow: 'shadow-purple-500/30', icon: 'text-purple-300', hover: 'text-purple-200' },
                    { bg: 'from-teal-500/30 to-cyan-500/30', border: 'border-teal-400/60', glow: 'shadow-teal-500/30', icon: 'text-teal-300', hover: 'text-teal-200' },
                    { bg: 'from-green-500/30 to-emerald-500/30', border: 'border-green-400/60', glow: 'shadow-green-500/30', icon: 'text-green-300', hover: 'text-green-200' }
                  ];
              const colors = iconColors[index % iconColors.length];
              return (
                <SlideIn key={index} delay={index * 0.1}>
                  <motion.div
                    className="group relative overflow-hidden"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background with glassmorphism */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-2xl border-2 border-white/20 rounded-3xl group-hover:border-white/40 transition-all duration-500" />
                    
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Content */}
                    <div className="relative p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border-2 flex items-center justify-center ${colors.glow} shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                          whileHover={{ 
                            scale: 1.15,
                            rotate: 360,
                            transition: { duration: 0.6 }
                          }}
                        >
                          <Icon className={`w-8 h-8 ${colors.icon} group-hover:${colors.hover} transition-colors duration-300`} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white pt-2">{offering.title}</h3>
                      </div>

                      <p className="text-gray-100 mb-6 leading-relaxed font-medium">
                        {offering.description}
                      </p>

                      <div className="space-y-3">
                        {offering.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-3 group/item"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className={`w-5 h-5 ${colors.icon} flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`} />
                            <span className="text-gray-100 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-3xl" />
                  </motion.div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studies Section */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Downloadbare{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                    Whitepapers
                  </span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Wissenschaftlich fundierte Erkenntnisse und praktische Leitfäden für erfolgreiche SAP-Implementierungen
                </p>
              </motion.div>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {whitepapers.map((whitepaper, index) => (
              <SlideIn key={index} delay={index * 0.1 + 0.5} className="h-full">
                <WhitepaperCard
                  title={whitepaper.title}
                  description={whitepaper.description}
                  topic={whitepaper.topic}
                  date={whitepaper.date}
                  image={whitepaper.image}
                  slug={whitepaper.slug}
                />
              </SlideIn>
            ))}
          </div>

          {/* Studies CTA */}
          <SlideIn delay={0.8}>
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-sm">
                <span className="text-white/80">
                  Interesse an detaillierten Studienergebnissen?
                </span>
                <Link
                  href="/de#contact"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Kontakt aufnehmen
                  <CheckCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Bereit für Ihre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                SAP-Services?
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre SAP-Strategie entwickeln und erfolgreich umsetzen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/de#contact"
                className="px-10 py-5 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                SAP-Services anfragen
              </Link>
              <Link
                href="/de/capabilities/sap"
                className="px-10 py-5 bg-blue-500/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-xl hover:bg-blue-500/30 transition-all duration-300"
              >
                Technische Details →
              </Link>
            </div>
          </SlideIn>
        </div>
      </section>
      </div>
    </div>
  );
}
