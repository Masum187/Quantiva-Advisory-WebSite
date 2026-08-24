'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, ArrowLeft, CheckCircle, Cpu, Zap, Shield, Target } from 'lucide-react';
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

export default function AIServicePage() {
  const offerings = [
    {
      icon: Brain,
      title: 'AI Strategy & Consulting',
      description: 'Strategic consulting for your AI transformation',
      features: ['AI Readiness Assessment', 'Use Case Identification', 'ROI Analysis', 'Implementation Roadmap']
    },
    {
      icon: Cpu,
      title: 'Machine Learning Solutions',
      description: 'Development and implementation of ML models',
      features: ['Model Development', 'Data Preparation', 'Training & Validation', 'Model Deployment']
    },
    {
      icon: Zap,
      title: 'Generative AI & Automation',
      description: 'Modern AI applications for business processes',
      features: ['Chatbots & Virtual Assistants', 'Document Processing', 'Content Generation', 'Process Automation']
    },
    {
      icon: Shield,
      title: 'AI Governance & Ethics',
      description: 'Ethical AI and governance frameworks',
      features: ['AI Ethics Framework', 'Bias Detection', 'Explainable AI', 'Compliance & Auditing']
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Service Navigation */}
      <ServiceNavigation lang="en" serviceTitle="AI & Machine Learning" serviceId="ai" />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760346462/kling_20251012_Video_to_Audio__1718_0_ti4mch.mp4"]} />

      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 via-black/60 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <Link 
                href="/en"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Link>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-purple-300 text-sm font-semibold tracking-wider">AI & MACHINE LEARNING</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                AI & Machine{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Learning
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Intelligent automation, predictive analytics and AI-driven business processes. 
                We help you unlock the full potential of artificial intelligence.
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  AI Services
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional AI solutions for modern enterprises
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
                      <div className="w-16 h-16 rounded-2xl bg-purple-600/80 backdrop-blur-sm border border-purple-400/50 flex items-center justify-center shadow-lg">
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
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
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
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                AI Transformation?
              </span>
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Let&apos;s develop and successfully implement your AI strategy together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en#contact"
                className="px-10 py-5 bg-white text-purple-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Request AI Consulting
              </Link>
              <Link
                href="/en/capabilities/ai"
                className="px-10 py-5 bg-purple-500/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-xl hover:bg-purple-500/30 transition-all duration-300"
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
