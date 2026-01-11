
import React, { useState } from 'react';

interface RocketButtonProps {
  onTab: () => void;
  isBoosted: boolean;
}

const RocketButton: React.FC<RocketButtonProps> = ({ onTab, isBoosted }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number; val: number }[]>([]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPressed(true);
    onTab();

    // Floating text logic
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newClick = { 
      id: Date.now(), 
      x, 
      y, 
      val: isBoosted ? 2 : 1 
    };
    
    setClicks(prev => [...prev, newClick]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 1000);
  };

  const handlePointerUp = () => setIsPressed(false);

  return (
    <div className="relative">
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`
          relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center transition-all duration-75
          ${isPressed ? 'scale-90 shadow-inner' : 'scale-100 hover:scale-105'}
          ${isBoosted 
            ? 'bg-gradient-to-br from-red-600 to-orange-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-[0_0_40px_rgba(37,99,235,0.3)]'}
          border-4 border-white/20
        `}
      >
        <span className={`text-8xl md:text-9xl transform transition-transform ${isPressed ? 'scale-110' : ''} rocket-glow`}>
          🚀
        </span>

        {/* Inner shadow/ring for depth */}
        <div className="absolute inset-0 rounded-full border-4 border-white/10 pointer-events-none" />
      </button>

      {/* Floating XP Gain Text */}
      {clicks.map(click => (
        <div
          key={click.id}
          className={`absolute pointer-events-none font-bold text-3xl animate-float-up ${isBoosted ? 'text-orange-300' : 'text-blue-300'}`}
          style={{ left: click.x, top: click.y }}
        >
          +{click.val}
        </div>
      ))}

      <style>{`
        @keyframes float-up {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -100px); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RocketButton;
