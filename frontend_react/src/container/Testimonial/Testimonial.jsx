import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../clients";
import "./Testimonial.scss";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    console.log('🔍 Testimonial Component - Fetching testimonials...');
    client.fetch(query)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Testimonials Data Success:', data);
          setTestimonials(data || []);
          setCurrentIndex(0); // Reset index when data loads
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Testimonials Data Error:', error);
          setTestimonials([]);
        }
      });

    console.log('🔍 Testimonial Component - Fetching brands...');
    client.fetch(brandsQuery)
      .then((data) => {
        if (isMounted) {
          console.log('✅ Brands Data Success:', data);
          setBrands(data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log('❌ Brands Data Error:', error);
          setBrands([]);
        }
      });

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {testimonials && testimonials.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex">
            <img
              src={testimonials[currentIndex]?.imageurl ? urlFor(testimonials[currentIndex].imageurl) : ''}
              alt={testimonials[currentIndex]?.name || 'Testimonial'}
            />
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex]?.feedback || 'No feedback available'}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex]?.name || 'Anonymous'}</h4>
                <h5 className="p-text">{testimonials[currentIndex]?.company || 'Unknown Company'}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            {brand.imgUrl ? (
              <img src={urlFor(brand.imgUrl)} alt={brand.name} />
            ) : (
              <div className="brand-placeholder-icon">
                {brand.name ? brand.name.charAt(0).toUpperCase() : 'B'}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
