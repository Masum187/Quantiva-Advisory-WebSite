'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CareerCardMedia from '../CareerCardMedia';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../Navigation';
import {
  ChevronRight, ArrowRight, Users, Heart, TrendingUp,
  GraduationCap, Lightbulb, Target, Award, Shield, Sparkles,
  Brain, Cloud, Code, Database, Globe, Zap, Menu, X, BriefcaseIcon
} from 'lucide-react';
import { useLanguage } from '../QuantivaWebsite';
import type { JobListing } from '../../lib/utils/jobs';
import ContactForm from '../ContactForm';
import { AnimatePresence } from 'framer-motion';
import { SpotlightCard, GhostNumber, SectionLabel, EASE as CAREER_EASE } from './projects/detail/shared';

// Gemeinsamer Teal-Akzent (wie Startseite/Navigation)
const CAREER_ACCENT = '#2dd4bf';

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

function StaggerSlideIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.1 }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Career Levels Grid – große Bildkarten mit Spotlight-Hover (Redesign)
// Ambient-Loop-Videos mit den bisherigen Bildern als Poster-Fallback
const CAREER_LEVEL_MEDIA = [
  {
    slug: 'students',
    poster: '/assets/career/levels/students-poster.jpg',
    video: '/assets/career/levels/students.mp4',
  },
  {
    slug: 'graduates',
    poster: '/assets/career/levels/graduates-poster.jpg',
    video: '/assets/career/levels/graduates.mp4',
  },
  {
    slug: 'professionals',
    poster: '/assets/career/levels/professionals-poster.jpg',
    video: '/assets/career/levels/professionals.mp4',
  },
  {
    slug: 'leaders',
    poster: '/assets/career/levels/leaders-poster.jpg',
    video: '/assets/career/levels/leaders.mp4',
  },
] as const;

function CareerLevelCard({
  level,
  index,
  ctaText,
  href,
}: {
  level: { title: string; description: string };
  index: number;
  ctaText: string;
  href: string;
}) {
  const media = CAREER_LEVEL_MEDIA[index % CAREER_LEVEL_MEDIA.length];
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: CAREER_EASE }}
    >
      <Link
        href={href}
        onMouseMove={onMouseMove}
        className="group relative block h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-teal-400/40 md:h-[440px]"
      >
        <div className="absolute inset-0">
          <CareerCardMedia
            image={media.poster}
            video={media.video}
            alt={level.title}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        {/* Mouse-follow glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(45,212,191,0.14) 0%, transparent 65%)',
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-end p-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {level.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300">
            {level.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition-colors duration-300 group-hover:text-teal-300">
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function CareerLevelsGrid({ levels, lang }: { levels: { title: string; description: string }[]; lang: string }) {
  const ctas = [
    lang === 'de' ? 'Praktika entdecken' : 'Discover Internships',
    lang === 'de' ? 'Einstiegsprogramme' : 'Entry Programs',
    lang === 'de' ? 'Karrierewege' : 'Career Paths',
    lang === 'de' ? 'Leadership-Programme' : 'Leadership Programs',
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {levels.map((level, index) => {
        const media = CAREER_LEVEL_MEDIA[index % CAREER_LEVEL_MEDIA.length];
        return (
          <CareerLevelCard
            key={level.title}
            level={level}
            index={index}
            ctaText={ctas[index % ctas.length]}
            href={`/${lang}/career/${media.slug}`}
          />
        );
      })}
    </div>
  );
}

// ElevenLabs Premium Voices Configuration
const ELEVENLABS_VOICES = {
  de: [
    { id: 'jccKWdITZiywXGZfLmCo', name: 'Career Voice (Deutsch)', gender: 'female', description: 'Professionell, motivierend' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Deutsch)', gender: 'female', description: 'Warm, professionell' },
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Deutsch)', gender: 'male', description: 'Tief, autoritativ' },
    { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel (Deutsch)', gender: 'male', description: 'Klar, freundlich' },
  ],
  en: [
    { id: 'jccKWdITZiywXGZfLmCo', name: 'Career Voice (English)', gender: 'female', description: 'Professional, motivating' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (English)', gender: 'female', description: 'Warm, professional' },
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (English)', gender: 'male', description: 'Deep, authoritative' },
    { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel (English)', gender: 'male', description: 'Clear, friendly' },
  ],
};

export default function CareerPage({ jobs = [] }: { jobs?: JobListing[] }) {
  const { lang, localePath } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const jobListings = jobs;
  const jobLoading = false;
  const jobError = null;
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [seniorityFilter, setSeniorityFilter] = useState<string>('all');
  const [remoteFilter, setRemoteFilter] = useState<string>('all');

  const handleJobApply = async (job: JobListing) => {
    setSelectedJob(job);
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const matchesSearch = `${job.title} ${job.description}`.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
      const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
      const matchesSeniority = seniorityFilter === 'all' || job.seniority === seniorityFilter;
      const matchesRemote = remoteFilter === 'all' || 
        (remoteFilter === 'remote' && job.remote) ||
        (remoteFilter === 'onsite' && !job.remote);
      
      return matchesSearch && matchesLocation && matchesDepartment && matchesSeniority && matchesRemote;
    });
  }, [jobListings, searchQuery, locationFilter, departmentFilter, seniorityFilter, remoteFilter]);

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const locations = new Set<string>();
    const departments = new Set<string>();
    const seniorities = new Set<string>();
    
    jobListings.forEach((job) => {
      if (job.location) locations.add(job.location);
      if (job.department) departments.add(job.department);
      if (job.seniority) seniorities.add(job.seniority);
    });
    
    return {
      locations: Array.from(locations).sort(),
      departments: Array.from(departments).sort(),
      seniorities: Array.from(seniorities).sort(),
    };
  }, [jobListings]);

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', href: localePath('/') },
    { id: 'about', label: lang === 'de' ? 'Über uns' : 'About', href: localePath('/about') },
    { id: 'services', label: 'Services', href: localePath('/#services') },
    { id: 'cases', label: lang === 'de' ? 'Projekte' : 'Cases', href: localePath('/cases') },
    { id: 'team', label: 'Team', href: localePath('/team') },
    { id: 'career', label: lang === 'de' ? 'Karriere' : 'Career', href: localePath('/career') },
  ];
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showVoiceButton, setShowVoiceButton] = useState(true);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(0.95);
  const [pitch, setPitch] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [useElevenLabs, setUseElevenLabs] = useState(true);
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [selectedElevenLabsVoice, setSelectedElevenLabsVoice] = useState('jccKWdITZiywXGZfLmCo');
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroVideoRef = React.useRef<HTMLVideoElement>(null);
  const [heroMuted, setHeroMuted] = useState(true);

  const toggleHeroSound = () => {
    const el = heroVideoRef.current;
    if (!el) return;
    if (heroMuted) {
      el.currentTime = 0;
      el.muted = false;
      setHeroMuted(false);
      void el.play();
    } else {
      el.muted = true;
      setHeroMuted(true);
    }
  };

  React.useEffect(() => {
    const el = heroVideoRef.current;
    if (!el || !reduceMotion) return;
    el.pause();
  }, [reduceMotion]);

  // Load available voices
  React.useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const filtered = voices.filter(voice => 
        voice.lang.startsWith(lang === 'de' ? 'de' : 'en')
      );
      setAvailableVoices(filtered);
      if (filtered.length > 0 && !selectedVoice) {
        setSelectedVoice(filtered[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [lang, selectedVoice]);

  // ElevenLabs Premium Voice Function
  const speakWithElevenLabs = async (text: string) => {
    try {
      setIsVoicePlaying(true);
      
      // Use environment variable (production), user's key, or fallback to browser TTS
      const apiKey = process.env.ELEVENLABS_KEY || elevenLabsKey;
      
      console.log('ElevenLabs Debug:', {
        hasEnvKey: !!process.env.ELEVENLABS_KEY,
        hasUserKey: !!elevenLabsKey,
        voiceId: selectedElevenLabsVoice,
        apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : 'none'
      });
      
      // Check if API key is available
      if (!apiKey) {
        console.warn('No ElevenLabs API key found, falling back to browser TTS');
        speakWithBrowserTTS(text);
        return;
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedElevenLabsVoice}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.5,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          voiceId: selectedElevenLabsVoice,
          apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : 'none'
        });
        throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.volume = volume;
      
      // Simulate word-by-word captions based on audio duration
      const words = text.split(' ');
      const totalDuration = 5000; // Estimate ~5 seconds
      const wordDelay = totalDuration / words.length;
      
      let wordIndex = 0;
      const captionInterval = setInterval(() => {
        if (wordIndex < words.length) {
          setCurrentWord(words[wordIndex]);
          wordIndex++;
        } else {
          clearInterval(captionInterval);
        }
      }, wordDelay);
      
      audio.onended = () => {
        setIsVoicePlaying(false);
        setCurrentWord('');
        setShowVoiceButton(false);
        clearInterval(captionInterval);
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('ElevenLabs error, falling back to browser TTS:', error);
      // Fallback to browser TTS
      speakWithBrowserTTS(text);
    }
  };

  // Browser TTS Fallback
  const speakWithBrowserTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.lang = lang === 'de' ? 'de-DE' : 'en-US';
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      const words = text.split(' ');
      let wordIndex = 0;
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          if (wordIndex < words.length) {
            setCurrentWord(words[wordIndex]);
            wordIndex++;
          }
        }
      };
      
      utterance.onstart = () => setIsVoicePlaying(true);
      utterance.onend = () => {
        setIsVoicePlaying(false);
        setCurrentWord('');
        setShowVoiceButton(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert(lang === 'de' 
        ? 'Text-to-Speech wird in diesem Browser nicht unterstützt.' 
        : 'Text-to-Speech is not supported in this browser.');
    }
  };

  // Main speak function - chooses between ElevenLabs or Browser TTS
  const speakMessage = () => {
    const text = lang === 'de' 
      ? "Du bist derjenige, der dieses Unternehmen mitgestalten kann. Zögere nicht so lange und bewirb dich jetzt!"
      : "You are the one who can help shape this company. Don't hesitate any longer and apply now!";
    
    if (useElevenLabs) {
      speakWithElevenLabs(text);
    } else {
      speakWithBrowserTTS(text);
    }
  };

  // Auto-play voice after 3 seconds on component mount - DISABLED
  React.useEffect(() => {
    // Disabled ElevenLabs voice auto-play
    // const timer = setTimeout(() => {
    //   speakMessage();
    // }, 3000);

    // return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Content Data
  const content = {
    de: {
      metaTitle: "Karriere bei Quantiva Advisory – Gestalte die digitale Zukunft",
      metaDescription: "Werde Teil unseres Teams und arbeite an spannenden Projekten in SAP, Cloud, AI und Cyber Security. Entdecke offene Positionen und entwickle dich weiter.",
      heroTitle: "Arbeite im Herzen des Wandels",
      heroSubtitle: "Entwickle dich weiter und wachse über dich hinaus – hier ist der richtige Ort für dich dafür. Du bist genau richtig bei uns – mit all deinen Stärken und Potenzialen.",
      heroCTA: "Offene Stellen entdecken",
      
      areasTitle: "Wir haben das richtige Angebot für dich",
      areas: [
        {
          icon: Brain,
          title: "Strategy & Consulting",
          description: "Erfolg basiert auf der richtigen Strategie. Gestalte mit deinem Wissen und deinem strategischen Denken den digitalen Wandel.",
        },
        {
          icon: Code,
          title: "Technology & Engineering",
          description: "Durch den Einsatz neuer Technologien entwickeln unsere Kunden gemeinsam mit dir ihre Prozesse kontinuierlich weiter.",
        },
        {
          icon: Database,
          title: "SAP Solutions",
          description: "Als SAP-Experte begleitest du Kunden bei S/4HANA-Migrationen und gestaltest die digitale Transformation.",
        },
        {
          icon: Cloud,
          title: "Cloud & Infrastructure",
          description: "Nutze Cloud-Technologien, um Arbeitsmodelle neu zu gestalten und Prozesse zu transformieren.",
        },
        {
          icon: Shield,
          title: "Cyber Security",
          description: "Schütze kritische Infrastrukturen und entwickle zukunftssichere Security-Architekturen.",
        },
        {
          icon: Sparkles,
          title: "Artificial Intelligence",
          description: "Schaffe innovative KI-Lösungen, die echten Mehrwert für unsere Kunden generieren.",
        },
      ],
      
      levelsTitle: "Egal, an welchem Punkt deiner Karriere du dich befindest",
      levels: [
        {
          icon: GraduationCap,
          title: "Studierende",
          description: "Nutze schon während deines Studiums die Zeit, um praktische Erfahrungen zu sammeln und deinen späteren Karriereweg optimal vorzubereiten.",
        },
        {
          icon: Lightbulb,
          title: "Berufseinsteiger:innen",
          description: "Du hast eine großartige Karriere vor dir. Arbeite mit neuesten Technologien und entwickle sie mit deinen Skills weiter.",
        },
        {
          icon: Target,
          title: "Berufserfahrene",
          description: "Du denkst out of the box und entwickelst kreative Lösungen. Komm in unser innovatives Team und transformiere Geschäftsprozesse weltweit.",
        },
        {
          icon: Award,
          title: "Führungskräfte",
          description: "Du siehst unzählige Möglichkeiten und nimmst Herausforderungen an. Erfahre hier, wie du deine innovativen Ideen einsetzen kannst.",
        },
      ],
      
      wellbeingTitle: "Du gehörst hierher",
      wellbeingSubtitle: "Jeder Mensch ist anders. Wir fördern ein inklusives und vielfältiges Arbeitsumfeld, in dem wir uns wertgeschätzt, gesehen und gehört fühlen.",
      wellbeingAreas: [
        {
          icon: Heart,
          title: "Mental Health",
          description: "Wir bieten zahlreiche Maßnahmen um die psychische Gesundheit und das Wohlbefinden unserer Mitarbeiter:innen zu stärken.",
        },
        {
          icon: Users,
          title: "Beziehungsorientiert",
          description: "Wir stellen sicher, dass sich unsere Mitarbeiter:innen wohl fühlen und fördern ein starkes Miteinander.",
        },
        {
          icon: Zap,
          title: "Körperliche Gesundheit",
          description: "Wir unterstützen das körperliche Wohlbefinden mit Sportangeboten und Gesundheitsprogrammen.",
        },
        {
          icon: Target,
          title: "Zielgerichtet",
          description: "Unser Anspruch ist es, uns ständig weiterzuentwickeln – um mit unseren Mitarbeitenden und Kunden Schritt zu halten.",
        },
        {
          icon: TrendingUp,
          title: "Bereit für deine Karriere",
          description: "Wir helfen dir, die richtigen Skills für deine Karriere zu erlangen und auszubauen.",
        },
        {
          icon: Globe,
          title: "Globale Perspektiven",
          description: "Arbeite mit internationalen Teams und erweitere deinen Horizont.",
        },
      ],
      
      statsTitle: "Wir sind weltweit tätig",
      stats: [
        { value: "50+", label: "Erfolgreiche Projekte" },
        { value: "15+", label: "Länder weltweit" },
        { value: "100+", label: "Zufriedene Kunden" },
      ],
      
      ctaTitle: "Komm in unser Team",
      ctaDescription: "Entdecke offene Stellen, die zu deinen Interessen und Fähigkeiten passen.",
      ctaButton: "Zu den offenen Stellen",
    },
    en: {
      metaTitle: "Careers at Quantiva Advisory – Shape the Digital Future",
      metaDescription: "Join our team and work on exciting projects in SAP, Cloud, AI, and Cyber Security. Discover open positions and develop your skills.",
      heroTitle: "Work at the heart of change",
      heroSubtitle: "Develop further and grow beyond yourself – this is the right place for you. You're exactly right with us – with all your strengths and potentials.",
      heroCTA: "Explore open positions",
      
      areasTitle: "We have the right opportunity for you",
      areas: [
        {
          icon: Brain,
          title: "Strategy & Consulting",
          description: "Success is based on the right strategy. Shape digital transformation with your knowledge and strategic thinking.",
        },
        {
          icon: Code,
          title: "Technology & Engineering",
          description: "By using new technologies, our clients continuously develop their processes together with you.",
        },
        {
          icon: Database,
          title: "SAP Solutions",
          description: "As an SAP expert, you accompany clients in S/4HANA migrations and shape digital transformation.",
        },
        {
          icon: Cloud,
          title: "Cloud & Infrastructure",
          description: "Use cloud technologies to redesign work models and transform processes.",
        },
        {
          icon: Shield,
          title: "Cyber Security",
          description: "Protect critical infrastructures and develop future-proof security architectures.",
        },
        {
          icon: Sparkles,
          title: "Artificial Intelligence",
          description: "Create innovative AI solutions that generate real value for our clients.",
        },
      ],
      
      levelsTitle: "No matter where you are in your career",
      levels: [
        {
          icon: GraduationCap,
          title: "Students",
          description: "Use your time during studies to gain practical experience and optimally prepare for your future career path.",
        },
        {
          icon: Lightbulb,
          title: "Career Starters",
          description: "You have a great career ahead of you. Work with the latest technologies and develop them with your skills.",
        },
        {
          icon: Target,
          title: "Experienced Professionals",
          description: "You think out of the box and develop creative solutions. Join our innovative team and transform business processes worldwide.",
        },
        {
          icon: Award,
          title: "Leaders",
          description: "You see countless opportunities and embrace challenges. Learn how you can apply your innovative ideas.",
        },
      ],
      
      wellbeingTitle: "You belong here",
      wellbeingSubtitle: "Every person is different. We promote an inclusive and diverse work environment where we feel valued, seen, and heard.",
      wellbeingAreas: [
        {
          icon: Heart,
          title: "Mental Health",
          description: "We offer numerous measures to strengthen the mental health and well-being of our employees.",
        },
        {
          icon: Users,
          title: "Relationship-oriented",
          description: "We ensure our employees feel comfortable and foster strong community spirit.",
        },
        {
          icon: Zap,
          title: "Physical Health",
          description: "We support physical well-being with sports offerings and health programs.",
        },
        {
          icon: Target,
          title: "Purpose-driven",
          description: "Our aspiration is to constantly develop ourselves – to keep pace with our employees and customers.",
        },
        {
          icon: TrendingUp,
          title: "Career Ready",
          description: "We help you acquire and develop the right skills for your career.",
        },
        {
          icon: Globe,
          title: "Global Perspectives",
          description: "Work with international teams and expand your horizons.",
        },
      ],
      
      statsTitle: "We operate worldwide",
      stats: [
        { value: "50+", label: "Successful Projects" },
        { value: "15+", label: "Countries Worldwide" },
        { value: "100+", label: "Satisfied Customers" },
      ],
      
      ctaTitle: "Join our team",
      ctaDescription: "Discover open positions that match your interests and skills.",
      ctaButton: "View open positions",
    },
  };

  const t = content[lang as keyof typeof content];

  const benefits = [
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible Arbeitszeiten und Remote-Möglichkeiten für eine gesunde Balance.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Karrierewachstum',
      description: 'Kontinuierliche Weiterbildung und klare Aufstiegsmöglichkeiten.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Team Spirit',
      description: 'Ein unterstützendes, kollaboratives Arbeitsumfeld.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Anerkennung',
      description: 'Faire Bezahlung und Anerkennung für Ihre Leistungen.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const positions = [
    {
      title: 'Senior SAP Consultant',
      location: 'Remote / München',
      type: 'Vollzeit',
      description: 'Verantwortlich für die Beratung und Implementierung von SAP-Lösungen für Enterprise-Kunden.',
      requirements: ['5+ Jahre SAP-Erfahrung', 'S/4HANA Expertise', 'Projektmanagement'],
      benefits: ['Competitive Salary', 'Flexible Hours', 'Learning Budget']
    },
    {
      title: 'AI/ML Engineer',
      location: 'Remote / Berlin',
      type: 'Vollzeit',
      description: 'Entwicklung und Implementierung von KI-Lösungen für unsere Kunden.',
      requirements: ['Python/ML Expertise', 'Cloud Platforms', 'Data Science'],
      benefits: ['Competitive Salary', 'Flexible Hours', 'Learning Budget']
    },
    {
      title: 'Cloud Solutions Architect',
      location: 'Remote / Hamburg',
      type: 'Vollzeit',
      description: 'Design und Implementierung von Cloud-Architekturen für Enterprise-Kunden.',
      requirements: ['AWS/Azure Expertise', 'DevOps Experience', 'Architecture Design'],
      benefits: ['Competitive Salary', 'Flexible Hours', 'Learning Budget']
    }
  ];

  const stats = [
    { value: '15+', label: 'Jahre Erfahrung', icon: Award },
    { value: '50+', label: 'Erfolgreiche Projekte', icon: Target },
    { value: '95%', label: 'Kundenzufriedenheit', icon: Heart },
    { value: '100%', label: 'Engagement', icon: Zap },
  ];

  return (
    <>
      {/* Navigation */}
      <div className="relative z-10">
        <Navigation lang={lang} items={navigationItems} />
      </div>

      {/* Hero: full-bleed welcome video with headline and CTAs */}
      <section className="relative z-10 bg-black">
        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity, scale: reduceMotion ? 1 : heroScale }}
          className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
        >
        {/* Full-screen background video (Willkommens-Botschaft) */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/career/welcome-hero.mp4"
          poster="/assets/career/welcome-hero-poster.jpg"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload={reduceMotion ? 'none' : 'metadata'}
        >
          <track
            kind="captions"
            src="/assets/career/welcome-hero.de.vtt"
            srcLang="de"
            label="Deutsch"
            default={lang === 'de'}
          />
          <track
            kind="captions"
            src="/assets/career/welcome-hero.en.vtt"
            srcLang="en"
            label="English"
            default={lang === 'en'}
          />
        </video>

        {/* Sound toggle for the welcome message */}
        <button
          type="button"
          onClick={toggleHeroSound}
          className="absolute right-6 top-24 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md transition hover:border-teal-400/60 hover:text-teal-300 md:right-10"
          aria-pressed={!heroMuted}
        >
          {heroMuted ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
              </svg>
              {lang === 'de' ? 'Botschaft anhören' : 'Hear the message'}
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
              </svg>
              {lang === 'de' ? 'Ton aus' : 'Sound off'}
            </>
          )}
        </button>

        {/* Readability overlays (left/bottom darker where the copy sits) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
            <SlideIn direction="up">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-1.5 text-sm font-medium tracking-wide text-teal-300 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {lang === 'de'
                  ? 'Willkommen bei Quantiva Advisory'
                  : 'Welcome to Quantiva Advisory'}
              </span>
              <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-[1.05] text-white md:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={localePath('/#contact')}
                  className="inline-flex items-center justify-center rounded-full bg-teal-400 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/30"
                >
                  {t.heroCTA}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={localePath('/about')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-300"
                >
                  {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                </a>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block" aria-hidden="true">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
          >
            <div className="h-2 w-1 rounded-full bg-white/70" />
          </motion.div>
        </div>
        </motion.div>
      </section>

      {/* Main Content - Seamless Flow */}
      <div className="relative z-10 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          
          {/* Areas of Expertise Section */}
          <div className="mb-24">
            <SlideIn direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.areasTitle}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {lang === 'de' 
                    ? 'Entdecke die verschiedenen Bereiche, in denen du bei uns arbeiten kannst' 
                    : 'Discover the different areas where you can work with us'}
                </p>
              </div>
            </SlideIn>

            {/* 6 Areas Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Strategy & Consulting */}
              <SlideIn direction="left" delay={0.2}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/strategy-consulting.jpg"
                    video="/assets/career/strategy-consulting.mp4"
                    alt="Strategy & Consulting"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[0].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[0].description}</p>
                    <a 
                      href={localePath('/strategy-consulting')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>

              {/* Technology & Engineering */}
              <SlideIn direction="up" delay={0.3}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/technology-engineering.jpg"
                    video="/assets/career/technology-engineering.mp4"
                    alt="Technology & Engineering"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[1].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[1].description}</p>
                    <a 
                      href={localePath('/career/technology-engineering')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>

              {/* SAP Solutions */}
              <SlideIn direction="right" delay={0.4}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/sap-solutions.jpg"
                    video="/assets/career/sap-solutions.mp4"
                    alt="SAP Solutions"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[2].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[2].description}</p>
                    <a 
                      href={localePath('/career/sap-solutions')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>

              {/* Cloud & Infrastructure */}
              <SlideIn direction="left" delay={0.5}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/cloud-infrastructure.jpg"
                    video="/assets/career/cloud-infrastructure.mp4"
                    alt="Cloud & Infrastructure"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[3].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[3].description}</p>
                    <a 
                      href={localePath('/career/cloud-infrastructure')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>

              {/* Cyber Security */}
              <SlideIn direction="up" delay={0.6}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/cyber-security.jpg"
                    video="/assets/career/cyber-security.mp4"
                    alt="Cyber Security"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[4].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[4].description}</p>
                    <a 
                      href={localePath('/career/cyber-security')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>

              {/* Artificial Intelligence */}
              <SlideIn direction="right" delay={0.7}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <CareerCardMedia
                    image="/assets/career/artificial-intelligence.jpg"
                    video="/assets/career/artificial-intelligence.mp4"
                    alt="Artificial Intelligence"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-black/20"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[5].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[5].description}</p>
                    <a 
                      href={localePath('/career/artificial-intelligence')}
                      className="mt-4 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-semibold">{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* Career Levels Section - Redesigned Grid */}
          <div className="relative mb-24">
            <GhostNumber index={1} />
            <SlideIn direction="up" delay={0.1}>
              <div className="mb-16">
                <SectionLabel num="02" accent={CAREER_ACCENT}>
                  {lang === 'de' ? 'Karrierestufen' : 'Career Levels'}
                </SectionLabel>
                <h2 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                  {t.levelsTitle}
                </h2>
              </div>
            </SlideIn>

            <CareerLevelsGrid levels={t.levels} lang={lang} />
          </div>

        {/* Stats Section - Editorial band */}
        <div className="mb-24 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: CAREER_EASE }}
              className={`px-6 py-10 md:py-14 ${index > 0 ? 'md:border-l md:border-white/10' : ''} ${index % 2 === 1 ? 'border-l border-white/10 md:border-l' : ''}`}
            >
              <div className="text-4xl font-bold text-teal-400 md:text-5xl">{stat.value}</div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section - Editorial Spotlight Cards */}
        <div className="relative mb-24">
          <GhostNumber index={2} />
          <SlideIn direction="up">
            <div className="mb-16">
              <SectionLabel num="03" accent={CAREER_ACCENT}>
                {lang === 'de' ? 'Unsere Benefits' : 'Our Benefits'}
              </SectionLabel>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Warum <span className="text-teal-400">Quantiva</span>?
              </h2>
              <p className="mt-5 max-w-3xl text-lg text-gray-400">
                Wir bieten mehr als nur einen Job - wir bieten eine Karriere mit Zukunft.
              </p>
            </div>
          </SlideIn>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: CAREER_EASE }}
                  className="h-full"
                >
                  <SpotlightCard
                    accent={CAREER_ACCENT}
                    className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-teal-400/40"
                  >
                    <div className="inline-flex rounded-lg bg-teal-400/10 p-2.5">
                      <Icon className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{benefit.description}</p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="relative mb-24">
          <GhostNumber index={3} />
          <SlideIn direction="up">
            <div className="mb-16">
              <SectionLabel num="04" accent={CAREER_ACCENT}>
                {lang === 'de' ? 'Offene Positionen' : 'Open Positions'}
              </SectionLabel>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {lang === 'de' ? 'Aktuelle' : 'Current'} <span className="text-teal-400">{lang === 'de' ? 'Stellenangebote' : 'Job Openings'}</span>
              </h2>
              <p className="mt-5 max-w-3xl text-lg text-gray-400">
                {lang === 'de' ? 'Entdecken Sie unsere aktuellen Stellenangebote und finden Sie Ihre perfekte Position.' : 'Discover our current job openings and find your perfect position.'}
              </p>
            </div>
          </SlideIn>

          {/* Job Filters */}
          <SlideIn direction="up" delay={0.2}>
            <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Search */}
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder={lang === 'de' ? 'Suche nach Position oder Stichwort...' : 'Search for position or keyword...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-gray-500 transition-colors focus:border-teal-400/50 focus:outline-none"
                  />
                </div>
                
                {/* Location Filter */}
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-colors [color-scheme:dark] focus:border-teal-400/50 focus:outline-none [&>option]:bg-[#04060b] [&>option]:text-white"
                >
                  <option value="all">{lang === 'de' ? 'Alle Standorte' : 'All Locations'}</option>
                  {filterOptions.locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                
                {/* Department Filter */}
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-colors [color-scheme:dark] focus:border-teal-400/50 focus:outline-none [&>option]:bg-[#04060b] [&>option]:text-white"
                >
                  <option value="all">{lang === 'de' ? 'Alle Bereiche' : 'All Departments'}</option>
                  {filterOptions.departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                
                {/* Seniority Filter */}
                <select
                  value={seniorityFilter}
                  onChange={(e) => setSeniorityFilter(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-colors [color-scheme:dark] focus:border-teal-400/50 focus:outline-none [&>option]:bg-[#04060b] [&>option]:text-white"
                >
                  <option value="all">{lang === 'de' ? 'Alle Level' : 'All Levels'}</option>
                  {filterOptions.seniorities.map((sen) => (
                    <option key={sen} value={sen}>{sen}</option>
                  ))}
                </select>
              </div>
              
              {/* Filter Summary */}
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                  {filteredJobs.length} {lang === 'de' ? 'Position(en) gefunden' : 'position(s) found'}
                </span>
                {(searchQuery || locationFilter !== 'all' || departmentFilter !== 'all' || seniorityFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setLocationFilter('all');
                      setDepartmentFilter('all');
                      setSeniorityFilter('all');
                      setRemoteFilter('all');
                    }}
                    className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400 transition-colors hover:text-teal-300"
                  >
                    {lang === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
                  </button>
                )}
              </div>
            </div>
          </SlideIn>

          <div className="space-y-6">
            {jobLoading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-gray-400">
                {lang === 'de' ? 'Lade offene Positionen …' : 'Loading job openings …'}
              </div>
            ) : jobError ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-10 text-center text-red-200">
                {jobError}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-gray-400">
                {lang === 'de' ? 'Keine Positionen gefunden. Bitte Filter anpassen.' : 'No positions found. Please adjust filters.'}
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <SlideIn key={job.id} direction="up" delay={index * 0.1}>
                  <SpotlightCard
                    accent={CAREER_ACCENT}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-teal-400/40"
                  >
                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <h3 className="text-2xl font-bold tracking-tight text-white">{job.title}</h3>
                              {job.salary && (
                                <span className="whitespace-nowrap font-mono text-sm text-teal-300">
                                  {job.salary}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                                {job.location}
                              </span>
                              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                                {job.employmentType}
                              </span>
                              {job.department ? (
                                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                                  {job.department}
                                </span>
                              ) : null}
                              {job.seniority && (
                                <span className="rounded-full border border-teal-400/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-teal-300">
                                  {job.seniority}
                                </span>
                              )}
                              {job.remote && (
                                <span className="rounded-full border border-teal-400/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-teal-300">
                                  Remote
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            className="self-start rounded-full border border-teal-400/60 px-6 py-3 font-semibold text-teal-300 transition-all duration-300 hover:bg-teal-400 hover:text-black"
                            onClick={() => handleJobApply(job)}
                          >
                            {lang === 'de' ? 'Jetzt bewerben' : 'Apply now'}
                          </button>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                              {lang === 'de' ? 'Anforderungen' : 'Requirements'}
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-center gap-3 text-sm text-gray-300">
                                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                              Benefits
                            </h4>
                            <ul className="space-y-2">
                              {job.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-center gap-3 text-sm text-gray-300">
                                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                    </div>
                  </SpotlightCard>
                </SlideIn>
              ))
            )}
          </div>
        </div>

        {/* Culture Section */}
        <div className="relative mb-24">
          <GhostNumber index={4} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <motion.div
                className="relative group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: CAREER_EASE }}
              >
                {/* Teal glow behind the stack */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-3xl blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-70"
                  style={{ background: `${CAREER_ACCENT}1f` }}
                ></div>

                {/* Back cards, slightly offset and rotated */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-6 -translate-y-5 rotate-[3.5deg] rounded-2xl border border-white/10 bg-white/[0.02] transition-transform duration-700 group-hover:translate-x-8 group-hover:-translate-y-6"
                ></div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 -translate-y-2.5 rotate-[1.75deg] rounded-2xl border border-white/10 bg-white/[0.02] transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-3"
                ></div>

                {/* Main photo card */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-black"
                  style={{ boxShadow: `0 40px 120px -40px ${CAREER_ACCENT}4d` }}
                >
                  <Image
                    src="/assets/career/culture.jpg"
                    alt="Team Culture"
                    width={1600}
                    height={1195}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  {/* Film grain / noise overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  ></div>
                </div>
              </motion.div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-8">
                <div>
                  <SectionLabel num="05" accent={CAREER_ACCENT}>
                    {lang === 'de' ? 'Kultur' : 'Culture'}
                  </SectionLabel>
                  <h2 className="mt-6 mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Unsere <span className="text-teal-400">Kultur</span>
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    Bei Quantiva Advisory schaffen wir ein Arbeitsumfeld, das Innovation, 
                    Kollaboration und persönliches Wachstum fördert. Wir glauben daran, 
                    dass die besten Lösungen entstehen, wenn talentierte Menschen zusammenarbeiten.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: 'Innovation First',
                      description: 'Wir fördern kreatives Denken und experimentieren mit neuen Technologien.',
                    },
                    {
                      title: 'Teamwork',
                      description: 'Zusammenarbeit und gegenseitige Unterstützung stehen im Mittelpunkt.',
                    },
                    {
                      title: 'Lernkultur',
                      description: 'Kontinuierliche Weiterbildung und persönliche Entwicklung werden gefördert.',
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: index * 0.08, ease: CAREER_EASE }}
                      className="flex items-start gap-5 border-t border-white/10 pt-6"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] font-mono text-sm text-teal-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                        <p className="text-gray-400">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Wellbeing Section - Accenture Style */}
        <div className="relative mb-24">
          <GhostNumber index={5} />
          <SlideIn direction="up" delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
                {t.wellbeingTitle}
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {t.wellbeingSubtitle}
              </p>
            </div>
          </SlideIn>

          {/* Asymmetric Grid Layout - Accenture Style */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Large Featured Card - Mental Health (spans 2 rows on desktop) */}
            <SlideIn direction="left" delay={0.2} className="lg:row-span-2">
              <div className="group relative h-full min-h-[500px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/mental-health.jpg"
                  video="/assets/career/wellbeing/mental-health.mp4"
                  alt="Mental Health"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">{t.wellbeingAreas[0].title}</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">{t.wellbeingAreas[0].description}</p>
                  <a href={localePath('/career/mental-health')} className="self-start inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>

            {/* Top-right Card - Relationship-oriented */}
            <SlideIn direction="up" delay={0.3} className="lg:col-span-2">
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/community.jpg"
                  video="/assets/career/wellbeing/community.mp4"
                  alt="Team Collaboration"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/60 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{t.wellbeingAreas[1].title}</h3>
                  <p className="text-gray-100 mb-4 leading-relaxed max-w-xl">{t.wellbeingAreas[1].description}</p>
                  <a href={localePath('/career/community')} className="self-start inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Communitys entdecken' : 'Discover Communities'}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>

            {/* Bottom-right Card - Physical Health */}
            <SlideIn direction="right" delay={0.4}>
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/physical-health.jpg"
                  video="/assets/career/wellbeing/physical-health.mp4"
                  alt="Physical Health"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[2].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[2].description}</p>
                  <a href={localePath('/career/physical-health')} className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>

            {/* Bottom-right Card 2 - Purpose-driven */}
            <SlideIn direction="right" delay={0.5}>
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/purpose.jpg"
                  video="/assets/career/wellbeing/purpose.mp4"
                  alt="Purpose Driven"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[3].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[3].description}</p>
                  <a href={localePath('/career/purpose')} className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Wovon wir überzeugt sind' : 'Our Beliefs'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Second Row - 3 Equal Cards */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <SlideIn direction="up" delay={0.6}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/career-development.jpg"
                  video="/assets/career/wellbeing/career-development.mp4"
                  alt="Career Ready"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[4].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[4].description}</p>
                  <a href={localePath('/career/career-development')} className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Trainings & Weiterbildung' : 'Training & Development'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.7}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/global-perspectives.jpg"
                  video="/assets/career/wellbeing/global-perspectives.mp4"
                  alt="Global Perspectives"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[5].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[5].description}</p>
                  <a href={localePath('/career/global-perspectives')} className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.8}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <CareerCardMedia
                  image="/assets/career/wellbeing/financial-rewards.jpg"
                  video="/assets/career/wellbeing/financial-rewards.mp4"
                  alt="Financial Wellbeing"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{lang === 'de' ? 'Finanzielle Vergütung' : 'Financial Rewards'}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                    {lang === 'de' 
                      ? 'Wir bieten Rewards- und Benefits-Pakete, die deinen Bedürfnissen entsprechen.' 
                      : 'We offer rewards and benefits packages that meet your needs.'}
                  </p>
                  <a href={localePath('/career/financial-rewards')} className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <SlideIn direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              {t.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={localePath('/#contact')}
                className="rounded-full bg-teal-400 px-10 py-5 text-lg font-semibold text-black transition-all duration-300 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/30"
              >
                {t.ctaButton}
              </a>
              <a
                href="mailto:careers@quantiva-advisory.com"
                className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white text-lg font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300"
              >
                {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
              </a>
            </div>
          </SlideIn>
        </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedJob ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl rounded-3xl bg-slate-900/95 border border-white/10 p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedJob.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedJob.location} · {selectedJob.employmentType}
                  </p>
                </div>
                <button
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-400 hover:border-teal-400/40 hover:text-teal-300"
                  onClick={() => setSelectedJob(null)}
                >
                  {lang === 'de' ? 'Schließen' : 'Close'}
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 text-sm text-gray-300">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {lang === 'de' ? 'Anforderungen' : 'Requirements'}
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-400" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-black/40 border border-white/10 p-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {lang === 'de' ? 'Jetzt direkt bewerben' : 'Apply directly'}
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  {lang === 'de'
                    ? 'Sende uns kurz deine Kontaktdaten und wir melden uns innerhalb eines Tages.'
                    : 'Share your contact details – we will get back within one business day.'}
                </p>
                <ContactForm lang={lang} jobId={selectedJob.id} jobTitle={selectedJob.title} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}