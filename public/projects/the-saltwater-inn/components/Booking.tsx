import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Booking: React.FC = () => {
  return (
    <section id="booking" className="py-24 bg-bay-blue text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://picsum.photos/seed/water/800/800')] bg-cover opacity-10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Booking Form */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-sunlit-gold">Begin Your Journey</h2>
            <p className="font-sans text-white/70 mb-8 max-w-md">
              We operate on a personal basis. Tell us when you'd like to arrive, and we'll prepare the hearth for you.
            </p>

            <form className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-wider text-white/60">Arrival</label>
                  <input type="date" className="w-full bg-black/20 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-sunlit-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-wider text-white/60">Departure</label>
                  <input type="date" className="w-full bg-black/20 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-sunlit-gold transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-wider text-white/60">Full Name</label>
                <input type="text" placeholder="Jane Doe" className="w-full bg-black/20 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-sunlit-gold transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-sm uppercase tracking-wider text-white/60">Special Requests</label>
                <textarea rows={3} placeholder="Dietary needs, celebration details..." className="w-full bg-black/20 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-sunlit-gold transition-colors"></textarea>
              </div>

              <button type="submit" className="w-full bg-sunlit-gold text-bay-blue font-bold py-4 rounded-lg hover:bg-white transition-colors duration-300 shadow-lg shadow-sunlit-gold/20">
                Request Reservation
              </button>
            </form>
          </div>

          {/* Contact & Map Info */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full text-sunlit-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Find Us</h4>
                  <p className="text-white/70">124 Lighthouse Road<br/>Grand Manan, New Brunswick<br/>E5G 1A1</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full text-sunlit-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Call Us</h4>
                  <p className="text-white/70">+1 (506) 555-0198</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full text-sunlit-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Write Us</h4>
                  <p className="text-white/70">hello@saltwaterinn.ca</p>
                </div>
              </div>
            </div>

            {/* Simulated Map Graphic */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/20 group">
              <img 
                src="https://picsum.photos/seed/map/800/400?grayscale" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-bay-blue/80 backdrop-blur-sm px-6 py-3 rounded-full border border-sunlit-gold text-sunlit-gold font-serif flex items-center gap-2">
                    <MapPin size={16} />
                    <span>View on Google Maps</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;