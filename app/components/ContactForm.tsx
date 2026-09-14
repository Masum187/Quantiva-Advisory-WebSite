'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact, validateContactClient } from '../lib/submitContact';
import { ensureRecaptchaScript } from '../lib/recaptchaClient';

interface ContactFormProps {
  lang: 'de' | 'en';
  jobTitle?: string;
  jobId?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm({ lang, jobTitle, jobId }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    ensureRecaptchaScript();
  }, []);

  const t = {
    de: {
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Senden',
      sending: 'Wird gesendet...',
      success: 'Vielen Dank! Wir melden uns in Kürze.',
      errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    },
    en: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Thank you! We will get back to you shortly.',
      errorGeneric: 'An error occurred. Please try again later.',
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('loading');
    setError('');

    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string,
      lang,
      jobTitle,
      jobId,
    };

    const clientError = validateContactClient(data);
    if (clientError) {
      setStatus('error');
      setError(clientError);
      return;
    }

    try {
      const result = await submitContact(data);
      if (!result.ok) {
        setStatus('error');
        setError(result.error || t[lang].errorGeneric);
        return;
      }

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setError(t[lang].errorGeneric);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t[lang].name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t[lang].email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t[lang].message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors resize-y"
        />
      </div>

      {/* Honeypot (hidden field for bot protection) */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
        }}
        aria-hidden="true"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t[lang].sending : t[lang].submit}
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
          role="status"
          aria-live="polite"
        >
          {t[lang].success}
        </motion.div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
          role="alert"
        >
          {error || t[lang].errorGeneric}
        </motion.div>
      )}
    </form>
  );
}






