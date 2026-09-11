'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../../components/Navigation';
import {
  ArrowRight, Brain, Target, Zap, Users, Award, ChevronLeft,
  TrendingUp, Shield, Database, Cloud, Sparkles, Globe, Code
} from 'lucide-react';
import { useLanguage } from '../../components/QuantivaWebsite';

// Animation Components
function SlideIn({ children, direction = 'up', delay = 0, className = '' }: { children: React.ReactNode; direction?: 'up' | 'down' | 'left' | 'right'; delay?: number; className?: string }) {
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
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5, 
        rotateY: 5,
        scale: 1.05
      }}
      className="perspective-1000"
    >
      {children}
    </motion.div>
  );
}

function OrbitText({ children, radius = 100, delay = 0 }: { children: React.ReactNode; radius?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{ 
        rotate: 360
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="relative"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}

function CounterAnimation({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  React.useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function StrategyConsultingPage() {
  const { lang, localePath } = useLanguage();

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', href: localePath('/') },
    { id: 'about', label: 'About', href: localePath('/about') },
    { id: 'services', label: 'Services', href: localePath('/#services') },
    { id: 'cases', label: 'Cases', href: localePath('/cases') },
    { id: 'team', label: 'Team', href: localePath('/team') },
    { id: 'career', label: 'Career', href: localePath('/career') },
  ];

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // 3D Text Blocks
  const heroClaims = [
    "Strategy & Consulting",
    "Success is based on the right strategy."
  ];

  const valuePunchlines = [
    "From Vision to Impact.",
    "Think in Outcomes.",
    "Tech meets Business.",
    "Decide. Implement. Scale.",
    "Quantiva Advisory."
  ];

  const pillars = [
    { name: "Strategy", icon: Brain },
    { name: "Transformation", icon: Target },
    { name: "Cloud", icon: Cloud },
    { name: "Data & AI", icon: Database },
    { name: "ERP", icon: Code },
    { name: "Security", icon: Shield }
  ];

  const processSteps = [
    "Discover → Design → Validate → Scale",
    "Insights → Roadmap → Delivery → Impact"
  ];

  const impactMetrics = [
    { label: "Time-to-Value", value: "↓", color: "text-green-400" },
    { label: "Risk", value: "↓", color: "text-red-400" },
    { label: "ROI", value: "↑", color: "text-green-400" },
    { label: "Adoption", value: "↑", color: "text-blue-400" }
  ];

  const growthAreas = [
    { title: "Early Ownership", description: "Take responsibility early" },
    { title: "Mentoring & Certifications", description: "Learn from the best" },
    { title: "Lab Time & Innovation", description: "Experiment and develop" },
    { title: "Clear Career Path", description: "Consultant → Senior → Lead → Principal" }
  ];

  const techStack = [
    "SAP", "BTP", "Fiori", "ABAP",
    "Azure", "AWS", "GCP",
    "MLOps", "Data Mesh", "Integration"
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <Navigation lang={lang} items={navigationItems} />

      {/* Back Button */}
      <div className="absolute top-24 left-8 z-10">
        <motion.a
          href={localePath('/career')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Career
        </motion.a>
      </div>

      {/* Main Content */}
      <div className="relative bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          
          {/* Hero Section */}
          <div className="text-center mb-24">
            <SlideIn direction="up">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8">
                <Brain className="w-6 h-6 text-teal-400" />
                <span className="text-white font-semibold">Strategy & Consulting</span>
              </div>
            </SlideIn>

            {/* Hero Claims with 3D Animation */}
            <div className="space-y-6 mb-8">
              {heroClaims.map((claim, index) => (
                <FloatingText key={index} delay={index * 0.2}>
                  <motion.h1 
                    className={`text-white font-bold ${
                      index === 0 ? 'text-5xl md:text-7xl' : 
                      index === 1 ? 'text-3xl md:text-4xl' : 
                      'text-2xl md:text-3xl'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 20px rgba(20, 184, 166, 0.5)"
                    }}
                  >
                    {index === 0 ? (
                      <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {claim}
                      </span>
                    ) : (
                      claim
                    )}
                  </motion.h1>
                </FloatingText>
              ))}
            </div>

            {/* Value Punchlines - 3D Bubbles */}
            <SlideIn direction="up" delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                {valuePunchlines.map((punchline, index) => (
                  <motion.div
                    key={index}
                    className="group perspective-1000"
                    initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 15,
                      rotateX: 10,
                      y: -10
                    }}
                    animate={{
                      y: [0, -5, 0],
                      rotateY: [0, 2, 0],
                      rotateX: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* 3D Bubble Container */}
                    <div className="relative h-32 perspective-1000">
                      {/* Bubble Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Main Bubble */}
                      <div className="relative h-full w-full rounded-full bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/20 backdrop-blur-xl group-hover:border-teal-400/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/30 transform-gpu">
                        
                        {/* Inner Bubble Reflection */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60"></div>
                        
                        {/* Floating Particles Inside Bubble */}
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                          <motion.div
                            className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
                            animate={{
                              x: [0, 60, 0],
                              y: [0, -30, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                            style={{ top: '30%', left: '20%' }}
                          />
                          <motion.div
                            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                            animate={{
                              x: [0, -40, 0],
                              y: [0, 40, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                            style={{ top: '60%', right: '25%' }}
                          />
                          <motion.div
                            className="absolute w-1 h-1 bg-pink-400/40 rounded-full"
                            animate={{
                              x: [0, 30, 0],
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: index * 0.7
                            }}
                            style={{ top: '20%', right: '30%' }}
                          />
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 h-full flex items-center justify-center p-6">
                          <motion.p 
                            className="text-white font-bold text-sm md:text-base text-center leading-tight group-hover:text-teal-300 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {punchline}
                          </motion.p>
                        </div>

                        {/* Bubble Surface Highlights */}
                        <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-white/10 opacity-40"></div>
                        <div className="absolute bottom-3 right-1/3 w-1 h-1 rounded-full bg-white/20 opacity-60"></div>
                      </div>

                      {/* Outer Bubble Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-teal-400/20 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </SlideIn>
          </div>

          {/* Community & Impact Statistics */}
          <div className="mb-16">
            <SlideIn direction="up" delay={0.8}>
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Join a <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">thriving community</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Together we shape the future of digital transformation
                </p>
              </motion.div>
            </SlideIn>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "150+",
                  label: "Successful Projects",
                  description: "Delivered in the last 2 years",
                  color: "from-teal-400 to-cyan-400"
                },
                {
                  number: "50+",
                  label: "Happy Clients",
                  description: "From startups to enterprise",
                  color: "from-purple-400 to-pink-400"
                },
                {
                  number: "98%",
                  label: "Project Success Rate",
                  description: "On time and on budget",
                  color: "from-green-400 to-emerald-400"
                },
                {
                  number: "24/7",
                  label: "Support & Mentoring",
                  description: "For your personal development",
                  color: "from-orange-400 to-yellow-400"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Card Background */}
                  <div className="relative h-48 rounded-2xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/10 backdrop-blur-xl group-hover:border-teal-400/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/20 overflow-hidden">
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <motion.div
                        className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
                        animate={{
                          x: [0, 100, 0],
                          y: [0, -50, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                        style={{ top: '20%', left: '10%' }}
                      />
                      <motion.div
                        className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                        animate={{
                          x: [0, -80, 0],
                          y: [0, 60, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          delay: index * 0.7
                        }}
                        style={{ top: '60%', right: '15%' }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-center text-center">
                      <motion.div 
                        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {stat.number}
                      </motion.div>
                      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-teal-300 transition-colors">
                        {stat.label}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Combined Section: Pillars, Process & Impact */}
          <motion.div 
            className="-mt-8 mb-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Our <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Core Areas</span>
            </h2>

            {/* Three Column Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Pillars Column */}
              <SlideIn direction="left">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Our <span className="text-teal-400">Pillars</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pillars.map((pillar, index) => {
                      const Icon = pillar.icon;
                      return (
                        <motion.div
                          key={pillar.name}
                          className="group perspective-1000"
                          initial={{ opacity: 0, rotateX: -90, y: 50 }}
                          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                          }}
                          whileHover={{ 
                            rotateY: 15,
                            rotateX: 5,
                            y: -10,
                            scale: 1.05
                          }}
                        >
                          <div className="relative h-24 p-4 rounded-2xl bg-gradient-to-br from-black/40 via-black/20 to-black/40 border border-white/10 backdrop-blur-xl group-hover:border-teal-400/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-400/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-4 h-4 text-teal-400" />
                              </div>
                              <h4 className="text-white font-semibold text-xs group-hover:text-teal-300 transition-colors">
                                {pillar.name}
                              </h4>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </SlideIn>

              {/* Process Column */}
              <SlideIn direction="up">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Our <span className="text-purple-400">Process</span>
                  </h3>
                  <div className="space-y-4">
                    {processSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      >
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-black/40 via-black/20 to-black/40 border border-white/10 backdrop-blur-xl">
                          <div className="flex items-center space-x-3 text-white text-sm font-semibold">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <span>{step}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SlideIn>

              {/* Impact Column */}
              <SlideIn direction="right">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Measurable <span className="text-pink-400">Impact</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {impactMetrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="group text-center"
                        initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotateY: 10
                        }}
                      >
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-black/40 via-black/20 to-black/40 border border-white/10 backdrop-blur-xl group-hover:border-teal-400/30 transition-all duration-500">
                          <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                            {metric.value}
                          </div>
                          <h4 className="text-white font-semibold text-sm group-hover:text-teal-300 transition-colors">
                            {metric.label}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SlideIn>

            </div>
          </motion.div>


          {/* Development Journey - Modern 3D Experience */}
          <div className="mb-24">
            <SlideIn direction="up">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Your <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Development</span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  A structured path from Consultant to Principal – with mentoring, innovation, and clear career paths
                </motion.p>
              </div>
            </SlideIn>

            {/* Interactive Development Timeline */}
            <div className="relative">
              {/* Background Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
              
              {/* Development Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {growthAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    className="group perspective-1000"
                    initial={{ opacity: 0, y: 100, rotateX: -45 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 80
                    }}
                    whileHover={{ 
                      y: -20,
                      rotateY: 10,
                      rotateX: 5,
                      scale: 1.05,
                      transition: { duration: 0.4 }
                    }}
                  >
                    {/* Card Container */}
                    <div className="relative h-80 w-full">
                      
                      {/* Floating Background Elements */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <motion.div
                          className="absolute w-20 h-20 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-full blur-xl"
                          animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{ top: '10%', left: '10%' }}
                        />
                        <motion.div
                          className="absolute w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-lg"
                          animate={{
                            x: [0, -25, 0],
                            y: [0, 25, 0],
                            scale: [1, 0.8, 1],
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{
                            duration: 5 + index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{ bottom: '15%', right: '15%' }}
                        />
                      </div>

                      {/* Main Card */}
                      <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/10 backdrop-blur-xl group-hover:border-teal-400/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/30 transform-gpu overflow-hidden">
                        
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Progress Indicator */}
                        <div className="absolute top-6 left-6">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-400/40 flex items-center justify-center backdrop-blur-sm"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <span className="text-teal-400 font-bold text-lg">{index + 1}</span>
                          </motion.div>
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          {[...Array(3)].map((_, particleIndex) => (
                            <motion.div
                              key={particleIndex}
                              className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
                              animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 3 + particleIndex,
                                repeat: Infinity,
                                delay: particleIndex * 0.5
                              }}
                              style={{ 
                                top: `${20 + particleIndex * 30}%`, 
                                left: `${20 + particleIndex * 20}%` 
                              }}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-8">
                          
                          {/* Top Section */}
                          <div className="space-y-4">
                            <motion.h3 
                              className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              {area.title}
                            </motion.h3>
                            <motion.p 
                              className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              {area.description}
                            </motion.p>
                          </div>

                          {/* Bottom Section - Interactive Elements */}
                          <div className="space-y-4">
                            
                            {/* Skill Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-start text-xs text-gray-400 relative">
                                <span className="mr-4">{Math.min(100, (index + 1) * 25)}%</span>
                                <span>Progress</span>
                              </div>
                              <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                            </div>

                            {/* Action Button */}
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-full py-3 px-4 bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 rounded-xl text-center">
                                <span className="text-teal-400 font-semibold text-sm">Learn more</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Hover Arrow */}
                        <motion.div
                          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 text-teal-400" />
                        </motion.div>
                      </div>

                      {/* Connection Line to Next Card */}
                      {index < growthAreas.length - 1 && (
                        <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA Section */}
              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-pink-500/10 border border-teal-400/20 backdrop-blur-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready for your <span className="text-teal-400">Development?</span>
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Start your career at Quantiva Advisory and become part of a team that promotes innovation and growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href={localePath('/#contact')}
                      className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                    </motion.a>
                    <motion.a
                      href="mailto:careers@quantiva-advisory.com"
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get in Touch
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tech Stack - Tag Cloud */}
          <div className="mb-24">
            <SlideIn direction="up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
                Our <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Tech Stack</span>
              </h2>
            </SlideIn>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  className="group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotateZ: 5
                  }}
                >
                  <div className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 text-white font-semibold group-hover:border-teal-400/60 group-hover:bg-teal-500/30 transition-all duration-300">
                    {tech}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SlideIn direction="left">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                  <div className="relative rounded-3xl overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dbrisux8i/image/upload/v1760221491/generated-image_12_zvzgif.jpg"
                      alt="Strategy & Consulting Team"
                      width={600}
                      height={500}
                      className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                </div>
              </SlideIn>

              <SlideIn direction="right">
                <div className="space-y-8">
                  <div>
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      Strategy & <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Consulting</span>
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-gray-300 leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Success is based on the right strategy. Shape digital transformation with your knowledge and strategic thinking.
                    </motion.p>
                  </div>

                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-black/40 via-black/20 to-black/40 border border-white/10 backdrop-blur-xl">
                      <p className="text-gray-200 leading-relaxed">
                        At Quantiva Advisory, you accompany companies end-to-end – from vision to measurable implementation. As a Strategy Consultant, you develop market and technology roadmaps, translate business goals into sustainable target images, and steer transformation programs. In IT Consulting, you realize modern solutions in Cloud, Data & AI, and ERP – close to the customer, close to the result.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-transparent border border-teal-400/20 backdrop-blur-xl">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-teal-400" />
                        Your Development
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        Steep learning curve, mentoring by seniors, certifications, lab time for innovations, and clear career paths (Consultant → Senior → Lead → Principal). You take responsibility early, present to customers, set standards – and actively shape the Quantiva story.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.a
                      href={localePath('/#contact')}
                      className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 text-center"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                    </motion.a>
                    <motion.a
                      href="mailto:careers@quantiva-advisory.com"
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300 text-center"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get in Touch
                    </motion.a>
                  </motion.div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <SlideIn direction="up">
              <motion.div
                className="inline-block"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5
                }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 backdrop-blur-xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                      Consult. Build. Move.
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Become part of Quantiva Advisory and shape the digital future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <motion.a
                      href={localePath('/#contact')}
                      className="px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                    </motion.a>
                    <motion.a
                      href="mailto:careers@quantiva-advisory.com"
                      className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white text-lg font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get in Touch
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}
