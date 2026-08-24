'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Shield
} from 'lucide-react';
import IndustriesSection from '../../components/sections/IndustriesSection';

// Animation Component
function SlideIn({ children, direction = 'up', delay = 0 }: { children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
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
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// Expandable Section Component
function ExpandableSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="border-b border-purple-500/20 overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group hover:bg-purple-500/5 transition-colors px-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-8 pt-2 text-gray-300 leading-relaxed">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutPage() {
  const stats = [
    { value: '15+', label: 'Years of Experience', icon: Award },
    { value: '200+', label: 'Successful Projects', icon: Target },
    { value: '50+', label: 'Happy Clients', icon: Heart },
    { value: '100%', label: 'Commitment', icon: Zap },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue the highest quality in everything we do. From initial consultation to final implementation - excellence is our standard.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We see ourselves as partners to our clients, not just service providers. Together we develop solutions that create sustainable value.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Technology evolves rapidly. We stay at the forefront and bring the latest innovations to your organization - practical and actionable.',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Your data, your processes, your future - we treat everything with the utmost confidentiality and professionalism. Trust is the foundation of our collaboration.',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero Section with Illustration */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.4) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <SlideIn direction="left">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  {/* Quantiva Logo */}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Q</span>
                  </div>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  This is{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                    Us
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Every day, we shape the digital future of our clients. With expertise in SAP, Cloud and AI, 
                  we create sustainable value creation across all areas of digital transformation.
                </p>

                <div className="flex gap-4">
                  <Link
                    href="/en/career"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                  >
                    Join Our Team
                  </Link>
                  <Link
                    href="/en/team"
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Our Team
                  </Link>
                </div>
              </div>
            </SlideIn>

            {/* Right: Illustration/Image */}
            <SlideIn direction="right" delay={0.2}>
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
                
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden border border-purple-500/20">
                  <Image
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80"
      alt="Team Collaboration"
      width={800}
      height={600}
      className="w-full h-[500px] object-cover"
    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Stats */}
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-8 right-8 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6"
                  >
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">15+</p>
                    <p className="text-sm text-gray-300 mt-1">Years of Excellence</p>
                  </motion.div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-900/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <SlideIn key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-400/60 transition-all">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </motion.div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We believe in a future where technology empowers people and transforms businesses
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 gap-8">
            <SlideIn direction="left">
              <div className="h-full p-10 rounded-3xl bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Mission</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We empower organizations to successfully master their digital transformation. 
                  Through cutting-edge technology, deep expertise, and genuine partnership, we create 
                  sustainable value and competitive advantages.
                </p>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="h-full p-10 rounded-3xl bg-gradient-to-br from-teal-900/30 to-teal-800/20 border border-teal-500/30 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Vision</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We aspire to become the most trusted partner for digital transformation 
                  in the DACH region. A future where innovation and human expertise 
                  go hand in hand.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values - Expandable Sections */}
      <section className="py-24 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Values & Principles
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                What drives us and how we work
              </p>
            </div>
          </SlideIn>

          <div className="space-y-2 bg-black/40 backdrop-blur-sm rounded-3xl border border-purple-500/20 overflow-hidden">
            <ExpandableSection title="Excellence" icon={Award} defaultOpen={true}>
              <p className="mb-4">
                Excellence is not a destination, but a journey. We strive for the highest quality 
                in every project, at every interaction. This means:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Best practices from over 15 years of project experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Continuous quality assurance at all levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Certified experts with deep domain knowledge</span>
                </li>
              </ul>
            </ExpandableSection>

            <ExpandableSection title="Innovation" icon={Sparkles}>
              <p className="mb-4">
                Technology evolves rapidly. We stay at the forefront and bring the latest 
                innovations to your organization:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>Cloud-native architectures and microservices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>AI and Machine Learning integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>Modern DevOps and CI/CD pipelines</span>
                </li>
              </ul>
            </ExpandableSection>

            <ExpandableSection title="Partnership" icon={Users}>
              <p className="mb-4">
                We see ourselves as true partners to our clients. This means long-term 
                relationships on equal footing:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Transparent communication at all levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Shared goal setting and success metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Long-term support beyond the project</span>
                </li>
              </ul>
            </ExpandableSection>

            <ExpandableSection title="Sustainability" icon={Globe}>
              <p className="mb-4">
                Digital transformation must be sustainable - technologically, economically, and ecologically:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>Green IT and energy-efficient cloud solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>Durable architectures instead of quick fixes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-400 mt-1">✓</span>
                  <span>Knowledge transfer and enablement of your teams</span>
                </li>
              </ul>
            </ExpandableSection>
          </div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="py-24 bg-gradient-to-br from-purple-900/20 via-black to-teal-900/20 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
                <Image
      src="https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg"
      alt="Gülnur Patan - CEO"
      width={800}
      height={600}
      className="relative rounded-3xl w-full h-[600px] object-cover border border-purple-500/20"
    />
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="relative">
                <div className="text-8xl text-purple-500/20 font-serif mb-4">&ldquo;</div>
                <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8">
                  Digital transformation is more than technology – it&apos;s the art of bringing people, 
                  processes, and innovation into harmony to create sustainable value.
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-teal-500 rounded-full"></div>
                  <div>
                    <p className="text-xl font-bold text-white">Gülnur Patan</p>
                    <p className="text-purple-400">CEO & Founder, Quantiva Advisory</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      <IndustriesSection lang="en" />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900/30 via-black to-teal-900/30 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideIn>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let&apos;s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                shape
              </span>{' '}
              your future together
            </motion.h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready for your digital transformation? Contact us for a non-binding consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en#contact"
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
              >
                Contact Us Now
              </Link>
              <Link
                href="/en/cases"
                className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Success Stories
              </Link>
            </div>
          </SlideIn>
        </div>
      </section>
    </div>
  );
}
