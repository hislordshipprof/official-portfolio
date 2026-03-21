import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer>
    <div className="foot-inner">
      <a href="#hero" className="foot-logo">Benjamin<span className="dot"></span></a>
      <p className="foot-copy">&copy; 2026 Benjamin Agyekum &middot; All rights reserved</p>
      <div className="foot-soc">
        <a href="https://twitter.com/hislordship_9" className="fsoc" title="Twitter" target="_blank" rel="noreferrer">𝕏</a>
        <a href="https://www.linkedin.com/in/bagyekum" className="fsoc" title="LinkedIn" target="_blank" rel="noreferrer">in</a>
        <a href="https://github.com/hislordshipprof" className="fsoc" title="GitHub" target="_blank" rel="noreferrer">gh</a>
        <a href="https://wa.me/19703910990" className="fsoc" title="WhatsApp" target="_blank" rel="noreferrer">wa</a>
      </div>
    </div>
  </footer>
);

export default Footer;
