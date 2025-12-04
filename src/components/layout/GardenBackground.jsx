import React from 'react';
import { motion } from 'framer-motion';

const GardenBackground = ({ gardenElements = [], showFullGarden = false }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-garden-sky via-sky-200 to-emerald-100" />
      
      {/* Sun */}
      <motion.div
        className="absolute top-10 right-10 w-24 h-24 rounded-full bg-garden-sun shadow-[0_0_60px_rgba(250,204,21,0.5)]"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Clouds */}
      <Cloud className="top-16 left-[10%]" delay={0} />
      <Cloud className="top-24 left-[60%]" delay={2} size="lg" />
      <Cloud className="top-8 left-[35%]" delay={4} size="sm" />
      
      {/* Hills */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        <svg viewBox="0 0 1440 400" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,400 L0,250 Q360,150 720,200 Q1080,250 1440,180 L1440,400 Z"
            fill="hsl(142, 55%, 55%)"
          />
          <path
            d="M0,400 L0,300 Q360,220 720,280 Q1080,340 1440,260 L1440,400 Z"
            fill="hsl(142, 55%, 45%)"
          />
          <path
            d="M0,400 L0,350 Q360,300 720,340 Q1080,380 1440,330 L1440,400 Z"
            fill="hsl(142, 60%, 35%)"
          />
        </svg>
      </div>
      
      {/* Animated grass blades */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-around">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-full origin-bottom"
            style={{ height: `${30 + Math.random() * 40}px` }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Flying butterflies */}
      <Butterfly className="top-[30%] left-[20%]" delay={0} color="pink" />
      <Butterfly className="top-[40%] left-[70%]" delay={1.5} color="purple" />
      <Butterfly className="top-[25%] left-[50%]" delay={3} color="yellow" />
      
      {/* Birds */}
      <Bird className="top-[15%] left-[25%]" delay={0} />
      <Bird className="top-[20%] left-[75%]" delay={2} />
      
      {/* Garden elements based on progress */}
      {gardenElements.map((element, index) => (
        <GardenElement key={index} element={element} index={index} />
      ))}
      
      {/* Floating particles/pollen */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-garden-sun/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60 + 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

const Cloud = ({ className, delay = 0, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16',
  };
  
  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${className}`}
      animate={{ x: [0, 30, 0] }}
      transition={{ duration: 20, repeat: Infinity, delay }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white/80 rounded-full blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/90 rounded-full" />
      </div>
    </motion.div>
  );
};

const Butterfly = ({ className, delay = 0, color = 'pink' }) => {
  const colors = {
    pink: 'bg-garden-flower-pink',
    purple: 'bg-garden-flower-purple',
    yellow: 'bg-garden-flower-yellow',
  };
  
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        x: [0, 100, 50, 150, 0],
        y: [0, -30, 20, -20, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, delay }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <div className={`absolute w-3 h-4 ${colors[color]} rounded-full -left-2 origin-right`} 
             style={{ transform: 'rotate(-30deg)' }} />
        <div className={`absolute w-3 h-4 ${colors[color]} rounded-full left-0 origin-left`}
             style={{ transform: 'rotate(30deg)' }} />
        <div className="absolute w-1 h-3 bg-garden-brown rounded-full left-0 top-0.5" />
      </motion.div>
    </motion.div>
  );
};

const Bird = ({ className, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        x: [0, 200, 400],
        y: [0, -20, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, delay }}
    >
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <path
          d="M0 5 Q5 0 10 5 Q15 0 20 5"
          stroke="hsl(30, 40%, 25%)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

const GardenElement = ({ element, index }) => {
  const { type, x, y } = element;
  
  const renderElement = () => {
    switch (type) {
      case 'sprout':
        return (
          <div className="text-4xl">🌱</div>
        );
      case 'flower-pink':
        return <div className="text-3xl">🌸</div>;
      case 'flower-yellow':
        return <div className="text-3xl">🌼</div>;
      case 'flower-purple':
        return <div className="text-3xl">💜</div>;
      case 'bush':
        return <div className="text-4xl">🌳</div>;
      case 'small-tree':
        return <div className="text-5xl">🌲</div>;
      case 'big-tree':
        return <div className="text-6xl">🌴</div>;
      case 'butterfly':
        return <div className="text-2xl animate-flutter">🦋</div>;
      case 'mushroom':
        return <div className="text-3xl">🍄</div>;
      case 'glowing-mushroom':
        return <div className="text-3xl animate-pulse">✨🍄</div>;
      case 'pond':
        return <div className="text-4xl">💧</div>;
      case 'fireflies':
        return <div className="text-2xl animate-pulse">✨</div>;
      case 'bird':
        return <div className="text-2xl animate-float">🐦</div>;
      case 'rabbit':
        return <div className="text-3xl">🐰</div>;
      case 'dragonfly':
        return <div className="text-2xl animate-flutter">🪰</div>;
      case 'vine':
        return <div className="text-3xl">🌿</div>;
      case 'rainbow':
        return <div className="text-5xl">🌈</div>;
      case 'magical-garden':
        return <div className="text-6xl animate-pulse">🏰</div>;
      default:
        return <div className="text-2xl">🌱</div>;
    }
  };
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: index * 0.1
      }}
    >
      {renderElement()}
    </motion.div>
  );
};

export default GardenBackground;
