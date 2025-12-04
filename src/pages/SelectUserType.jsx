import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import GardenBackground from '@/components/layout/GardenBackground';

const SelectUserType = () => {
  const navigate = useNavigate();
  const { setUserType } = useAppStore();

  const handleSelectType = (type) => {
    setUserType(type);
    if (type === 'parent') {
      navigate('/parent/register');
    } else {
      navigate('/child/register/basic');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-primary mb-4">
              Who are you? 🌟
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your role to continue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Parent Option */}
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectType('parent')}
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-card border-2 border-transparent hover:border-primary transition-all duration-300"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <motion.div
                  className="text-7xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👨‍👩‍👧
                </motion.div>
              </div>
              
              <div className="pt-12 text-center">
                <h2 className="text-2xl font-fredoka font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  I'm a Parent
                </h2>
                <p className="text-muted-foreground">
                  Track your child's progress and manage their learning journey
                </p>
              </div>
              
              <motion.div
                className="absolute bottom-4 right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                💖
              </motion.div>
            </motion.button>

            {/* Child Option */}
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectType('child')}
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-card border-2 border-transparent hover:border-garden-green transition-all duration-300"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <motion.div
                  className="text-7xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  🧒
                </motion.div>
              </div>
              
              <div className="pt-12 text-center">
                <h2 className="text-2xl font-fredoka font-bold text-foreground mb-2 group-hover:text-garden-green transition-colors">
                  I'm a Child
                </h2>
                <p className="text-muted-foreground">
                  Play fun games, answer questions, and grow your magical garden!
                </p>
              </div>
              
              <motion.div
                className="absolute bottom-4 right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                🌈
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUserType;
