import { motion } from 'framer-motion';
import useGameStore from '../store/useGameStore';
import { Play, TrendingUp, Store } from 'lucide-react';

export default function MainScreen() {
  const { startGame, moneyEarned } = useGameStore();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-800/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-900/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10 flex flex-col items-center gap-8">
        
        {/* Header Title */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black text-amber-400 mb-2 drop-shadow-md">나의 호프집</h1>
          <p className="text-white/60 text-sm">오늘도 진상을 피해 장사를 해봅시다</p>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4"
        >
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
            <div className="bg-amber-500/20 p-3 rounded-xl text-amber-400">
              <Store size={28} />
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 font-semibold">총 누적 수입</div>
              <div className="text-2xl font-black text-white font-mono">₩{moneyEarned.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
            <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 font-semibold">가게 평판</div>
              <div className="text-xl font-bold text-white">보통 (진상 주의)</div>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="w-full relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 font-black text-2xl py-6 rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.3)] border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 flex justify-center items-center gap-3"
        >
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full -translate-y-full hover:translate-y-full transition-transform duration-1000 ease-in-out" />
          <Play fill="currentColor" /> 영업 시작하기
        </motion.button>
        
      </div>
    </div>
  );
}
