import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  glowColor: 'red' | 'blue' | 'yellow' | 'green';
  onClick?: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon: Icon,
  glowColor,
  onClick
}) => {
  const glowClass = `glow-${glowColor}`;

  return (
    <Card 
      className={`glass-card glass-card-hover cursor-pointer p-8 text-center group border-white/20 ${glowClass} tilt-card ripple magnetic relative h-80 flex flex-col justify-between`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      aria-label={`Navigate to ${title}: ${description}`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 particles">
        <div className="particle w-2 h-2" style={{ left: '20%', animationDelay: '0s', animationDuration: '15s' }}></div>
        <div className="particle w-1 h-1" style={{ left: '60%', animationDelay: '5s', animationDuration: '20s' }}></div>
        <div className="particle w-1.5 h-1.5" style={{ left: '80%', animationDelay: '10s', animationDuration: '18s' }}></div>
      </div>
      
      <div className="flex flex-col items-center space-y-5 relative z-10">
        {/* Professional icon container */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 group-hover:from-white/25 group-hover:to-white/10 transition-all duration-400 backdrop-blur-sm border border-white/15 breathe">
          <Icon 
            size={48} 
            className="text-blue-900 group-hover:scale-110 group-hover:text-cyan-500 transition-all duration-400 drop-shadow-lg" 
          />
        </div>
        
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-foreground group-hover:text-blue-900 transition-all duration-400 transform group-hover:scale-102 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-all duration-400 line-clamp-3 mx-auto max-w-full">
            {description}
          </p>
        </div>
        
        {/* Professional progress indicator */}
        <div className="w-10 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div className="w-0 h-full bg-gradient-to-r from-blue-900 to-orange-500 rounded-full group-hover:w-full transition-all duration-600"></div>
        </div>
      </div>
      
      {/* Professional corner accents */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-blue-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
    </Card>
  );
};

export default NavigationCard;