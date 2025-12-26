import React, { useEffect, useRef } from 'react';
import { Testimonial } from '../types';

// Fix: Add ScrollTrigger to Window interface
declare global {
  interface Window {
    ScrollTrigger: any;
  }
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & James',
    role: 'Host Family',
    text: "We've lived on this shore for four generations. Sharing our morning coffee view is our greatest joy.",
    image: 'https://picsum.photos/seed/host1/400/500'
  },
  {
    id: '2',
    name: 'Capt. Elias',
    role: 'Local Fisherman',
    text: "The guests here aren't tourists; they're neighbors we haven't met yet. I always save a fresh catch for the Sunday roast.",
    image: 'https://picsum.photos/seed/fish/400/500'
  },
  {
    id: '3',
    name: 'Elena R.',
    role: 'Guest from Montreal',
    text: "I came for the silence, but stayed for the stories. A truly grounding experience.",
    image: 'https://picsum.photos/seed/guest/400/500'
  }
];

const Community: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          window.gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.2
            }
          );
        }
      });
    }
  }, []);

  return (
    <section className="py-24 bg-morning-fog text-bay-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-forest-pine">Our Community</h2>
          <div className="h-1 w-20 bg-sunlit-gold mx-auto rounded-full"></div>
          <p className="mt-4 font-sans text-gray-600 max-w-2xl mx-auto">
            The Saltwater Inn isn't just a building; it's a tapestry of local faces, stories, and shared moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div 
              key={item.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative h-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bay-blue/90 via-bay-blue/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-sunlit-gold/90 text-bay-blue text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  {item.role}
                </span>
                <h3 className="font-serif text-2xl text-white mb-2">{item.name}</h3>
                <p className="font-sans text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  "{item.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;