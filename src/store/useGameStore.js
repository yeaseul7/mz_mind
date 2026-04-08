import { create } from 'zustand';

const useGameStore = create((set) => ({
  gameState: 'intro', // 'intro', 'cinematic', 'main', 'ingame', 'gameover'
  score: 0,
  stressLevel: 0,
  moneyEarned: 0,

  // Actions
  setGameState: (newState) => set({ gameState: newState }),

  handleIntroStart: () => set((state) => {
    const isSkipped = localStorage.getItem('puring_skip_cinematic') === 'true';
    if (isSkipped) {
      return { gameState: 'main' };
    } else {
      return { gameState: 'cinematic' };
    }
  }),

  finishCinematic: () => {
    localStorage.setItem('puring_skip_cinematic', 'true');
    set({ gameState: 'main' });
  },

  serveBeer: (quality) => set((state) => {
    // quality: e.g. how perfectly poured (0-100)
    let addedMoney = 0;
    let addedStress = 0;
    
    if (quality > 80) {
      addedMoney = 5000;
      addedStress = -10; // good pour relieves stress
    } else if (quality > 50) {
      addedMoney = 2500;
      addedStress = 5;
    } else {
      addedStress = 20; // bad pour angers customer
    }

    return {
      moneyEarned: state.moneyEarned + addedMoney,
      stressLevel: Math.max(0, Math.min(100, state.stressLevel + addedStress)),
      score: state.score + 10,
    };
  }),

  increaseStress: () => set((state) => ({
    stressLevel: Math.min(100, state.stressLevel + 1)
  })),

  resetGame: () => set({
    gameState: 'intro',
    score: 0,
    stressLevel: 0,
    moneyEarned: 0
  }),
  
  startGame: () => set({
    gameState: 'ingame',
    score: 0,
    stressLevel: 0
    // moneyEarned is kept across sessions? User might want this. Let's keep it.
  })
}));

export default useGameStore;
