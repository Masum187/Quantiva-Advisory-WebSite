'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, ArrowLeft, CheckCircle, Lock, Eye, AlertTriangle, Search } from 'lucide-react';
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

export default function CyberSecurityServicePage() {
  const offerings = [
    {
      icon: Shield,
      title: 'Cybersecurity Strategy',
      description: 'Comprehensive security strategies for your organization',
      features: ['Security Assessment', 'Risk Analysis', 'Compliance Planning', 'Security Roadmap']
    },
    {
      icon: Lock,
      title: 'Identity & Access Management',
      description: 'Modern IAM solutions and Zero Trust architectures',
      features: ['Multi-Factor Authentication', 'Role-Based Access Control', 'Privileged Access Management', 'Single Sign-On']
    },
    {
      icon: Eye,
      title: 'Security Monitoring & SIEM',
      description: '24/7 monitoring and incident response',
      features: ['Security Information Management', 'Threat Detection', 'Incident Response', 'Forensic Analysis']
    },
    {
      icon: AlertTriangle,
      title: 'Compliance & Auditing',
      description: 'Adherence to security standards and regulations',
      features: ['ISO 27001', 'GDPR Compliance', 'Security Audits', 'Penetration Testing']
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Service Navigation */}
      <ServiceNavigation lang="en" serviceTitle="Cyber Security" serviceId="security" />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760385739/kling_20251014_Text_to_Video_Scene_1__M_930_0_1_djdrj2.mp4"]} />

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-900/20 via-black/60 to-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <Link 
                href="/en"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Link>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-8">
                <Shield className="w-6 h-6 text-red-400" />
                <span className="text-red-300 text-sm font-semibold tracking-wider">CYBER SECURITY</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Cyber{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Security
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Comprehensive security concepts, compliance and risk management. 
                We protect your digital assets and ensure the security of your IT infrastructure.
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
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Security Services
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional cyber security for modern enterprises
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
                      <div className="w-16 h-16 rounded-2xl bg-red-600/80 backdrop-blur-sm border border-red-400/50 flex items-center justify-center shadow-lg">
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
                          <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
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
      <section className="py-24 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
                Maximum Security?
              </span>
            </h2>
            <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto">
              Let&apos;s develop and successfully implement your cyber security strategy together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en#contact"
                className="px-10 py-5 bg-white text-red-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Request Security Consulting
              </Link>
              <Link
                href="/en/capabilities/cyber-security"
                className="px-10 py-5 bg-red-500/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-xl hover:bg-red-500/30 transition-all duration-300"
              >
                Technical Details →
              </Link>
            </div>
          </SlideIn>
        </div>
      </section>
      </div>
    </div>
  );
}
