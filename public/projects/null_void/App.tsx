import React, { useState, useEffect } from 'react';
import { Theme, Project, NavItem } from './types';
import AsciiButton from './components/AsciiButton';
import Terminal from './components/Terminal';
import SectionHeader from './components/SectionHeader';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'about', path: '#about' },
  { id: 'work', label: 'work', path: '#work' },
  { id: 'contact', label: 'contact', path: '#contact' },
];

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Void Runner',
    year: '2024',
    description: 'Generative landscape engine built with WebGL and noise algorithms.',
    tags: ['WebGL', 'React', 'Three.js'],
    ascii: `
    /\\
   /  \\
  /____\\
 /\\    /\\
/  \\  /  \\
    `
  },
  {
    id: '02',
    title: 'Data Decay',
    year: '2023',
    description: 'Visualizing data entropy through interactive d3.js charts.',
    tags: ['d3.js', 'TypeScript', 'Data Viz'],
    ascii: `
[|||||] 90%
[|||  ] 60%
[|    ] 20%
[|||| ] 80%
    `
  },
  {
    id: '03',
    title: 'Neural Net',
    year: '2023',
    description: 'Interface for controlling headless neural networks.',
    tags: ['AI', 'Python', 'WebSocket'],
    ascii: `
 o - o - o
  \\ / \\ /
   o - o
  / \\ / \\
 o - o - o
    `
  }
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg text-primary font-mono selection:bg-primary selection:text-bg transition-colors duration-300">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur-sm border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs leading-none tracking-widest">
             ■■■■■■■■■■■■■■■■■■
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter mt-1">
              NULL_VOID<span className="animate-blink">_</span>
            </h1>
            <span className="text-[10px] md:text-xs leading-none tracking-widest">
             ■■■■■■■■■■■■■■■■■■
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`uppercase text-sm tracking-widest hover:text-shadow-glow transition-all ${activeSection === item.id ? 'underline decoration-2 underline-offset-4' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={toggleTheme} className="ml-8 text-xs border border-primary px-2 py-1 hover:bg-primary hover:text-bg transition-colors">
              {theme === Theme.DARK ? 'LIGHT_MODE' : 'DARK_MODE'}
            </button>
          </div>

          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '×' : '≡'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-bg border-b border-primary p-4 flex flex-col space-y-4 shadow-2xl">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left uppercase text-lg border-l-2 border-primary pl-4 hover:bg-primary hover:text-bg py-2"
              >
                {item.label}
              </button>
            ))}
             <button onClick={toggleTheme} className="text-left uppercase text-sm border border-primary p-2 mt-4">
              TOGGLE THEME [{theme}]
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-32 max-w-5xl mx-auto px-4 md:px-8 pb-32">
        
        {/* HERO */}
        <section id="home" className="min-h-[70vh] flex flex-col justify-center border-l border-r border-primary/20 px-4 md:px-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 hidden lg:block select-none pointer-events-none text-[10px] whitespace-pre leading-[10px]">
{`
    10101010101010101010
    01010101010101010101
    101010   VOID   1010
    010101   NULL   0101
    10101010101010101010
`}
            </div>

            <div className="mb-8">
               <div className="inline-block border border-primary px-2 py-1 text-xs mb-4">
                 AVAILABLE_FOR_HIRE
               </div>
               <h2 className="text-5xl md:text-8xl font-bold leading-none tracking-tighter">
                 DIGITAL<br/>
                 BRUTALISM<br/>
                 & CODE.
               </h2>
            </div>
            
            <p className="text-secondary max-w-xl text-sm md:text-base leading-relaxed font-light border-l border-secondary pl-6 py-2">
              We reject decoration. We embrace structure. <br/>
              A minimal design studio focused on raw interaction and ASCII aesthetics.
            </p>

            <div className="mt-12 flex flex-col md:flex-row gap-4">
               <AsciiButton label="VIEW_PROJECTS" onClick={() => scrollToSection('work')} />
               <AsciiButton label="INIT_PROTOCOL" onClick={() => scrollToSection('contact')} />
            </div>
        </section>

        <SectionHeader title="about" id="about" />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-primary/20 pt-12">
           <div className="space-y-6 text-sm md:text-base text-secondary leading-relaxed text-justify">
             <p>
               <span className="text-primary font-bold">[ NULL_VOID ]</span> is an experimental design laboratory. 
               We believe that the web has become cluttered with unnecessary layers of abstraction.
               Our mission is to strip back the interface to its raw components: text, structure, and logic.
             </p>
             <p>
               Using React and pure CSS, we construct digital environments that prioritize information density
               and speed. No images. No distractions. Just pure data flow.
             </p>
             
             <div className="border border-muted p-4 mt-8 font-mono text-xs">
               <div className="mb-2 text-primary font-bold uppercase">Tech Stack:</div>
               <ul className="grid grid-cols-2 gap-2">
                 <li>[x] React 18</li>
                 <li>[x] TypeScript</li>
                 <li>[x] Tailwind CSS</li>
                 <li>[x] Gemini AI</li>
                 <li>[x] WebGL</li>
                 <li>[x] Node.js</li>
               </ul>
             </div>
           </div>

           <div className="relative border border-primary p-1">
             <div className="absolute top-0 left-0 bg-primary text-bg text-[10px] px-2 py-1 font-bold">
               SYSTEM_DIAGNOSTICS
             </div>
             <div className="h-full w-full bg-muted/5 flex items-center justify-center min-h-[300px]">
                <pre className="text-[10px] md:text-xs leading-none text-primary opacity-70">
{`
      .       .
  .   |   .   |   .
  |   |   |   |   |
--+---+---+---+---+--
  |   |   |   |   |
  .   |   .   |   .
      .       .
      
   [ SYSTEM_ONLINE ]
`}
                </pre>
             </div>
           </div>
        </section>


        <SectionHeader title="work" id="work" />
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className={`
                group relative border-b md:border-b-0 border-primary p-6
                ${idx !== PROJECTS.length - 1 ? 'md:border-r' : ''}
                hover:bg-primary hover:text-bg transition-colors duration-300 cursor-pointer
              `}
            >
              <div className="absolute top-4 right-4 text-xs font-bold opacity-50">
                {project.year}
              </div>
              
              <div className="h-32 flex items-center justify-center overflow-hidden mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                <pre className="text-[10px] whitespace-pre font-bold leading-3">
                  {project.ascii}
                </pre>
              </div>

              <h3 className="text-xl font-bold uppercase mb-2 tracking-tight">
                {project.id} // {project.title}
              </h3>
              <p className="text-xs mb-6 opacity-80 h-12">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] border border-current px-1 py-0.5 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <SectionHeader title="ai_uplink" id="terminal" />

        <section className="mb-24">
           <p className="text-sm text-secondary mb-4">
             // ESTABLISH_CONNECTION with the studio mainframe.
             // POWERED BY GEMINI-3-FLASH
           </p>
           <Terminal />
        </section>

        <SectionHeader title="contact" id="contact" />

        <section className="border-l-4 border-primary pl-8 py-4">
           <div className="text-lg md:text-2xl font-bold mb-8 uppercase max-w-2xl">
             Ready to initiate a new project?
             Send a transmission.
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <label className="block text-xs uppercase mb-2 tracking-widest text-muted">Identify Yourself</label>
               <input type="text" className="w-full bg-transparent border-b border-primary py-2 focus:outline-none focus:border-b-4 transition-all" placeholder="NAME / ORG" />
             </div>
             <div>
               <label className="block text-xs uppercase mb-2 tracking-widest text-muted">Frequency</label>
               <input type="email" className="w-full bg-transparent border-b border-primary py-2 focus:outline-none focus:border-b-4 transition-all" placeholder="EMAIL_ADDRESS" />
             </div>
             <div className="md:col-span-2">
               <label className="block text-xs uppercase mb-2 tracking-widest text-muted">Message Data</label>
               <textarea rows={4} className="w-full bg-transparent border border-primary p-4 focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="ENTER_MESSAGE_CONTENTS..."></textarea>
             </div>
           </div>

           <div className="mt-8">
             <AsciiButton label="TRANSMIT_DATA" />
           </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-primary/20 py-12 bg-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
           <pre className="text-[10px] md:text-xs text-muted mb-6 leading-none select-none">
{`
+----------------------------------------+
|  NULL_VOID STUDIO © 2024               |
|  ALL RIGHTS RESERVED                   |
|  SYSTEM STATUS: OPTIMAL                |
+----------------------------------------+
`}
           </pre>
           <div className="flex justify-center space-x-6 text-xs uppercase tracking-widest text-secondary">
             <a href="#" className="hover:text-primary hover:underline">Twitter</a>
             <a href="#" className="hover:text-primary hover:underline">Github</a>
             <a href="#" className="hover:text-primary hover:underline">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
