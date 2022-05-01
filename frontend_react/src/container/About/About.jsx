import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor,client } from "../../clients";
import "./About.scss";
import {images} from '../../constants'
import { AppWrap } from "../../wrapper";
const Abouts= [
  {title:'Web Developer', description:'I am a web developer with a passion for building web applications. I have a strong background in front-end development and have worked with a variety of technologies. I am a self-taught developer and I am always looking to learn new things.,imgUrl: "web-dev.png"', imgUrl: images.about01 },
  {title:'Frontend', description:'I am a frontend Developer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about02 },
  {title:'Backend', description:'I am a Backend Developer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about03 },
  {title:'AWS practitioner', description:'I am a graphic designer and I am always looking for new opportunities to work on projects. I am also a self-taught developer and I am always looking to learn new things.',imgUrl: images.about04 },

]

//urlFor
const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query='*[_type == "about"]';
    client.fetch(query)
    .then((data) => setAbouts(data));
  },[ ])
  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {Abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(About, "About");
