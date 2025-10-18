import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOfficeBuilding, HiLocationMarker, HiCalendar, HiCode, HiStar, HiTrendingUp } from "react-icons/hi";
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaAws, FaDocker } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiPostgresql, SiFirebase } from "react-icons/si";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../clients";
import { images } from "../../constants";
import "./Experience.scss";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  // Tech icon mapping for visual representation
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <FaReact className="tech-icon react" />;
    if (techLower.includes('node')) return <FaNodeJs className="tech-icon node" />;
    if (techLower.includes('python')) return <FaPython className="tech-icon python" />;
    if (techLower.includes('typescript')) return <SiTypescript className="tech-icon typescript" />;
    if (techLower.includes('mongodb')) return <SiMongodb className="tech-icon mongodb" />;
    if (techLower.includes('postgresql')) return <SiPostgresql className="tech-icon postgresql" />;
    if (techLower.includes('firebase')) return <SiFirebase className="tech-icon firebase" />;
    if (techLower.includes('aws')) return <FaAws className="tech-icon aws" />;
    if (techLower.includes('docker')) return <FaDocker className="tech-icon docker" />;
    return <HiCode className="tech-icon default" />;
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    const query = '*[_type == "workExperience"] | order(startDate desc)';
    
    console.log('🔍 Experience Component - Fetching work experience...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Work Experience Data Success:', data);
          setExperiences(data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Work Experience Data Error:', error);
          setExperiences([]);
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

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (diffYears > 0) {
      return `${diffYears}y ${diffMonths}m`;
    }
    return `${diffMonths}m`;
  };

  return (
    <div className="app__experience-section">
      <div className="section-header">
        <div className="section-profile">
          <img src={images.profilePhoto} alt="Benjamin - Professional Profile" className="section-profile-img" />
        </div>
        <h2 className="head-text">
          Professional <span>Experience</span>
        </h2>
        <p className="section-subtitle">A journey of innovation and growth in software development</p>
      </div>

      <div className="app__experience-grid">
        {experiences.map((exp, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="experience-card-wrapper"
            key={index}
          >
            {/* Experience Card */}
            <motion.div 
              className="app__experience-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Header with Date Badge */}
              <div className="card-header">
                <div className="date-badge">
                  <HiCalendar className="date-icon" />
                  <div className="date-info">
                    <span className="date-text">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                    <span className="duration-text">
                      {calculateDuration(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                </div>
                
                <h3 className="position-title">{exp.position || 'Position'}</h3>
                
                <div className="company-info">
                  <div className="company-name">
                    <HiOfficeBuilding className="company-icon" />
                    <span>{exp.company || 'Company'}</span>
                  </div>
                  <div className="company-location">
                    <HiLocationMarker className="location-icon" />
                    <span>{exp.location || 'Remote'}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <div className="responsibilities-section">
                  <h4 className="section-title">
                    <HiStar className="section-icon" />
                    Key Highlights
                  </h4>
                  <ul className="responsibilities-list">
                    {exp.responsibilities && exp.responsibilities.slice(0, 2).map((resp, i) => (
                      <li key={i} className="responsibility-item">{resp}</li>
                    ))}
                  </ul>
                  {exp.responsibilities && exp.responsibilities.length > 2 && (
                    <button className="expand-btn">
                      +{exp.responsibilities.length - 2} more
                    </button>
                  )}
                </div>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="achievements-section">
                    <h4 className="section-title">
                      <HiTrendingUp className="section-icon" />
                      Achievements
                    </h4>
                    <ul className="achievements-list">
                      {exp.achievements.slice(0, 1).map((achievement, i) => (
                        <li key={i} className="achievement-item">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Technologies Footer */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="card-footer">
                  <div className="tech-stack">
                    {exp.technologies.slice(0, 4).map((tech, i) => (
                      <motion.div
                        key={i}
                        className="tech-badge"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getTechIcon(tech)}
                        <span className="tech-name">{tech}</span>
                      </motion.div>
                    ))}
                    {exp.technologies.length > 4 && (
                      <div className="tech-more">+{exp.technologies.length - 4}</div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Experience, "app__experience"),
  "experience",
  "app__whitebg"
);
