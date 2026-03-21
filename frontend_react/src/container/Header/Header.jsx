import React, { useEffect } from 'react';
import './Header.scss';

const Header = () => {
  useEffect(() => {
    // Magnetic buttons
    const btns = document.querySelectorAll('.btn-ink,.btn-ghost');
    const onMove = (btn) => (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px,${y}px)`;
    };
    const onLeave = (btn) => () => { btn.style.transform = ''; };
    btns.forEach(btn => {
      btn.addEventListener('mousemove', onMove(btn));
      btn.addEventListener('mouseleave', onLeave(btn));
    });

    // 3D tilt on stat badges
    const hstats = document.querySelectorAll('.hstat');
    const onStatMove = (card) => (e) => {
      const r = card.getBoundingClientRect();
      const xp = (e.clientX - r.left) / r.width - 0.5;
      const yp = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${xp * 9}deg) rotateX(${-yp * 9}deg) translateX(-5px) translateY(-2px)`;
    };
    const onStatLeave = (card) => () => { card.style.transform = ''; };
    hstats.forEach(card => {
      card.addEventListener('mousemove', onStatMove(card));
      card.addEventListener('mouseleave', onStatLeave(card));
    });

    return () => {
      btns.forEach(btn => {
        btn.removeEventListener('mousemove', onMove(btn));
        btn.removeEventListener('mouseleave', onLeave(btn));
      });
      hstats.forEach(card => {
        card.removeEventListener('mousemove', onStatMove(card));
        card.removeEventListener('mouseleave', onStatLeave(card));
      });
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>

      {/* Floating stat badges */}
      <div className="hero-stats">
        <div className="hstat">
          <span className="hstat-icon">🚀</span>
          <div>
            <div className="hstat-num"><span className="count" data-t="47">0</span><sup>+</sup></div>
            <div className="hstat-lbl">Projects Shipped</div>
          </div>
        </div>
        <div className="hstat">
          <span className="hstat-icon">👥</span>
          <div>
            <div className="hstat-num">500<sup>K</sup></div>
            <div className="hstat-lbl">Users Impacted</div>
          </div>
        </div>
        <div className="hstat">
          <span className="hstat-icon">⚡</span>
          <div>
            <div className="hstat-num"><span className="count" data-t="85">0</span><sup>%</sup></div>
            <div className="hstat-lbl">Perf. Boost</div>
          </div>
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-chip">
          <span className="chip-dot"></span>
          Open to new projects &middot; Full Stack &amp; AI Engineer
        </div>

        <div className="hero-headline">
          <span className="hero-word w0"><span>Benjamin</span></span>
          <span className="hero-word w1"><span>Agyekum</span></span>
          <br />
          <span className="hero-word w2" style={{ marginLeft: 0 }}><span>Builds.</span></span>
        </div>

        <div className="hero-sub">
          <p className="hero-desc">
            I architect and ship <strong>full-stack digital products</strong> — from AI-powered
            learning platforms to blockchain apps, scalable cloud backends and pixel-perfect
            interfaces. <strong>47+ projects &middot; 500K+ users &middot; 5+ years</strong>
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-ink">
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="mailto:beagyekum21@gmail.com" className="btn-ghost">Let's Talk ✉</a>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Header;
