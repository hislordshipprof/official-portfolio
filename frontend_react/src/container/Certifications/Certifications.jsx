import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../clients";
import "./Certifications.scss";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    const query = '*[_type == "certifications"] | order(date desc)';
    
    console.log('🔍 Certifications Component - Fetching certifications...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Certifications Data Success:', data);
          setCertifications(data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Certifications Data Error:', error);
          setCertifications([]);
        }
      });

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <>
      <h2 className="head-text">
        Certifications & <span>Achievements</span>
      </h2>

      <div className="app__certifications-container">
        {certifications.map((cert, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="app__certification-item"
            key={index}
          >
            <div className="certification-icon">
              {cert.type === 'AI/ML' ? '🤖' : 
               cert.type === 'Data' ? '📊' : 
               cert.type === 'Programming' ? '💻' : 
               '🏆'}
            </div>
            
            <div className="certification-content">
              <h4 className="bold-text">{cert.title || 'Certification Title'}</h4>
              
              {cert.issuer && (
                <p className="certification-issuer">{cert.issuer}</p>
              )}
              
              {cert.date && (
                <p className="certification-date">{formatDate(cert.date)}</p>
              )}
              
              {cert.description && (
                <p className="p-text certification-desc">{cert.description}</p>
              )}
              
              {cert.skills && cert.skills.length > 0 && (
                <div className="certification-skills">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
              
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="certification-link"
                >
                  View Credential →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certifications, "app__certifications"),
  "certifications",
  "app__whitebg"
);
