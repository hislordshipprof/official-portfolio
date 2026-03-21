import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer>
    <div className="foot-inner">
      <a href="#hero" className="foot-logo">Benjamin<span className="dot"></span></a>
      <p className="foot-copy">&copy; 2026 Benjamin Agyekum &middot; All rights reserved</p>
      <div className="foot-soc">
        <a href="#" className="fsoc" title="Twitter">𝕏</a>
        <a href="#" className="fsoc" title="LinkedIn">in</a>
        <a href="https://github.com" className="fsoc" title="GitHub" target="_blank" rel="noreferrer">gh</a>
        <a href="https://wa.me/19703910990" className="fsoc" title="WhatsApp" target="_blank" rel="noreferrer">wa</a>
      </div>
    </div>
  </footer>
);

export default Footer;
