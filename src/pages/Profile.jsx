import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, ArrowLeft, Gift, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import Navbar from '@/components/layout/Navbar';
import GardenBackground from '@/components/layout/GardenBackground';

const Profile = () => {
  const { user, userType, rewards, currentQuestion, gardenElements } = useAppStore();

  const isChild = userType === 'child';
  const quizProgress = Math.round((currentQuestion / 90) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-garden-green flex items-center justify-center shadow-lg"
          >
            <span className="text-5xl">
              {isChild ? '🧒' : '👨‍👩‍👧'}
            </span>
          </motion.div>
          
          <h1 className="text-3xl font-fredoka font-bold text-foreground mb-1">
            {user?.name || 'User'}
          </h1>
          <p className="text-muted-foreground capitalize">
            {userType || 'User'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        {isChild && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            <Card className="bg-white/90">
              <CardContent className="pt-4 pb-4 text-center">
                <Gift className="w-6 h-6 mx-auto mb-2 text-garden-sun" />
                <div className="text-2xl font-bold text-foreground">{rewards.length}</div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90">
              <CardContent className="pt-4 pb-4 text-center">
                <Flower2 className="w-6 h-6 mx-auto mb-2 text-garden-flower-pink" />
                <div className="text-2xl font-bold text-foreground">{gardenElements.length}</div>
                <div className="text-xs text-muted-foreground">Garden</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90">
              <CardContent className="pt-4 pb-4 text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-2xl font-bold text-foreground">{quizProgress}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Profile Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/90 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fredoka font-bold text-foreground">Profile Info</h3>
                <Link to="/profile/edit">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {user?.email && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                )}
                {user?.name && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                )}
                {user?.age && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">{user.age} years old</span>
                  </div>
                )}
                {user?.gender && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="font-medium capitalize">{user.gender}</span>
                  </div>
                )}
                {user?.standard && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Grade</span>
                    <span className="font-medium">{user.standard}</span>
                  </div>
                )}
                {user?.favoriteCartoon && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Favorite Cartoon</span>
                    <span className="font-medium">{user.favoriteCartoon}</span>
                  </div>
                )}
                {user?.favoriteColor && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Favorite Color</span>
                    <span className="font-medium">{user.favoriteColor}</span>
                  </div>
                )}
                {user?.favoriteGame && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Favorite Game</span>
                    <span className="font-medium">{user.favoriteGame}</span>
                  </div>
                )}
                {user?.mobile && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Mobile</span>
                    <span className="font-medium">{user.mobile}</span>
                  </div>
                )}
                {user?.numberOfKids && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Number of Kids</span>
                    <span className="font-medium">{user.numberOfKids}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rewards Preview */}
        {isChild && rewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/90 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-fredoka font-bold text-foreground">My Rewards</h3>
                  <Link to="/rewards">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {rewards.slice(0, 6).map((reward, index) => (
                    <motion.div
                      key={`${reward.id}-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="w-12 h-12 bg-gradient-to-br from-garden-sun/20 to-amber-100 rounded-xl flex items-center justify-center"
                    >
                      <span className="text-2xl">{reward.icon}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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

export default Profile;
