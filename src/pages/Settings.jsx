import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, LogOut, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import Navbar from '@/components/layout/Navbar';
import GardenBackground from '@/components/layout/GardenBackground';

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const settingsItems = [
    {
      icon: Lock,
      title: 'Change Password',
      description: 'Update your password',
      path: '/settings/change-password',
      color: 'text-primary',
    },
    {
      icon: LogOut,
      title: 'Logout',
      description: 'Sign out of your account',
      action: handleLogout,
      color: 'text-garden-brown',
    },
    {
      icon: Trash2,
      title: 'Delete Account',
      description: 'Permanently delete your account',
      action: () => setShowDeleteConfirm(true),
      color: 'text-destructive',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
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
            ⚙️
          </motion.div>
          <h1 className="text-3xl font-fredoka font-bold text-foreground">
            Settings
          </h1>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white/90">
            <CardContent className="pt-4 pb-2">
              {settingsItems.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    className={`flex items-center justify-between py-4 ${
                      index !== settingsItems.length - 1 ? 'border-b border-border' : ''
                    } cursor-pointer hover:bg-muted/50 -mx-4 px-4 transition-colors`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                );

                if (item.path) {
                  return (
                    <Link key={item.title} to={item.path}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <div key={item.title} onClick={item.action}>
                    {content}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mt-8"
        >
          <Link to="/home">
            <Button variant="glass" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowDeleteConfirm(false)}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="max-w-sm w-full bg-white shadow-2xl">
              <CardContent className="pt-6 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-fredoka font-bold text-foreground mb-2">
                  Delete Account?
                </h3>
                <p className="text-muted-foreground mb-6">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      // UI only - in real app, would call API
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Settings;
