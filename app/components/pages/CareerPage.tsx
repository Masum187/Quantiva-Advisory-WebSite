'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../Navigation';
import {
  ChevronRight, ArrowRight, Users, Heart, TrendingUp,
  GraduationCap, Lightbulb, Target, Award, Shield, Sparkles,
  Brain, Cloud, Code, Database, Globe, Zap, Menu, X, BriefcaseIcon
} from 'lucide-react';
import { useLanguage } from '../QuantivaWebsite';
import VideoCard from '../VideoCard';
import { getJobListings, submitJobPosting, JobListing } from '../../lib/utils/jobs';
import ContactForm from '../ContactForm';
import { AnimatePresence } from 'framer-motion';
import Script from 'next/script';

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

// Career Levels Carousel Component with Swipe Support
function CareerLevelsCarousel({ levels, lang }: { levels: any[]; lang: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const carouselData = [
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
      gradient: 'from-purple-900/90 via-purple-800/70 to-transparent',
      icon: GraduationCap,
      iconBg: 'bg-white/20',
      ctaText: lang === 'de' ? 'Praktika entdecken' : 'Discover Internships',
      ctaBg: 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50',
      ctaTextColor: 'text-white',
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop',
      gradient: 'from-black/95 via-black/60 to-transparent',
      icon: Lightbulb,
      iconBg: 'bg-teal-500/30',
      ctaText: lang === 'de' ? 'Einstiegsprogramme' : 'Entry Programs',
      ctaBg: 'bg-teal-500/20 border-teal-400/40 hover:bg-teal-500/30 hover:border-teal-400/60',
      ctaTextColor: 'text-teal-300',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
      gradient: 'from-black/95 via-black/60 to-transparent',
      icon: Target,
      iconBg: 'bg-blue-500/30',
      ctaText: lang === 'de' ? 'Karrierewege' : 'Career Paths',
      ctaBg: 'bg-blue-500/20 border-blue-400/40 hover:bg-blue-500/30 hover:border-blue-400/60',
      ctaTextColor: 'text-blue-300',
    },
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
      gradient: 'from-orange-900/90 via-orange-800/70 to-transparent',
      icon: Award,
      iconBg: 'bg-white/20',
      ctaText: lang === 'de' ? 'Leadership-Programme' : 'Leadership Programs',
      ctaBg: 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50',
      ctaTextColor: 'text-white',
    },
  ];

  // Auto-rotate effect
  React.useEffect(() => {
    if (isHovered) {
      setProgress(0);
      return;
    }

    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % carouselData.length);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [currentIndex, isHovered, carouselData.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex((current) => (current - 1 + carouselData.length) % carouselData.length);
    setProgress(0);
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((current) => (current + 1) % carouselData.length);
    setProgress(0);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch/Mouse drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsHovered(true);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next slide (comes from right)
        goToNext();
      } else {
        // Swipe right → previous slide (comes from left)
        goToPrevious();
      }
    }
    
    setDragStart(null);
    setIsHovered(false);
  };

  const currentCard = carouselData[currentIndex];
  const currentLevel = levels[currentIndex];
  const Icon = currentCard.icon;

  return (
    <div className="relative">
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronRight className="h-6 w-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Main Carousel Card */}
      <div
        className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <motion.img
          key={currentIndex}
          src={currentCard.image}
          alt={currentLevel.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ 
            x: direction === 'right' ? 100 : -100,
            scale: 1.1, 
            opacity: 0 
          }}
          animate={{ 
            x: 0,
            scale: 1, 
            opacity: 1 
          }}
          exit={{ 
            x: direction === 'right' ? -100 : 100,
            scale: 0.9,
            opacity: 0 
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentCard.gradient}`}></div>

        {/* Content */}
        <motion.div
          key={`content-${currentIndex}`}
          className="relative h-full flex flex-col justify-end p-8 md:p-12"
          initial={{ 
            opacity: 0, 
            x: direction === 'right' ? 50 : -50 
          }}
          animate={{ 
            opacity: 1, 
            x: 0 
          }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-full ${currentCard.iconBg} backdrop-blur-sm flex items-center justify-center mb-6`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">{currentLevel.title}</h3>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed max-w-3xl">{currentLevel.description}</p>
          <button className={`self-start inline-flex items-center px-8 py-4 ${currentCard.ctaBg} ${currentCard.ctaTextColor} backdrop-blur-sm border rounded-lg font-semibold transition-all duration-300 group/btn`}>
            {currentCard.ctaText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-white/80 transition-all duration-50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-12 bg-teal-500' : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white/50 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4 text-gray-400 font-semibold">
        {currentIndex + 1} / {carouselData.length}
      </div>
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

export default function CareerPage() {
  const { lang, localePath } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState<string>('');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [seniorityFilter, setSeniorityFilter] = useState<string>('all');
  const [remoteFilter, setRemoteFilter] = useState<string>('all');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantivaadvisory.com';

  useEffect(() => {
    let mounted = true;
    setJobLoading(true);
    getJobListings(lang)
      .then((jobs) => {
        if (mounted) {
          setJobListings(jobs);
        }
      })
      .catch(() => {
        if (mounted) setJobError(lang === 'de' ? 'Stellen konnten nicht geladen werden.' : 'Unable to load job listings.');
      })
      .finally(() => mounted && setJobLoading(false));

    return () => {
      mounted = false;
    };
  }, [lang]);

  const handleJobApply = async (job: JobListing) => {
    setSelectedJob(job);
  };

  const handleJobSubmission = async (data: { name: string; email: string; message: string }) => {
    if (!selectedJob) return;
    try {
      setSubmissionStatus('loading');
      await submitJobPosting({
        ...selectedJob,
        description: `${selectedJob.description}\n\n---\nCandidate: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      });
      setSubmissionStatus('success');
      setSelectedJob(null);
      setTimeout(() => setSubmissionStatus('idle'), 3000);
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionError(error instanceof Error ? error.message : 'Submission failed');
    }
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

  const jobPostingJsonLd = useMemo(() => {
    return jobListings.map((job) => ({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      datePosted: job.publishedAt,
      employmentType: job.employmentType,
      jobLocationType: job.remote ? 'TELECOMMUTE' : 'ON_SITE',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Quantiva Advisory',
        sameAs: siteUrl,
      },
      jobLocation: job.location
        ? {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: job.location,
              addressCountry: 'DE',
            },
          }
        : undefined,
      applicantLocationRequirements: job.remote
        ? {
            '@type': 'Country',
            name: 'Germany',
          }
        : undefined,
      identifier: {
        '@type': 'PropertyValue',
        name: 'Quantiva Advisory',
        value: job.id,
      },
      url: `${siteUrl}${localePath(`/career`)}#${job.id}`,
    }));
  }, [jobListings, localePath, siteUrl]);

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', href: localePath('/') },
    { id: 'about', label: lang === 'de' ? 'Über uns' : 'About', href: localePath('/about') },
    { id: 'services', label: 'Services', href: localePath('/#services') },
    { id: 'search', label: lang === 'de' ? 'Suche' : 'Search', href: localePath('/search') },
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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

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
      <Script
        id="job-postings-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      {/* Navigation */}
      <div className="relative z-10">
        <Navigation lang={lang} items={navigationItems} />
      </div>

      {/* Video Card Section - Below Navigation */}
      <div className="relative z-10 mt-8">
        <VideoCard
        videoUrl="https://res.cloudinary.com/dbrisux8i/video/upload/du_3.45/v1762015286/openart-video_b6992003_1761933215657_wgjmwh.mp4"
        title={lang === 'de' ? 'Willkommen bei Quantiva Advisory!' : 'Welcome to Quantiva Advisory!'}
        description={lang === 'de' 
          ? 'Du bist derjenige, der dabei helfen kann, dieses Unternehmen zu gestalten. Zögere nicht so lange — bewirb dich jetzt!'
          : 'You are the one who can help shape this company. Don\'t hesitate so long — please apply now!'
        }
        primaryButtonText={lang === 'de' ? 'Jetzt bewerben' : 'Apply now'}
        primaryButtonLink={localePath('/#contact')}
        secondaryButtonText={lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
        secondaryButtonLink={localePath('/about')}
          className="py-8"
        />
      </div>

      {/* Hero Section - Simple Background */}
      <div className="relative z-10 h-screen w-full overflow-hidden">
        
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-purple-900/60 to-black/80"></div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
            <SlideIn direction="up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={localePath('/#contact')}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                >
                  {t.heroCTA}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

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
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                    alt="Strategy & Consulting"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  <Image
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop"
                    alt="Technology & Engineering"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[1].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[1].description}</p>
                    <ArrowRight className="mt-4 h-6 w-6 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </SlideIn>

              {/* SAP Solutions */}
              <SlideIn direction="right" delay={0.4}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                    alt="SAP Solutions"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[2].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[2].description}</p>
                    <ArrowRight className="mt-4 h-6 w-6 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </SlideIn>

              {/* Cloud & Infrastructure */}
              <SlideIn direction="left" delay={0.5}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                    alt="Cloud & Infrastructure"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[3].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[3].description}</p>
                    <ArrowRight className="mt-4 h-6 w-6 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </SlideIn>

              {/* Cyber Security */}
              <SlideIn direction="up" delay={0.6}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
                    alt="Cyber Security"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[4].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[4].description}</p>
                    <ArrowRight className="mt-4 h-6 w-6 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </SlideIn>

              {/* Artificial Intelligence */}
              <SlideIn direction="right" delay={0.7}>
                <div className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
                    alt="Artificial Intelligence"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-black/20"></div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{t.areas[5].title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{t.areas[5].description}</p>
                    <ArrowRight className="mt-4 h-6 w-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* Career Levels Section - Rotating Carousel */}
          <div className="mb-24">
            <SlideIn direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.levelsTitle}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {lang === 'de' 
                    ? 'Egal, an welchem Punkt deiner Karriere du dich befindest' 
                    : 'No matter where you are in your career journey'}
                </p>
              </div>
            </SlideIn>

            {/* Rotating Carousel */}
            <CareerLevelsCarousel levels={t.levels} lang={lang} />
          </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <SlideIn key={stat.label} direction="up" delay={index * 0.1}>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 flex items-center justify-center group-hover:border-teal-400/60 transition-all">
                    <Icon className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </SlideIn>
            );
          })}
        </div>

        {/* Benefits Section - Modern 3D Design */}
        <div className="mb-24">
          <SlideIn direction="up">
            <div className="text-center mb-20">
              <motion.div 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-6 h-6 text-teal-400" />
                <span className="text-white font-semibold">Unsere Benefits</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Warum <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Quantiva</span>?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Wir bieten mehr als nur einen Job - wir bieten eine Karriere mit Zukunft.
              </motion.p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10, 
                    rotateY: 5, 
                    rotateX: 5,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group perspective-1000"
                >
                  <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-black/40 via-black/20 to-black/40 border border-white/10 backdrop-blur-xl transform-gpu transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/20 group-hover:border-teal-400/30">
                    {/* 3D Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      <motion.div
                        className="absolute w-2 h-2 bg-teal-400/30 rounded-full"
                        animate={{
                          x: [0, 100, 0],
                          y: [0, -50, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
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
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.7
                        }}
                        style={{ top: '60%', right: '15%' }}
                      />
                    </div>

                    <div className="relative z-10">
                      {/* 3D Icon Container */}
                      <motion.div 
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${benefit.color}/20 border border-white/20 flex items-center justify-center group-hover:border-teal-400/50 backdrop-blur-sm relative overflow-hidden`}
                        whileHover={{ 
                          rotateY: 360,
                          scale: 1.1,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {/* Icon Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color}/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        <Icon className="w-10 h-10 text-white relative z-10 group-hover:text-teal-300 transition-colors duration-300" />
                      </motion.div>

                      {/* Content */}
                      <motion.h3 
                        className="text-xl font-bold text-white mb-4 mt-6 group-hover:text-teal-300 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {benefit.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {benefit.description}
                      </motion.p>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-teal-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-24">
          <SlideIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-8">
                <Target className="w-6 h-6 text-teal-400" />
                <span className="text-white font-semibold">{lang === 'de' ? 'Offene Positionen' : 'Open Positions'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {lang === 'de' ? 'Aktuelle' : 'Current'} <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">{lang === 'de' ? 'Stellenangebote' : 'Job Openings'}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {lang === 'de' ? 'Entdecken Sie unsere aktuellen Stellenangebote und finden Sie Ihre perfekte Position.' : 'Discover our current job openings and find your perfect position.'}
              </p>
            </div>
          </SlideIn>

          {/* Job Filters */}
          <SlideIn direction="up" delay={0.2}>
            <div className="mb-12 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Search */}
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder={lang === 'de' ? 'Suche nach Position oder Stichwort...' : 'Search for position or keyword...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                  />
                </div>
                
                {/* Location Filter */}
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-white focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
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
                  className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-white focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
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
                  className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-white focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                >
                  <option value="all">{lang === 'de' ? 'Alle Level' : 'All Levels'}</option>
                  {filterOptions.seniorities.map((sen) => (
                    <option key={sen} value={sen}>{sen}</option>
                  ))}
                </select>
              </div>
              
              {/* Filter Summary */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">
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
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {lang === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
                  </button>
                )}
              </div>
            </div>
          </SlideIn>

          <div className="space-y-8">
            {jobLoading ? (
              <div className="rounded-3xl border border-white/15 bg-black/30 p-10 text-center text-gray-400">
                {lang === 'de' ? 'Lade offene Positionen …' : 'Loading job openings …'}
              </div>
            ) : jobError ? (
              <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-10 text-center text-red-200">
                {jobError}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="rounded-3xl border border-white/15 bg-black/30 p-10 text-center text-gray-400">
                {lang === 'de' ? 'Keine Positionen gefunden. Bitte Filter anpassen.' : 'No positions found. Please adjust filters.'}
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <SlideIn key={job.id} direction="up" delay={index * 0.1}>
                  <div className="group">
                    <div className="relative p-8 rounded-3xl bg-black/20 border border-white/20 backdrop-blur-sm transform-gpu transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl"></div>
                      <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                              {job.salary && (
                                <span className="rounded-full border border-purple-400/40 bg-purple-500/20 px-4 py-1.5 text-sm font-semibold text-purple-200 whitespace-nowrap">
                                  {job.salary}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                              <span className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {job.employmentType}
                              </span>
                              {job.department ? (
                                <span className="flex items-center gap-2">
                                  <BriefcaseIcon className="w-4 h-4" />
                                  {job.department}
                                </span>
                              ) : null}
                              {job.seniority && (
                                <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-1 text-xs uppercase tracking-wider text-teal-300">
                                  {job.seniority}
                                </span>
                              )}
                              {job.remote && (
                                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-wider text-blue-300">
                                  Remote
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                            onClick={() => handleJobApply(job)}
                          >
                            {lang === 'de' ? 'Jetzt bewerben' : 'Apply now'}
                          </button>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                              {lang === 'de' ? 'Anforderungen' : 'Requirements'}
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-center gap-2 text-gray-300">
                                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                              Benefits
                            </h4>
                            <ul className="space-y-2">
                              {job.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-center gap-2 text-gray-300">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              ))
            )}
          </div>
        </div>

        {/* Culture Section */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                    alt="Team Culture"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Unsere <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Kultur</span>
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    Bei Quantiva Advisory schaffen wir ein Arbeitsumfeld, das Innovation, 
                    Kollaboration und persönliches Wachstum fördert. Wir glauben daran, 
                    dass die besten Lösungen entstehen, wenn talentierte Menschen zusammenarbeiten.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Innovation First - Pulsing Lightbulb */}
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/30 to-teal-600/20 border border-teal-400/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      animate={{
                        rotateY: [0, 180, 360],
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 20px rgba(20, 184, 166, 0.5)',
                          '0 0 40px rgba(20, 184, 166, 0.8)',
                          '0 0 20px rgba(20, 184, 166, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Inner Glow Effect */}
                      <motion.div
                        className="absolute inset-1 rounded-xl bg-white/20"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Icon with Flickering Effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Lightbulb className="w-6 h-6 text-teal-400 relative z-10" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Innovation First</h3>
                      <p className="text-gray-300">Wir fördern kreatives Denken und experimentieren mit neuen Technologien.</p>
                    </div>
                  </div>

                  {/* Teamwork - Floating People */}
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      animate={{
                        y: [-5, 5, -5],
                        rotateZ: [-5, 5, -5],
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.5)',
                          '0 0 40px rgba(168, 85, 247, 0.8)',
                          '0 0 20px rgba(168, 85, 247, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      {/* Inner Glow Effect */}
                      <motion.div
                        className="absolute inset-1 rounded-xl bg-white/20"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                      />
                      
                      {/* Icon with Bouncing Effect */}
                      <motion.div
                        animate={{
                          y: [-2, 2, -2],
                          rotate: [-2, 2, -2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2
                        }}
                      >
                        <Users className="w-6 h-6 text-purple-400 relative z-10" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Teamwork</h3>
                      <p className="text-gray-300">Zusammenarbeit und gegenseitige Unterstützung stehen im Mittelpunkt.</p>
                    </div>
                  </div>

                  {/* Lernkultur - Spinning Graduation Cap */}
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-400/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      animate={{
                        rotate: [0, 360],
                        scaleX: [1, -1, 1],
                        y: [0, -10, 0],
                        boxShadow: [
                          '0 0 20px rgba(59, 130, 246, 0.5)',
                          '0 0 40px rgba(59, 130, 246, 0.8)',
                          '0 0 20px rgba(59, 130, 246, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      {/* Inner Glow Effect */}
                      <motion.div
                        className="absolute inset-1 rounded-xl bg-white/20"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.6
                        }}
                      />
                      
                      {/* Icon with Tassel Swing */}
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4
                        }}
                      >
                        <GraduationCap className="w-6 h-6 text-blue-400 relative z-10" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Lernkultur</h3>
                      <p className="text-gray-300">Kontinuierliche Weiterbildung und persönliche Entwicklung werden gefördert.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Wellbeing Section - Accenture Style */}
        <div className="mb-24">
          <SlideIn direction="up" delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.wellbeingTitle}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t.wellbeingSubtitle}
              </p>
            </div>
          </SlideIn>

          {/* Asymmetric Grid Layout - Accenture Style */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Large Featured Card - Mental Health (spans 2 rows on desktop) */}
            <SlideIn direction="left" delay={0.2} className="lg:row-span-2">
              <div className="group relative h-full min-h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                  alt="Mental Health"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">{t.wellbeingAreas[0].title}</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed">{t.wellbeingAreas[0].description}</p>
                  <button className="self-start inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>

            {/* Top-right Card - Relationship-oriented */}
            <SlideIn direction="up" delay={0.3} className="lg:col-span-2">
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/60 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{t.wellbeingAreas[1].title}</h3>
                  <p className="text-gray-100 mb-4 leading-relaxed max-w-xl">{t.wellbeingAreas[1].description}</p>
                  <button className="self-start inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Communitys entdecken' : 'Discover Communities'}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>

            {/* Bottom-right Card - Physical Health */}
            <SlideIn direction="right" delay={0.4}>
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
                  alt="Physical Health"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[2].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[2].description}</p>
                  <button className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>

            {/* Bottom-right Card 2 - Purpose-driven */}
            <SlideIn direction="right" delay={0.5}>
              <div className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                  alt="Purpose Driven"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[3].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[3].description}</p>
                  <button className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Wovon wir überzeugt sind' : 'Our Beliefs'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Second Row - 3 Equal Cards */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <SlideIn direction="up" delay={0.6}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                  alt="Career Ready"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[4].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[4].description}</p>
                  <button className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Trainings & Weiterbildung' : 'Training & Development'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.7}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop"
                  alt="Global Perspectives"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t.wellbeingAreas[5].title}</h3>
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">{t.wellbeingAreas[5].description}</p>
                  <button className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.8}>
              <div className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Financial Wellbeing"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <button className="self-start inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 group/btn">
                    {lang === 'de' ? 'Benefits ansehen' : 'View Benefits'}
                    <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
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
                className="px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
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
                <ContactForm lang={lang} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}