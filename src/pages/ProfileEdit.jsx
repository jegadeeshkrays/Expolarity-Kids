import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import Navbar from '@/components/layout/Navbar';
import GardenBackground from '@/components/layout/GardenBackground';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, userType, setUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
    favoriteCartoon: user?.favoriteCartoon || '',
    favoriteColor: user?.favoriteColor || '',
    favoriteGame: user?.favoriteGame || '',
    favoriteAnimal: user?.favoriteAnimal || '',
    mobile: user?.mobile || '',
    numberOfKids: user?.numberOfKids || '',
  });

  const isChild = userType === 'child';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({ ...user, ...formData });
    setIsLoading(false);
    navigate('/profile');
  };

  const genderOptions = [
    { value: 'boy', label: 'Boy', emoji: '👦' },
    { value: 'girl', label: 'Girl', emoji: '👧' },
    { value: 'other', label: 'Other', emoji: '🧒' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white/90">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-5xl mb-2"
              >
                ✏️
              </motion.div>
              <CardTitle className="text-2xl text-primary">Edit Profile</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {isChild && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Age</label>
                      <Input
                        type="number"
                        placeholder="Your age"
                        min="3"
                        max="18"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Gender</label>
                      <div className="grid grid-cols-3 gap-2">
                        {genderOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, gender: option.value })}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              formData.gender === option.value
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-white/50 hover:border-primary/50'
                            }`}
                          >
                            <div className="text-2xl">{option.emoji}</div>
                            <div className="text-xs font-medium">{option.label}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Date of Birth</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          type="date"
                          className="pl-10"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Favorite Cartoon</label>
                      <Input
                        type="text"
                        placeholder="Your favorite cartoon"
                        value={formData.favoriteCartoon}
                        onChange={(e) => setFormData({ ...formData, favoriteCartoon: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Favorite Game</label>
                      <Input
                        type="text"
                        placeholder="Your favorite game"
                        value={formData.favoriteGame}
                        onChange={(e) => setFormData({ ...formData, favoriteGame: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {!isChild && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Mobile Number</label>
                      <Input
                        type="tel"
                        placeholder="Your mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Number of Kids</label>
                      <Input
                        type="number"
                        placeholder="How many children?"
                        min="1"
                        value={formData.numberOfKids}
                        onChange={(e) => setFormData({ ...formData, numberOfKids: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/profile')}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        🌻
                      </motion.div>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileEdit;
