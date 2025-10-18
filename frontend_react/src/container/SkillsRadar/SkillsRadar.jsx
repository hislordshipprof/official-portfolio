import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiDatabase, HiCloud, HiDesktopComputer, HiDeviceMobile, HiLightningBolt } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiKubernetes, SiTensorflow, SiNextdotjs, SiDjango, SiPostgresql, SiOpenai } from 'react-icons/si';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import './SkillsRadar.scss';

const SkillsRadar = () => {
  const canvasRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Skills data with proficiency levels (0-100)
  const skills = [
    { name: 'React/Next.js', level: 95, icon: <FaReact />, color: '#61dafb', category: 'Frontend Frameworks' },
    { name: 'TypeScript', level: 94, icon: <SiTypescript />, color: '#3178c6', category: 'Programming Languages' },
    { name: 'Node.js', level: 92, icon: <FaNodeJs />, color: '#339933', category: 'Backend Runtime' },
    { name: 'Python/Django', level: 90, icon: <FaPython />, color: '#3776ab', category: 'Backend Frameworks' },
    { name: 'MongoDB', level: 88, icon: <SiMongodb />, color: '#47a248', category: 'NoSQL Database' },
    { name: 'PostgreSQL', level: 86, icon: <SiPostgresql />, color: '#336791', category: 'SQL Database' },
    { name: 'AWS Cloud', level: 85, icon: <FaAws />, color: '#ff9900', category: 'Cloud Computing' },
    { name: 'AI/ML & OpenAI', level: 88, icon: <HiLightningBolt />, color: '#412991', category: 'Artificial Intelligence' },
    { name: 'DevOps/Docker', level: 82, icon: <FaDocker />, color: '#2496ed', category: 'DevOps & Deployment' },
    { name: 'React Native', level: 78, icon: <HiDeviceMobile />, color: '#61dafb', category: 'Mobile Development' },
  ];

  // Animation effect
  useEffect(() => {
    let animationFrame;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1); // 2 second animation
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Draw radar chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (circles)
    const levels = 5;
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= levels; i++) {
      const radius = (maxRadius * i) / levels;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw axis lines
    const angleStep = (2 * Math.PI) / skills.length;
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.lineWidth = 1;

    skills.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * maxRadius;
      const endY = centerY + Math.sin(angle) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    // Draw skill data
    if (animationProgress > 0) {
      ctx.strokeStyle = '#6366f1';
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 3;

      const points = [];
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const level = (skill.level / 100) * animationProgress;
        const radius = (maxRadius * level);
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        points.push({ x, y });
      });

      // Draw filled area
      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Draw skill points
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const level = (skill.level / 100) * animationProgress;
        const radius = (maxRadius * level);
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Skill point
        ctx.fillStyle = skill.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();

        // White border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  }, [skills, animationProgress]);

  return (
    <div className="app__skills-radar-section">
      <div className="section-header">
        <div className="section-profile">
          <img src={images.profilePhoto} alt="Benjamin - Skills Profile" className="section-profile-img" />
        </div>
        <h2 className="head-text">
          <HiCode className="skills-icon" />
          Skills <span>Radar</span>
        </h2>
        <p className="section-subtitle">Interactive visualization of technology proficiency and expertise</p>
      </div>

      <div className="radar-container">
        {/* Radar Chart */}
        <motion.div 
          className="radar-chart-container"
          whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
          transition={{ duration: 0.8 }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="radar-canvas"
          />
          
          {/* Skill Labels */}
          <div className="skill-labels">
            {skills.map((skill, index) => {
              const angleStep = (2 * Math.PI) / skills.length;
              const angle = index * angleStep - Math.PI / 2;
              const labelRadius = 220; // Distance from center for labels
              
              const x = 200 + Math.cos(angle) * labelRadius;
              const y = 200 + Math.sin(angle) * labelRadius;
              
              return (
                <motion.div
                  key={skill.name}
                  className={`skill-label ${selectedSkill === index ? 'active' : ''}`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setSelectedSkill(index)}
                  onMouseLeave={() => setSelectedSkill(null)}
                >
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Legend */}
        <motion.div 
          className="skills-legend"
          whileInView={{ opacity: [0, 1], x: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="legend-title">
            <HiDesktopComputer className="legend-icon" />
            Technology Stack
          </h3>
          
          <div className="legend-skills">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`legend-skill ${selectedSkill === index ? 'highlighted' : ''}`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setSelectedSkill(index)}
                onMouseLeave={() => setSelectedSkill(null)}
              >
                <div className="legend-skill-header">
                  <div className="legend-skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <div className="legend-skill-info">
                    <span className="legend-skill-name">{skill.name}</span>
                    <span className="legend-skill-category">{skill.category}</span>
                  </div>
                  <span className="legend-skill-level">{skill.level}%</span>
                </div>
                
                <div className="legend-progress-bar">
                  <motion.div
                    className="legend-progress-fill"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level * animationProgress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Details Panel */}
      {selectedSkill !== null && (
        <motion.div 
          className="skill-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="skill-details-content">
            <div className="skill-details-header">
              <div className="skill-details-icon" style={{ color: skills[selectedSkill].color }}>
                {skills[selectedSkill].icon}
              </div>
              <div className="skill-details-info">
                <h4>{skills[selectedSkill].name}</h4>
                <p>{skills[selectedSkill].category}</p>
              </div>
              <div className="skill-details-level">
                <span className="level-number">{skills[selectedSkill].level}%</span>
                <span className="level-label">Proficiency</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(SkillsRadar, 'app__skills-radar'),
  'skills-radar',
  'app__whitebg'
);
