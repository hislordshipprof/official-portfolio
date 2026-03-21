import React from 'react';
import './Metrics.scss';

const achievements = [
  { title: 'API Optimization', value: '85% faster responses', desc: 'Optimized DB queries and caching.' },
  { title: 'User Engagement', value: '45% increase', desc: 'Enhanced UI/UX and interaction design.' },
  { title: 'Security', value: '100% vuln. eliminated', desc: 'Comprehensive security measures & monitoring.' },
  { title: 'Process Automation', value: '40 hrs/week saved', desc: 'Automated deployment & testing pipelines.' },
  { title: 'Mobile Performance', value: '60% faster load times', desc: 'Advanced caching on React Native apps.' },
  { title: 'Scalability', value: '300K+ concurrent users', desc: 'Systems engineered for massive scale.' },
];

const Metrics = () => (
  <section id="metrics" className="section">
    <div className="wrap">
      <div className="met-top">
        <div>
          <p className="s-label rv">Developer Impact</p>
          <h2 className="s-head rv">Measurable <em>Results</em></h2>
          <p className="s-body rv">Real business value delivered through engineering decisions that matter.</p>
        </div>
        <div className="met-numgrid rv d1">
          <div className="mn-cell">
            <div className="mn-num"><span className="count" data-t="47">0</span><sup>+</sup></div>
            <div className="mn-lbl">Projects Completed</div>
          </div>
          <div className="mn-cell">
            <div className="mn-num">500<sup>K+</sup></div>
            <div className="mn-lbl">Users Impacted</div>
          </div>
          <div className="mn-cell">
            <div className="mn-num"><span className="count" data-t="85">0</span><sup>%</sup></div>
            <div className="mn-lbl">Avg Perf. Boost</div>
          </div>
          <div className="mn-cell">
            <div className="mn-num">99.9<sup>%</sup></div>
            <div className="mn-lbl">System Uptime</div>
          </div>
        </div>
      </div>
      <div className="ach-grid">
        {achievements.map((a, i) => (
          <div className={`ach rv${i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : ''}`} key={i}>
            <div className="ach-bar"></div>
            <div>
              <div className="ach-t">{a.title}</div>
              <div className="ach-v">{a.value}</div>
              <div className="ach-d">{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Metrics;
