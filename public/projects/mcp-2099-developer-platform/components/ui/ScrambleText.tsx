import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  revealSpeed?: number;
  onComplete?: () => void;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&[]{}<>';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 50,
  revealSpeed = 100,
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    let interval: any;
    let timeout: any;
    
    timeout = setTimeout(() => {
        let iterations = 0;
        
        interval = setInterval(() => {
            setDisplayText(prev => 
                text.split('').map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
            
            if (iterations >= text.length) { 
                clearInterval(interval);
                if (onComplete) onComplete();
            }
            
            iterations += 1 / (revealSpeed / 10); // Control smoothness
        }, speed);
    }, delay);

    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    };
  }, [text, delay, speed, revealSpeed, onComplete]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;
