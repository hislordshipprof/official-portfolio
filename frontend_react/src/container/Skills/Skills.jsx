import React, { useEffect } from 'react';
import './Skills.scss';

const skillGroups = [
  {
    icon: '🎨', name: 'Frontend', sub: 'UI Frameworks & Languages', delay: '',
    bars: [
      { label: 'React / Next.js', pct: 95 },
      { label: 'TypeScript', pct: 94 },
      { label: 'React Native', pct: 78 },
    ],
  },
  {
    icon: '⚙️', name: 'Backend', sub: 'Servers, APIs & Frameworks', delay: 'd1',
    bars: [
      { label: 'Node.js', pct: 92 },
      { label: 'Python / Django', pct: 90 },
      { label: 'AI / ML & OpenAI', pct: 88 },
    ],
  },
  {
    icon: '☁️', name: 'Infrastructure', sub: 'Cloud, Data & DevOps', delay: 'd2',
    bars: [
      { label: 'AWS Cloud', pct: 85 },
      { label: 'MongoDB', pct: 88 },
      { label: 'PostgreSQL', pct: 86 },
    ],
  },
];

const Skills = () => {
  useEffect(() => {
    const fills = document.querySelectorAll('.sb-fill');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w + '%';
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    fills.forEach((f) => observer.observe(f));

    // Radial glow
    const cards = document.querySelectorAll('.sk-card');
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

    return () => {
      observer.disconnect();
      handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler));
    };
  }, []);

  return (
    <section id="skills">
      <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112 }}>
        <p className="s-label rv">Skills Radar</p>
        <h2 className="s-head rv">Technology <em>Proficiency</em></h2>
        <p className="s-body rv">Deep expertise across frontend, backend, cloud and AI engineering stacks.</p>
        <div className="sk-grid">
          {skillGroups.map((group) => (
            <div className={`sk-card rv ${group.delay}`} key={group.name}>
              <div className="sk-icon">{group.icon}</div>
              <div className="sk-name">{group.name}</div>
              <div className="sk-sub">{group.sub}</div>
              <div className="sk-bars">
                {group.bars.map((bar) => (
                  <div key={bar.label}>
                    <div className="sbl">{bar.label}<span>{bar.pct}%</span></div>
                    <div className="sb-track"><div className="sb-fill" data-w={bar.pct}></div></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
