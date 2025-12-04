import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Flower2, HelpCircle, Gift, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/garden', label: 'Garden', icon: Flower2 },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle },
  { path: '/rewards', label: 'Rewards', icon: Gift },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { userType, isAuthenticated } = useAppStore();

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <span className="font-fredoka text-xl font-bold text-primary">Explore Team</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-2 ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-fredoka text-lg font-bold text-primary">Explore Team</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-md z-50 md:hidden shadow-card border-l border-border"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted text-foreground'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
