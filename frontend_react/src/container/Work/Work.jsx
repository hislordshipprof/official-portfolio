import React, { useState, useEffect, useCallback } from 'react';
import { client, urlFor } from '../../clients';
import './Work.scss';

/* Hardcoded fallback in case Sanity is unreachable */
const fallbackProjects = [
  { cat: 'ai', catLabel: 'AI/ML', year: 'Jan 2026', title: 'OPSLY: AI Property Management', description: 'Live AI agent platform with voice & vision for property ops. Tenants report issues via voice, AI assesses damage severity, and managers monitor portfolios in real-time.', tags: ['Gemini AI', 'NestJS', 'React'], img: '/images/projects/opsly.jpg', projectLink: '', codeLink: 'https://github.com/hislordshipprof/opsly' },
  { cat: 'ai', catLabel: 'AI/ML', year: 'Jan 2026', title: 'CallSphere: Multi-Agent Logistics', description: 'End-to-end logistics platform with AI-powered customer service, real-time shipment tracking, and multi-agent orchestration for last-mile delivery ops.', tags: ['OpenAI', 'NestJS', 'React'], img: '/images/projects/callsphere.jpg', projectLink: '', codeLink: 'https://github.com/hislordshipprof/-MultiAgentPlatform' },
  { cat: 'mobile', catLabel: 'Mobile', year: 'Jan 2026', title: 'Agentic Map: Smart Errand Routing', description: 'AI-powered mobile app that converts conversational commands into optimised multi-stop routes using dual Gemini agents and Google Maps.', tags: ['React Native', 'Gemini', 'Expo'], img: '/images/projects/agentic-map.jpg', projectLink: '', codeLink: 'https://github.com/hislordshipprof/Agentic_Map_ReactNative_Expo' },
  { cat: 'ai', catLabel: 'AI/ML', year: 'Dec 2024', title: 'Resume AI: Intelligent Tailoring', description: 'AI platform optimizing resumes using NLP, GPT and ML with 95% ATS accuracy and job-specific tailoring.', tags: ['GPT', 'NLP', 'React'], img: '/images/projects/Intelligent Resume Tailoring Design.png' },
  { cat: 'mobile', catLabel: 'Mobile', year: 'Nov 2024', title: 'Full-Stack Uber Clone', description: 'React Native app with live GPS tracking, Google Maps, Stripe payments and a complete PostgreSQL backend.', tags: ['React Native', 'Stripe', 'PG'], img: '/images/projects/Full Stack Uber Clone Design.png' },
  { cat: 'ai', catLabel: 'AI/ML', year: 'Nov 2024', title: 'IntervuAI: AI Interview Prep', description: 'Voice AI interview simulator using Vapi AI & Google Gemini with real-time personalized coaching feedback.', tags: ['Vapi AI', 'Gemini', 'RN'], img: '/images/projects/IntervuAI_ Your Interview Prep Partner.png' },
  { cat: 'mobile', catLabel: 'Mobile', year: 'Oct 2024', title: 'Movie Finder App', description: 'React Native + Appwrite movie search with real-time ranking and a custom popularity algorithm.', tags: ['RN', 'Appwrite', 'TS'], img: '/images/projects/movie.png' },
  { cat: 'fullstack', catLabel: 'Full Stack', year: 'Sep 2024', title: 'Student Management System', description: 'Django + React platform with role management, attendance tracking and real-time analytics dashboards.', tags: ['Django', 'React', 'PG'], img: '/images/projects/Student Management App Interface Overview.png' },
  { cat: 'web', catLabel: 'Web App', year: 'Aug 2024', title: 'Blockchain Web Application', description: 'Web3 crypto transaction app using Next.js, Web3.js & MetaMask wallet authentication and management.', tags: ['Web3.js', 'Next.js', 'MetaMask'], img: '/images/projects/crypto.png' },
  { cat: 'web', catLabel: 'Web App', year: 'Jul 2024', title: 'React Fitness Training App', description: 'Comprehensive fitness tracker with categorized exercises, animations and personalised workout recommendations.', tags: ['React', 'API', 'CSS3'], img: '/images/projects/React Fitness App Promo Design.png' },
  { cat: 'mobile', catLabel: 'Mobile', year: 'Jun 2024', title: 'NFT Marketplace', description: 'Cross-platform NFT marketplace with buying/selling, blockchain integration and modern Expo-powered UI.', tags: ['RN', 'Expo', 'Web3'], img: '/images/projects/nft.png' },
  { cat: 'web', catLabel: 'Web App', year: 'May 2024', title: 'Hpal Real Estate Platform', description: 'Modern property listing with real-time filtering, visual previews and rental analytics dashboards.', tags: ['React', 'API', 'MongoDB'], img: '/images/projects/real-estate.jpg' },
];

/* Map Sanity tag strings → filter keys */
const tagToCategory = (tags) => {
  if (!tags || !tags.length) return 'web';
  const first = tags[0].toLowerCase();
  if (first.includes('ai') || first.includes('ml')) return 'ai';
  if (first.includes('mobile')) return 'mobile';
  if (first.includes('full')) return 'fullstack';
  return 'web';
};

const catLabels = { ai: 'AI/ML', mobile: 'Mobile', fullstack: 'Full Stack', web: 'Web App' };

const filters = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI/ML' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'web', label: 'Web App' },
];

const delays = ['', 'd1', 'd2'];

const Work = () => {
  const [active, setActive] = useState('all');
  const [projects, setProjects] = useState([]);

  /* Radial glow on project cards */
  useEffect(() => {
    const cards = document.querySelectorAll('.pcard');
    const handlers = [];
    cards.forEach(card => {
      const handler = (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      };
      card.addEventListener('mousemove', handler);
      handlers.push({ card, handler });
    });
    return () => handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler));
  });

  useEffect(() => {
    let mounted = true;
    const query = '*[_type == "works"] | order(date desc)';

    client
      .fetch(query)
      .then((data) => {
        if (!mounted) return;
        if (data && data.length) {
          const mapped = data.map((w) => {
            const cat = tagToCategory(w.tags);
            const d = w.date || w._createdAt;
            const year = d
              ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
              : '';
            return {
              cat,
              catLabel: catLabels[cat] || 'Web App',
              year,
              title: w.title || 'Untitled',
              description: w.description || '',
              tags: w.tags || [],
              projectLink: w.projectLink || '',
              codeLink: w.codeLink || '',
              img: w.imgUrl ? urlFor(w.imgUrl).width(800).url() : '',
            };
          });
          setProjects(mapped);
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => {
        if (mounted) setProjects(fallbackProjects);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="proj-head">
          <div>
            <p className="s-label rv">Portfolio</p>
            <h2 className="s-head rv" style={{ marginBottom: 0 }}>Selected <em>Projects</em></h2>
          </div>
          <div className="pfilters rv">
            {filters.map(f => (
              <button
                className={`pf${active === f.key ? ' on' : ''}`}
                key={f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="proj-grid">
          {projects
            .filter((p) => active === 'all' || p.cat === active)
            .map((p, i) => (
              <div
                className={`pcard rv ${delays[i % 3]}`}
                key={i}
                data-cat={p.cat}
              >
                <div className="pc-img">
                  {p.img && <img src={p.img} alt={p.title} loading="lazy" />}
                  <span className="pc-cat">{p.catLabel}</span>
                  <span className="pc-yr">{p.year}</span>
                </div>
                <div className="pc-body">
                  <div className="pc-title">{p.title}</div>
                  <div className="pc-desc">{p.description}</div>
                </div>
                <div className="pc-foot">
                  <div className="pc-tags">
                    {p.tags.map(t => <span className="pc-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="pc-links">
                    {p.projectLink && (
                      <a href={p.projectLink} target="_blank" rel="noreferrer" className="pc-link" title="Live Demo">View ↗</a>
                    )}
                    {p.codeLink && (
                      <a href={p.codeLink} target="_blank" rel="noreferrer" className="pc-link pc-link--code" title="Source Code">Code ⌨</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
