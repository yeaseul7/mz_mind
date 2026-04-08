import IntroScreen from './components/IntroScreen';
import CinematicScreen from './components/CinematicScreen';
import MainScreen from './components/MainScreen';
import GameScreen from './components/GameScreen';
import useGameStore from './store/useGameStore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const gameState = useGameStore(state => state.gameState);

  return (
    <div className="relative w-full min-h-screen bg-wood-dark overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <IntroScreen />
          </motion.div>
        )}

        {gameState === 'cinematic' && (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <CinematicScreen />
          </motion.div>
        )}
        
        {gameState === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <MainScreen />
          </motion.div>
        )}
        
        {gameState === 'ingame' && (
          <motion.div
            key="ingame"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            className="absolute inset-0"
          >
            <GameScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
