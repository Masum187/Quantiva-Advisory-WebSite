'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { useLanguage } from '../../components/QuantivaWebsite';
import { Video, Play, Download, Settings, Zap, Clock, Monitor } from 'lucide-react';

interface VideoGenerationResponse {
  success: boolean;
  videoUrl: string;
  prompt: string;
  duration: number;
  quality: string;
  model: string;
}

export default function VideoGenerationPage() {
  const { lang } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [quality, setQuality] = useState('480p');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<VideoGenerationResponse | null>(null);

  const navigationItems = [
    { id: 'home', label: 'Home', href: '/de' },
    { id: 'services', label: 'Services', href: '/de/services' },
    { id: 'ai-test', label: 'AI Test', href: '/de/ai-test' },
    { id: 'video-gen', label: 'Video Gen', href: '/de/video-generation' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Bitte geben Sie einen Prompt ein');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/video-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          duration: duration,
          quality: quality,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler bei der Video-Generierung');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!result?.videoUrl) return;
    
    try {
      const response = await fetch(result.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation lang={lang} items={navigationItems} />

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8">
            <Video className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold tracking-wider">VIDEO GENERATION</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Sora{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Video AI
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Generieren Sie beeindruckende Videos mit KI. Beschreiben Sie Ihre Vision und lassen Sie Sora sie zum Leben erwecken.
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Prompt Input */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                Video-Prompt beschreiben:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="z.B. Ein Sonnenaufgang über Bergen, Zeitraffer-Aufnahme mit sanften Wolken..."
                className="w-full h-32 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Dauer (Sekunden):
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  disabled={isLoading}
                >
                  <option value={1}>1 Sekunde</option>
                  <option value={2}>2 Sekunden</option>
                  <option value={3}>3 Sekunden</option>
                  <option value={4}>4 Sekunden</option>
                  <option value={5}>5 Sekunden</option>
                  <option value={6}>6 Sekunden</option>
                  <option value={7}>7 Sekunden</option>
                  <option value={8}>8 Sekunden</option>
                  <option value={9}>9 Sekunden</option>
                  <option value={10}>10 Sekunden</option>
                </select>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-purple-400" />
                  Qualität:
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  disabled={isLoading}
                >
                  <option value="480p">480p (Standard)</option>
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Video wird generiert...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Video generieren
                </>
              )}
            </motion.button>
          </form>

          {/* Error Display */}
          {error && (
            <motion.div 
              className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-red-400 font-semibold mb-2">Fehler:</h3>
              <div className="text-red-300">{error}</div>
            </motion.div>
          )}

          {/* Result Display */}
          {result && (
            <motion.div 
              className="mt-8 p-8 bg-green-900/20 border border-green-500/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-green-400 font-semibold text-xl">Video erfolgreich generiert!</h3>
                <motion.button
                  onClick={downloadVideo}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Player */}
                <div>
                  <video
                    src={result.videoUrl}
                    controls
                    className="w-full rounded-xl border border-gray-700"
                    poster=""
                    preload="metadata"
                  >
                    Ihr Browser unterstützt das Video-Element nicht.
                  </video>
                </div>

                {/* Video Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Prompt:</h4>
                    <p className="text-gray-300">{result.prompt}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-1">Dauer:</h4>
                      <p className="text-gray-300">{result.duration}s</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Qualität:</h4>
                      <p className="text-gray-300">{result.quality}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-1">Modell:</h4>
                    <p className="text-gray-300 text-sm">{result.model}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-1">Video URL:</h4>
                    <a 
                      href={result.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm break-all"
                    >
                      {result.videoUrl}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm">
            Powered by Sora AI • Comet API • Generieren Sie Videos mit KI-Technologie
          </p>
        </motion.div>
      </div>
    </div>
  );
}


