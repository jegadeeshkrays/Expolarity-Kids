import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { Sparkles, Gift } from 'lucide-react';

const RewardModal = () => {
  const { showRewardModal, currentReward, closeRewardModal } = useAppStore();

  return (
    <AnimatePresence>
      {showRewardModal && currentReward && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRewardModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-garden-sun/30"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            >
              {/* Sparkle decorations */}
              <motion.div
                className="absolute -top-4 -left-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-garden-sun" />
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-garden-sun" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Gift className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Content */}
              <div className="text-center">
                <motion.h2
                  className="text-2xl font-fredoka font-bold text-garden-brown mb-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  🎉 Congratulations! 🎉
                </motion.h2>
                
                <motion.p
                  className="text-muted-foreground mb-6"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  You earned a new gardening tool!
                </motion.p>

                {/* Reward Icon */}
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', damping: 10 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-garden-sun/30 to-amber-200/30 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-7xl">
                    {currentReward.icon}
                  </div>
                </motion.div>

                <motion.h3
                  className="text-xl font-fredoka font-bold text-primary mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {currentReward.name}
                </motion.h3>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="hero"
                    onClick={closeRewardModal}
                    className="w-full"
                  >
                    <Sparkles className="w-5 h-5" />
                    Awesome!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RewardModal;
