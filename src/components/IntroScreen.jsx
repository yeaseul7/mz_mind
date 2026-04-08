import { motion } from 'framer-motion';
import useGameStore from '../store/useGameStore';

// 에셋 임포트
import puringCharacter1 from '../assets/puring_charater1.png';
import puringIntro from '../assets/puring_intro.png';
import titleImg from '../assets/title.png'; 

export default function IntroScreen() {
  const handleIntroStart = useGameStore(state => state.handleIntroStart);

  return (
    <div 
      className="min-h-screen w-full flex flex-col cursor-pointer select-none relative overflow-hidden bg-black"
      onClick={() => handleIntroStart()}
    >
      {/* 배경 이미지 영역 (puring_intro.png) */}
      <div className="absolute inset-0 z-0 border-none outline-none">
        <img 
          src={puringIntro} 
          alt="Street Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/80" />
      </div>

      {/* 약간 더 상단 & 좌측으로 이동한 타이틀 이미지 */}
      <motion.div 
        className="absolute top-4 md:top-8 w-full flex justify-center pr-12 md:pr-[20vw] z-10 pointer-events-none"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
      >
        <img 
          src={titleImg} 
          alt="Puring Title" 
          className="w-[85vw] md:w-[750px] max-w-none object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
        />
      </motion.div>

      {/* 우하단: 캐릭터 이미지 (고정 상태) */}
      <motion.div 
        className="absolute bottom-0 right-[-10vw] md:right-[2vw] z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img 
          src={puringCharacter1} 
          alt="Puring Character" 
          className="w-[350px] md:w-[600px] max-w-none object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* 불꽃처럼 빛나는 웅장한 '게임 시작!' 버튼 */}
      <motion.div
        animate={{ y: [-3, 0, -3] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-[25vh] md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex justify-center group"
      >
        <div className="relative cursor-pointer">
          {/* 강렬한 외부 발광 (Glow) 효과 */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          {/* 퍼지는 불티 느낌의 보조 발광 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ffeb3b] to-[#ff5722] rounded-full blur-md opacity-100" />

          {/* 메인 버튼 본체 */}
          <div className="relative px-16 py-5 rounded-[2.5rem] bg-gradient-to-b from-[#ffeaa7] via-[#ffaa00] to-[#e64a19] border-[3px] border-[#fff9c4] shadow-[inset_0_6px_10px_rgba(255,255,255,0.9),inset_0_-6px_10px_rgba(150,30,0,0.8),0_15px_25px_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(150,30,0,0.8),0_5px_10px_rgba(0,0,0,0.6)] transition-all flex items-center justify-center">
            
            {/* 내부 밝은 하이라이트 선 */}
            <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />

            <span className="text-[#3e1300] font-black text-4xl md:text-5xl tracking-widest drop-shadow-[0_2px_1px_rgba(255,255,255,0.4)]">
              게임 시작!
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
