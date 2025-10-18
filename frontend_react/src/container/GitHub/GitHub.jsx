import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCode, FaCalendarAlt, FaFire } from 'react-icons/fa';
import { HiTrendingUp, HiCode, HiStar } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import './GitHub.scss';

const GitHub = () => {
  const [githubData, setGithubData] = useState({
    user: {},
    repos: [],
    languages: {},
    contributions: 0,
    loading: true
  });

  // GitHub username - replace with your actual username
  const GITHUB_USERNAME = 'hislordshipprof'; // Replace with your GitHub username

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate language statistics
        const languageStats = {};
        let totalBytes = 0;

        // Process repositories for language data
        if (Array.isArray(reposData)) {
          reposData.forEach(repo => {
            if (repo.language) {
              languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
              totalBytes += repo.size;
            }
          });
        }

        // Convert to percentages and get top 5
        const topLanguages = Object.entries(languageStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .reduce((obj, [lang, size]) => {
            obj[lang] = Math.round((size / totalBytes) * 100);
            return obj;
          }, {});

        if (isMounted) {
          setGithubData({
            user: userData,
            repos: reposData?.slice(0, 6) || [], // Top 6 repos
            languages: topLanguages,
            contributions: userData.public_repos || 0,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        if (isMounted) {
          setGithubData(prev => ({ ...prev, loading: false }));
        }
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#007396',
      'C++': '#00599c',
      HTML: '#e34f26',
      CSS: '#1572b6',
      React: '#61dafb',
      Vue: '#4fc08d',
      PHP: '#777bb4',
      Go: '#00add8',
      Rust: '#000000',
      Swift: '#fa7343'
    };
    return colors[language] || '#6366f1';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Generate meaningful descriptions for repos without descriptions
  const getRepoDescription = (repo) => {
    if (repo.description) return repo.description;
    
    const repoName = repo.name.toLowerCase();
    
    // Custom descriptions based on common repository patterns
    const descriptions = {
      // AI/ML related
      'studyfetchai': 'AI-powered study platform with intelligent content generation and personalized learning experiences.',
      'resume-ai': 'Advanced AI system for intelligent resume optimization and job matching using natural language processing.',
      'ai-chat': 'Conversational AI application with advanced natural language understanding capabilities.',
      
      // Full-stack projects
      'uber-clone': 'Full-stack ride-sharing application built with modern web technologies and real-time features.',
      'ecommerce': 'Complete e-commerce platform with shopping cart, payment integration, and inventory management.',
      'portfolio': 'Professional portfolio website showcasing projects and technical expertise.',
      
      // Frontend projects
      'react-app': 'Modern React application demonstrating advanced frontend development techniques.',
      'vue-project': 'Vue.js application with reactive components and state management.',
      
      // Backend projects
      'api': 'RESTful API service built with modern backend technologies and database integration.',
      'server': 'Backend server application with authentication and data processing capabilities.',
      
      // Mobile projects
      'mobile-app': 'Cross-platform mobile application built with React Native.',
      'ios-app': 'Native iOS application with modern Swift development practices.',
      'android-app': 'Native Android application with Material Design principles.',
      
      // DevOps/Tools
      'docker': 'Containerized application with Docker configuration and deployment scripts.',
      'kubernetes': 'Kubernetes deployment configuration with scalable microservices architecture.',
      'config': 'Configuration files and setup scripts for development environment optimization.'
    };
    
    // Check for matching patterns
    for (const [pattern, description] of Object.entries(descriptions)) {
      if (repoName.includes(pattern)) {
        return description;
      }
    }
    
    // Generate description based on language and common patterns
    const language = repo.language?.toLowerCase();
    if (language === 'javascript' || language === 'typescript') {
      return `Modern ${language} application showcasing advanced web development techniques and best practices.`;
    } else if (language === 'python') {
      return 'Python application demonstrating clean code architecture and efficient problem-solving approaches.';
    } else if (language === 'java') {
      return 'Java application built with object-oriented principles and enterprise-grade patterns.';
    } else if (language === 'go') {
      return 'Go application emphasizing performance, concurrency, and scalable system design.';
    } else if (language === 'rust') {
      return 'Rust application focusing on memory safety, performance, and system-level programming.';
    }
    
    // Final fallback based on repository characteristics
    if (repo.stargazers_count > 5) {
      return 'Popular open-source project with active community engagement and regular updates.';
    } else if (repo.forks_count > 2) {
      return 'Collaborative project demonstrating code quality and development best practices.';
    } else {
      return 'Professional development project showcasing technical skills and innovative solutions.';
    }
  };

  if (githubData.loading) {
    return (
      <div className="github-loading">
        <div className="loading-spinner"></div>
        <p>Loading GitHub data...</p>
      </div>
    );
  }

  return (
    <div className="app__github-section">
      <div className="section-header">
        <div className="section-profile">
          <img src={images.profilePhoto} alt="Benjamin - GitHub Profile" className="section-profile-img" />
        </div>
        <h2 className="head-text">
          <FaGithub className="github-icon" />
          GitHub <span>Activity</span>
        </h2>
        <p className="section-subtitle">Live development activity and contribution insights</p>
      </div>

      <div className="github-dashboard">
        {/* GitHub Stats Overview */}
        <motion.div 
          className="stats-overview"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-card">
            <div className="stat-icon">
              <FaCode />
            </div>
            <div className="stat-content">
              <h3>{githubData.user.public_repos || 0}</h3>
              <p>Public Repos</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-content">
              <h3>{githubData.repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)}</h3>
              <p>Total Stars</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaCodeBranch />
            </div>
            <div className="stat-content">
              <h3>{githubData.repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)}</h3>
              <p>Total Forks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaFire />
            </div>
            <div className="stat-content">
              <h3>{githubData.user.followers || 0}</h3>
              <p>Followers</p>
            </div>
          </div>
        </motion.div>


        {/* Featured Repositories */}
        <motion.div 
          className="repos-section"
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="section-title">
            <HiStar className="section-icon" />
            Featured Repositories
          </h3>
          <div className="repos-grid">
            {githubData.repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="repo-card"
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="repo-header">
                  <h4 className="repo-name">{repo.name}</h4>
                  <div className="repo-stats">
                    <span className="repo-stat">
                      <FaStar />
                      {repo.stargazers_count}
                    </span>
                    <span className="repo-stat">
                      <FaCodeBranch />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
                
                <p className="repo-description">
                  {getRepoDescription(repo)}
                </p>
                
                <div className="repo-footer">
                  <div className="repo-language">
                    {repo.language && (
                      <>
                        <div 
                          className="language-dot"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></div>
                        {repo.language}
                      </>
                    )}
                  </div>
                  <span className="repo-updated">
                    <FaCalendarAlt />
                    {formatDate(repo.updated_at)}
                  </span>
                </div>
                
                <div className="repo-links">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    <FaGithub /> View Code
                  </a>
                  {repo.homepage && (
                    <a 
                      href={repo.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="repo-link demo-link"
                    >
                      <HiTrendingUp /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div 
          className="github-profile-section"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-profile-link"
          >
            <FaGithub className="github-link-icon" />
            <span>View Full GitHub Profile</span>
            <HiTrendingUp className="arrow-icon" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(GitHub, 'app__github'),
  'github',
  'app__primarybg'
);
