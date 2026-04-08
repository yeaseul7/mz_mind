import { motion } from 'framer-motion';
import useGameStore from '../store/useGameStore';

export default function Customer() {
  const stressLevel = useGameStore(state => state.stressLevel);

  // Calculate shaking intensity based on stress
  const shakeIntensity = stressLevel > 70 ? 10 : stressLevel > 40 ? 5 : 0;
  
  // Calculate redness
  const redness = Math.floor((stressLevel / 100) * 255);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-wood-light/50 rounded-2xl w-full max-w-md mx-auto shadow-xl border-4 border-yellow-800/30">
      <h2 className="text-2xl font-bold mb-4 text-amber-100">진상 손님 (Stress: {stressLevel}%)</h2>
      
      <motion.div 
        animate={{ 
          x: shakeIntensity > 0 ? [-shakeIntensity, shakeIntensity, -shakeIntensity] : 0,
          backgroundColor: `rgb(${Math.max(80, redness)}, 60, 60)` // Gets redder as stress goes up
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.2 
        }}
        className="w-48 h-48 rounded-full border-4 border-black/50 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        {stressLevel > 80 ? '😡' : stressLevel > 40 ? '😠' : '🙂'}
      </motion.div>
      
      <div className="w-full bg-black/40 h-6 mt-6 rounded-full overflow-hidden border border-black/50">
        <motion.div 
          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 origin-left"
          animate={{ scaleX: stressLevel / 100 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        />
      </div>
    </div>
  );
}
