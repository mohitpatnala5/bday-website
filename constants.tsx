
/** @jsxImportSource react */

export const COLORS = {
  pinkTheme: 'bg-gradient-to-br from-[#fff1f2] via-[#fff5f7] to-[#fce7f3]',
  skyBlue: 'bg-gradient-to-br from-[#f0f9ff] via-[#f8fafc] to-[#e0f2fe]',
};

export const IMAGES = [
  "/photo1.jpeg", "/photo2.jpeg", "/photo3.jpeg", "/photo4.jpeg",
  "/photo5.jpeg", "/photo6.jpeg", "/photo7.jpeg", "/photo8.jpeg",
  "/photo9.jpeg", "/photo10.jpeg", "/photo11.jpeg", "/photo12.jpeg",
  "/photo13.jpeg", "/photo14.jpeg"
];

export const RomanticFlower = ({ color, type }: { color: string, type: number }) => {
  if (type === 0) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 50C40 30 60 10 50 30C40 10 60 30 50 50Z" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 50C70 40 90 60 70 50C90 60 70 40 50 50Z" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 50C60 70 40 90 50 70C60 90 40 70 50 50Z" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 50C30 60 10 40 30 50C10 40 30 60 50 50Z" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <circle cx="50" cy="50" r="1.5" fill={color} opacity="0.4" />
      </svg>
    );
  }
  if (type === 1) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 90C50 60 40 40 60 10" stroke={color} strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
        <ellipse cx="60" cy="10" rx="3" ry="5" stroke={color} strokeWidth="0.5" opacity="0.6" transform="rotate(15 60 10)"/>
        <path d="M50 60Q35 55 30 40" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.4" opacity="0.6" />
    </svg>
  );
};
