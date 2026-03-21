import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.message) return;

    setStatus('sending');

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          title: form.subject || 'Portfolio Contact',
          message: form.message,
          time: new Date().toLocaleString(),
        }
      )
      .then(() => {
        setStatus('sent');
        setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
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
              <a href="/resume/Benjamin_Agyekum_Resume.pdf" download className="c-lnk">
                <span className="c-lnk-ico">📄</span>
                <div><div className="c-lnk-name">Download Resume</div><div className="c-lnk-sub">View full experience</div></div>
                <span className="c-arr">→</span>
              </a>
              <a href="https://github.com/hislordshipprof" target="_blank" rel="noreferrer" className="c-lnk">
                <span className="c-lnk-ico">⌨️</span>
                <div><div className="c-lnk-name">GitHub — 66 Public Repos</div><div className="c-lnk-sub">Explore my repositories</div></div>
                <span className="c-arr">→</span>
              </a>
              <a href="https://www.linkedin.com/in/bagyekum" target="_blank" rel="noreferrer" className="c-lnk">
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
          <form className="cform rv d1" onSubmit={handleSubmit} ref={formRef}>
            <div className="cf-h">Send a Message</div>
            <div className="form-row">
              <div className="fg">
                <label className="fl">First Name <span className="freq">*</span></label>
                <input className="fi" type="text" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="fg">
                <label className="fl">Last Name</label>
                <input className="fi" type="text" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="fg">
              <label className="fl">Email <span className="freq">*</span></label>
              <input className="fi" type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="fg">
              <label className="fl">Subject</label>
              <input className="fi" type="text" name="subject" placeholder="Project inquiry..." value={form.subject} onChange={handleChange} />
            </div>
            <div className="fg">
              <label className="fl">Message <span className="freq">*</span></label>
              <textarea className="fi" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required></textarea>
            </div>
            <button className={`f-sub${status === 'sending' ? ' f-loading' : ''}`} type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>
            {status === 'sent' && (
              <div className="f-msg f-success">Message sent successfully! I'll get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="f-msg f-error">Something went wrong. Please try emailing me directly at beagyekum21@gmail.com</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
