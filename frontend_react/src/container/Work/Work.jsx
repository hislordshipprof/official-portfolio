import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../clients";
import "./Work.scss";

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  // Function to get the appropriate project image from public folder
  const getProjectImage = (projectTitle) => {
    const imageMap = {
      'Resume AI - Intelligent Resume Tailoring System': '/images/projects/Intelligent Resume Tailoring Design.png',
      'Full Stack Uber Clone': '/images/projects/Full Stack Uber Clone Design.png',
      'IntervuAI - AI Interview Preparation': '/images/projects/IntervuAI_ Your Interview Prep Partner.png',
      'Movie Finder App with Extensive Search': '/images/projects/movie.png',
      'Student Management System': '/images/projects/Student Management App Interface Overview.png',
      'Blockchain Web Application': '/images/projects/crypto.png',
      'React Fitness Training App': '/images/projects/React Fitness App Promo Design.png',
      'NFT Marketplace - Modern UI/UX': '/images/projects/nft.png',
      'Hpal Real Estate Platform': '/images/projects/crypto.png', // Using crypto as fallback for real estate
    };
    
    return imageMap[projectTitle] || '/images/projects/crypto.png'; // fallback to crypto image if not found
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    // Query with date fields and order by newest first
    const query = '*[_type == "works"] | order(_createdAt desc, date desc)';

    console.log('🔍 Work Component - Fetching works...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Works Data Success:', data);
          
          // Additional client-side sorting to ensure newest first
          const sortedData = (data || []).sort((a, b) => {
            // Try custom date field first, then fall back to _createdAt
            const dateA = new Date(a.date || a._createdAt);
            const dateB = new Date(b.date || b._createdAt);
            return dateB - dateA; // Newest first (descending order)
          });
          
          console.log('📅 Sorted by date (newest first):', sortedData);
          setWorks(sortedData);
          setFilterWork(sortedData);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Works Data Error:', error);
          setWorks([]);
          setFilterWork([]);
        }
      });

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        // Filter by category and maintain date sorting
        const filteredWorks = works
          .filter((work) => work.tags && work.tags.includes(item))
          .sort((a, b) => {
            const dateA = new Date(a.date || a._createdAt);
            const dateB = new Date(b.date || b._createdAt);
            return dateB - dateA; // Keep newest first after filtering
          });
        setFilterWork(filteredWorks);
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__work-filter">
        {["AI/ML", "Full-Stack", "Mobile App", "DevSecOps", "Web App", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={getProjectImage(work.title)} alt={work.name || work.title || 'Project'} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                {work.projectLink && (
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                )}
                {work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h4 className="bold-text">{work.title || 'Untitled Project'}</h4>
                
                {/* NEW badge for recent projects (within last 6 months) */}
                {(() => {
                  const projectDate = new Date(work.date || work._createdAt);
                  const sixMonthsAgo = new Date();
                  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                  return projectDate > sixMonthsAgo ? (
                    <span style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontWeight: 'bold'
                    }}>
                      NEW
                    </span>
                  ) : null;
                })()}
              </div>
              
              {/* Date indicator */}
              <p className="p-text" style={{ 
                fontSize: '0.8rem', 
                color: '#6b7688', 
                marginTop: '5px',
                fontStyle: 'italic' 
              }}>
                {work.date 
                  ? new Date(work.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })
                  : work._createdAt 
                    ? new Date(work._createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })
                    : 'Date unknown'
                }
              </p>
              
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description || 'No description available'}
              </p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags && work.tags[0] ? work.tags[0] : 'No tags'}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
