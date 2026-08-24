'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cloud, ArrowLeft, CheckCircle, Server, Zap, Shield } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
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

export default function CloudServicePage() {
  const offerings = [
    {
      icon: Cloud,
      title: 'Cloud Strategy & Assessment',
      description: 'Strategische Planung und Bewertung Ihrer Cloud-Transformation',
      features: ['Cloud Readiness Assessment', 'Multi-Cloud Strategy', 'Cost Optimization', 'Migration Planning']
    },
    {
      icon: Server,
      title: 'Cloud Migration Services',
      description: 'Professionelle Migration Ihrer Workloads in die Cloud',
      features: ['Lift & Shift Migration', 'Replatforming', 'Refactoring', 'Data Migration']
    },
    {
      icon: Zap,
      title: 'Cloud Native Development',
      description: 'Entwicklung cloud-nativer Anwendungen und Microservices',
      features: ['Container Orchestration', 'Serverless Computing', 'DevOps Pipelines', 'Auto Scaling']
    },
    {
      icon: Shield,
      title: 'Cloud Security & Compliance',
      description: 'Umfassende Sicherheitskonzepte für Cloud-Umgebungen',
      features: ['Identity & Access Management', 'Data Protection', 'Security Monitoring', 'Compliance Auditing']
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Service Navigation */}
      <ServiceNavigation lang="de" serviceTitle="Cloud Solutions" serviceId="cloud" />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760346430/kling_20251009_Image_to_Video_A_confiden_4908_0_bimwvi.mp4"]} />

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-900/20 via-black/60 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <Link 
                href="/de"
                className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Hauptseite
              </Link>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 mb-8">
                <Cloud className="w-6 h-6 text-sky-400" />
                <span className="text-sky-300 text-sm font-semibold tracking-wider">CLOUD SOLUTIONS</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Cloud{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                  Solutions
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                AWS, Azure, GCP - Multi-Cloud-Strategien, Migration und Optimierung Ihrer Cloud-Infrastruktur. 
                Wir helfen Ihnen dabei, das volle Potenzial der Cloud zu nutzen.
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                  Cloud-Dienstleistungen
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professionelle Cloud-Lösungen für moderne Unternehmen
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <SlideIn key={index} delay={index * 0.1}>
                  <motion.div
                    className="p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/30 hover:border-white/50 transition-all duration-300 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-sky-600/80 backdrop-blur-sm border border-sky-400/50 flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{offering.title}</h3>
                    </div>

                    <p className="text-gray-100 mb-6 leading-relaxed font-medium">
                      {offering.description}
                    </p>

                    <div className="space-y-3">
                      {offering.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-sky-400 flex-shrink-0" />
                          <span className="text-gray-100 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Bereit für die{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Cloud-Zukunft?
              </span>
            </h2>
            <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Cloud-Strategie entwickeln und erfolgreich umsetzen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/de#contact"
                className="px-10 py-5 bg-white text-sky-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Cloud-Beratung anfragen
              </Link>
              <Link
                href="/de/capabilities/cloud"
                className="px-10 py-5 bg-sky-500/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-xl hover:bg-sky-500/30 transition-all duration-300"
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
