import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      <path 
        d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50" 
        stroke="url(#logoGradient)" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="15" fill="url(#logoGradient)" />
      <circle cx="85" cy="15" r="8" fill="#EC4899" />
    </svg>
  );
};

export default Logo;
