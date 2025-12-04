import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Flower2, Gift, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import Navbar from '@/components/layout/Navbar';
import GardenBackground from '@/components/layout/GardenBackground';
import RewardModal from '@/components/modals/RewardModal';

const Home = () => {
  const { user, userType, currentQuestion, rewards, gardenElements } = useAppStore();

  const isChild = userType === 'child';
  const quizProgress = Math.round((currentQuestion / 90) * 100);

  const childMenuItems = [
    {
      icon: Play,
      title: currentQuestion > 0 ? 'Continue Quiz' : 'Start Quiz',
      description: currentQuestion > 0 
        ? `Question ${currentQuestion + 1} of 90`
        : 'Begin your garden journey!',
      path: '/quiz',
      color: 'from-primary to-teal-500',
      emoji: '🎮',
    },
    {
      icon: Flower2,
      title: 'My Garden',
      description: `${gardenElements.length} elements growing`,
      path: '/garden',
      color: 'from-garden-green to-emerald-500',
      emoji: '🌸',
    },
    {
      icon: Gift,
      title: 'My Rewards',
      description: `${rewards.length} tools collected`,
      path: '/rewards',
      color: 'from-garden-sun to-orange-400',
      emoji: '🎁',
    },
    {
      icon: User,
      title: 'My Profile',
      description: 'View your info',
      path: '/profile',
      color: 'from-garden-flower-pink to-pink-400',
      emoji: '👤',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground gardenElements={isChild ? gardenElements.slice(0, 5) : []} />
      <Navbar />
      <RewardModal />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Section */}
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
            {isChild ? '👋' : '🏠'}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-foreground mb-2">
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {isChild 
              ? "Ready to grow your magical garden?" 
              : "Track your child's progress and growth"}
          </p>
        </motion.div>

        {/* Child Dashboard */}
        {isChild && (
          <>
            {/* Progress Card */}
            {currentQuestion > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <Card className="border-2 border-primary/20 bg-white/90">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-foreground">Quiz Progress</span>
                      <span className="text-primary font-bold">{quizProgress}%</span>
                    </div>
                    <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-garden-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${quizProgress}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentQuestion} of 90 questions completed
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {childMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link to={item.path}>
                      <Card className="h-full border-2 border-transparent hover:border-primary/30 transition-all group cursor-pointer bg-white/90">
                        <CardContent className="pt-6 text-center">
                          <motion.div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-3xl">{item.emoji}</span>
                          </motion.div>
                          <h3 className="font-fredoka font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link to="/quiz">
                <Button variant="hero" className="w-full">
                  <Sparkles className="w-5 h-5" />
                  {currentQuestion > 0 ? 'Continue Growing!' : 'Start Your Journey!'}
                </Button>
              </Link>
            </motion.div>
          </>
        )}

        {/* Parent Dashboard */}
        {!isChild && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/90">
              <CardContent className="pt-6 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-xl font-fredoka font-bold text-foreground mb-2">
                  Parent Dashboard
                </h2>
                <p className="text-muted-foreground mb-6">
                  Monitor your child's progress and engagement with the app.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-primary">{rewards.length}</div>
                    <div className="text-sm text-muted-foreground">Rewards Earned</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-garden-green">{currentQuestion}</div>
                    <div className="text-sm text-muted-foreground">Questions Done</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to="/profile" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4" />
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/settings" className="flex-1">
                    <Button variant="default" className="w-full">
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
