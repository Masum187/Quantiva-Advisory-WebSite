'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, Mail } from 'lucide-react';
import Image from 'next/image';

interface WhitepaperCardProps {
  title: string;
  description: string;
  topic: string;
  date: string;
  image: string;
  /** Slug des Whitepapers – wird an /api/whitepaper übergeben. */
  slug: string;
}

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  honeypot: ''
};

export default function WhitepaperCard({ 
  title, 
  description, 
  topic, 
  date, 
  image,
  slug 
}: WhitepaperCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const closeForm = () => {
    setShowForm(false);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/whitepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...formData })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(
          data.error || 'Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.'
        );
        return;
      }

      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch {
      setStatus('error');
      setErrorMessage('Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl">
      {/* Study Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Topic Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {topic}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Download Button */}
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:scale-105 font-semibold"
        >
          <Download className="w-5 h-5" />
          Whitepaper anfordern
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm z-50 p-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/30"
          >
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15">
                  <Mail className="h-8 w-8 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">E-Mail unterwegs!</h3>
                <p className="text-gray-300 mb-6">
                  Wir haben Ihnen das Whitepaper <span className="text-white font-semibold">{title}</span> per
                  E-Mail zugesendet. Bitte prüfen Sie auch Ihren Spam-Ordner.
                </p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold"
                >
                  <CheckCircle className="w-5 h-5" />
                  Schließen
                </button>
              </div>
            ) : (
            <>
            <h3 className="text-2xl font-bold text-white mb-2">Whitepaper anfordern</h3>
            <p className="text-gray-300 mb-6">
              Bitte füllen Sie das Formular aus – Sie erhalten das Whitepaper per E-Mail.
            </p>

            <form onSubmit={handleDownload} className="space-y-4">
              {/* Honeypot – für Menschen unsichtbar */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vorname *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Unternehmen *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {status === 'error' && errorMessage && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </p>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    'Wird versendet...'
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Per E-Mail zusenden
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all border border-white/20"
                >
                  Abbrechen
                </button>
              </div>
            </form>
            </>
            )}
          </motion.div>
        </div>
      )}
    </article>
  );
}
