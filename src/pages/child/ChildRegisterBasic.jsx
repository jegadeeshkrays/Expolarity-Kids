import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GardenBackground from '@/components/layout/GardenBackground';

const ChildRegisterBasic = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('childRegister', JSON.stringify(formData));
    navigate('/child/register/education');
  };

  const genderOptions = [
    { value: 'boy', label: 'Boy', emoji: '👦' },
    { value: 'girl', label: 'Girl', emoji: '👧' },
    { value: 'other', label: 'Other', emoji: '🧒' },
  ];

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
                  step === 1 ? 'bg-primary' : 'bg-muted'
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
                🌟
              </motion.div>
              <CardTitle className="text-3xl text-primary">About You</CardTitle>
              <CardDescription className="text-base">
                Step 1: Tell us your basic info
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="What's your name?"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Age</label>
                  <Input
                    type="number"
                    placeholder="How old are you?"
                    min="3"
                    max="18"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {genderOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, gender: option.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.gender === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-white/50 hover:border-primary/50'
                        }`}
                      >
                        <div className="text-3xl mb-1">{option.emoji}</div>
                        <div className="text-sm font-medium">{option.label}</div>
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
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full mt-6"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ChildRegisterBasic;
