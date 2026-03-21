import React, { useEffect } from 'react';
import './About.scss';

const About = () => {
  useEffect(() => {
    const cells = document.querySelectorAll('.bc');
    const handlers = [];
    cells.forEach(cell => {
      const handler = (e) => {
        const r = cell.getBoundingClientRect();
        cell.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        cell.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      };
      cell.addEventListener('mousemove', handler);
      handlers.push({ cell, handler });
    });
    return () => handlers.forEach(({ cell, handler }) => cell.removeEventListener('mousemove', handler));
  }, []);

  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="s-label rv">About</p>
        <h2 className="s-head rv">Who Is <em>Benjamin?</em></h2>

        <div className="bento">
          <div className="bc bc-bio rv">
            <div className="bc-label">Background</div>
            <div className="bc-bio-body">
              <p>I'm <strong>Benjamin</strong> — a Full-Stack Engineer and AI Developer who cares deeply about every layer of the product. I've shipped production applications for startups across California, San Francisco, and globally distributed teams, collectively impacting over <strong>500,000 users</strong>.</p>
              <p>My superpower is <strong>connecting design, engineering and AI</strong> — building experiences that genuinely move the needle. From architecting cloud infrastructure to integrating cutting-edge LLM pipelines, I bring a holistic and detail-driven approach to every problem I take on.</p>
            </div>
          </div>

          <div className="bc bc-card rv d1">
            <div className="bc-avatar">👨🏾‍💻</div>
            <div className="bc-name">Benjamin</div>
            <div className="bc-role-title">Full Stack · AI Specialist · EdTech · DevSecOps</div>
            <div className="bc-status">Available for new projects</div>
            <div className="bc-tags">
              {['React / Next.js', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'AWS', 'React Native', 'DevSecOps'].map(tag => (
                <span className="bc-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="bc bc-role rv d1">
            <div className="bc-role-icon">⚙️</div>
            <div className="bc-role-name">Full-Stack Engineer</div>
            <div className="bc-role-desc">React, Next.js, Node.js &amp; Python — end-to-end production delivery.</div>
          </div>
          <div className="bc bc-role rv d2">
            <div className="bc-role-icon">🤖</div>
            <div className="bc-role-name">AI/ML Developer</div>
            <div className="bc-role-desc">OpenAI, NLP, and intelligent UI integration for modern apps.</div>
          </div>
          <div className="bc bc-role rv d3">
            <div className="bc-role-icon">🔒</div>
            <div className="bc-role-name">DevSecOps</div>
            <div className="bc-role-desc">Secure CI/CD pipelines &amp; cloud-native automation at scale.</div>
          </div>

          <div className="bc bc-stat rv d1">
            <div className="bc-stat-n"><span className="count" data-t="47">0</span><sup>+</sup></div>
            <div className="bc-stat-l">Projects Shipped</div>
          </div>
          <div className="bc bc-stat rv d2">
            <div className="bc-stat-n">500<sup>K</sup></div>
            <div className="bc-stat-l">Users Impacted</div>
          </div>
          <div className="bc bc-stat rv d3">
            <div className="bc-stat-n"><span className="count" data-t="5">0</span><sup>+</sup></div>
            <div className="bc-stat-l">Years Experience</div>
          </div>

          <div className="bc bc-role bc-edtech rv d2">
            <div className="bc-role-icon">📚</div>
            <div className="bc-role-name">EdTech Specialist</div>
            <div className="bc-role-desc">AI-powered educational platforms improving student engagement &amp; outcomes.</div>
          </div>

          <div className="bc bc-testi rv">
            <div className="bc-quote">
              "His attention to detail is incredible. He has proven to be very innovative and will work with ideas that I have as well — thinking of new ways to bring more traffic to our site in ways I would never have considered."
            </div>
            <div className="bc-author">— Lawrence · Arizona State College</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
