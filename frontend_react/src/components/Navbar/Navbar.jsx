import React, { useState, useEffect } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const [pinned, setPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${pinned ? ' pinned' : ''}`}>
      <a href="#hero" className="logo">Benjamin<span className="logo-dot"></span></a>
      <ul className="nav-links">
        {[
          { href: '#about', label: 'About' },
          { href: '#experience', label: 'Experience' },
          { href: '#projects', label: 'Work' },
          { href: '#metrics', label: 'Impact' },
          { href: '#contact', label: 'Contact' },
        ].map((item) => (
          <li key={item.label}><a href={item.href}>{item.label}</a></li>
        ))}
      </ul>
      <a href="mailto:beagyekum21@gmail.com" className="nav-cta">Hire Me ↗</a>

      {/* Mobile menu toggle */}
      <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {[
            { href: '#about', label: 'About' },
            { href: '#experience', label: 'Experience' },
            { href: '#projects', label: 'Work' },
            { href: '#metrics', label: 'Impact' },
            { href: '#certifications', label: 'Certifications' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href="mailto:beagyekum21@gmail.com" className="nav-mobile-cta">Hire Me ↗</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
