import React from 'react';

const Logo: React.FC<{ 
  className?: string;
  responsive?: boolean;
}> = ({ 
  className = "", 
  responsive = false 
}) => {
  // Provide default responsive classes if no className provided
  const defaultClasses = responsive 
    ? "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
    : "w-8 h-8";

  const combinedClassName = className 
    ? className 
    : defaultClasses;

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClassName}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        
        {/* Add glow effect for better visibility on small screens */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Enhanced gradient path */}
      <path 
        d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50" 
        stroke="url(#logoGradient)" 
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        className="transition-all duration-300"
      />
      
      {/* Center circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="12" 
        fill="url(#logoGradient)"
        className="transition-all duration-300"
      />
      
      {/* Accent dot - slightly larger and more visible */}
      <circle 
        cx="85" 
        cy="15" 
        r="6" 
        fill="#EC4899"
        className="transition-all duration-300"
      />
      
      {/* Optional subtle animation for accent dot */}
      <circle 
        cx="85" 
        cy="15" 
        r="8" 
        fill="#EC4899"
        fillOpacity="0.3"
        className="animate-pulse"
      />
    </svg>
  );
};

export default Logo;