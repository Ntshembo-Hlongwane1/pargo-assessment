// AnimatedText.tsx

import React, { useEffect, useState } from 'react';
import './AnimatedText.scss';

interface AnimatedTextProps {
  texts: string[];
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change the duration as needed

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className='animated-text-container'>
      {texts.map((text, index) => (
        <div
          key={index}
          className={`animated-text ${index === currentIndex ? 'active' : ''}`}
        >
          {text}
        </div>
      ))}
    </div>
  );
};
