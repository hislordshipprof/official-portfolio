import React from 'react';
import './MarqueeBand.scss';

const items = [
  'React / Next.js', 'TypeScript', 'Node.js', 'Python / Django',
  'AI / ML', 'OpenAI APIs', 'AWS Cloud', 'React Native',
  'DevSecOps', 'PostgreSQL', 'MongoDB', 'EdTech Specialist'
];

const MarqueeBand = () => (
  <div className="marquee-band" aria-hidden="true">
    <div className="marquee-track">
      {[...items, ...items].map((item, i) => (
        <span className="m-item" key={i}>{item} <em>✦</em></span>
      ))}
    </div>
  </div>
);

export default MarqueeBand;
