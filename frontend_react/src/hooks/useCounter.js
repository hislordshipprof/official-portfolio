import { useEffect } from 'react';

const useCounter = () => {
  useEffect(() => {
    const counters = document.querySelectorAll('.count');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const tgt = +el.dataset.t;
            const dur = 1600;
            let v = 0;
            const step = (tgt / dur) * 16;
            const t = setInterval(() => {
              v = Math.min(v + step, tgt);
              el.textContent = Math.round(v);
              if (v >= tgt) clearInterval(t);
            }, 16);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
};

export default useCounter;
