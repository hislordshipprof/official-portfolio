import React from 'react';
import {About,Skills,Work,Testimonial,Header,Footer} from './container'

import Navbar from './components/Navbar/Navbar';
import "./App.scss";
import Abouts from './container/About/Abouts';
function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />

      <Testimonial />
      <Abouts />
      <Footer />
    </div>
  );
}

export default App;
