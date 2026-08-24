'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Boxes, ArrowLeft, CheckCircle, Network, Zap, Shield, Database } from 'lucide-react';
import ServiceVideoBackground from '../../../components/ServiceVideoBackground';

function SlideIn({ children, direction = 'up', delay = 0, duration = 0.8 }: { children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number; duration?: number }) {
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

export default function MicroservicesServicePage() {
  const offerings = [
    {
      icon: Boxes,
      title: 'Microservices Architecture',
      description: 'Modularität für Skalierbarkeit und Agilität - Zerlegung monolithischer Anwendungen in eigenständige, spezialisierte Dienste.',
      features: ['Domain-Driven Design', 'Service Decomposition', 'API Gateway Design', 'Event-Driven Architecture'],
      details: 'Microservices zerlegen monolithische Anwendungen in eigenständige, spezialisierte Dienste. Diese ermöglichen es Unternehmen, schneller auf Marktveränderungen zu reagieren und neue Geschäftsmodelle zu erschließen. Unabhängig voneinander entwickel- und skalierbar, ermöglichen sie schnellere Innovation und einfachere Wartung.',
      benefits: ['Unabhängige Entwicklung und Skalierung', 'Schnellere Innovation und Time-to-Market', 'Einfachere Wartung und Updates', 'Technologieoffene Implementierung']
    },
    {
      icon: Network,
      title: 'API-First Development',
      description: 'Die Brücken Ihrer IT-Ökosysteme - Verbindung interner und externer Anwendungen, Systeme und Partner.',
      features: ['RESTful API Design', 'GraphQL Implementation', 'API Documentation', 'API Testing & Validation'],
      details: 'APIs sind zentrale Bausteine für Prozessautomatisierung, Datenintegration, Mobile Apps und Plattformstrategien. Sie verbinden interne und externe Anwendungen, Systeme, Geräte und Partner und ermöglichen neue Geschäftsmodelle von SaaS-Angeboten bis zur Plattform-Ökonomie.',
      benefits: ['Nahtlose Systemintegration', 'Beschleunigte Entwicklung', 'Neue Geschäftsmodelle', 'Verbesserte Developer Experience']
    },
    {
      icon: Zap,
      title: 'Container & Orchestration',
      description: 'DevOps & Automatisierung - Entfaltung des vollen Potenzials mit modernen DevOps-Praktiken.',
      features: ['Docker Containerization', 'Kubernetes Orchestration', 'Service Mesh', 'Auto Scaling'],
      details: 'Microservices und APIs entfalten ihr Potenzial mit modernen DevOps-Praktiken: Continuous Integration/Deployment, Automatisierung von Testing und Monitoring. Wir etablieren effiziente Release-Zyklen, stabile Betriebsprozesse und skalierbare Deployments für Ihr Wachstum.',
      benefits: ['Automatisierte Deployments', 'Skalierbare Infrastruktur', 'Stabile Betriebsprozesse', 'Kontinuierliche Verbesserung']
    },
    {
      icon: Shield,
      title: 'Transition & Integration',
      description: 'Von der Legacy-Welt zur Microservice-Architektur - klare Migrationsstrategien und API-getriebene Integrationen.',
      features: ['Legacy Modernization', 'Migration Strategy', 'API-driven Integration', 'Change Management'],
      details: 'Der Wechsel von monolithischen Systemen zu Microservices erfordert klare Migrationsstrategien und API-getriebene Integrationen. Wir analysieren bestehende IT-Landschaften, planen Transformationen und unterstützen von der "Greenfield"-Entwicklung bis zur schrittweisen Modernisierung.',
      benefits: ['Risikominimierte Migration', 'Schrittweise Transformation', 'Bewahrung bestehender Investitionen', 'Strategische IT-Planung']
    }
  ];

  const studies = [
    {
      title: 'ScienceDirect: Enhancing Effectiveness and Security in Microservices Communication (2024)',
      description: 'Untersucht Kommunikationsmodelle, Performance, Fehlerquellen und die organisatorische Wirkung von Microservices. Microservices steigern Flexibilität, erfordern aber einen deutlichen Wandel in Entwicklung und Betrieb.',
      topic: 'Microservices Architecture',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Arxiv / Computer Science Review: Systematic Mapping Study Microservices Architectures (2021)',
      description: 'Meta-Analyse von 200+ wissenschaftlichen Publikationen; identifiziert zentrale Herausforderungen (Deployment, Service Discovery, Maintainability, Skalierung). Empfehlung: Fokus auf API-Design, Orchestrierung und Governance.',
      topic: 'API Design & Governance',
      date: '2021',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Traceable AI / State of API Economy 2025',
      description: 'Marktstudie zu Wachstum und Nutzung von APIs in Unternehmen weltweit. APIs sind Treiber neuer Geschäftsmodelle. Die Zahl der genutzten APIs wächst jährlich um 20–40%.',
      topic: 'API Economy',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'BusinessWire / API Management 2024',
      description: 'Untersucht den Einfluss von APIs auf Digital Business und IT-Strategien in verschiedenen Branchen. Unternehmen mit "API-first"-Strategie sind innovationsstärker und schneller am Markt.',
      topic: 'Digital Business',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'NIST Special Publication 800-204: Security Strategies for Microservices',
      description: 'Leitfaden zu Architektur- und Betriebsstrategien für Microservices – einschließlich API-Management, Fehlerhandling, Skalierung und Service-Monitoring in DevOps-Umgebungen.',
      topic: 'Security & Operations',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: '8 Vorhersagen für Application Security & Microservices in 2025',
      description: 'Prognose: Microservices und APIs werden zur Basis von Innovation und Wachstum, erfordern aber neue Skills und Prozesse. KI und Automatisierung treiben den nächsten Evolutionsschritt.',
      topic: 'Future Trends',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760435639/kling_20251014_Text_to_Video_Title__The_4165_1_t3grxn.mp4"]} />

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-900/20 via-black/60 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <Link 
                href="/de"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Hauptseite
              </Link>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 mb-8">
                <Boxes className="w-6 h-6 text-teal-400" />
                <span className="text-teal-300 text-sm font-semibold tracking-wider">SYSTEM INTEGRATION</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                System{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  Integration
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                API-First Architekturen, Microservices und nahtlose Systemintegration. 
                Wir schaffen moderne, skalierbare und wartbare IT-Architekturen für Ihr Unternehmen.
              </p>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  Integrations-Dienstleistungen
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professionelle Systemintegration für moderne Unternehmen
              </p>
            </div>
          </SlideIn>

          <div className="space-y-16">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <SlideIn key={index} delay={index * 0.2}>
                  <motion.div
                    className="p-12 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/30 to-cyan-500/30 border border-teal-400/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-teal-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{offering.title}</h3>
                    </div>

                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      {offering.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-white mb-4">Was ist {offering.title.split(' ')[0]}?</h4>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {offering.details}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Unsere Leistungen:</h4>
                        <div className="space-y-3">
                          {offering.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + idx * 0.1 + 0.8 }}
                            >
                              <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Ihre Vorteile:</h4>
                        <div className="space-y-3">
                          {offering.benefits.map((benefit, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + idx * 0.1 + 1.0 }}
                            >
                              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                              <span className="text-gray-300">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
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
                  Aktuelle{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                    Studien & Insights
                  </span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Wissenschaftlich fundierte Erkenntnisse zu Microservices und API-Economy
                </p>
              </motion.div>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map((study, index) => (
              <SlideIn key={index} delay={index * 0.1 + 0.5}>
                <motion.article
                  className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Study Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Topic Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-teal-500/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        {study.topic}
                      </span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        {study.date}
                      </span>
                    </div>
                  </div>

                  {/* Study Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {study.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-teal-300 text-sm font-semibold">
                        Studie lesen →
                      </span>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <span>{study.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </SlideIn>
            ))}
          </div>

          {/* Studies CTA */}
          <SlideIn delay={0.8}>
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-teal-500/30 backdrop-blur-sm">
                <span className="text-white/80">
                  Interesse an detaillierten Studienergebnissen?
                </span>
                <Link
                  href="/de#contact"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:scale-105"
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
      <section className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Bereit für{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                System-Integration?
              </span>
            </h2>
            <p className="text-xl text-teal-100 mb-12 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Integrations-Strategie entwickeln und erfolgreich umsetzen.
            </p>
            <div className="flex justify-center">
              <Link
                href="/de#contact"
                className="px-12 py-6 bg-white text-teal-600 text-xl font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Integrations-Beratung anfragen
              </Link>
            </div>
          </SlideIn>
        </div>
      </section>
      </div>
    </div>
  );
}
