import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';

const HeroSection = () => {
  // Magnetic Particle Constellation + Electric Connection Network
  const heroRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Particle system state
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    originalX: number;
    originalY: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    type: 'heart' | 'circle' | 'diamond';
  }>>([]);

  // Connection nodes state
  const [connectionNodes, setConnectionNodes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    pulse: number;
    active: boolean;
  }>>([]);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const newParticles = [];
    const colors = ['#003087', '#00acec', '#ff6600', '#0891b2', '#f59e0b']; // Cognizant colors
    const types: ('heart' | 'circle' | 'diamond')[] = ['heart', 'circle', 'diamond'];
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      newParticles.push({
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    setParticles(newParticles);
  }, []);

  // Initialize connection nodes
  const initializeConnectionNodes = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const newNodes = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 300;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      newNodes.push({
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        pulse: Math.random(),
        active: false
      });
    }
    setConnectionNodes(newNodes);
  }, []);

  // Animation loop for particle movement
  const animateParticles = useCallback(() => {
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        
        // Boundary checking
        if (newX < 0 || newX > window.innerWidth) {
          particle.vx *= -1;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY < 0 || newY > window.innerHeight) {
          particle.vy *= -1;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }
        
        // Gentle drift back to original position
        const driftForce = 0.001;
        const driftX = (particle.originalX - newX) * driftForce;
        const driftY = (particle.originalY - newY) * driftForce;
        
        return {
          ...particle,
          x: newX,
          y: newY,
          vx: particle.vx + driftX,
          vy: particle.vy + driftY
        };
      })
    );
    
    animationRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // Start animation loop
  useEffect(() => {
    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(animateParticles);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles.length, animateParticles]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      initializeParticles();
      initializeConnectionNodes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeParticles, initializeConnectionNodes]);

  // Initialize particles and nodes on mount
  useEffect(() => {
    initializeParticles();
    initializeConnectionNodes();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeParticles, initializeConnectionNodes]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50"
    >
      {/* Clean Background - No Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/50"></div>

      {/* Magnetic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const magneticRange = 200;
          
          let attractionX = 0;
          let attractionY = 0;
          
          if (isHovering && distance < magneticRange) {
            const force = (magneticRange - distance) / magneticRange;
            attractionX = (dx / distance) * force * 50;
            attractionY = (dy / distance) * force * 50;
          }

          return (
            <div
              key={particle.id}
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: particle.x + attractionX,
                top: particle.y + attractionY,
                width: particle.size,
                height: particle.size,
                transform: `scale(${isHovering && distance < 100 ? 1.5 : 1})`,
              }}
            >
              {particle.type === 'heart' && (
                <Heart 
                  size={particle.size} 
                  fill={particle.color} 
                  color={particle.color}
                  className="drop-shadow-sm heart-pulse" 
                />
              )}
              {particle.type === 'circle' && (
                <div 
                  className="rounded-full drop-shadow-sm"
                  style={{ 
                    backgroundColor: particle.color,
                    width: '100%',
                    height: '100%'
                  }}
                />
              )}
              {particle.type === 'diamond' && (
                <div 
                  className="rotate-45 drop-shadow-sm"
                  style={{ 
                    backgroundColor: particle.color,
                    width: '100%',
                    height: '100%'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Electric Connection Network */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        {isHovering && connectionNodes.map((node) => {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 300) {
            const opacity = Math.max(0, (300 - distance) / 300);
            return (
              <line
                key={node.id}
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={node.x}
                y2={node.y}
                stroke="url(#electricGradient)"
                strokeWidth="2"
                opacity={opacity}
                className="animate-pulse"
              />
            );
          }
          return null;
        })}
        
        {/* Heart connections when particles are near center */}
        {particles.map((particle, index) => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && particle.type === 'heart') {
            return (
              <line
                key={`heart-${index}`}
                x1={particle.x}
                y1={particle.y}
                x2={centerX}
                y2={centerY}
                stroke="#ff6600"
                strokeWidth="1"
                opacity="0.6"
                className="animate-pulse"
              />
            );
          }
          return null;
        })}

        {/* Gradient definitions for electric connections */}
        <defs>
          <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003087" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00acec" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6600" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Connection Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {connectionNodes.map((node) => {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const isActive = distance < 300;
          
          return (
            <div
              key={node.id}
              className="absolute transition-all duration-300"
              style={{
                left: node.x - 6,
                top: node.y - 6,
                transform: `scale(${isActive ? 1.5 : 1})`,
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive ? 'animate-ping connection-glow' : 'animate-pulse'
                }`}
                style={{
                  backgroundColor: isActive ? '#ff6600' : '#003087',
                  boxShadow: isActive ? '0 0 20px #ff6600' : '0 0 10px #003087'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Central Text - Main Focus */}
      <div className="text-center z-20 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-blue-900 via-cyan-500 to-orange-500 bg-clip-text text-transparent hover-lift">
            Connecting Hearts,
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-cyan-500 to-blue-900 bg-clip-text text-transparent hover-lift">
            Changing Lives
          </span>
        </h1>
        
        {/* Subtle subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
          Cognizant's commitment to building bridges of empathy and driving positive change in communities worldwide
        </p>
      </div>


    </section>
  );
};

export default HeroSection;