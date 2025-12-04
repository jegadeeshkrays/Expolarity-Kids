import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GardenBackground from '@/components/layout/GardenBackground';

const ParentPolicies = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!accepted) return;
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    navigate('/home');
  };

  const policies = [
    {
      icon: FileText,
      title: 'Terms & Conditions',
      content: `Welcome to Explore Team! By using our application, you agree to these terms.

1. Account Responsibility: You are responsible for maintaining the confidentiality of your account credentials.

2. Appropriate Use: This platform is designed for educational and developmental purposes for children.

3. Parental Oversight: Parents/guardians are responsible for supervising their children's use of the application.

4. Content Guidelines: All interactions should be appropriate for children and educational in nature.

5. Data Collection: We collect minimal data necessary to provide our services and improve user experience.`
    },
    {
      icon: Shield,
      title: 'Privacy Policy',
      content: `Your privacy is important to us. Here's how we handle your data:

1. Data Collection: We collect information you provide during registration and usage data to improve our services.

2. Data Security: We implement industry-standard security measures to protect your information.

3. Children's Privacy: We are committed to protecting children's privacy and comply with COPPA regulations.

4. Data Sharing: We do not sell or share personal information with third parties for marketing purposes.

5. Data Retention: We retain data only as long as necessary to provide our services.`
    },
    {
      icon: Info,
      title: 'About Application',
      content: `Explore Team is a parent-child engagement application designed to:

1. Foster Learning: Through interactive quizzes and activities, children develop cognitive and emotional skills.

2. Track Progress: Parents can monitor their child's development and engagement.

3. Reward Achievement: Our reward system motivates children to continue learning and exploring.

4. Build Gardens: The virtual garden grows as children progress, providing visual feedback of their achievements.

5. Safe Environment: We've created a secure, ad-free space for children to learn and play.`
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              📜
            </motion.div>
            <h1 className="text-3xl font-fredoka font-bold text-primary mb-2">
              Review Our Policies
            </h1>
            <p className="text-muted-foreground">
              Please read and accept our policies to continue
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border-2 border-white/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        {policy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-40 overflow-y-auto bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground whitespace-pre-line">
                        {policy.content}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="border-2 border-white/30">
            <CardContent className="pt-6">
              <motion.label
                className="flex items-start gap-3 cursor-pointer group"
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    accepted 
                      ? 'bg-primary border-primary' 
                      : 'border-muted-foreground group-hover:border-primary'
                  }`}
                  onClick={() => setAccepted(!accepted)}
                >
                  {accepted && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                </div>
                <span className="text-sm leading-relaxed">
                  I have read and agree to the <span className="font-semibold text-primary">Terms & Conditions</span>, <span className="font-semibold text-primary">Privacy Policy</span>, and understand the <span className="font-semibold text-primary">About Application</span> information.
                </span>
              </motion.label>

              <Button
                variant="hero"
                className="w-full mt-6"
                disabled={!accepted || isLoading}
                onClick={handleSubmit}
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
                    Complete Registration
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentPolicies;
