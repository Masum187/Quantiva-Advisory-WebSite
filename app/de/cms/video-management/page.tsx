'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit, 
  Copy, 
  Eye,
  Calendar,
  Folder,
  Tag,
  Play,
  Pause,
  RotateCcw,
  Upload
} from 'lucide-react';

interface VideoAsset {
  id: string;
  publicId: string;
  url: string;
  duration: number;
  width: number;
  height: number;
  format: string;
  size: number;
  folder: string;
  tags: string[];
  createdAt: string;
  metadata?: {
    title?: string;
    description?: string;
    prompt?: string;
    usage?: string;
  };
}

export default function VideoManagement() {
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoAsset | null>(null);

  // Mock data - in real implementation, this would come from Cloudinary API
  useEffect(() => {
    const mockVideos: VideoAsset[] = [
      {
        id: '1',
        publicId: 'hero-videos/hero-background-demo',
        url: 'https://res.cloudinary.com/dbrisux8i/video/upload/v1761079894/demo-videos/hero-background-demo.mp4',
        duration: 10,
        width: 1920,
        height: 1080,
        format: 'mp4',
        size: 15728640, // 15MB
        folder: 'demo-videos',
        tags: ['hero', 'background', 'demo'],
        createdAt: '2024-01-15T10:30:00Z',
        metadata: {
          title: 'Hero Background Demo Video',
          description: 'Demo video for hero section',
          prompt: 'Modern corporate office with digital transformation elements',
          usage: 'hero-section-demo'
        }
      },
      {
        id: '2',
        publicId: 'service-videos/sap-service-demo',
        url: 'https://res.cloudinary.com/dbrisux8i/video/upload/v1761079895/demo-videos/sap-service-demo.mp4',
        duration: 8,
        width: 1280,
        height: 720,
        format: 'mp4',
        size: 8388608, // 8MB
        folder: 'demo-videos',
        tags: ['sap', 'service', 'demo'],
        createdAt: '2024-01-15T11:15:00Z',
        metadata: {
          title: 'SAP Service Demo Video',
          description: 'Demo video for SAP service page',
          prompt: 'SAP S/4HANA system interface with data flowing',
          usage: 'sap-service-demo'
        }
      }
    ];

    setVideos(mockVideos);
    setFilteredVideos(mockVideos);
    setIsLoading(false);
  }, []);

  // Filter videos based on search and folder
  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.metadata?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFolder !== 'all') {
      filtered = filtered.filter(video => video.folder === selectedFolder);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, selectedFolder, videos]);

  const folders = ['all', ...Array.from(new Set(videos.map(v => v.folder)))];

  const downloadVideo = async (video: VideoAsset) => {
    try {
      const response = await fetch(video.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.metadata?.title || video.publicId}.${video.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Optional: Show toast notification
  };

  const deleteVideo = async (videoId: string) => {
    if (confirm('Sind Sie sicher, dass Sie dieses Video löschen möchten?')) {
      // In real implementation, call Cloudinary delete API
      setVideos(prev => prev.filter(v => v.id !== videoId));
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds: number) => {
    return `${seconds}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Management</h1>
          <p className="text-gray-600">Verwalten Sie Ihre generierten und hochgeladenen Videos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video List */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Videos durchsuchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Folder Filter */}
                <div className="md:w-48">
                  <select
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {folders.map(folder => (
                      <option key={folder} value={folder}>
                        {folder === 'all' ? 'Alle Ordner' : folder}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <span>{filteredVideos.length} Videos gefunden</span>
                <span>{folders.length - 1} Ordner</span>
                <span>{formatFileSize(videos.reduce((sum, v) => sum + v.size, 0))} Gesamtgröße</span>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Video Preview */}
                  <div className="relative aspect-video bg-gray-100">
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      poster=""
                      preload="none"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(video.duration)}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.width}x{video.height}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {video.metadata?.title || video.publicId.split('/').pop()}
                    </h3>
                    
                    {video.metadata?.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {video.metadata.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Folder className="w-3 h-3" />
                        <span>{video.folder}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(video.createdAt).toLocaleDateString('de-DE')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        <span>{formatFileSize(video.size)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {video.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setSelectedVideo(video)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-3 h-3" />
                        Ansehen
                      </motion.button>
                      
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
                        onClick={() => copyUrl(video.url)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Copy className="w-3 h-3" />
                        Copy URL
                      </motion.button>
                      
                      <motion.button
                        onClick={() => deleteVideo(video.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-3 h-3" />
                        Löschen
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Videos gefunden</h3>
                <p className="text-gray-600">
                  {searchTerm || selectedFolder !== 'all' 
                    ? 'Versuchen Sie andere Suchbegriffe oder Filter.' 
                    : 'Generieren Sie Ihr erstes Video mit dem Video Generator.'}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="w-4 h-4" />
                  Neues Video generieren
                </motion.button>
                
                <motion.button
                  className="w-full flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-4 h-4" />
                  Video hochladen
                </motion.button>
              </div>

              {/* Usage Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Nutzungsstatistiken</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Gesamt Videos:</span>
                    <span className="font-medium">{videos.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gesamtgröße:</span>
                    <span className="font-medium">{formatFileSize(videos.reduce((sum, v) => sum + v.size, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ordner:</span>
                    <span className="font-medium">{folders.length - 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <motion.div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedVideo.metadata?.title}</h2>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <video
                  src={selectedVideo.url}
                  controls
                  className="w-full rounded-lg mb-4"
                  preload="metadata"
                />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dauer:</span> {formatDuration(selectedVideo.duration)}
                  </div>
                  <div>
                    <span className="font-medium">Auflösung:</span> {selectedVideo.width}x{selectedVideo.height}
                  </div>
                  <div>
                    <span className="font-medium">Größe:</span> {formatFileSize(selectedVideo.size)}
                  </div>
                  <div>
                    <span className="font-medium">Format:</span> {selectedVideo.format.toUpperCase()}
                  </div>
                </div>
                
                {selectedVideo.metadata?.prompt && (
                  <div className="mt-4">
                    <span className="font-medium text-sm">Prompt:</span>
                    <p className="text-sm text-gray-600 mt-1">{selectedVideo.metadata.prompt}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
