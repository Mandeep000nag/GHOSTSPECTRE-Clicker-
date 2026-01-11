
import React from 'react';

const GhostIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Body with subtle stroke for light mode */}
    <path 
      d="M40 80C40 46.8629 66.8629 20 100 20C133.137 20 160 46.8629 160 80V135C160 143.284 153.284 150 145 150C136.716 150 130 143.284 130 135V130H115V135C115 143.284 108.284 150 100 150C91.7157 150 85 143.284 85 135V130H70V135C70 143.284 63.2843 150 55 150C46.7157 150 40 143.284 40 135V80Z" 
      fill="white"
      stroke="#6366f1"
      strokeWidth="0.5"
      className="dark:stroke-transparent transition-all duration-300"
    />
    
    {/* Eyes - Can be moved via CSS transform if needed */}
    <g className="ghost-eyes-container">
      <path 
        d="M75 80C75 75 80 72 85 75C88 77 88 83 85 85C80 88 75 85 75 80Z" 
        fill="#0f1021" 
      />
      <path 
        d="M125 80C125 75 120 72 115 75C112 77 112 83 115 85C120 88 125 85 125 80Z" 
        fill="#0f1021" 
      />
    </g>
    
    {/* Angry Eyebrows */}
    <path d="M70 70L85 75" stroke="#0f1021" strokeWidth="4" strokeLinecap="round" />
    <path d="M130 70L115 75" stroke="#0f1021" strokeWidth="4" strokeLinecap="round" />
    
    {/* Mouth */}
    <path 
      d="M85 100C85 100 90 115 100 115C110 115 115 100 115 100" 
      fill="#0f1021" 
    />
    {/* Teeth */}
    <path d="M90 100L93 105M107 100L104 105" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Tongue/Mouth Interior */}
    <path d="M95 110C95 110 100 113 105 110" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />

    {/* Blushes */}
    <circle cx="65" cy="100" r="6" fill="#fb923c" className="opacity-40" />
    <circle cx="135" cy="100" r="6" fill="#fb923c" className="opacity-40" />
  </svg>
);

export default GhostIcon;
