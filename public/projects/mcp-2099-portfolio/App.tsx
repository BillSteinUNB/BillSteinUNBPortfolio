import React, { useState } from 'react';
import Scene from './components/Scene';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="scanline"></div>
      
      {/* The 3D Background runs always, but is hidden/covered by loader initially */}
      <Scene />

      {loading && <Loader onComplete={handleLoadComplete} />}

      {!loading && (
        <main className="relative z-10 w-full text-white selection:bg-cyber-primary selection:text-black pb-20">
          <Navbar />
          <Hero />
          <ProjectGrid />
          <About />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;