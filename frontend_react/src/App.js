import React from 'react';
import {
  About,
  Work,
  Testimonial,
  Header,
  Experience,
  Education,
  Certifications,
  GitHub,
  SkillsRadar,
  DeveloperMetrics,
  CallToAction
} from './container'

import Navbar from './components/Navbar/Navbar';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Experience />
      {/* <Education /> */}
      <Certifications />
      <SkillsRadar />
      <GitHub />
      <DeveloperMetrics />
      <Work />
      <Testimonial />
      <CallToAction />
    </div>
  );
}

export default App;
