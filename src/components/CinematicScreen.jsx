import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/useGameStore';

// 에셋 임포트
import cinemaBack1 from '../assets/cinema/cinema_back1.png';
import cinemaCharacter1 from '../assets/cinema/cinema_charater1.png';
import cinemaBack2 from '../assets/cinema/cinema_back2.png';
import cinemaCharacter2 from '../assets/cinema/cinema_charater2.png';

const SCENES = [
  {
    id: 1,
    bg: cinemaBack1,
    character: cinemaCharacter1,
    align: 'right',
    speaker: "MZ 신입",
    text: "저 먼저 들어가보겠습니다!\n(집가서 뭐먹지.. 제육? 돈까스? 엽떡?행복한 고민.. 야르~)",
  },
  {
    id: 2,
    bg: cinemaBack2,
    character: cinemaCharacter2,
    align: 'left',
    speaker: "사장님",
    text: "자자 여러분, \n 즐거운 금요일이니 즐겁게 회식하고 들어갈까요? \n 시간은 오후 6시 반에 출발 하시죠 ㅎㅎ",
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
    if (!active || !text) return;

    setDisplayedText("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      // charAt을 사용하여 범위를 벗어나면 빈 문자열을 반환하게 하여 undefined 방지
      const nextChar = text.charAt(currentIndex);
      if (nextChar) {
        setDisplayedText((prev) => prev + nextChar);
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
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* 배경 이미지 */}
          {currentScene && currentScene.bg ? (
            <img
              src={currentScene.bg}
              alt="Cinematic Background"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 opacity-80" />
          )}

          <div className="absolute inset-0 w-full h-full max-w-[1400px] mx-auto relative overflow-hidden pointer-events-none">
            {/* 등장인물 이미지 (align 속성에 따라 좌/우 배치) */}
            {currentScene && currentScene.character && (
              <motion.img
                initial={{ x: currentScene.align === 'left' ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.2 }}
                src={currentScene.character}
                alt="Cinematic Character"
                className={`absolute bottom-[-5vh] md:bottom-[-2vh] w-[600px] md:w-[1100px] max-w-none object-contain drop-shadow-2xl z-10 origin-bottom pointer-events-none ${
                  currentScene.align === 'left' ? 'left-[-15vw] md:left-[-5vw]' : 'right-[-15vw] md:right-[-5vw]'
                }`}
              />
            )}
          </div>

          {/* 하단 대화창 (비주얼 노벨 스타일 Box) */}
          {currentScene && currentScene.text && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-black/70 border-4 border-white/30 rounded-xl px-10 py-8 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col"
            >
              {/* 화자 이름 */}
              <div className="text-amber-400 font-black text-2xl md:text-3xl mb-4 tracking-wider drop-shadow-md">
                {currentScene.speaker || "알바생"}
              </div>

              <div className="text-gray-100 text-xl md:text-3xl font-semibold leading-relaxed min-h-[90px] md:min-h-[110px] break-keep whitespace-pre-wrap">
                {/* 타이핑 효과가 적용된 대사 */}
                <TypewriterText text={currentScene.text} active={true} />
              </div>

              {/* 다음으로 넘어가기 깜빡임 화살표 */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-6 right-8 text-white/60 text-2xl"
              >
                ▼
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 액션 가이드 UI 영역 (상단 스킵 버튼) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          finishCinematic();
        }}
        className="absolute top-10 right-10 z-50 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border border-white/20 rounded-full px-6 py-2 bg-black/30 backdrop-blur-md"
      >
        Skip ⏭
      </button>
    </div>
  );
}
