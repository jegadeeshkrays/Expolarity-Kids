import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GardenBackground from '@/components/layout/GardenBackground';

const ChildRegisterPreferences = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    favoriteCartoon: '',
    favoriteColor: '',
    favoriteGame: '',
    favoriteAnimal: '',
  });

  const cartoons = ['SpongeBob', 'Paw Patrol', 'Peppa Pig', 'Pokemon', 'Bluey', 'Cocomelon', 'Other'];
  const colors = [
    { name: 'Red', color: '#ef4444' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#22c55e' },
    { name: 'Yellow', color: '#eab308' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Purple', color: '#a855f7' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Teal', color: '#14b8a6' },
  ];
  const animals = ['🐶 Dog', '🐱 Cat', '🐰 Rabbit', '🦁 Lion', '🐼 Panda', '🦋 Butterfly', '🐬 Dolphin', '🦄 Unicorn'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('childRegister') || '{}');
    localStorage.setItem('childRegister', JSON.stringify({
      ...existingData,
      ...formData,
    }));
    navigate('/child/register/reward');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= 3 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Card className="border-2 border-white/30">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                🎨
              </motion.div>
              <CardTitle className="text-3xl text-primary">Your Favorites</CardTitle>
              <CardDescription className="text-base">
                Step 3: What do you like?
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">🎬 Favorite Cartoon</label>
                  <div className="grid grid-cols-3 gap-2">
                    {cartoons.map((cartoon) => (
                      <motion.button
                        key={cartoon}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, favoriteCartoon: cartoon })}
                        className={`p-2 rounded-xl border-2 text-xs font-medium transition-all ${
                          formData.favoriteCartoon === cartoon
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-white/50 hover:border-primary/50'
                        }`}
                      >
                        {cartoon}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">🌈 Favorite Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((colorObj) => (
                      <motion.button
                        key={colorObj.name}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({ ...formData, favoriteColor: colorObj.name })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.favoriteColor === colorObj.name
                            ? 'border-foreground ring-2 ring-offset-2'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: colorObj.color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">🎮 Favorite Game</label>
                  <Input
                    type="text"
                    placeholder="What games do you like to play?"
                    value={formData.favoriteGame}
                    onChange={(e) => setFormData({ ...formData, favoriteGame: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    🐾 Favorite Animal <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {animals.map((animal) => (
                      <motion.button
                        key={animal}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({ ...formData, favoriteAnimal: animal })}
                        className={`p-2 rounded-xl border-2 text-xl transition-all ${
                          formData.favoriteAnimal === animal
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-white/50 hover:border-primary/50'
                        }`}
                      >
                        {animal.split(' ')[0]}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/child/register/education')}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={!formData.favoriteCartoon || !formData.favoriteColor || !formData.favoriteGame}
                  >
                    Finish
                    <ArrowRight className="w-5 h-5" />
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

export default ChildRegisterPreferences;
