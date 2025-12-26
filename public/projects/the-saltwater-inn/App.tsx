import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Community from './components/Community';
import Rooms from './components/Rooms';
import Booking from './components/Booking';
import Concierge from './components/Concierge';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="antialiased text-bay-blue bg-sand selection:bg-sunlit-gold selection:text-bay-blue">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <main className="relative animate-fade-in">
          {/* Navigation Overlay */}
          <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto">
               {/* Logo Area */}
               <span className="font-serif text-xl md:text-2xl text-white drop-shadow-md font-bold tracking-wide">SI.</span>
            </div>
            <div className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 flex gap-6 text-sm font-medium text-white shadow-lg">
              <a href="#rooms" className="hover:text-sunlit-gold transition-colors">Stay</a>
              <a href="#booking" className="hover:text-sunlit-gold transition-colors">Book</a>
            </div>
          </nav>

          <Hero />
          
          {/* Transition Gradient */}
          <div className="h-24 bg-gradient-to-b from-transparent to-morning-fog -mt-24 relative z-20 pointer-events-none"></div>
          
          <Community />
          <Rooms />
          
          {/* Local Experiences Teaser */}
          <section className="py-24 bg-forest-pine text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-4xl mb-8">Connect. Explore. Belong.</h2>
              <p className="max-w-2xl mx-auto text-white/80 font-sans mb-12">
                From foraging for chanterelles to evening folk music circles, your stay includes access to our daily local experiences.
              </p>
              <div className="flex gap-4 justify-center overflow-x-auto pb-4">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/exp${i}/300/200`} className="rounded-lg opacity-80 hover:opacity-100 transition-opacity w-64 h-40 object-cover" alt="Experience" />
                ))}
              </div>
            </div>
          </section>

          <Booking />
          
          <footer className="bg-bay-blue text-white/40 py-12 text-center text-xs font-sans border-t border-white/10">
            <div className="container mx-auto">
              <p className="mb-4">&copy; 2099 The Saltwater Inn. All rights reserved.</p>
              <p>Designed with warmth in New Brunswick.</p>
              <div className="mt-4 flex justify-center gap-4">
                <span className="hover:text-sunlit-gold cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-sunlit-gold cursor-pointer transition-colors">Facebook</span>
              </div>
            </div>
          </footer>

          <Concierge />
        </main>
      )}
    </div>
  );
};

export default App;