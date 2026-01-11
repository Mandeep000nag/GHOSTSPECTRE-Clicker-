
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GhostIcon from './GhostIcon';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface GhostButtonProps {
  onTab: () => void;
  isBoosted: boolean;
}

const GhostButton: React.FC<GhostButtonProps> = ({ onTab, isBoosted }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdCounter = useRef(0);

  // Haptic feedback utility
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Track proximity for the "Lean" effect
  useEffect(() => {
    const handleGlobalPointer = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      
      setMousePos({ 
        x: Math.max(-1, Math.min(1, dx)), 
        y: Math.max(-1, Math.min(1, dy)) 
      });
    };

    window.addEventListener('pointermove', handleGlobalPointer);
    return () => window.removeEventListener('pointermove', handleGlobalPointer);
  }, []);

  // Boost Particle Emission (Constant stream)
  useEffect(() => {
    if (!isBoosted) return;

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: particleIdCounter.current++,
        x: 144 + (Math.random() - 0.5) * 100, // centered roughly
        y: 144 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 4 - 2,
        size: Math.random() * 6 + 2,
        color: 'bg-orange-400',
        life: 1,
      };
      setParticles(prev => [...prev.slice(-30), newParticle]);
    }, 100);

    return () => clearInterval(interval);
  }, [isBoosted]);

  // Clean up particles
  useEffect(() => {
    const timeout = setTimeout(() => {
      setParticles(prev => prev.filter(p => p.life > 0));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [particles]);

  const createBurst = (x: number, y: number) => {
    const count = 8;
    const newParticles: Particle[] = [];
    const color = isBoosted ? 'bg-orange-300' : 'bg-indigo-300';
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdCounter.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 5 + 3,
        color,
        life: 1
      });
    }
    setParticles(prev => [...prev.slice(-50), ...newParticles]);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPressed(true);
    onTab();
    triggerHaptic(isBoosted ? 35 : 50);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createBurst(x, y);

    const newClick = { 
      id: Date.now(), 
      x, 
      y, 
      val: isBoosted ? 2 : 1 
    };
    
    setClicks(prev => [...prev, newClick]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 800);
  };

  const handlePointerUp = () => setIsPressed(false);

  const leanStyle = {
    transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
    transition: 'transform 0.15s ease-out'
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`
          relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center transition-all duration-75
          ${isPressed ? 'scale-[0.88] shadow-inner' : 'scale-100'}
          bg-indigo-950/10 dark:bg-indigo-950/20 backdrop-blur-[4px]
          border border-slate-200/40 dark:border-white/10 shadow-2xl
          perspective-1000
        `}
        style={!isPressed ? leanStyle : undefined}
      >
        {/* Particle Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {particles.map(p => (
            <div
              key={p.id}
              className={`absolute rounded-full blur-[1px] animate-particle-fade ${p.color}`}
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                '--vx': `${p.vx * 20}px`,
                '--vy': `${p.vy * 20}px`,
                boxShadow: `0 0 10px ${isBoosted ? '#fb923c' : '#818cf8'}`
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className={`
          relative w-full h-full flex items-center justify-center
          ${isPressed ? 'animate-none' : 'animate-spectral-breathe animate-spectral-flicker'}
        `}>
          <GhostIcon 
            className={`
              w-64 h-64 md:w-80 md:h-80 transition-all duration-150
              ${isBoosted ? 'boost-active-ghost' : 'ghost-glow'}
              ${isPressed ? 'scale-110 rotate-3' : ''}
            `} 
          />
        </div>
        
        {/* Spectral Aura behind ghost */}
        <div className={`
          absolute inset-0 rounded-full blur-[80px] opacity-25 -z-10 transition-colors duration-1000
          ${isBoosted ? 'bg-orange-500 animate-pulse' : 'bg-indigo-500 animate-pulse'}
        `} 
        style={{ animationDuration: '2.5s' }}
        />
      </button>

      {/* Floating XP Gain Text */}
      {clicks.map(click => (
        <div
          key={click.id}
          className={`absolute pointer-events-none font-game font-extrabold text-5xl animate-float-up-ghost ${isBoosted ? 'text-orange-600 dark:text-orange-400' : 'text-indigo-600 dark:text-indigo-300'}`}
          style={{ 
            left: click.x, 
            top: click.y,
            textShadow: `0 0 20px ${isBoosted ? 'rgba(234, 88, 12, 0.6)' : 'rgba(79, 70, 229, 0.6)'}`
          }}
        >
          +{click.val}
        </div>
      ))}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes float-up-ghost {
          0% { transform: translate(-50%, 0) scale(0.8); opacity: 0; }
          20% { transform: translate(-50%, -20px) scale(1.3); opacity: 1; }
          100% { transform: translate(-50%, -160px) scale(0.6); opacity: 0; }
        }
        .animate-float-up-ghost {
          animation: float-up-ghost 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        }

        @keyframes particle-fade {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--vx), var(--vy)); opacity: 0; }
        }
        .animate-particle-fade {
          animation: particle-fade 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GhostButton;
