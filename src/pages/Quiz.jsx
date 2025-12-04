import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import GardenBackground from '@/components/layout/GardenBackground';
import RewardModal from '@/components/modals/RewardModal';
import quizQuestions from '@/data/quizQuestions';

const Quiz = () => {
  const navigate = useNavigate();
  const { 
    currentQuestion, 
    gardenElements, 
    answerQuestion,
    isAuthenticated,
    userType
  } = useAppStore();
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || userType !== 'child') {
      navigate('/login');
    }
  }, [isAuthenticated, userType, navigate]);

  // Check if quiz is complete
  if (currentQuestion >= 90) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <GardenBackground gardenElements={gardenElements} showFullGarden />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-fredoka font-bold text-primary mb-4">
              Amazing Job!
            </h1>
            <p className="text-muted-foreground mb-6">
              You've completed all 90 questions and grown a beautiful magical garden!
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/garden')}
                className="flex-1"
              >
                View Garden
              </Button>
              <Button
                variant="hero"
                onClick={() => navigate('/home')}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion) / 90) * 100;

  const handleAnswer = async (answer) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Small delay for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    answerQuestion(answer);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground gardenElements={gardenElements} />
      <RewardModal />
      
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-white/80 to-transparent">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/home')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
            <span className="text-sm font-semibold text-foreground">
              {currentQuestion + 1} / 90
            </span>
          </div>
          <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-garden-green rounded-full"
              initial={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main content area - positioned at bottom */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-8 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="px-4"
          >
            {/* Question Card - Frosted glass style */}
            <div className="max-w-lg mx-auto">
              <motion.div
                className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                {/* Question number badge */}
                <div className="flex justify-center mb-4">
                  <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    Question {currentQuestion + 1}
                  </span>
                </div>

                {/* Question text */}
                <h2 className="text-xl md:text-2xl font-fredoka font-bold text-foreground text-center mb-8">
                  {question?.question}
                </h2>

                {/* Yes/No Buttons */}
                <div className="flex gap-4 justify-center">
                  {/* Leaf-shaped YES button */}
                  <motion.button
                    onClick={() => handleAnswer('yes')}
                    disabled={isAnimating}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      viewBox="0 0 100 120"
                      className="w-28 h-32 md:w-32 md:h-36 drop-shadow-lg"
                    >
                      <defs>
                        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50 5 C20 20, 5 50, 10 80 C15 100, 35 115, 50 115 C65 115, 85 100, 90 80 C95 50, 80 20, 50 5"
                        fill="url(#leafGradient)"
                        className="group-hover:brightness-110 transition-all"
                      />
                      {/* Leaf vein */}
                      <path
                        d="M50 20 L50 100 M50 40 L30 55 M50 40 L70 55 M50 60 L35 75 M50 60 L65 75"
                        stroke="#15803d"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.3"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-fredoka font-bold text-xl md:text-2xl">
                      Yes! 🌿
                    </span>
                  </motion.button>

                  {/* Wood-plank NO button */}
                  <motion.button
                    onClick={() => handleAnswer('no')}
                    disabled={isAnimating}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      viewBox="0 0 120 80"
                      className="w-32 h-20 md:w-36 md:h-24 drop-shadow-lg"
                    >
                      <defs>
                        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#d4a574" />
                          <stop offset="50%" stopColor="#c4956a" />
                          <stop offset="100%" stopColor="#b8895e" />
                        </linearGradient>
                      </defs>
                      {/* Main plank */}
                      <rect
                        x="5"
                        y="5"
                        width="110"
                        height="70"
                        rx="8"
                        fill="url(#woodGradient)"
                        className="group-hover:brightness-110 transition-all"
                      />
                      {/* Wood grain lines */}
                      <path
                        d="M15 15 Q60 20 105 15 M15 35 Q60 30 105 35 M15 55 Q60 60 105 55"
                        stroke="#a67c52"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.3"
                      />
                      {/* Nails */}
                      <circle cx="15" cy="12" r="3" fill="#8b7355" />
                      <circle cx="105" cy="12" r="3" fill="#8b7355" />
                      <circle cx="15" cy="68" r="3" fill="#8b7355" />
                      <circle cx="105" cy="68" r="3" fill="#8b7355" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-garden-brown font-fredoka font-bold text-xl md:text-2xl">
                      No 🪵
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Helper text */}
              <p className="text-center text-white/80 text-sm mt-4 drop-shadow-md">
                Tap to answer and grow your garden! 🌱
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
