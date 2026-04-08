import Customer from './Customer';
import BeerGlass from './BeerGlass';
import useGameStore from '../store/useGameStore';
import { Settings, Coins } from 'lucide-react';

export default function GameScreen() {
  const { moneyEarned, resetGame } = useGameStore();

  return (
    <div className="min-h-screen w-full flex flex-col pt-8 pb-12 px-4 selection:bg-transparent">
      {/* HUD */}
      <header className="flex justify-between items-center w-full max-w-4xl mx-auto bg-black/30 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-full text-amber-950">
            <Coins size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-white/60 text-xs font-bold uppercase tracking-wider">오늘의 수입</span>
            <span className="text-3xl font-black text-amber-400 font-mono">
              ₩{moneyEarned.toLocaleString()}
            </span>
          </div>
        </div>

        <button 
          onClick={resetGame}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white"
        >
          <Settings size={24} />
        </button>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Left Side: Customer */}
        <div className="flex-1 w-full flex items-center justify-center">
          <Customer />
        </div>

        {/* Right Side: Action Area */}
        <div className="flex-1 w-full flex items-center justify-center bg-black/20 p-8 rounded-3xl backdrop-blur-sm border-2 border-white/5 relative overflow-hidden shadow-2xl shadow-amber-900/10">
           {/* Decorative background light */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <BeerGlass />
        </div>
      </main>
      
      {/* Footer / Instructions */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium tracking-wide">
        적정선(점선)에 맞춰 맥주를 따르면 스트레스가 풀리고 돈을 법니다.
      </div>
    </div>
  );
}
