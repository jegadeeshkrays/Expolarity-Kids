import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      userType: null, // 'parent' or 'child'
      isAuthenticated: false,

      // Quiz state
      currentQuestion: 0,
      quizAnswers: [],
      gardenElements: [],
      rewards: [],

      // UI state
      sidebarOpen: false,
      showRewardModal: false,
      currentReward: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setUserType: (userType) => set({ userType }),
      logout: () => set({ 
        user: null, 
        userType: null, 
        isAuthenticated: false 
      }),

      // Quiz actions
      answerQuestion: (answer) => {
        const { currentQuestion, quizAnswers, gardenElements } = get();
        const newAnswers = [...quizAnswers, { question: currentQuestion, answer }];
        const newElements = [...gardenElements, getGardenElementForQuestion(currentQuestion + 1)];
        
        set({
          quizAnswers: newAnswers,
          currentQuestion: currentQuestion + 1,
          gardenElements: newElements,
        });

        // Check for reward milestones
        const rewardMilestones = [10, 30, 60, 90];
        if (rewardMilestones.includes(currentQuestion + 1)) {
          const reward = getRandomReward();
          set({ 
            showRewardModal: true, 
            currentReward: reward,
            rewards: [...get().rewards, reward]
          });
        }
      },

      setCurrentQuestion: (question) => set({ currentQuestion: question }),
      
      closeRewardModal: () => set({ showRewardModal: false, currentReward: null }),

      addReward: (reward) => set((state) => ({ 
        rewards: [...state.rewards, reward] 
      })),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Reset quiz
      resetQuiz: () => set({
        currentQuestion: 0,
        quizAnswers: [],
        gardenElements: [],
      }),
    }),
    {
      name: 'explore-team-storage',
      partialize: (state) => ({
        user: state.user,
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
        currentQuestion: state.currentQuestion,
        quizAnswers: state.quizAnswers,
        gardenElements: state.gardenElements,
        rewards: state.rewards,
      }),
    }
  )
);

// Helper function to get garden element based on question number
function getGardenElementForQuestion(questionNum) {
  const elements = {
    1: { type: 'sprout', x: 50, y: 80 },
    5: { type: 'flower-pink', x: 30, y: 75 },
    10: { type: 'bush', x: 70, y: 78 },
    15: { type: 'flower-yellow', x: 20, y: 82 },
    20: { type: 'butterfly', x: 40, y: 60 },
    25: { type: 'flower-purple', x: 60, y: 76 },
    30: { type: 'small-tree', x: 15, y: 70 },
    35: { type: 'mushroom', x: 45, y: 85 },
    40: { type: 'vine', x: 80, y: 65 },
    45: { type: 'bird', x: 25, y: 40 },
    50: { type: 'glowing-mushroom', x: 55, y: 83 },
    55: { type: 'flower-pink', x: 75, y: 77 },
    60: { type: 'pond', x: 35, y: 88 },
    65: { type: 'dragonfly', x: 50, y: 45 },
    70: { type: 'big-tree', x: 85, y: 60 },
    75: { type: 'rabbit', x: 42, y: 86 },
    80: { type: 'fireflies', x: 60, y: 50 },
    85: { type: 'rainbow', x: 50, y: 25 },
    90: { type: 'magical-garden', x: 50, y: 50 },
  };

  // Return specific element or a random flower for other questions
  if (elements[questionNum]) {
    return elements[questionNum];
  }

  const randomFlowers = ['flower-pink', 'flower-yellow', 'flower-purple', 'small-plant'];
  return {
    type: randomFlowers[Math.floor(Math.random() * randomFlowers.length)],
    x: Math.random() * 80 + 10,
    y: Math.random() * 20 + 70,
  };
}

// Helper function to get random gardening tool reward
function getRandomReward() {
  const rewards = [
    { id: 'shovel', name: 'Golden Shovel', icon: '🪴' },
    { id: 'scissors', name: 'Magic Scissors', icon: '✂️' },
    { id: 'watering-can', name: 'Rainbow Watering Can', icon: '🚿' },
    { id: 'rake', name: 'Sparkly Rake', icon: '🧹' },
    { id: 'gloves', name: 'Super Gloves', icon: '🧤' },
    { id: 'spray', name: 'Fairy Spray Bottle', icon: '💧' },
    { id: 'seeds', name: 'Magic Seeds', icon: '🌱' },
    { id: 'pot', name: 'Lucky Flower Pot', icon: '🪴' },
  ];
  return rewards[Math.floor(Math.random() * rewards.length)];
}

export default useAppStore;
