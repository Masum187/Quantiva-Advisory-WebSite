'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import { 
  ChevronDown, 
  Target, 
  Sparkles, 
  Users, 
  Globe, 
  TrendingUp,
  Award,
  Heart,
  Zap,
  Shield,
  Play,
  X,
  Quote,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import IndustriesSection from '../../components/sections/IndustriesSection';

// Animation Component
function SlideIn({ children, direction = 'up', delay = 0 }: { children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{
        delay,
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const values = [
    {
      title: 'Innovation',
      description: 'Wir treiben digitale Transformation durch innovative Technologien und zukunftsorientierte Lösungen voran.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      details: [
        'KI und Machine Learning Integration',
        'Cloud-native Architekturen',
        'Agile Entwicklungsmethoden',
        'Continuous Innovation Culture'
      ]
    },
    {
      title: 'Excellence',
      description: 'Höchste Qualitätsstandards in allem, was wir tun - von der Beratung bis zur Implementierung.',
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'ISO 27001 zertifizierte Prozesse',
        'Best Practice Implementierung',
        'Qualitätssicherung auf allen Ebenen',
        'Kontinuierliche Verbesserung'
      ]
    },
    {
      title: 'Partnerschaft',
      description: 'Wir verstehen uns als langfristige Partner, die gemeinsam mit Ihnen nachhaltigen Erfolg schaffen.',
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      details: [
        'Langfristige Kundenbeziehungen',
        'Transparente Kommunikation',
        'Gemeinsame Zielsetzung',
        'Vertrauensvolle Zusammenarbeit'
      ]
    },
    {
      title: 'Nachhaltigkeit',
      description: 'Verantwortungsvolle Technologie-Entscheidungen für eine nachhaltige digitale Zukunft.',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      details: [
        'Green IT Lösungen',
        'CO2-neutrale Cloud-Strategien',
        'Ethische KI-Entwicklung',
        'Nachhaltige Geschäftsmodelle'
      ]
    }
  ];

  const stats = [
    { value: '15+', label: 'Jahre Erfahrung', icon: TrendingUp },
    { value: '200+', label: 'Erfolgreiche Projekte', icon: Target },
    { value: '50+', label: 'Zufriedene Kunden', icon: Users },
    { value: '99%', label: 'Projekt-Erfolgsrate', icon: Award },
  ];

  const leadershipQuote = {
    text: "Bei Quantiva Advisory verbinden wir technologische Expertise mit strategischer Weitsicht. Unser Ziel ist es, Unternehmen dabei zu unterstützen, ihre digitale Zukunft erfolgreich zu gestalten.",
    author: "Gülnur Patan",
    role: "CEO & Gründerin"
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Navigation */}
      <Navigation lang="de" items={navigationItems} />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <SlideIn direction="left">
              <div>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                  <span className="text-white font-semibold">Das sind Wir</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Die Zukunft der <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">digitalen Transformation</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Quantiva Advisory ist Ihr strategischer Partner für digitale Innovation. 
                  Wir verbinden technologische Expertise mit unternehmerischer Weitsicht, 
                  um nachhaltigen Erfolg zu schaffen.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/de#services"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                  >
                    Unsere Services
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => setShowAvatar(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    CEO Video
                  </button>
                </div>
              </div>
            </SlideIn>

            {/* Right: Illustration */}
            <SlideIn direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <stat.icon className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Mission & Vision
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Unsere Mission ist es, Unternehmen dabei zu unterstützen, ihre digitale Zukunft erfolgreich zu gestalten.
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 gap-8">
            <SlideIn direction="left" delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Unsere Mission</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Wir schaffen nachhaltige digitale Lösungen, die Unternehmen dabei unterstützen, 
                    ihre Geschäftsziele zu erreichen und sich erfolgreich in der digitalen Wirtschaft zu positionieren.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-300">Strategische Beratung</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-300">Technische Umsetzung</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-300">Nachhaltige Transformation</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.4}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Unsere Vision</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Eine Welt, in der jedes Unternehmen die Kraft der digitalen Transformation nutzen kann, 
                    um nachhaltigen Erfolg zu schaffen und positive Veränderungen zu bewirken.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Digitale Inklusion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Nachhaltige Innovation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Globale Zusammenarbeit</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-br from-slate-900/50 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Werte & Prinzipien
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Unsere Werte bilden das Fundament unserer Arbeit und prägen jeden Aspekt unserer Zusammenarbeit.
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <SlideIn key={index} direction="up" delay={index * 0.1}>
                <motion.div
                  className="group relative h-80 cursor-pointer"
                  onClick={() => toggleSection(value.title)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-3xl p-6 border border-white/10 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{value.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                      {value.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {expandedSection === value.title ? 'Weniger anzeigen' : 'Mehr erfahren'}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                          expandedSection === value.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </motion.div>
              </SlideIn>
            ))}
          </div>

          {/* Expanded Content */}
          {expandedSection && (
            <SlideIn direction="up" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                    values.find(v => v.title === expandedSection)?.color
                  } flex items-center justify-center`}>
                    {React.createElement(values.find(v => v.title === expandedSection)?.icon || Sparkles, { className: "w-6 h-6 text-white" })}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{expandedSection}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {values.find(v => v.title === expandedSection)?.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </SlideIn>
          )}
        </div>
      </div>

      <IndustriesSection lang="de" />

      {/* Leadership Quote Section */}
      <div className="py-20 bg-gradient-to-br from-teal-900/20 via-black to-purple-900/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn direction="up">
            <div className="relative">
              <Quote className="w-16 h-16 text-teal-400/30 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
                &ldquo;{leadershipQuote.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-teal-400/30">
                  <Image
                    src="https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg"
                    alt={leadershipQuote.author}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">{leadershipQuote.author}</div>
                  <div className="text-teal-400">{leadershipQuote.role}</div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bereit für die digitale Zukunft?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Lassen Sie uns gemeinsam Ihre digitale Transformation gestalten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/de#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Jetzt Kontakt aufnehmen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/de/cases"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Unsere Projekte
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* CEO Avatar Modal */}
      {showAvatar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAvatar(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-2xl w-full border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAvatar(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-teal-400/30 mb-6">
                <Image
                  src="https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg"
                  alt="Gülnur Patan"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gülnur Patan</h3>
              <p className="text-teal-400 font-semibold mb-6">CEO & Gründerin</p>
              <div className="bg-white/5 rounded-2xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  &ldquo;Willkommen bei Quantiva Advisory! Ich freue mich, Ihnen unsere Vision der digitalen Transformation 
                  zu präsentieren. Gemeinsam schaffen wir nachhaltige Lösungen für Ihre Zukunft.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}