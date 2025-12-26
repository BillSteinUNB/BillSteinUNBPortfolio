import React from 'react';
import { Wifi, Wind, Coffee, Anchor } from 'lucide-react';
import { Room } from '../types';

const ROOMS: Room[] = [
  {
    id: 'r1',
    name: "The Captain's Quarters",
    description: "Panoramic ocean views with a private balcony and antique furnishings.",
    price: "$240/night",
    image: "https://picsum.photos/seed/room1/600/400",
    amenities: ["Ocean View", "King Bed", "Ensuite"]
  },
  {
    id: 'r2',
    name: "The Driftwood Loft",
    description: "A cozy, sun-drenched space featuring reclaimed wood and skylights.",
    price: "$180/night",
    image: "https://picsum.photos/seed/room2/600/400",
    amenities: ["Skylight", "Queen Bed", "Work Desk"]
  },
  {
    id: 'r3',
    name: "The Garden Snug",
    description: "Nestled next to our herb garden, perfect for quiet reading and rest.",
    price: "$150/night",
    image: "https://picsum.photos/seed/room3/600/400",
    amenities: ["Garden Access", "Double Bed", "Quiet Zone"]
  },
  {
    id: 'r4',
    name: "The Lighthouse Suite",
    description: "Our premier suite with 360-degree views and a wood-burning stove.",
    price: "$320/night",
    image: "https://picsum.photos/seed/room4/600/400",
    amenities: ["Panoramic View", "Wood Stove", "Kitchenette"]
  }
];

const Rooms: React.FC = () => {
  return (
    <section className="py-24 bg-white text-bay-blue" id="rooms">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-bay-blue">Rest & Retreat</h2>
            <p className="font-sans text-gray-500 mt-2">Curated spaces for deep relaxation.</p>
          </div>
          <button className="hidden md:block text-forest-pine font-medium hover:underline decoration-sunlit-gold underline-offset-4">
            View All Accommodations
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* Large Featured Room */}
          <div className="lg:col-span-2 row-span-1 group relative rounded-2xl overflow-hidden">
            <img src={ROOMS[0].image} alt={ROOMS[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="font-serif text-3xl mb-2">{ROOMS[0].name}</h3>
              <p className="font-sans text-white/90 mb-4 max-w-md">{ROOMS[0].description}</p>
              <div className="flex gap-4 mb-4 text-sm font-medium">
                {ROOMS[0].amenities.map(a => <span key={a} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{a}</span>)}
              </div>
              <span className="text-xl font-serif italic text-sunlit-gold">{ROOMS[0].price}</span>
            </div>
          </div>

          {/* Standard Rooms */}
          {ROOMS.slice(1).map((room) => (
            <div key={room.id} className="relative group rounded-2xl overflow-hidden bg-gray-100">
              <img src={room.image} alt={room.name} className="w-full h-2/3 object-cover" />
              <div className="p-6 h-1/3 flex flex-col justify-between bg-white border border-gray-100">
                <div>
                  <h3 className="font-serif text-xl text-bay-blue">{room.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{room.description}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                   <span className="font-serif font-bold text-forest-pine">{room.price}</span>
                   <button className="text-xs uppercase tracking-wider font-bold text-bay-blue hover:text-sunlit-gold transition-colors">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Icons */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
          {[
            { icon: Wifi, label: "High-Speed Fiber" },
            { icon: Wind, label: "Sea Breeze Climate" },
            { icon: Coffee, label: "Local Roast Coffee" },
            { icon: Anchor, label: "Private Dock" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3 text-gray-400 hover:text-bay-blue transition-colors duration-300">
              <item.icon size={32} strokeWidth={1.5} />
              <span className="font-sans text-sm tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
