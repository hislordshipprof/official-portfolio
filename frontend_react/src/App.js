import React from 'react';
import {
  Header,
  MarqueeBand,
  About,
  Experience,
  Skills,
  Work,
  Metrics,
  Certifications,
  Testimonial,
  Contact,
  Footer
} from './container';
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import useScrollReveal from './hooks/useScrollReveal';
import useCounter from './hooks/useCounter';
import './App.scss';

function App() {
  useScrollReveal();
  useCounter();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Header />
      <MarqueeBand />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Metrics />
      <Certifications />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
