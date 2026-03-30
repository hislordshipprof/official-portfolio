import React, { useState, useEffect } from 'react';
import { client } from '../../clients';
import './Testimonial.scss';

const fallback = {
  feedback: "His attention to detail is incredible. He has proven to be very innovative and will work with ideas that I have as well, thinking of new ways to bring more traffic to our site in ways I would never have considered. His pricing is unique and logical, saving me money and achieving measurable results at the same time.",
  name: 'Lawrence',
  company: 'Arizona State College',
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([fallback]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    const query = '*[_type == "testimonials"]';

    client
      .fetch(query)
      .then((data) => {
        if (!mounted || !data || !data.length) return;
        setTestimonials(data);
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  const current = testimonials[idx] || fallback;

  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonial">
      <div className="testi-inner rv">
        <div className="testi-quote" key={idx}>
          "{current.feedback}"
        </div>
        <div className="testi-author" key={`a-${idx}`}>
          <strong>{current.name}</strong>
          {current.company}
        </div>
        {testimonials.length > 1 && (
          <div className="testi-nav">
            <button className="testi-btn" onClick={prev} aria-label="Previous">←</button>
            <span className="testi-count">{idx + 1} / {testimonials.length}</span>
            <button className="testi-btn" onClick={next} aria-label="Next">→</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
