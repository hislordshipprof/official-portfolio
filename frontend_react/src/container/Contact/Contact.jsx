import React, { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailTo = `mailto:beagyekum21@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.firstName} ${form.lastName} (${form.email})\n\n${form.message}`)}`;
    window.location.href = mailTo;
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <p className="s-label rv">Get In Touch</p>
        <h2 className="s-head rv">Let's Build Something <em>Amazing</em></h2>
        <p className="s-body rv">Whether you need a full-stack developer, AI specialist, or technical consultant — I'm ready to bring your vision to life.</p>
        <div className="contact-grid">
          <div className="rv">
            <div className="c-detail">
              <div className="c-ico">✉️</div>
              <div><div className="c-lb">Email</div><div className="c-val"><a href="mailto:beagyekum21@gmail.com">beagyekum21@gmail.com</a></div></div>
            </div>
            <div className="c-detail">
              <div className="c-ico">📞</div>
              <div><div className="c-lb">Phone</div><div className="c-val">+1 970 391 0990</div></div>
            </div>
            <div className="c-links">
              <a href="#" className="c-lnk">
                <span className="c-lnk-ico">📄</span>
                <div><div className="c-lnk-name">Download Resume</div><div className="c-lnk-sub">View full experience</div></div>
                <span className="c-arr">→</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="c-lnk">
                <span className="c-lnk-ico">⌨️</span>
                <div><div className="c-lnk-name">GitHub — 66 Public Repos</div><div className="c-lnk-sub">Explore my repositories</div></div>
                <span className="c-arr">→</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="c-lnk">
                <span className="c-lnk-ico">💼</span>
                <div><div className="c-lnk-name">LinkedIn Profile</div><div className="c-lnk-sub">Connect professionally</div></div>
                <span className="c-arr">→</span>
              </a>
              <a href="https://wa.me/19703910990" target="_blank" rel="noreferrer" className="c-lnk">
                <span className="c-lnk-ico">💬</span>
                <div><div className="c-lnk-name">WhatsApp</div><div className="c-lnk-sub">Quick chat, fast replies</div></div>
                <span className="c-arr">→</span>
              </a>
            </div>
          </div>
          <form className="cform rv d1" onSubmit={handleSubmit}>
            <div className="cf-h">Send a Message</div>
            <div className="form-row">
              <div className="fg"><label className="fl">First Name</label><input className="fi" type="text" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} /></div>
              <div className="fg"><label className="fl">Last Name</label><input className="fi" type="text" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} /></div>
            </div>
            <div className="fg"><label className="fl">Email</label><input className="fi" type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} /></div>
            <div className="fg"><label className="fl">Subject</label><input className="fi" type="text" name="subject" placeholder="Project inquiry..." value={form.subject} onChange={handleChange} /></div>
            <div className="fg"><label className="fl">Message</label><textarea className="fi" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange}></textarea></div>
            <button className="f-sub" type="submit">Send Message →</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
