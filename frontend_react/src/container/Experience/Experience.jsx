import React, { useState, useEffect } from 'react';
import { client } from '../../clients';
import './Experience.scss';

const fallbackExperiences = [
  {
    period: 'Jul 2025 – Present', company: 'Studyfetch', location: 'California, USA', badge: 'Current',
    title: 'Full-Stack Software Engineer (AI & EdTech)',
    highlights: [
      'Engineered full-stack apps using React Native, Next.js & TypeScript for an AI-powered learning platform.',
      'Optimized MongoDB and PostgreSQL database architectures for improved data retrieval efficiency at scale.',
      'Built AI-powered features that measurably enhanced student engagement and comprehension outcomes.',
    ],
    win: 'Built AI-powered learning platform features',
    chips: ['React Native', 'Next.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
  },
  {
    period: 'Mar 2021 – Feb 2024', company: 'luupli.com', location: 'Remote',
    title: 'Senior Mobile Developer',
    highlights: [
      'Led React Native app for a social e-commerce platform, boosting community engagement by 45%.',
      'Engineered video playback, real-time notifications and feeds with Redux Toolkit & TypeScript.',
      'Increased user retention by over 60% through enhanced authentic interactions and performance improvements.',
    ],
    win: '45% community engagement boost',
    chips: ['React Native', 'Material UI', 'Redux Toolkit', 'TypeScript'],
  },
  {
    period: 'Mar 2017 – Oct 2020', company: 'Teamally.com', location: 'Remote',
    title: 'Full-Stack Developer',
    highlights: [
      'Built production platforms across logistics, finance, social media and coworking — impacting 5,000+ users.',
      'Achieved 90+ Lighthouse scores and sub-second Time to Interactive via Next.js, Node.js and Django.',
    ],
    win: '5,000+ users impacted across industries',
    chips: ['Next.js', 'Node.js', 'Django', 'RESTful APIs'],
  },
  {
    period: 'Feb 2021 – Aug 2021', company: 'AmalTech GmbH', location: 'Remote',
    title: 'Software Engineer Intern',
    highlights: [
      'Built scalable Python/Django backend for a Community Learning Platform, cutting API response times by 15%.',
      'React.js front-ends with Redux improved user engagement by 30% across 300+ active users.',
    ],
    win: '15% faster API response times',
    chips: ['Python', 'Django', 'PostgreSQL', 'React.js'],
  },
  {
    period: 'Dec 2021 – May 2022', company: 'Microverse', location: 'San Francisco',
    title: 'Software Developer Intern',
    highlights: [
      'Designed an analytics dashboard using React.js and D3.js with a global remote team of engineers.',
      'Integrated Node.js with Azure cloud services, improving overall app performance by 25%.',
    ],
    win: '25% performance improvement via Azure',
    chips: ['React.js', 'D3.js', 'Node.js', 'Azure'],
  },
];

const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Experience = () => {
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    let mounted = true;
    // workExperience documents are stored at top level in the old schema
    const query = '*[_type == "workExperience"] | order(startDate desc)';

    client
      .fetch(query)
      .then((data) => {
        if (!mounted || !data || !data.length) return;
        const mapped = data.map((w) => {
          const start = formatDate(w.startDate);
          const end = w.endDate ? formatDate(w.endDate) : 'Present';
          const isNow = !w.endDate;
          return {
            period: `${start} – ${end}`,
            company: w.company || '',
            location: w.location || '',
            badge: isNow ? 'Current' : null,
            title: w.position || '',
            highlights: w.responsibilities || w.achievements || [],
            win: w.achievements && w.achievements.length ? w.achievements[0] : '',
            chips: w.technologies || [],
          };
        });
        setExperiences(mapped);
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <div className="exp-top">
          <div>
            <p className="s-label rv">Experience</p>
            <h2 className="s-head rv">Professional <em>Journey</em></h2>
          </div>
          <p className="s-body rv" style={{ maxWidth: 300, textAlign: 'right' }}>
            A track record of innovation across global teams — from startup to enterprise.
          </p>
        </div>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className="tl-row rv" key={i}>
              <div className="tl-meta">
                <div className="tl-period">{exp.period}</div>
                <div className="tl-co">{exp.company}</div>
                <div className="tl-loc">{exp.location}</div>
                {exp.badge && <div className="tl-badge">{exp.badge}</div>}
              </div>
              <div className="tl-spine"></div>
              <div className="tl-body">
                <div className="tl-title">{exp.title}</div>
                <ul className="tl-hl">
                  {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
                {exp.win && <div className="tl-win">🏆 {exp.win}</div>}
                <div className="tl-chips">
                  {exp.chips.map(c => <span className="chip" key={c}>{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
