import React from "react";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="wwww.twitter.com/hislordship_9">
        <BsTwitter />
      </a>
    </div>

    <div>
      <a href="wwww.instagram.com/chicarito17">
        <BsInstagram />
      </a>
    </div>
    <div>
      <a href="https://wa.me/qr/2TJHO27E7PRRF1">
        <BsWhatsapp />
      </a>
    </div>
  </div>
);

export default SocialMedia;
