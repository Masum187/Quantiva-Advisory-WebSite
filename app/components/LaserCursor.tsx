'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Laser Cursor Component
function LaserCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Don't show laser cursor on main pages
  const isMainPage = pathname === '/de' || pathname === '/en' || pathname === '/';

  useEffect(() => {
    if (isMainPage) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMainPage]);

  // Add/remove laser cursor page class
  useEffect(() => {
    if (isMainPage) {
      document.body.classList.remove('laser-cursor-page');
    } else {
      document.body.classList.add('laser-cursor-page');
    }

    return () => {
      document.body.classList.remove('laser-cursor-page');
    };
  }, [isMainPage]);

  if (isMainPage || !isVisible) return null;

  return (
    <div 
      className="laser-cursor"
      style={{
        transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
      }}
    >
      <div className="laser-dot"></div>
      <div 
        className="laser-trail"
        style={{
          transform: `rotate(${Math.atan2(mousePosition.y, mousePosition.x)}rad)`,
        }}
      ></div>
    </div>
  );
}

export default LaserCursor;



