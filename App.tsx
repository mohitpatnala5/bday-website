
import React, { useState, useEffect, useRef } from 'react';
import { AppState } from './types';
import { COLORS, IMAGES } from './constants';
import { EmojiRain } from './components/EmojiRain';
import { FlowerWind } from './components/FlowerWind';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INITIAL);
  const [countdown, setCountdown] = useState(10);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => {
          console.warn("Audio play blocked. Click anywhere to play.", e);
          const playOnNextClick = () => {
             audioRef.current?.play().then(() => {
               setIsMusicPlaying(true);
               window.removeEventListener('click', playOnNextClick);
             });
          };
          window.addEventListener('click', playOnNextClick);
        });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleEnter = () => {
    startMusic();
    setState(AppState.OPENING_BOOK);
    // Timing matches the book-opening animation duration
    setTimeout(() => {
      setState(AppState.WELCOME);
    }, 2400);
  };

  const startCountdown = () => {
    setState(AppState.COUNTDOWN);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setState(AppState.BLOW_CANDLE);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
    setTimeout(() => {
      setState(AppState.REVEAL);
      setTimeout(() => {
        setState(AppState.SLIDESHOW);
      }, 4500);
    }, 1500);
  };

  useEffect(() => {
    if (state === AppState.SLIDESHOW) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % IMAGES.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [state]);

  const isPinkTheme = state === AppState.INITIAL || state === AppState.OPENING_BOOK || state === AppState.WELCOME || state === AppState.COUNTDOWN || state === AppState.BLOW_CANDLE;
  const flowerColor = state === AppState.SLIDESHOW ? "#f472b6" : (isPinkTheme ? "#f472b6" : "#60a5fa");

  return (
    <div className={`fixed inset-0 transition-all duration-[2500ms] flex flex-col items-center justify-center overflow-hidden touch-none select-none ${isPinkTheme ? COLORS.pinkTheme : COLORS.skyBlue}`}>
      
      <FlowerWind color={flowerColor} slideIndex={currentSlide} />
      
      <audio ref={audioRef} loop crossOrigin="anonymous">
        <source src="/birthday-song.mp3" type="audio/mpeg" />
      </audio>

      <button 
        onClick={toggleMusic}
        className="fixed bottom-10 right-10 z-[150] group flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/40 p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <span className="text-xl">{isMusicPlaying ? '🎵' : '🔇'}</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-pink-600 px-0 group-hover:px-2">
          I think they call this love
        </span>
      </button>

      {/* STAGE: INITIAL */}
      {state === AppState.INITIAL && (
        <div className="z-50 text-center animate-fade-in flex flex-col items-center">
          <div className="mb-14 relative">
             <div className="absolute -inset-20 bg-pink-300/20 blur-[100px] rounded-full animate-pulse"></div>
             <h1 className="text-6xl md:text-[7rem] font-dancing text-pink-600 mb-8 drop-shadow-lg leading-tight">
               Welcome bangaram ❤️
             </h1>
          </div>
          <button 
            onClick={handleEnter}
            className="group relative px-20 py-8 bg-white/50 backdrop-blur-2xl text-pink-600 rounded-2xl text-3xl font-bold shadow-2xl transition-all hover:scale-105 border border-white/60 overflow-hidden"
          >
            <span className="relative z-10 tracking-[0.3em] uppercase font-playfair">Enter</span>
            <div className="absolute inset-0 bg-white/80 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
          </button>
        </div>
      )}

      {/* STAGE: OPENING BOOK */}
      {state === AppState.OPENING_BOOK && (
        <div className="fixed inset-0 z-[100] flex perspective-[3000px] pointer-events-none">
          <div className="w-1/2 h-full bg-[#fdfcfd] border-r-[15px] border-pink-100 origin-left transition-transform duration-[2400ms] cubic-bezier(0.645, 0.045, 0.355, 1) shadow-[50px_0_150px_rgba(0,0,0,0.15)] flex flex-col items-end justify-center px-12" style={{ transform: 'rotateY(-155deg)' }}>
             <h2 className="text-pink-100 font-playfair text-[10vw] font-black opacity-30 uppercase select-none leading-none">Your</h2>
          </div>
          <div className="w-1/2 h-full bg-[#fdfcfd] border-l-[15px] border-pink-100 origin-right transition-transform duration-[2400ms] cubic-bezier(0.645, 0.045, 0.355, 1) shadow-[-50px_0_150px_rgba(0,0,0,0.15)] flex flex-col items-start justify-center px-12" style={{ transform: 'rotateY(155deg)' }}>
             <h2 className="text-pink-100 font-playfair text-[10vw] font-black opacity-30 uppercase select-none leading-none">Story</h2>
          </div>
        </div>
      )}

      {/* STAGE: WELCOME */}
      {state === AppState.WELCOME && (
        <div className="z-50 text-center animate-fade-in px-4">
          <h2 className="text-7xl md:text-[10rem] font-dancing text-pink-600 drop-shadow-xl mb-14 animate-float">Welcome here</h2>
          <div className="flex flex-col items-center">
            <button onClick={startCountdown} className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="h-[1px] w-40 bg-pink-300 group-hover:w-64 transition-all duration-700"></div>
              <span className="text-2xl md:text-3xl font-playfair tracking-[0.5em] text-pink-400 group-hover:text-pink-700 transition-all uppercase">
                let's start the countdown
              </span>
              <div className="h-[1px] w-40 bg-pink-300 group-hover:w-64 transition-all duration-700"></div>
            </button>
          </div>
        </div>
      )}

      {/* STAGE: COUNTDOWN */}
      {state === AppState.COUNTDOWN && (
        <div className="z-50 text-center relative flex flex-col items-center">
          <EmojiRain />
          <div className="text-[18rem] md:text-[28rem] font-playfair font-black text-pink-500 leading-none drop-shadow-2xl animate-countdown-scale">
            {countdown}
          </div>
          <p className="text-3xl text-pink-400 font-dancing italic tracking-widest mt-[-20px] opacity-80 animate-pulse">Wait for surprise</p>
        </div>
      )}

      {/* STAGE: BLOW CANDLE */}
      {state === AppState.BLOW_CANDLE && (
        <div className="z-50 text-center flex flex-col items-center animate-fade-in px-4">
          <h3 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-16 italic">Make a wish and blow the candle!</h3>
          <div 
            onClick={handleBlowCandle}
            className={`relative cursor-pointer transition-transform hover:scale-110 active:scale-95 duration-500 ${candleBlown ? 'pointer-events-none' : ''}`}
          >
            <div className="w-12 h-32 bg-pink-200 rounded-lg relative overflow-hidden border border-pink-100/50 shadow-lg">
               <div className="absolute top-0 left-0 right-0 h-4 bg-pink-300/30"></div>
            </div>
            {!candleBlown ? (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-12 bg-orange-400 rounded-full blur-[2px] animate-flame">
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-200 rounded-full"></div>
              </div>
            ) : (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-smoke pointer-events-none opacity-0">
                <div className="w-4 h-4 bg-gray-400/20 rounded-full mb-1"></div>
                <div className="w-3 h-3 bg-gray-400/10 rounded-full translate-x-2"></div>
              </div>
            )}
            <div className="w-1 h-4 bg-gray-800 absolute -top-4 left-1/2 -translate-x-1/2"></div>
          </div>
          {!candleBlown && <p className="mt-12 text-pink-400 font-playfair tracking-[0.2em] uppercase animate-bounce">Click to Blow</p>}
        </div>
      )}

      {/* STAGE: REVEAL */}
      {state === AppState.REVEAL && (
        <div className="z-50 text-center animate-premium-reveal px-4">
           <h1 className="text-7xl md:text-[11rem] font-dancing text-blue-700 drop-shadow-2xl leading-[0.9] font-bold">
             Happyyyy Birthdayyy<br/>princess
           </h1>
           <div className="flex justify-center gap-10 mt-20">
              <span className="text-7xl animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
              <span className="text-7xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌹</span>
              <span className="text-7xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
           </div>
        </div>
      )}

      {/* STAGE: SLIDESHOW */}
      {state === AppState.SLIDESHOW && (
        <div className="relative w-full h-full flex flex-col items-center justify-center z-10 px-6 py-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-8xl md:text-[12rem] font-playfair text-blue-900 font-black tracking-tighter leading-none opacity-95 drop-shadow-2xl">
              Happyyyyy 21!!!
            </h2>
          </div>

          <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.3)] border-[16px] border-white/95 backdrop-blur-2xl bg-white/10 transition-all duration-[2000ms] transform-gpu hover:scale-[1.02] hover:rotate-1">
            {IMAGES.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1) ${currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
              >
                <img
                  src={img}
                  alt={`Memory ${idx}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#dbeafe';
                    e.currentTarget.src = `https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-14 flex items-center gap-4 z-30">
            {IMAGES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-1000 ${currentSlide === idx ? 'w-16 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]' : 'w-4 bg-blue-200'}`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in { animation: fadeIn 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-in-up { animation: fadeIn 1.5s ease-out forwards; }
        .animate-countdown-scale { animation: countdownScale 1s ease-in-out infinite; }
        .animate-premium-reveal { animation: premiumReveal 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-flame { animation: flame 0.8s ease-in-out infinite alternate; }
        .animate-smoke { animation: smoke 1.5s ease-out forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes countdownScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes premiumReveal {
          from { opacity: 0; transform: scale(0.8) translateY(100px); filter: blur(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes flame {
          0% { transform: translate(-50%, 0) scale(1) rotate(-2deg); }
          100% { transform: translate(-50%, -5px) scale(1.1) rotate(2deg); }
        }
        @keyframes smoke {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -50px) scale(2); }
        }
        .perspective-3000 { perspective: 3000px; }
      `}</style>
    </div>
  );
};

export default App;
