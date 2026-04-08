import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/useGameStore';

export default function BeerGlass() {
  const [fillLevel, setFillLevel] = useState(0); // 0 to 100
  const [isPouring, setIsPouring] = useState(false);
  const serveBeer = useGameStore(state => state.serveBeer);
  const pourInterval = useRef(null);

  const handlePourStart = () => {
    setIsPouring(true);
    pourInterval.current = setInterval(() => {
      setFillLevel(prev => Math.min(100, prev + 2)); // Fill fast
    }, 50);
  };

  const handlePourEnd = () => {
    setIsPouring(false);
    clearInterval(pourInterval.current);
    
    // Evaluate and serve automatically on release for demo
    if (fillLevel > 0) {
      // 90-100 is perfect (100 is max quality)
      const quality = fillLevel > 100 ? 0 : fillLevel; 
      serveBeer(quality);
      
      // Reset glass after a short delay
      setTimeout(() => setFillLevel(0), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="relative w-40 h-64 border-4 border-white/20 rounded-b-3xl rounded-t-sm shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] overflow-hidden bg-white/5 backdrop-blur-sm">
        {/* The Beer Liquid */}
        <motion.div 
          className="absolute bottom-0 w-full bg-yellow-400 opacity-90 shadow-[inset_0_5px_15px_rgba(255,255,255,0.4)]"
          initial={{ height: "0%" }}
          animate={{ height: `${fillLevel}%` }}
          transition={{ type: "tween", duration: 0.1 }}
          style={{ originY: 1 }}
        >
          {/* Foam */}
          <div className="absolute top-0 w-full h-8 bg-white/90 rounded-t-xl -translate-y-4 shadow-sm" />
          
          {/* Bubbles could go here */}
        </motion.div>

        {/* Target Line */}
        <div className="absolute top-12 w-full border-t-2 border-red-500 border-dashed opacity-70 z-10" />
      </div>

      <button
        className={`px-8 py-4 rounded-xl font-bold text-xl select-none transition-transform active:scale-95 ${
          isPouring ? 'bg-amber-600 text-white' : 'bg-amber-500 text-amber-950 hover:bg-amber-400'
        } shadow-lg shadow-black/20 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1`}
        onMouseDown={handlePourStart}
        onMouseUp={handlePourEnd}
        onMouseLeave={() => isPouring && handlePourEnd()}
        onTouchStart={handlePourStart}
        onTouchEnd={handlePourEnd}
      >
        {isPouring ? '따르는 중...🍺' : '눌러서 맥주 따르기 (꾹)'}
      </button>
    </div>
  );
}
