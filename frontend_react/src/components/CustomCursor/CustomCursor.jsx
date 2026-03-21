import React, { useEffect, useRef } from 'react';
import './CustomCursor.scss';

const CustomCursor = () => {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = e.clientX + 'px';
        curRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    let raf;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.075;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.075;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const hoverTargets = 'a,button,.pcard,.bc,.tl-row,.sk-card,.cert-card,.ach,.mn-cell,.hstat';
    const onEnter = () => document.body.classList.add('hov');
    const onLeave = () => document.body.classList.remove('hov');

    const observer = new MutationObserver(() => {
      document.querySelectorAll(hoverTargets).forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
    </>
  );
};

export default CustomCursor;
