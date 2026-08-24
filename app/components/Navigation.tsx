'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  lang: 'de' | 'en';
  items: NavigationItem[];
}

export default function Navigation({ lang, items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const searchLabel = lang === 'de' ? 'Suche' : 'Search';
  const searchHref = `/${lang}/search`;

  const derivedItems = useMemo(() => {
    if (items.some((item) => item.id === 'search')) {
      return items;
    }
    return [...items, { id: 'search', label: searchLabel, href: searchHref }];
  }, [items, searchLabel, searchHref]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const switchLang = () => {
    const currentPath = pathname;
    const newLang = lang === 'de' ? 'en' : 'de';
    
    // Replace language prefix in path
    const pathSegments = currentPath.split('/');
    if (pathSegments[1] === lang) {
      pathSegments[1] = newLang;
    } else {
      pathSegments.splice(1, 0, newLang);
    }
    
    const newPath = pathSegments.join('/');
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-white">
        {/* Logo + Company Name */}
        <Link href={`/${lang}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* Quantiva Logo */}
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-teal-400 drop-shadow-sm">
              {/* Outer Hexagon with rounded corners */}
              <polygon 
                points="50,8 85,25 85,75 50,92 15,75 15,25" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinejoin="round"
              />
              
              {/* Central Hexagon */}
              <polygon 
                points="50,25 65,35 65,65 50,75 35,65 35,35" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
              
              {/* Circuit Lines */}
              <line x1="50" y1="25" x2="50" y2="8" stroke="currentColor" strokeWidth="1"/>
              <line x1="65" y1="35" x2="85" y2="25" stroke="currentColor" strokeWidth="1"/>
              <line x1="65" y1="65" x2="85" y2="75" stroke="currentColor" strokeWidth="1"/>
              <line x1="50" y1="75" x2="50" y2="92" stroke="currentColor" strokeWidth="1"/>
              <line x1="35" y1="65" x2="15" y2="75" stroke="currentColor" strokeWidth="1"/>
              <line x1="35" y1="35" x2="15" y2="25" stroke="currentColor" strokeWidth="1"/>
              
              {/* Top Right - Three connected circles */}
              <circle cx="75" cy="20" r="2" fill="currentColor"/>
              <circle cx="80" cy="25" r="2" fill="currentColor"/>
              <circle cx="75" cy="30" r="2" fill="currentColor"/>
              <line x1="75" y1="20" x2="80" y2="25" stroke="currentColor" strokeWidth="0.8"/>
              <line x1="80" y1="25" x2="75" y2="30" stroke="currentColor" strokeWidth="0.8"/>
              
              {/* Bottom Right - Wrench/Spanner */}
              <g transform="translate(70, 70) rotate(45)">
                <rect x="-1" y="-8" width="2" height="16" fill="currentColor"/>
                <rect x="-6" y="-1" width="12" height="2" fill="currentColor"/>
                <circle cx="0" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
              </g>
              
              {/* Top Left - Rectangular chip */}
              <rect x="20" y="20" width="8" height="5" fill="none" stroke="currentColor" strokeWidth="1"/>
              <line x1="24" y1="20" x2="24" y2="25" stroke="currentColor" strokeWidth="0.8"/>
              <line x1="20" y1="22.5" x2="28" y2="22.5" stroke="currentColor" strokeWidth="0.8"/>
              
              {/* Bottom Left - Single circle node */}
              <circle cx="25" cy="80" r="2" fill="currentColor"/>
              
              {/* Additional circuit connections */}
              <line x1="50" y1="50" x2="75" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
              <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
              <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
              <line x1="50" y1="50" x2="25" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
              
              {/* Central connection lines */}
              <line x1="50" y1="50" x2="65" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
              <line x1="50" y1="50" x2="35" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
              <line x1="50" y1="50" x2="65" y2="65" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
              <line x1="50" y1="50" x2="35" y2="65" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Company Name */}
          <div className="text-xl font-bold tracking-tight">
            Quantiva <span className="text-teal-400">Advisory</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {derivedItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-4 py-2 rounded-md hover:bg-white/10 transition text-sm ${
                pathname === item.href ? 'text-teal-400 font-medium' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Language Switch */}
          <button
            onClick={switchLang}
            className="ml-2 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          
          {/* Contact Button */}
          <Link
            href={`/${lang}#contact`}
            className="ml-3 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-teal-600 transition-colors"
          >
            {lang === 'de' ? 'Kontakt' : 'Contact'}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur border-t border-white/10">
          <nav className="px-4 py-2 space-y-1">
            {derivedItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`block px-4 py-2 rounded-md text-sm transition ${
                  pathname === item.href 
                    ? 'text-teal-400 font-medium bg-teal-400/10' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={switchLang}
                className="flex-1 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
              >
                {lang === 'de' ? 'EN' : 'DE'}
              </button>
              <Link
                href={`/${lang}#contact`}
                className="flex-1 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white text-center shadow hover:bg-teal-600 transition-colors"
              >
                {lang === 'de' ? 'Kontakt' : 'Contact'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
