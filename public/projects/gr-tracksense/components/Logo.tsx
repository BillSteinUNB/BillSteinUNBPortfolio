import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <path
          d="M10 30 L30 30 L40 10 L80 10"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-zinc-100"
        />
        <circle cx="80" cy="10" r="4" fill="#FF4500" />
        <path
          d="M25 35 L45 35"
          stroke="#FF4500"
          strokeWidth="2"
        />
      </svg>
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-bold text-white tracking-wider text-lg">
            GR <span className="text-gr">TRACK</span>SENSE
          </span>
          <span className="font-mono text-[0.6rem] text-zinc-500 tracking-[0.2em]">
            RACING INTELLIGENCE
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;