import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -20px 0px' }
    );

    // Observe all current .rv elements
    const observe = (el) => {
      if (!el.classList.contains('vis')) io.observe(el);
    };
    document.querySelectorAll('.rv').forEach(observe);

    // Watch for dynamically added .rv elements (async data)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList.contains('rv')) observe(node);
          node.querySelectorAll?.('.rv').forEach(observe);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
};

export default useScrollReveal;
