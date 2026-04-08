import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/useGameStore';

// 에셋 임포트
import cinemaBack1 from '../assets/cinema/cinema_back1.png';
import cinemaCharacter1 from '../assets/cinema/cinema_charater1.png';

const SCENES = [
  {
    id: 1,
    bg: cinemaBack1,
    character: cinemaCharacter1,
    text: "저 먼저 들어가보겠습니다! (집가서 뭐먹지.. 제육? 돈까스? 엽떡? 행복한 고민.. 야르)",
  },
  // 추후 추가될 2장, 3장을 위한 임시 더미 데이터 (배경, 캐릭터는 아직 없음)
  {
    id: 2,
    bg: null,
    character: null,
    text: "하지만 밖에는 아직 진상 손님들이...",
  },
  {
    id: 3,
    bg: null,
    character: null,
    text: "마지막 퇴근의 순간까지 긴장을 놓을 수 없었다!",
  }
];

// 한 글자씩 나타나는 타이핑 효과 컴포넌트
function TypewriterText({ text, active }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    if (!active) return;
    
    setDisplayedText("");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 60); // 타이핑 속도 조절
    
    return () => clearInterval(interval);
  }, [text, active]);

  return <span>{displayedText}</span>;
}

export default function CinematicScreen() {
  const finishCinematic = useGameStore(state => state.finishCinematic);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < SCENES.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishCinematic();
    }
  };

  const currentScene = SCENES[currentStep];

  return (
    <div 
      className="min-h-screen w-full bg-black flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden"
      onClick={handleNext}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* 배경 이미지 */}
          {currentScene && currentScene.bg ? (
            <img 
              src={currentScene.bg} 
              alt="Cinematic Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 opacity-70" />
          )}

          <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto relative">
            {/* 등장인물 이미지 (우측 하단 배치) */}
            {currentScene && currentScene.character && (
              <motion.img 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                src={currentScene.character} 
                alt="Cinematic Character" 
                className="absolute bottom-[-5vh] md:bottom-[-10vh] right-[-10vw] md:right-[-5vw] w-[450px] md:w-[700px] max-w-none object-contain drop-shadow-2xl z-10 origin-bottom"
              />
            )}

            {/* 말풍선 영역 (캐릭터 머리 맡인 좌상단 쪽으로 배치) */}
            {currentScene && currentScene.text && (
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-[50vh] md:bottom-[55vh] right-[10vw] md:right-[35vw] bg-white text-gray-900 px-8 py-6 md:px-10 md:py-8 rounded-[2.5rem] rounded-br-[0.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] max-w-[80vw] md:max-w-xl z-20 border-4 border-gray-200"
              >
                <p className="text-xl md:text-3xl font-bold leading-relaxed whitespace-pre-wrap break-keep min-h-[90px] md:min-h-[120px]">
                  {/* 말풍선 속의 텍스트가 타이핑됨 */}
                  <TypewriterText text={currentScene.text || ""} active={true} />
                </p>
                {/* 꼬리표 (말풍선 꼬리) */}
                <div className="absolute -bottom-4 right-12 w-8 h-8 bg-white border-b-4 border-r-4 border-gray-200 rotate-45" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 액션 가이드 UI 영역 (스킵 & 넘기기) - 그대로 유지 */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          finishCinematic();
        }}
        className="absolute top-10 right-10 z-50 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border border-white/20 rounded-full px-6 py-2 bg-black/30 backdrop-blur-md"
      >
        Skip ⏭
      </button>

      <motion.div 
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/70 text-md font-bold tracking-widest bg-black/50 px-8 py-3 border border-white/10 rounded-full backdrop-blur-sm pointer-events-none"
      >
        화면을 터치해서 다음으로
      </motion.div>
    </div>
  );
}
