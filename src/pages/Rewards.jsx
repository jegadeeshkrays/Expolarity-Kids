import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import Navbar from '@/components/layout/Navbar';
import GardenBackground from '@/components/layout/GardenBackground';

const Rewards = () => {
  const { rewards, currentQuestion } = useAppStore();

  const milestones = [
    { question: 0, label: 'Registration', unlocked: true },
    { question: 10, label: 'Q10', unlocked: currentQuestion >= 10 },
    { question: 30, label: 'Q30', unlocked: currentQuestion >= 30 },
    { question: 60, label: 'Q60', unlocked: currentQuestion >= 60 },
    { question: 90, label: 'Q90', unlocked: currentQuestion >= 90 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-4"
          >
            🎁
          </motion.div>
          <h1 className="text-3xl font-fredoka font-bold text-foreground mb-2">
            My Rewards
          </h1>
          <p className="text-muted-foreground">
            {rewards.length} gardening tools collected!
          </p>
        </motion.div>

        {/* Milestones Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-white/90">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Reward Milestones
              </h3>
              <div className="flex justify-between items-center">
                {milestones.map((milestone, index) => (
                  <div key={milestone.question} className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        milestone.unlocked
                          ? 'bg-garden-sun text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {milestone.unlocked ? '🏆' : '🔒'}
                    </motion.div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {milestone.label}
                    </span>
                  </div>
                ))}
              </div>
              {/* Connection line */}
              <div className="relative h-1 bg-muted rounded-full mt-[-28px] mx-5 -z-10">
                <motion.div
                  className="absolute h-full bg-garden-sun rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(100, (currentQuestion / 90) * 100)}%` 
                  }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rewards Grid */}
        {rewards.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rewards.map((reward, index) => (
              <motion.div
                key={`${reward.id}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-white/90 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-garden-sun/20 to-amber-100 rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-4xl">{reward.icon}</span>
                    </motion.div>
                    <h3 className="font-fredoka font-bold text-foreground text-sm">
                      {reward.name}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/90">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="font-fredoka font-bold text-foreground mb-2">
                  No Rewards Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Complete the quiz to earn gardening tools!
                </p>
                <Link to="/quiz">
                  <Button variant="hero">
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Link to="/home">
            <Button variant="glass" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards;
