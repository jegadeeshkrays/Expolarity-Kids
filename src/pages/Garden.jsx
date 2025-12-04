import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import GardenBackground from '@/components/layout/GardenBackground';
import Navbar from '@/components/layout/Navbar';

const Garden = () => {
  const { gardenElements, currentQuestion } = useAppStore();
  const progress = Math.round((currentQuestion / 90) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground gardenElements={gardenElements} showFullGarden />
      <Navbar />
      
      {/* Header overlay */}
      <div className="fixed top-16 left-0 right-0 z-40 p-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-fredoka font-bold text-foreground">
                🌸 My Garden
              </h1>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
            
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-garden-green to-garden-flower-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {currentQuestion} of 90 questions
              </span>
              <span className="text-muted-foreground">
                {gardenElements.length} garden elements
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Garden info cards */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-8 pt-48">
        <div className="px-4">
          <div className="max-w-lg mx-auto space-y-4">
            {/* Garden Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🌱</div>
                <div className="text-lg font-bold text-garden-green">
                  {gardenElements.filter(e => e.type.includes('sprout') || e.type.includes('plant')).length}
                </div>
                <div className="text-xs text-muted-foreground">Plants</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🌸</div>
                <div className="text-lg font-bold text-garden-flower-pink">
                  {gardenElements.filter(e => e.type.includes('flower')).length}
                </div>
                <div className="text-xs text-muted-foreground">Flowers</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🦋</div>
                <div className="text-lg font-bold text-garden-flower-purple">
                  {gardenElements.filter(e => e.type.includes('butterfly') || e.type.includes('bird')).length}
                </div>
                <div className="text-xs text-muted-foreground">Creatures</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <Link to="/home" className="flex-1">
                <Button variant="glass" className="w-full">
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              {currentQuestion < 90 && (
                <Link to="/quiz" className="flex-1">
                  <Button variant="hero" className="w-full">
                    <Play className="w-4 h-4" />
                    Continue Quiz
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* Hint text */}
            {currentQuestion < 90 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-white/80 text-sm drop-shadow-md"
              >
                Answer more questions to grow your garden! 🌻
              </motion.p>
            )}

            {currentQuestion >= 90 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-garden-sun/20 to-amber-200/20 rounded-xl p-4 text-center border border-garden-sun/30"
              >
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-fredoka font-bold text-garden-brown">
                  Your garden is complete!
                </p>
                <p className="text-sm text-muted-foreground">
                  You've grown a beautiful magical garden!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garden;
