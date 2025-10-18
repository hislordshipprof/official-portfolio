import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiLocationMarker, HiCalendar, HiBookOpen, HiStar, HiTrendingUp } from "react-icons/hi";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../clients";
import "./Education.scss";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    const query = '*[_type == "education"] | order(startDate desc)';
    
    console.log('🔍 Education Component - Fetching education...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Education Data Success:', data);
          setEducation(data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Education Data Error:', error);
          setEducation([]);
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
    <div className="app__education-section">
      <h2 className="head-text">
        Education <span>Background</span>
      </h2>

      <div className="app__education-grid">
        {education.map((edu, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="education-card-wrapper"
            key={index}
          >
            {/* Education Card */}
            <motion.div 
              className="app__education-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Header with Date Badge */}
              <div className="card-header">
                <div className="date-badge">
                  <HiCalendar className="date-icon" />
                  <div className="date-info">
                    <span className="date-text">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                    <span className="duration-text">
                      {calculateDuration(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                </div>
                
                <h3 className="degree-title">{edu.degree || 'Degree'}</h3>
                <h4 className="field-title">{edu.field || 'Field of Study'}</h4>
                
                <div className="institution-info">
                  <div className="institution-name">
                    <HiAcademicCap className="institution-icon" />
                    <span>{edu.institution || 'Institution'}</span>
                  </div>
                  {edu.location && (
                    <div className="institution-location">
                      <HiLocationMarker className="location-icon" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                {/* GPA Section */}
                {edu.gpa && (
                  <div className="gpa-section">
                    <div className="gpa-display">
                      <HiTrendingUp className="gpa-icon" />
                      <span className="gpa-label">GPA:</span>
                      <span className="gpa-value">{edu.gpa}</span>
                    </div>
                  </div>
                )}

                {/* Coursework Section */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="coursework-section">
                    <h4 className="section-title">
                      <HiBookOpen className="section-icon" />
                      Relevant Coursework
                    </h4>
                    <div className="coursework-list">
                      {edu.coursework.slice(0, 3).map((course, i) => (
                        <span key={i} className="course-badge">{course}</span>
                      ))}
                      {edu.coursework.length > 3 && (
                        <button className="expand-btn">
                          +{edu.coursework.length - 3} more
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="achievements-section">
                    <h4 className="section-title">
                      <HiStar className="section-icon" />
                      Achievements
                    </h4>
                    <ul className="achievements-list">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="achievement-item">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Education, "app__education"),
  "education",
  "app__primarybg"
);
