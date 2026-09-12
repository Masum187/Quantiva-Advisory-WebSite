'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Mail, X, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

type Lang = 'de' | 'en';

const COPY = {
  de: {
    requestButton: 'Whitepaper anfordern',
    closeAria: 'Schließen',
    dialogAria: 'Whitepaper anfordern',
    freeDownload: 'Kostenloser Download',
    whereSend: 'Wohin dürfen wir es senden?',
    receiveLink: 'Sie erhalten den Download-Link direkt per E-Mail.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'Geschäftliche E-Mail',
    company: 'Unternehmen',
    phone: 'Telefon (optional)',
    errFirstName: 'Bitte Vornamen angeben',
    errLastName: 'Bitte Nachnamen angeben',
    errEmail: 'Bitte gültige E-Mail-Adresse angeben',
    errCompany: 'Bitte Unternehmen angeben',
    serverError: 'Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.',
    sending: 'Wird gesendet …',
    submit: 'Per E-Mail erhalten',
    privacy: 'Ihre Daten werden vertraulich behandelt und nicht weitergegeben.',
    successTitle: 'Whitepaper ist unterwegs',
    sentPrefix: 'Wir haben',
    sentMiddle: 'an',
    sentSuffix: 'gesendet. Bitte prüfen Sie ggf. auch Ihren Spam-Ordner.',
    okay: 'Alles klar',
    pdfEdition: 'PDF · Ausgabe'
  },
  en: {
    requestButton: 'Request whitepaper',
    closeAria: 'Close',
    dialogAria: 'Request whitepaper',
    freeDownload: 'Free download',
    whereSend: 'Where should we send it?',
    receiveLink: 'You will receive the download link directly by e-mail.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Business e-mail',
    company: 'Company',
    phone: 'Phone (optional)',
    errFirstName: 'Please enter your first name',
    errLastName: 'Please enter your last name',
    errEmail: 'Please enter a valid e-mail address',
    errCompany: 'Please enter your company',
    serverError: 'Sending failed. Please try again later.',
    sending: 'Sending …',
    submit: 'Receive by e-mail',
    privacy: 'Your data is treated confidentially and never shared.',
    successTitle: 'Your whitepaper is on its way',
    sentPrefix: 'We sent',
    sentMiddle: 'to',
    sentSuffix: '. Please also check your spam folder if needed.',
    okay: 'Got it',
    pdfEdition: 'PDF · Edition'
  }
} as const;

type Copy = (typeof COPY)[Lang];

interface WhitepaperCardProps {
  title: string;
  description: string;
  topic: string;
  date: string;
  image: string;
  /** Slug des Whitepapers – wird an /api/whitepaper übergeben. */
  slug: string;
  /** Sprache der UI-Texte (Default: de). */
  lang?: Lang;
}

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  honeypot: string;
};

const EMPTY_FORM: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  honeypot: ''
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

function validate(form: FormFields, t: Copy): FieldErrors {
  const errors: FieldErrors = {};
  if (form.firstName.trim().length < 2) errors.firstName = t.errFirstName;
  if (form.lastName.trim().length < 2) errors.lastName = t.errLastName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t.errEmail;
  if (form.company.trim().length < 2) errors.company = t.errCompany;
  return errors;
}

/** Input mit Floating Label und Inline-Fehlermeldung. */
function Field({
  label,
  type = 'text',
  autoComplete,
  value,
  error,
  onChange,
  className = ''
}: {
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={`relative rounded-xl border bg-white/[0.04] transition-colors focus-within:bg-white/[0.07] ${
          error
            ? 'border-red-400/60'
            : 'border-white/15 focus-within:border-teal-400/70'
        }`}
      >
        <input
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="peer w-full bg-transparent px-4 pb-2 pt-6 text-[15px] text-white outline-none placeholder-transparent"
        />
        <label className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gray-400 transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-teal-300 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-gray-400">
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 px-1 text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function RequestModal({
  open,
  onClose,
  title,
  topic,
  date,
  image,
  slug,
  t
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  topic: string;
  date: string;
  image: string;
  slug: string;
  t: Copy;
}) {
  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [sentTo, setSentTo] = useState('');

  const close = useCallback(() => {
    onClose();
    // Zustand nach der Schließ-Animation zurücksetzen
    window.setTimeout(() => {
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus('idle');
      setServerError('');
    }, 350);
  }, [onClose]);

  // ESC schließt, Body-Scroll sperren
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const setField = (key: keyof FormFields) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/whitepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...form })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setServerError(
          data.error || t.serverError
        );
        return;
      }
      setSentTo(form.email);
      setStatus('success');
    } catch {
      setStatus('error');
      setServerError(t.serverError);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${t.dialogAria}: ${title}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#0b1220] shadow-[0_60px_160px_-40px_rgba(45,212,191,0.35)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.closeAria}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-gray-300 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="px-8 py-16 text-center sm:px-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/25 to-cyan-500/25 ring-1 ring-teal-300/40"
                >
                  <Mail className="h-9 w-9 text-teal-300" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h3 className="text-3xl font-bold text-white">{t.successTitle}</h3>
                  <p className="mx-auto mt-4 max-w-md text-gray-300">
                    {t.sentPrefix} <span className="font-semibold text-white">{title}</span> {t.sentMiddle}{' '}
                    <span className="font-semibold text-teal-300">{sentTo}</span>{t.sentSuffix}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3.5 font-semibold text-white transition hover:from-teal-400 hover:to-cyan-400"
                  >
                    {t.okay}
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="grid md:grid-cols-[1fr_1.25fr]">
                {/* Linke Seite: Whitepaper-Vorschau */}
                <div className="relative hidden overflow-hidden md:block">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 0px, 320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-300 ring-1 ring-teal-400/30">
                      <FileText className="h-3 w-3" />
                      {topic}
                    </span>
                    <h4 className="mt-3 text-xl font-bold leading-snug text-white">{title}</h4>
                    <p className="mt-1 text-sm text-gray-400">{t.pdfEdition} {date}</p>
                  </div>
                </div>

                {/* Rechte Seite: Formular */}
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">
                    {t.freeDownload}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {t.whereSend}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-400">
                    {t.receiveLink}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                    {/* Honeypot – für Menschen unsichtbar */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => setField('honeypot')(e.target.value)}
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label={t.firstName}
                        autoComplete="given-name"
                        value={form.firstName}
                        error={errors.firstName}
                        onChange={setField('firstName')}
                      />
                      <Field
                        label={t.lastName}
                        autoComplete="family-name"
                        value={form.lastName}
                        error={errors.lastName}
                        onChange={setField('lastName')}
                      />
                    </div>
                    <Field
                      label={t.email}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      error={errors.email}
                      onChange={setField('email')}
                    />
                    <Field
                      label={t.company}
                      autoComplete="organization"
                      value={form.company}
                      error={errors.company}
                      onChange={setField('company')}
                    />
                    <Field
                      label={t.phone}
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      error={errors.phone}
                      onChange={setField('phone')}
                    />

                    <AnimatePresence>
                      {status === 'error' && serverError && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                        >
                          {serverError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 font-semibold text-white transition hover:from-teal-400 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          {t.submit}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-gray-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-400/70" />
                      {t.privacy}
                    </p>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function WhitepaperCard({
  title,
  description,
  topic,
  date,
  image,
  slug,
  lang = 'de'
}: WhitepaperCardProps) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl">
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
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Download Button */}
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:scale-105 font-semibold"
        >
          <Download className="w-5 h-5" />
          {t.requestButton}
        </button>
      </div>

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        topic={topic}
        date={date}
        image={image}
        slug={slug}
        t={t}
      />
    </article>
  );
}
