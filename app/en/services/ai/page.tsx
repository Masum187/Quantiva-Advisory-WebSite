'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Brain, CheckCircle, Cpu, Zap, Shield, ArrowUpRight } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import WhitepaperCard from '../../../components/WhitepaperCard';
import VentureCanvas from '../../../components/pages/projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  PulseNode,
  ShineButton,
  SectionLabel,
  AccentOrbs,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#a78bfa';

const PIPELINE_STEPS = ['Discovery', 'Guardrails', 'MLOps', 'Evaluation'];

export default function AIServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      icon: Brain,
      title: 'Use Case Discovery',
      description: 'Structured identification of relevant AI use cases that create real value and prevent wasted resources.',
      features: ['Structured Discovery Process', 'Business Case Analysis', 'ROI Assessment', 'Pilot Fatigue Prevention'],
      details: 'Together with you, we identify relevant AI use cases that create real value. Our structured approach ensures clarity, prevents pilot fatigue, and helps you seize opportunities efficiently. Studies show that over 80% of AI pilot projects in the market fail to generate lasting business impact — only a structured process makes the difference.',
      benefits: ['Maximum value creation through AI', 'No wasted resources', 'Clear ROI forecasts', 'Strategic AI roadmap', 'Lasting business impact']
    },
    {
      icon: Shield,
      title: 'Guardrails & Compliance',
      description: 'Regulatory compliance for AI systems with intelligent compliance solutions based on international standards.',
      features: ['EU AI Act Compliance', 'ISO/IEC 42001', 'NIST AI RMF', 'Bias Detection & Fairness'],
      details: 'Meeting regulatory requirements for AI systems is becoming increasingly complex. With guardrails and intelligent compliance solutions, we ensure fairness, safety, and traceability of your AI — based on international standards such as the EU AI Act, ISO/IEC 42001, and NIST AI RMF.',
      benefits: ['Regulatory compliance', 'Ethical AI implementation', 'Transparent decisions', 'Risk minimization', 'Trustworthy AI systems']
    },
    {
      icon: Zap,
      title: 'MLOps & GenAI',
      description: 'Implementation of modern MLOps platforms for the full model lifecycle and Generative AI integration.',
      features: ['MLOps Platforms', 'Data Pipelines', 'Model Deployment', 'GenAI Integration'],
      details: 'We implement modern MLOps platforms that automate the entire model lifecycle — from data pipelines through deployment to governance. We take your AI from concept to production and ensure sustainability and scalability.',
      benefits: ['Automated ML pipelines', 'Generative AI integration', 'Reduced time-to-market', 'Scalable AI infrastructure', 'Sustainable AI workflows']
    },
    {
      icon: Cpu,
      title: 'Model Training & Evaluation',
      description: 'Development, training, and continuous evaluation of machine learning and GenAI models with a focus on reproducibility and performance.',
      features: ['Model Selection & Development', 'Training Pipelines', 'Performance Evaluation', 'Reproducibility & Transparency'],
      details: 'We support you in selecting, developing, and continuously evaluating machine learning and GenAI models. Our methods ensure reproducibility, transparency, and performance — even under strict compliance requirements.',
      benefits: ['Tailored ML models', 'Optimal performance', 'Reproducible results', 'Transparent model decisions', 'Continuous improvement']
    }
  ];

  // Downloadable whitepapers – delivered by e-mail via /api/whitepaper (Brevo),
  // PDF URLs live server-side in app/lib/data/whitepapers.ts.
  const whitepapers = [
    {
      title: 'AI Use Case Discovery Whitepaper (2025)',
      description: 'Strategies for identifying and implementing AI use cases, including market examples and a self-assessment for enterprises.',
      topic: 'Use Case Discovery',
      date: '2025',
      image: '/assets/whitepapers/ai/use-case-discovery.jpg',
      slug: 'ai-use-case-discovery'
    },
    {
      title: 'AI Compliance & Guardrails (2025)',
      description: 'Overview of regulatory requirements (EU AI Act, ISO 42001, NIST RMF) and current trends in AI governance.',
      topic: 'Compliance & Guardrails',
      date: '2025',
      image: '/assets/whitepapers/ai/compliance-guardrails.jpg',
      slug: 'ai-compliance-guardrails'
    },
    {
      title: 'MLOps & GenAI Summit Case Studies (2025)',
      description: 'Field reports and best practices on GenAI, MLOps, and agentic AI in practice. Lessons learned from successful implementations.',
      topic: 'MLOps & GenAI',
      date: '2025',
      image: '/assets/whitepapers/ai/mlops-genai.jpg',
      slug: 'ai-mlops-genai-cases'
    },
    {
      title: 'AI Use Case Success Factors (2025)',
      description: 'Analyses show: structured discovery processes are decisive for the business impact of AI projects and prevent wasted resources.',
      topic: 'Success Factors',
      date: '2025',
      image: '/assets/whitepapers/ai/success-factors.jpg',
      slug: 'ai-use-case-erfolgsfaktoren'
    },
    {
      title: 'EU AI Act Implementation Guide (2025)',
      description: 'Practical guidance for implementing EU AI Act requirements in enterprises. Compliance framework and best practices.',
      topic: 'EU AI Act',
      date: '2025',
      image: '/assets/whitepapers/ai/eu-ai-act.jpg',
      slug: 'ai-eu-ai-act-guide'
    },
    {
      title: 'Generative AI Business Impact Study (2025)',
      description: 'Comprehensive study on the business impact of Generative AI across industries and application areas.',
      topic: 'GenAI Impact',
      date: '2025',
      image: '/assets/whitepapers/ai/genai-impact.jpg',
      slug: 'ai-genai-business-impact'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Service Navigation */}
      <ServiceNavigation lang="en" serviceTitle="AI & Machine Learning" serviceId="ai" />

      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          src="https://res.cloudinary.com/dbrisux8i/video/upload/v1760346462/kling_20251012_Video_to_Audio__1718_0_ti4mch.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Minimal Video Overlay - Only for text readability */}
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ---------- Hero: Neural Grid ---------- */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
          {/* Neural canvas layer over the video */}
          <VentureCanvas
            effect="network"
            accent={ACCENT}
            className="pointer-events-none absolute inset-0 opacity-40"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%), linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 40%, rgba(0,0,0,0.75))',
            }}
          />

          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border px-6 py-2.5 backdrop-blur-sm"
              style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}12` }}
            >
              <Brain className="h-5 w-5" style={{ color: ACCENT }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                Neural Grid — AI Services
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              <span className="block">
                <LetterHeadline text="AI & Machine" />
              </span>
              <span className="block" style={{ color: ACCENT }}>
                <LetterHeadline text="Learning" delay={0.9} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.7, ease: EASE }}
              className="mx-auto mt-8 max-w-3xl text-[clamp(1.05rem,2.2vw,1.4rem)] font-light leading-relaxed text-gray-200"
            >
              End-to-end consulting for modern AI use cases across the entire lifecycle – from
              use case discovery, through guardrails & compliance, to MLOps, GenAI, model
              training & evaluation.
            </motion.p>
          </div>
        </section>

        {/* ---------- 01 — Offerings: Bento Grid ---------- */}
        <section className="relative overflow-hidden bg-black/75 px-6 py-24 backdrop-blur-sm md:px-12 md:py-36">
          <AccentOrbs accent={ACCENT} />
          <div className="relative mx-auto max-w-7xl">
            <SectionLabel num="01" accent={ACCENT}>
              AI Services
            </SectionLabel>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
              <MaskedHeadline text="Our AI Services" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Professional AI solutions for modern enterprises
            </motion.p>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                const span = index === 0 ? 'md:col-span-2' : '';
                return (
                  <motion.div
                    key={offering.title}
                    className={span}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: EASE }}
                  >
                    <SpotlightCard
                      accent={ACCENT}
                      className="h-full rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-md transition-colors duration-500 hover:border-white/25 md:p-10"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                          style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}
                        >
                          <Icon className="h-7 w-7" style={{ color: ACCENT }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{offering.title}</h3>
                          <p className="mt-3 leading-relaxed text-gray-300">{offering.description}</p>
                          <p className="mt-3 text-sm leading-relaxed text-gray-400">{offering.details}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {offering.features.map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-gray-300"
                                style={{ borderColor: `${ACCENT}33`, background: `${ACCENT}0a` }}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          <ul className="mt-5 space-y-2">
                            {offering.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-3 text-sm text-gray-200">
                                <CheckCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- 02 — Model Pipeline ---------- */}
        <section className="relative bg-black/80 px-6 py-24 backdrop-blur-sm md:px-12 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionLabel num="02" accent={ACCENT}>
              Model Pipeline
            </SectionLabel>
            <h2 className="mt-8 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-white">
              <MaskedHeadline text="From Use Case to Production" />
            </h2>

            <div className="relative mt-16">
              {/* Animated gradient connector line (desktop) */}
              <motion.div
                aria-hidden="true"
                className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] origin-left md:block"
                style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}22)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE }}
              />
              {/* Vertical connector (mobile) */}
              <motion.div
                aria-hidden="true"
                className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top md:hidden"
                style={{ background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}22)` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE }}
              />

              <div className="grid gap-10 md:grid-cols-4 md:gap-6">
                {PIPELINE_STEPS.map((step, index) => (
                  <motion.div
                    key={step}
                    className="flex items-start gap-4 md:flex-col md:gap-5"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.18, ease: EASE }}
                  >
                    <PulseNode index={index} accent={ACCENT} />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                        Phase {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">{step}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
                        {offerings[index].title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 03 — Manifesto (ScrollStatement, after the offerings) ---------- */}
        <section className="relative bg-black/70 px-6 py-28 backdrop-blur-sm md:px-12 md:py-40">
          <div className="mx-auto max-w-5xl">
            <SectionLabel num="03" accent={ACCENT}>
              Manifesto
            </SectionLabel>
            <div className="mt-10">
              <ScrollStatement text="As an innovative consulting firm, we guide organizations to the successful delivery of AI projects. Our structured approach ensures clarity, prevents pilot fatigue, and helps you seize opportunities efficiently." />
            </div>
          </div>
        </section>

        {/* ---------- 04 — Studies & Whitepapers ---------- */}
        <section className="relative bg-black/80 px-6 py-24 backdrop-blur-sm md:px-12 md:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionLabel num="04" accent={ACCENT}>
              Insights
            </SectionLabel>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
              <MaskedHeadline text="Latest Studies & Whitepapers" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Research-backed insights and practical guides for successful
              AI implementations
            </motion.p>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whitepapers.map((wp, index) => (
                <motion.div
                  key={wp.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
                >
                  <WhitepaperCard
                    title={wp.title}
                    description={wp.description}
                    topic={wp.topic}
                    date={wp.date}
                    image={wp.image}
                    slug={wp.slug}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 05 — CTA ---------- */}
        <section className="relative overflow-hidden border-t border-white/10 bg-black/85 px-6 py-28 backdrop-blur-sm md:px-12 md:py-40">
          <AccentOrbs accent={ACCENT} />
          <div className="relative mx-auto max-w-4xl text-center">
            <SectionLabel num="05" accent={ACCENT}>
              Contact
            </SectionLabel>
            <h2 className="mt-8 text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              <MaskedHeadline text="Ready for AI transformation?" className="inline-block" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Let&apos;s develop your AI strategy together and execute it successfully.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="mt-12 flex justify-center"
            >
              <ShineButton href="/en#contact" accent={ACCENT}>
                Request AI consulting
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
