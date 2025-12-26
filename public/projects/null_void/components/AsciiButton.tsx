import React from 'react';

interface AsciiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  fullWidth?: boolean;
}

const AsciiButton: React.FC<AsciiButtonProps> = ({ label, fullWidth, className, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className={`
        group relative inline-flex items-center justify-center 
        font-mono text-sm uppercase tracking-widest outline-none
        transition-all duration-200
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="flex flex-col items-stretch">
        {/* Top Border */}
        <div className="flex items-center text-primary leading-none select-none overflow-hidden whitespace-nowrap">
          <span className="mr-1">┌</span>
          <span className="flex-grow overflow-hidden">{isHovered ? '─'.repeat(40) : '─'.repeat(40)}</span>
          <span className="ml-1">┐</span>
        </div>

        {/* Middle Content */}
        <div className="flex items-center justify-between px-1 text-primary leading-none">
          <span className="select-none">│</span>
          <span className={`px-4 py-2 flex-grow text-center group-hover:bg-primary group-hover:text-bg transition-colors duration-0`}>
             {isHovered ? `[ ${label} ]` : label}
          </span>
          <span className="select-none">│</span>
        </div>

        {/* Bottom Border */}
        <div className="flex items-center text-primary leading-none select-none overflow-hidden whitespace-nowrap">
          <span className="mr-1">└</span>
          <span className="flex-grow overflow-hidden">{isHovered ? '─'.repeat(40) : '─'.repeat(40)}</span>
          <span className="ml-1">┘</span>
        </div>
      </div>
    </button>
  );
};

export default AsciiButton;
