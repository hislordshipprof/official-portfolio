import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload, 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope,
  FaRocket,
  FaHandshake,
  FaPhone,
  FaPaperPlane
} from 'react-icons/fa';
import { HiStar, HiLightningBolt } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import { client } from '../../clients';
import './CallToAction.scss';

const CallToAction = () => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume/Benjamin_Agyekum_Resume.pdf';
    link.download = 'Benjamin_Agyekum_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'beagyekum21@gmail.com',
      href: 'mailto:beagyekum21@gmail.com',
      color: '#ea4335'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+1 970 391 0990',
      href: 'tel:+19703910990',
      color: '#4ade80'
    }
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      label: 'GitHub Profile',
      url: 'https://github.com/hislordshipprof',
      color: '#333',
      description: 'View my code repositories'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn Profile', 
      url: 'https://www.linkedin.com/in/bagyekum/',
      color: '#0077b5',
      description: 'Connect professionally'
    }
  ];

  return (
    <div className="app__cta-section">
      {/* Background Elements */}
      <div className="cta-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="cta-content">
        <motion.div
          whileInView={{ opacity: [0, 1], y: [50, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="cta-header"
        >
          <div className="cta-badge">
            <HiStar className="badge-icon" />
            <span>Ready to Collaborate?</span>
          </div>
          
          <h2 className="cta-title">
            Let's Build Something <span className="highlight">Amazing</span> Together
          </h2>
          
          <p className="cta-description">
            Passionate about creating innovative solutions that make a difference. 
            Whether you're looking for a full-stack developer, AI specialist, or technical consultant, 
            I'm here to help bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="cta-actions"
        >
          {/* Primary Actions */}
          <div className="primary-actions">
            <motion.button
              className="cta-btn primary-btn download-btn"
              onClick={handleResumeDownload}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="btn-icon" />
              <span className="btn-text">
                <strong>Download Resume</strong>
                <small>View my full experience</small>
              </span>
            </motion.button>

            <motion.a
              href="https://github.com/hislordshipprof"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary-btn github-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="btn-icon" />
              <span className="btn-text">
                <strong>View GitHub</strong>
                <small>Explore my repositories</small>
              </span>
            </motion.a>
          </div>

          {/* Quick Connect */}
          <div className="quick-connect">
            <h4 className="connect-title">
              <HiLightningBolt className="title-icon" />
              Quick Connect
            </h4>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--link-color': link.color }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={link.description}
                >
                  {link.icon}
                  <span className="link-label">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="contact-section"
        >
          <h3 className="contact-title">
            Let's Have a Coffee & Chat
          </h3>

          {/* Contact Info Cards */}
          <div className="contact-info-cards">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                className="contact-card"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--contact-color': contact.color }}
              >
                <div className="contact-icon">
                  {contact.icon}
                </div>
                <div className="contact-details">
                  <span className="contact-label">{contact.label}</span>
                  <span className="contact-value">{contact.value}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          {!isFormSubmitted ? (
            <motion.div 
              className="contact-form"
              whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  placeholder="Your Message"
                  name="message"
                  value={message}
                  onChange={handleChangeInput}
                  rows="4"
                  required
                />
              </div>
              <motion.button 
                type="button" 
                className="form-submit-btn" 
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                <FaPaperPlane className="submit-icon" />
                <span>{!loading ? "Send Message" : "Sending..."}</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="form-success"
              whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
              transition={{ duration: 0.6 }}
            >
              <FaRocket className="success-icon" />
              <h4>Thank you for getting in touch!</h4>
              <p>I'll get back to you as soon as possible.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats & Highlights */}
        <motion.div
          whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="cta-highlights"
        >
          <div className="highlight-item">
            <FaRocket className="highlight-icon" />
            <div className="highlight-content">
              <strong>Fast Delivery</strong>
              <span>Quality solutions, delivered on time</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <HiLightningBolt className="highlight-icon" />
            <div className="highlight-content">
              <strong>Modern Tech</strong>
              <span>Latest frameworks & best practices</span>
            </div>
          </div>
          
          <div className="highlight-item">
            <FaHandshake className="highlight-icon" />
            <div className="highlight-content">
              <strong>Collaborative</strong>
              <span>Clear communication & teamwork</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(CallToAction, "app__cta"),
  "contact",
  "app__primarybg"
);
