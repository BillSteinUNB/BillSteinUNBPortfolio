import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const ProjectGrid: React.FC = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-px bg-cyber-gray w-12"></div>
        <h2 className="font-mono text-cyber-secondary text-sm tracking-widest">// DEPLOYMENTS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            className={`group relative glass-panel rounded-xl overflow-hidden p-6 transition-all duration-500 hover:border-cyber-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
            
            {/* Background Image/Preview Placeholder */}
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0"
              />
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end">
              <div className="flex justify-between items-start mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                 <div className="flex gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono border border-gray-700 bg-black/50 px-2 py-1 rounded text-gray-300">
                        {tech}
                      </span>
                    ))}
                 </div>
                 <ArrowUpRight className="text-cyber-primary" size={20} />
              </div>

              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-mono text-cyber-primary text-xs mb-1 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm max-w-md line-clamp-2 group-hover:line-clamp-none transition-all">
                  {project.description}
                </p>
              </div>
            </div>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;