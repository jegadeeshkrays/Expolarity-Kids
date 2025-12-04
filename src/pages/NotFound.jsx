import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GardenBackground from "@/components/layout/GardenBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-card max-w-md"
        >
          <div className="text-7xl mb-4">🌿</div>
          <h1 className="text-5xl font-fredoka font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! This garden path doesn't exist</p>
          <Link to="/">
            <Button variant="hero">Return Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
