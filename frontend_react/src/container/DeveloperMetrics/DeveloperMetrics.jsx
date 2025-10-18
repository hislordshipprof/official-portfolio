import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiUsers, 
  HiClock, 
  HiLightningBolt, 
  HiChartBar,
  HiStar,
  HiCode,
  HiGlobe
} from 'react-icons/hi';
import { 
  FaRocket, 
  FaAward, 
  FaChartLine, 
  FaClock,
  FaUsers,
  FaServer,
  FaShieldAlt,
  FaMobile
} from 'react-icons/fa';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import './DeveloperMetrics.scss';

const DeveloperMetrics = () => {
  const [countAnimations, setCountAnimations] = useState({});

  // Key Metrics Data
  const keyMetrics = [
    {
      id: 'projects',
      title: 'Projects Completed',
      value: 47,
      suffix: '+',
      icon: <HiCode />,
      color: '#6366f1',
      description: 'End-to-end projects delivered successfully'
    },
    {
      id: 'users',
      title: 'Users Impacted',
      value: 500,
      suffix: 'K+',
      icon: <FaUsers />,
      color: '#10b981',
      description: 'Total users served across all applications'
    },
    {
      id: 'performance',
      title: 'Performance Boost',
      value: 85,
      suffix: '%',
      icon: <HiLightningBolt />,
      color: '#f59e0b',
      description: 'Average performance improvement achieved'
    },
    {
      id: 'uptime',
      title: 'System Uptime',
      value: 99.9,
      suffix: '%',
      icon: <FaServer />,
      color: '#ef4444',
      description: 'Infrastructure reliability maintained'
    }
  ];

  // Impact Achievements
  const achievements = [
    {
      icon: <FaRocket />,
      title: 'API Response Optimization',
      impact: '85% faster response times',
      description: 'Optimized database queries and implemented caching strategies',
      color: '#6366f1'
    },
    {
      icon: <FaUsers />,
      title: 'User Engagement Boost',
      impact: '45% increase in engagement',
      description: 'Enhanced UI/UX design and implemented interactive features',
      color: '#10b981'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Security Enhancement',
      impact: '100% vulnerability elimination',
      description: 'Implemented comprehensive security measures and monitoring',
      color: '#f59e0b'
    },
    {
      icon: <FaClock />,
      title: 'Process Automation',
      impact: '40 hours/week saved',
      description: 'Automated deployment pipelines and testing workflows',
      color: '#8b5cf6'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile Performance',
      impact: '60% faster load times',
      description: 'Optimized mobile applications with advanced caching',
      color: '#06b6d4'
    },
    {
      icon: <FaChartLine />,
      title: 'Scalability Achievement',
      impact: '300K+ concurrent users',
      description: 'Built systems handling massive user loads efficiently',
      color: '#ec4899'
    }
  ];

  // Technology Impact Stats
  const techStats = [
    { tech: 'React/Next.js', projects: 15, impact: 'High Performance UIs' },
    { tech: 'Node.js/Express', projects: 12, impact: 'Scalable Backend APIs' },
    { tech: 'Python/Django', projects: 8, impact: 'AI/ML Integration' },
    { tech: 'AWS/DevOps', projects: 10, impact: 'Cloud Infrastructure' },
    { tech: 'TypeScript', projects: 18, impact: 'Type-Safe Applications' },
    { tech: 'MongoDB/PostgreSQL', projects: 14, impact: 'Efficient Data Management' }
  ];

  // Animate counters
  useEffect(() => {
    const animateCounters = () => {
      keyMetrics.forEach((metric) => {
        let startTime = null;
        const duration = 2000; // 2 seconds
        const startValue = 0;
        const endValue = metric.value;

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = startValue + (endValue - startValue) * easeOutQuart;
          
          setCountAnimations(prev => ({
            ...prev,
            [metric.id]: currentValue
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      });
    };

    // Delay animation start
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatMetricValue = (metric, animatedValue) => {
    if (metric.id === 'uptime') {
      return animatedValue.toFixed(1);
    }
    return Math.floor(animatedValue);
  };

  return (
    <div className="app__developer-metrics-section">
      <div className="section-header">
        <div className="section-profile">
          <img src={images.profilePhoto} alt="Benjamin - Metrics Profile" className="section-profile-img" />
        </div>
        <h2 className="head-text">
          <HiChartBar className="metrics-icon" />
          Developer <span>Impact</span>
        </h2>
        <p className="section-subtitle">Measurable results and business value delivered through code</p>
      </div>

      <div className="metrics-dashboard">
        {/* Key Metrics Overview */}
        <motion.div 
          className="key-metrics-grid"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6 }}
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="metric-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{ '--metric-color': metric.color }}
            >
              <div className="metric-icon" style={{ color: metric.color }}>
                {metric.icon}
              </div>
              <div className="metric-content">
                <div className="metric-value">
                  <span className="metric-number">
                    {formatMetricValue(metric, countAnimations[metric.id] || 0)}
                  </span>
                  <span className="metric-suffix">{metric.suffix}</span>
                </div>
                <h3 className="metric-title">{metric.title}</h3>
                <p className="metric-description">{metric.description}</p>
              </div>
              <div className="metric-trend">
                <HiTrendingUp />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Achievements */}
        <motion.div 
          className="achievements-section"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="section-title">
            <FaAward className="section-icon" />
            Key Achievements & Impact
          </h3>
          
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                whileInView={{ opacity: [0, 1], y: [30, 0] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}
              >
                <div className="achievement-icon" style={{ color: achievement.color }}>
                  {achievement.icon}
                </div>
                <div className="achievement-content">
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <div className="achievement-impact" style={{ color: achievement.color }}>
                    {achievement.impact}
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
                <div className="achievement-badge">
                  <HiStar />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Impact Stats */}
        <motion.div 
          className="tech-impact-section"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="section-title">
            <HiGlobe className="section-icon" />
            Technology Impact Analysis
          </h3>
          
          <div className="tech-stats-grid">
            {techStats.map((stat, index) => (
              <motion.div
                key={index}
                className="tech-stat-card"
                whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="tech-stat-header">
                  <h4 className="tech-name">{stat.tech}</h4>
                  <span className="project-count">{stat.projects} projects</span>
                </div>
                <p className="tech-impact">{stat.impact}</p>
                <div className="tech-progress">
                  <motion.div
                    className="tech-progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stat.projects / 18) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action
        <motion.div 
          className="metrics-cta"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="cta-content">
            <h3>Ready to Drive Results?</h3>
            <p>Let's build something impactful together and create measurable value for your business.</p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let's Collaborate</span>
              <FaRocket className="cta-icon" />
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(DeveloperMetrics, 'app__developer-metrics'),
  'developer-metrics',
  'app__primarybg'
);
