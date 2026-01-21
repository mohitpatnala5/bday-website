
import React, { useEffect, useState } from 'react';
import { EmojiDrop } from '../types';

const EMOJIS = ['🎉', '❤️', '💖', '✨', '🎂', '🥳', '🌹'];

export const EmojiRain: React.FC = () => {
  const [drops, setDrops] = useState<EmojiDrop[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDrop: EmojiDrop = {
        id: Date.now(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2
      };
      setDrops(prev => [...prev.slice(-40), newDrop]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-3xl transition-transform"
          style={{
            left: `${drop.left}%`,
            top: '-50px',
            animation: `fall ${drop.duration}s linear forwards`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {drop.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
