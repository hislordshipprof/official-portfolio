import React, { useState, useEffect } from 'react';
import { client } from '../../clients';
import './Certifications.scss';

const typeIcons = { 'AI/ML': '🤖', Data: '🧠', Programming: '💻', DevOps: '☁️', Other: '📜' };

const fallbackCerts = [
  { icon: '🤖', title: 'Natural Language Processing and Artificial Intelligence', issuer: 'AI Certification Institute', date: 'Feb 2024', tags: ['NLP', 'Language Models', 'Chatbots', 'Sentiment Analysis'], credentialUrl: '' },
  { icon: '🧠', title: 'Machine Learning & AI Engineer', issuer: 'Professional Certification Body', date: 'Dec 2023', tags: ['ML', 'Neural Networks', 'TensorFlow', 'PyTorch'], credentialUrl: '' },
  { icon: '💻', title: 'Data Structure and Algorithm', issuer: 'Technical Certification Institute', date: 'May 2023', tags: ['Algorithms', 'Problem Solving', 'Complexity Analysis'], credentialUrl: '' },
];

const Certifications = () => {
  const [certs, setCerts] = useState(fallbackCerts);

  useEffect(() => {
    let mounted = true;
    const query = '*[_type == "certifications"] | order(date desc)';

    client
      .fetch(query)
      .then((data) => {
        if (!mounted || !data || !data.length) return;
        const mapped = data.map((c) => ({
          icon: typeIcons[c.type] || '📜',
          title: c.title || '',
          issuer: c.issuer || '',
          date: c.date
            ? new Date(c.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : '',
          tags: c.skills || [],
          credentialUrl: c.credentialUrl || '',
        }));
        setCerts(mapped);
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  return (
    <section id="certifications" className="section">
      <div className="wrap">
        <p className="s-label rv">Credentials</p>
        <h2 className="s-head rv">Certifications &amp; <em>Achievements</em></h2>
        <div className="cert-grid">
          {certs.map((cert, i) => (
            <div className={`cert-card rv${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`} key={i}>
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-title">{cert.title}</div>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-date">{cert.date}</div>
              <div className="cert-tags">
                {cert.tags.map(t => <span className="ct" key={t}>{t}</span>)}
              </div>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="cert-link">
                  View Credential ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
