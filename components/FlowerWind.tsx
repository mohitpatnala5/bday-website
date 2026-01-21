
import React, { useEffect, useState, useMemo } from 'react';
import { RomanticFlower } from '../constants';

export const FlowerWind: React.FC<{ color: string, slideIndex?: number }> = ({ color, slideIndex = 0 }) => {
  const [isGusting, setIsGusting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsGusting(true);
    const timer = setTimeout(() => setIsGusting(false), 1200);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5), 
        y: (e.clientY / window.innerHeight - 0.5) 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Increased density from 40 to 75 for more intensity as requested
  const flowers = useMemo(() => {
    return [...Array(75)].map((_, i) => ({
      id: i,
      top: (Math.random() * 120 - 10),
      left: (Math.random() * 120 - 10),
      size: 30 + Math.random() * 150,
      opacity: 0.2 + Math.random() * 0.4,
      speed: 8 + Math.random() * 18,
      depth: 0.3 + Math.random() * 1.7,
      type: i % 3,
      delay: -Math.random() * 20
    }));
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map(f => (
        <div
          key={f.id}
          className="absolute transition-all duration-[2000ms] ease-out will-change-transform"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            transform: `translate(${mousePos.x * 80 * f.depth}px, ${mousePos.y * 80 * f.depth}px) ${isGusting ? 'scale(1.15) translateX(50px)' : 'scale(1)'}`,
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              animation: `floatAround ${isGusting ? f.speed / 2.5 : f.speed}s ease-in-out infinite`,
              animationDelay: `${f.delay}s`,
              transition: 'all 1s ease-in-out'
            }}
          >
            <RomanticFlower color={color} type={f.type} />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(40px, -40px) rotate(20deg); }
          50% { transform: translate(60px, 0px) rotate(-10deg); }
          75% { transform: translate(-20px, 40px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
};
