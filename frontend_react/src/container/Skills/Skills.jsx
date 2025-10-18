import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../clients";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    console.log('🔍 Skills Component - Fetching experiences...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Experiences Data Success:', data);
          setExperiences(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Experiences Data Error:', error);
        }
      });

    console.log('🔍 Skills Component - Fetching skills...');
    client.fetch(skillsQuery)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Skills Data Success:', data);
          setSkills(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Skills Data Error:', error);
        }
      });

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                {skill.icon ? (
                  <img src={urlFor(skill.icon)} alt={skill.name} />
                ) : (
                  <div className="skill-text-icon">
                    {skill.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
