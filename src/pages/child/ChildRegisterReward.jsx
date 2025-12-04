import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import GardenBackground from '@/components/layout/GardenBackground';

const rewards = [
  { id: 'shovel', name: 'Golden Shovel', icon: '🪴', description: 'Dig deep for treasures!' },
  { id: 'scissors', name: 'Magic Scissors', icon: '✂️', description: 'Trim your garden beautifully!' },
  { id: 'watering-can', name: 'Rainbow Watering Can', icon: '🚿', description: 'Make your plants grow!' },
  { id: 'rake', name: 'Sparkly Rake', icon: '🧹', description: 'Keep your garden tidy!' },
  { id: 'gloves', name: 'Super Gloves', icon: '🧤', description: 'Protect your hands!' },
  { id: 'spray', name: 'Fairy Spray Bottle', icon: '💧', description: 'Magical mist for plants!' },
];

const ChildRegisterReward = () => {
  const navigate = useNavigate();
  const { setUser, addReward } = useAppStore();
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState(null);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Select random reward
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    
    // Show reward after brief delay
    const timer = setTimeout(() => {
      setShowReward(true);
      generateConfetti();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#14b8a6', '#f59e0b', '#ec4899', '#8b5cf6', '#22c55e'][Math.floor(Math.random() * 5)],
      });
    }
    setConfetti(newConfetti);
  };

  const handleContinue = () => {
    // Save child data
    const childData = JSON.parse(localStorage.getItem('childRegister') || '{}');
    setUser({ ...childData, type: 'child' });
    
    // Add reward
    if (reward) {
      addReward(reward);
    }
    
    // Clear temp storage
    localStorage.removeItem('childRegister');
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
            }}
            initial={{ y: -20, opacity: 1 }}
            animate={{ y: '100vh', opacity: 0 }}
            transition={{
              duration: 3,
              delay: piece.delay,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!showReward ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-8xl mb-6"
              >
                🎁
              </motion.div>
              <h2 className="text-2xl font-fredoka font-bold text-primary">
                Preparing your reward...
              </h2>
            </motion.div>
          ) : (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md"
            >
              {/* Progress indicator - complete */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                ))}
              </div>

              <motion.div
                className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl p-8 shadow-2xl border-4 border-garden-sun/30 text-center"
                animate={{ boxShadow: ['0 0 30px rgba(250, 204, 21, 0.3)', '0 0 60px rgba(250, 204, 21, 0.5)', '0 0 30px rgba(250, 204, 21, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-4"
                >
                  <Sparkles className="w-10 h-10 text-garden-sun mx-auto animate-pulse" />
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-fredoka font-bold text-garden-brown mb-2"
                >
                  🎉 Congratulations! 🎉
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6"
                >
                  You completed registration and earned your first reward!
                </motion.p>

                {/* Reward Display */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="relative mb-6"
                >
                  <motion.div
                    className="w-32 h-32 mx-auto bg-gradient-to-br from-garden-sun/30 to-amber-200/30 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-7xl">{reward?.icon}</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-xl font-fredoka font-bold text-primary mb-1">
                    {reward?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {reward?.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    variant="hero"
                    onClick={handleContinue}
                    className="w-full"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start My Adventure!
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChildRegisterReward;
