import React, { useState, useEffect } from 'react';
import './Navbar.scss';

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = () => {
  const [pinned, setPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'metrics', label: 'Impact' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar${pinned ? ' pinned' : ''}`}>
      <a href="#hero" className="logo" onClick={scrollTo('hero')}>Benjamin<span className="logo-dot"></span></a>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.label}><a href={`#${item.id}`} onClick={scrollTo(item.id)}>{item.label}</a></li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta" onClick={scrollTo('contact')}>Hire Me ↗</a>

      {/* Mobile menu toggle */}
      <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {[...navItems, { id: 'certifications', label: 'Certifications' }].map((item) => (
            <a key={item.label} href={`#${item.id}`} onClick={(e) => { scrollTo(item.id)(e); setMenuOpen(false); }}>{item.label}</a>
          ))}
          <a href="#contact" className="nav-mobile-cta" onClick={(e) => { scrollTo('contact')(e); setMenuOpen(false); }}>Hire Me ↗</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
