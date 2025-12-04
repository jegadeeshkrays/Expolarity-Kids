import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GardenBackground from '@/components/layout/GardenBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-8xl mb-6"
          >
            🌱
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-fredoka font-bold text-foreground mb-4">
            <span className="text-primary">Explore</span> Team
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            A magical journey of growth and discovery for parents and children
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-10 max-w-sm"
        >
          {[
            { emoji: '🎮', label: 'Fun Quizzes' },
            { emoji: '🌸', label: 'Grow Garden' },
            { emoji: '🎁', label: 'Earn Rewards' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {feature.emoji}
              </motion.div>
              <div className="text-xs font-medium text-muted-foreground">{feature.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs space-y-3"
        >
          <Link to="/signup" className="block">
            <Button variant="hero" className="w-full">
              <Sparkles className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/login" className="block">
            <Button variant="glass" className="w-full">
              I already have an account
            </Button>
          </Link>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-sm text-muted-foreground text-center"
        >
          Made with 💚 for families everywhere
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
