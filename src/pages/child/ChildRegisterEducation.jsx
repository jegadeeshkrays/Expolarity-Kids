import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GardenBackground from '@/components/layout/GardenBackground';

const ChildRegisterEducation = () => {
  const navigate = useNavigate();
  const [isStudying, setIsStudying] = useState(null);
  const [standard, setStandard] = useState('');

  const standards = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4',
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9',
    'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('childRegister') || '{}');
    localStorage.setItem('childRegister', JSON.stringify({
      ...existingData,
      isStudying,
      standard,
    }));
    navigate('/child/register/preferences');
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
                  step <= 2 ? 'bg-primary' : 'bg-muted'
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
                📚
              </motion.div>
              <CardTitle className="text-3xl text-primary">Education</CardTitle>
              <CardDescription className="text-base">
                Step 2: Tell us about your school
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Are you studying?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsStudying(true)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        isStudying === true
                          ? 'border-garden-green bg-garden-green/10'
                          : 'border-border bg-white/50 hover:border-garden-green/50'
                      }`}
                    >
                      <div className="text-4xl mb-2">✅</div>
                      <div className="font-semibold">Yes!</div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsStudying(false);
                        setStandard('');
                      }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        isStudying === false
                          ? 'border-secondary bg-secondary/30'
                          : 'border-border bg-white/50 hover:border-secondary'
                      }`}
                    >
                      <div className="text-4xl mb-2">❌</div>
                      <div className="font-semibold">Not yet</div>
                    </motion.button>
                  </div>
                </div>

                {isStudying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Which standard are you in?
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                      {standards.map((std) => (
                        <motion.button
                          key={std}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setStandard(std)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            standard === std
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-white/50 hover:border-primary/50'
                          }`}
                        >
                          {std}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/child/register/basic')}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={isStudying === null || (isStudying && !standard)}
                  >
                    Next Step
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

export default ChildRegisterEducation;
