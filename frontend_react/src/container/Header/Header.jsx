import React, { useEffect, useRef } from 'react';
import './Header.scss';

/* ── Floating code particles ── */
const CODE_SNIPPETS = [
  'const ai = new GPT()',
  'async buildApp()',
  '=> useNextJs()',
  'type Stack = AI | Web',
  'deploy({ cloud: "AWS" })',
  '.map(user => impact++)',
  'await ship(product)',
  'interface User { id }',
  'export default React',
  'git push origin main',
  'npm run build ✓',
  '500_000 users',
  'Lighthouse: 99',
  'TypeScript strict',
  'const [state, set]',
  'useEffect(()=>{})',
];

/* ── Typewriter code lines ── */
const CODE_LINES = [
  { n: 1,  tokens: [['kw','const'], ['',' '], ['fn','buildProduct'], ['',' '], ['op','='], ['',' '], ['kw','async'], ['',' () '], ['op','=>'], ['',' {']] },
  { n: 2,  tokens: [['','  '], ['kw','const'], ['',' stack '], ['op','='], ['',' {']] },
  { n: 3,  tokens: [['','    frontend: '], ['str','"Next.js"'], ['',',']] },
  { n: 4,  tokens: [['','    ai: '], ['str','"OpenAI GPT"'], ['',',']] },
  { n: 5,  tokens: [['','    cloud: '], ['str','"AWS"'], ['',',']] },
  { n: 6,  tokens: [['','  }']] },
  { n: 7,  tokens: [['',' ']] },
  { n: 8,  tokens: [['','  '], ['cmt','// ship fast, ship right']] },
  { n: 9,  tokens: [['','  '], ['kw','await'], ['',' '], ['fn','deploy'], ['','(stack)']] },
  { n: 10, tokens: [['',' ']] },
  { n: 11, tokens: [['','  '], ['kw','return'], ['',' {']] },
  { n: 12, tokens: [['','    users: '], ['num','500_000'], ['',',']] },
  { n: 13, tokens: [['','    perf:  '], ['num','99'], ['op','+'], ['',',']] },
  { n: 14, tokens: [['','    uptime:'], ['str','"99.9%"']] },
  { n: 15, tokens: [['','  }']] },
  { n: 16, tokens: [['','}']] },
];

const TECH_PILLS = [
  { icon: '⚛️', label: 'React / Next.js' },
  { icon: '🤖', label: 'AI / ML' },
  { icon: '🟦', label: 'TypeScript' },
  { icon: '☁️', label: 'AWS Cloud' },
  { icon: '🐍', label: 'Python' },
  { icon: '📱', label: 'React Native' },
];

const Header = () => {
  const heroRef = useRef(null);
  const caBodyRef = useRef(null);

  useEffect(() => {
    /* ── Floating code particles ── */
    const hero = heroRef.current;
    if (!hero) return;
    let idx = 0;
    const timers = [];

    function spawn() {
      const el = document.createElement('span');
      el.className = 'code-particle';
      el.textContent = CODE_SNIPPETS[idx % CODE_SNIPPETS.length];
      idx++;
      const leftPct = 5 + Math.random() * 55;
      const dur = 14 + Math.random() * 12;
      const delay = Math.random() * -dur;
      const drift = (Math.random() - 0.5) * 80;
      el.style.cssText = `left:${leftPct}%;bottom:-20px;--dur:${dur}s;--delay:${delay}s;--drift:${drift}px;`;
      hero.appendChild(el);
      setTimeout(() => el.remove(), (dur + Math.abs(delay)) * 1000 + 2000);
    }

    for (let j = 0; j < 10; j++) timers.push(setTimeout(spawn, j * 400));
    const interval = setInterval(spawn, 1800);

    /* ── Code artifact typewriter ── */
    const body = caBodyRef.current;
    if (body) {
      let lineIdx = 0;
      let charIdx = 0;
      let cursorEl = null;

      function nextChar() {
        if (lineIdx >= CODE_LINES.length) return;
        const line = CODE_LINES[lineIdx];
        const plainText = line.tokens.map(t => t[1]).join('');

        if (charIdx === 0) {
          const row = document.createElement('div');
          row.className = 'ca-line';
          const ln = document.createElement('span');
          ln.className = 'ca-ln';
          ln.textContent = line.n;
          const code = document.createElement('span');
          code.className = 'ca-code';
          if (cursorEl) cursorEl.remove();
          cursorEl = document.createElement('span');
          cursorEl.className = 't-cursor';
          code.appendChild(cursorEl);
          row.appendChild(ln);
          row.appendChild(code);
          body.appendChild(row);
        }

        charIdx++;
        const codeEl = body.lastChild.querySelector('.ca-code');

        if (charIdx >= plainText.length) {
          // Render full line with syntax highlighting
          const html = line.tokens.map(([cls, txt]) =>
            cls ? `<span class="t-${cls}">${txt}</span>` : txt
          ).join('').replace(/ /g, '&nbsp;');
          codeEl.innerHTML = html;
          cursorEl = document.createElement('span');
          cursorEl.className = 't-cursor';
          codeEl.appendChild(cursorEl);
          lineIdx++;
          charIdx = 0;
          const pause = plainText.trim() === '' ? 40 : 80 + Math.random() * 40;
          setTimeout(nextChar, pause);
        } else {
          // Partial render
          let shown = '';
          let count = 0;
          for (const [cls, txt] of line.tokens) {
            for (const ch of txt) {
              if (count >= charIdx) break;
              shown += cls ? `<span class="t-${cls}">${ch}</span>` : ch;
              count++;
            }
            if (count >= charIdx) break;
          }
          codeEl.innerHTML = shown.replace(/ /g, '&nbsp;');
          cursorEl = document.createElement('span');
          cursorEl.className = 't-cursor';
          codeEl.appendChild(cursorEl);
          setTimeout(nextChar, 28 + Math.random() * 20);
        }
      }

      timers.push(setTimeout(nextChar, 1400));
    }

    /* ── Magnetic buttons ── */
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

    /* ── 3D tilt on stat badges ── */
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
      timers.forEach(clearTimeout);
      clearInterval(interval);
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
    <section id="hero" ref={heroRef}>
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>

      {/* Code artifact card (typewriter) */}
      <div className="code-artifact">
        <div className="ca-bar">
          <span className="ca-dot red"></span>
          <span className="ca-dot yel"></span>
          <span className="ca-dot grn"></span>
          <span className="ca-filename">benjamin.buildProduct.ts</span>
        </div>
        <div className="ca-body" ref={caBodyRef}></div>
      </div>

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

        {/* Cinematic headline with spring physics */}
        <div className="hero-headline">
          <span className="hero-word w0"><span>Benjamin</span></span>
          <br />
          <span className="hero-word w2" style={{ marginLeft: 0 }}><span>Builds.</span></span>
        </div>

        {/* Tech stack pills */}
        <div className="hero-tech-row">
          {TECH_PILLS.map(pill => (
            <span className="tech-pill" data-icon={pill.icon} key={pill.label}>{pill.label}</span>
          ))}
        </div>

        <div className="hero-sub">
          <p className="hero-desc">
            I architect and ship <strong>full-stack digital products</strong> — from AI-powered
            learning platforms to blockchain apps, scalable cloud backends and pixel-perfect
            interfaces. <strong>47+ projects &middot; 500K+ users &middot; 5+ years</strong>
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-ink" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact" className="btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Hire Me ✉</a>
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
