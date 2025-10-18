import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor,client } from "../../clients";
import { images } from "../../constants";
import "./About.scss";

import { AppWrap, MotionWrap } from '../../wrapper';
// const Abouts= [
//   {title:'Web Developer', description:'I am a web developer with a passion for building web applications. I have a strong background in front-end development and have worked with a variety of technologies. I am a self-taught developer and I am always looking to learn new things.,imgUrl: "web-dev.png"', imgUrl: images.about01 },
//   {title:'Frontend', description:'I am a frontend Developer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about02 },
//   {title:'Backend', description:'I am a Backend Developer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about03 },
//   {title:'AWS practitioner', description:'I am a graphic designer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about04 },

// ]

const About = () => {
  // Professional journey data with actual images
  const professionalJourney = [
    {
      title: 'Full-Stack Engineer',
      description: 'Frontend-focused software engineer with extensive experience in crafting engaging user interfaces using React and optimizing performance for large-scale applications.',
      imgUrl: images.fullStackImage
    },
    {
      title: 'DevSecOps Engineer', 
      description: 'Expert in secure infrastructure automation, CI/CD pipelines, and cloud security best practices, ensuring robust and scalable deployment architectures.',
      imgUrl: images.devSecOpsImage
    },
    {
      title: 'AI/ML Developer',
      description: 'Specialized in integrating AI and machine learning solutions into web applications, with expertise in OpenAI APIs, natural language processing, and intelligent user interfaces.',
      imgUrl: images.aiDeveloperImage
    },
    {
      title: 'EdTech Specialist',
      description: 'Passionate about leveraging technology to enhance learning experiences, building AI-powered educational platforms that improve student engagement and comprehension.',
      imgUrl: images.edTechImage
    }
  ];

  return (
    <>
      <h2 className="head-text">My Journey <span>As a </span> <br />Software  <span>Developer</span></h2>

      <div className="app__profiles">
        {professionalJourney.map((role, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={role.title + index}
          >
            <img src={role.imgUrl} alt={role.title} className="professional-journey-image" />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{role.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{role.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};


export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);