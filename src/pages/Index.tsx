import React, { useState } from 'react';
import { Heart, Users, Smile } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import NavigationCard from '../components/NavigationCard';
import AccessibilityToggle from '../components/AccessibilityToggle';
import ProfessionalDetailsForm from '../components/ProfessionalDetailsForm';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigationCards = [
    {
      title: 'Charity Events & Blood Donation',
      description: 'Join hands to save lives and support causes that matter most',
      icon: Heart,
      glowColor: 'red' as const,
      onClick: () => console.log('Navigate to charity events')
    },
    {
      title: 'CReach Accessibility Suite',
      description: 'Empowering inclusive workspaces with empathy and innovation',
      icon: Users,
      glowColor: 'blue' as const,
      onClick: () => console.log('Navigate to accessibility suite')
    },
    {
      title: 'Happy Accidents',
      description: 'Celebrate unexpected moments of joy and creative discoveries',
      icon: Smile,
      glowColor: 'yellow' as const,
      onClick: () => console.log('Navigate to happy accidents')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden mesh-gradient">
      {/* Professional background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-900/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-500/4 to-orange-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <AccessibilityToggle />
      
      <HeroSection />
      
      <section id="main-content" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground relative">
            Our Impact Areas
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how we're making a difference in communities through dedicated programs and initiatives that 
            <span className="text-primary font-semibold"> connect hearts</span> and 
            <span className="text-secondary font-semibold"> change lives</span>
          </p>
        </div>
        
        <div id="navigation" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {navigationCards.map((card, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <NavigationCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                glowColor={card.glowColor}
                onClick={card.onClick}
              />
            </div>
          ))}
        </div>

        {/* Professional call to action section */}
        <div className="mt-20 text-center">
          <div className="glass-card p-12 rounded-2xl border-white/20 max-w-4xl mx-auto tilt-card">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of changemakers and help us create a more inclusive, compassionate world for everyone.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="glass-card px-12 py-4 rounded-xl text-white bg-blue-900 font-semibold magnetic ripple hover:scale-105 hover:bg-blue-800 transition-all duration-300 border-blue-900/30"
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-12 text-center text-muted-foreground border-t border-border/50 relative z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg mb-4">
            © 2025 CSR Outreach. Building bridges, changing lives, one connection at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
      
      {/* Professional Details Form Modal */}
      <ProfessionalDetailsForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default Index;
