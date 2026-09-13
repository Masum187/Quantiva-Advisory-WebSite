'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Upload, Download, Settings, Play, Pause, RotateCcw, FolderOpen, Tag, Clock, Monitor, Zap } from 'lucide-react';

interface GeneratedVideo {
  id: string;
  cloudinary: {
    publicId: string;
    url: string;
    duration: number;
    width: number;
    height: number;
    format: string;
    size: number;
  };
  comet: {
    originalUrl: string;
    prompt: string;
    duration: number;
    quality: string;
    model: string;
  };
  metadata: {
    title: string;
    folder: string;
    generatedAt: string;
  };
}

interface VideoTemplate {
  id: string;
  name: string;
  prompt: string;
  duration: number;
  quality: string;
  folder: string;
  description: string;
}

export default function CMSVideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(8);
  const [quality, setQuality] = useState('720p');
  const [folder, setFolder] = useState('generated-videos');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Video Templates für verschiedene Verwendungen
  const videoTemplates: VideoTemplate[] = [
    {
      id: 'hero-background',
      name: 'Hero Background',
      prompt: 'Modern corporate office with digital transformation elements, professional lighting, abstract technology, clean and minimal',
      duration: 10,
      quality: '1080p',
      folder: 'hero-videos',
      description: 'Hintergrund-Video für Hero-Section'
    },
    {
      id: 'sap-service',
      name: 'SAP Service',
      prompt: 'SAP S/4HANA system interface with data flowing, modern dashboard, professional business environment, digital transformation',
      duration: 8,
      quality: '720p',
      folder: 'service-videos',
      description: 'Video für SAP Service-Seite'
    },
    {
      id: 'cloud-service',
      name: 'Cloud Service',
      prompt: 'Cloud infrastructure visualization, servers and data centers, modern technology, network connections, scalable architecture',
      duration: 8,
      quality: '720p',
      folder: 'service-videos',
      description: 'Video für Cloud Service-Seite'
    },
    {
      id: 'ai-service',
      name: 'AI Service',
      prompt: 'AI neural networks visualization, data processing, machine learning concepts, futuristic technology, digital brain',
      duration: 8,
      quality: '720p',
      folder: 'service-videos',
      description: 'Video für AI Service-Seite'
    },
    {
      id: 'security-service',
      name: 'Security Service',
      prompt: 'Cybersecurity shield protecting digital assets, network security visualization, data protection, secure environment',
      duration: 8,
      quality: '720p',
      folder: 'service-videos',
      description: 'Video für Security Service-Seite'
    },
    {
      id: 'case-study',
      name: 'Case Study',
      prompt: 'Before and after transformation of business, digital transformation process, modern technology implementation, success story',
      duration: 10,
      quality: '1080p',
      folder: 'case-videos',
      description: 'Video für Case Studies'
    },
    {
      id: 'about-team',
      name: 'About Team',
      prompt: 'Professional team working on digital transformation, modern office environment, collaboration, technology experts',
      duration: 8,
      quality: '720p',
      folder: 'about-videos',
      description: 'Video für About-Seite'
    }
  ];

  // Template auswählen
  const selectTemplate = (template: VideoTemplate) => {
    setPrompt(template.prompt);
    setDuration(template.duration);
    setQuality(template.quality);
    setFolder(template.folder);
    setTitle(template.name);
    setSelectedTemplate(template.id);
  };

  // Video generieren und hochladen
  const generateVideo = async () => {
    if (!prompt.trim()) {
      setError('Bitte geben Sie einen Prompt ein');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/cms/video-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          duration: duration,
          quality: quality,
          folder: folder,
          title: title || `Generated Video ${Date.now()}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler bei der Video-Generierung');
      }

      // Video zur Liste hinzufügen
      setGeneratedVideos(prev => [data, ...prev]);
      
      // Formular zurücksetzen
      setPrompt('');
      setTitle('');
      setSelectedTemplate('');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Video herunterladen
  const downloadVideo = async (video: GeneratedVideo) => {
    try {
      const response = await fetch(video.cloudinary.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.metadata.title}.${video.cloudinary.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  // Cloudinary URL kopieren
  const copyCloudinaryUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Optional: Toast notification
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Video Generator</h1>
          <p className="text-gray-600">Generieren und verwalten Sie KI-Videos für Ihre Website</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Video Generator
              </h2>

              {/* Templates */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Vorlagen:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {videoTemplates.map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => selectTemplate(template)}
                      className={`p-3 text-left rounded-lg border transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={(e) => { e.preventDefault(); generateVideo(); }} className="space-y-6">
                {/* Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video-Prompt:
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Beschreiben Sie das Video, das Sie generieren möchten..."
                    className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    disabled={isGenerating}
                  />
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Dauer:
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isGenerating}
                    >
                      {[5, 8, 10].map(d => (
                        <option key={d} value={d}>{d} Sekunden</option>
                      ))}
                    </select>
                  </div>

                  {/* Quality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Monitor className="w-4 h-4" />
                      Qualität:
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isGenerating}
                    >
                      <option value="480p">480p</option>
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                    </select>
                  </div>

                  {/* Folder */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <FolderOpen className="w-4 h-4" />
                      Ordner:
                    </label>
                    <input
                      type="text"
                      value={folder}
                      onChange={(e) => setFolder(e.target.value)}
                      placeholder="video-folder"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isGenerating}
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titel (optional):
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Mein Video Titel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isGenerating}
                  />
                </div>

                {/* Generate Button */}
                <motion.button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generiere Video...
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      Video generieren & hochladen
                    </>
                  )}
                </motion.button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Generated Videos Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-green-600" />
                Generierte Videos ({generatedVideos.length})
              </h3>

              {generatedVideos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Noch keine Videos generiert</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedVideos.map((video, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Video Preview */}
                      <video
                        src={video.cloudinary.url}
                        controls
                        className="w-full rounded-lg mb-3"
                        poster=""
                        preload="none"
                      />

                      {/* Video Info */}
                      <div className="space-y-2 text-sm">
                        <div className="font-medium text-gray-900">{video.metadata.title}</div>
                        <div className="text-gray-600">{video.comet.prompt}</div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{video.comet.duration}s</span>
                          <span>{video.comet.quality}</span>
                          <span>{Math.round(video.cloudinary.size / 1024 / 1024)}MB</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <motion.button
                            onClick={() => downloadVideo(video)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </motion.button>
                          
                          <motion.button
                            onClick={() => copyCloudinaryUrl(video.cloudinary.url)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Tag className="w-3 h-3" />
                            Copy URL
                          </motion.button>
                        </div>

                        {/* Cloudinary URL */}
                        <div className="text-xs text-gray-400 break-all">
                          {video.cloudinary.url}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


