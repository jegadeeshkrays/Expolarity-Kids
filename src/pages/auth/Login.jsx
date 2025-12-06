import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import GardenBackground from "@/components/layout/GardenBackground";
import { Images } from "../../utils/Image";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, userType } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock login - in real app, validate credentials
    setUser({ mobileNumber: formData.mobileNumber, name: "User" });
    setIsLoading(false);

    // Check if user type is selected
    if (!userType) {
      navigate("/select-user-type");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="border-2 bg-white rounded-xl p-2">
          <div className="flex px-4 py-2">
            <img
              src={Images.LOGO}
              alt="logo"
              className="h-14 w-14 object-contain"
            />
          </div>
          <div className="text-start px-4 py-2">
            <CardTitle className="text-xl text-primary">
              Welcome To Expolarity
            </CardTitle>
            <CardDescription className="text-primary/50 font-normal">
              Please login to begin your journey toward self-awareness.{" "}
            </CardDescription>
          </div>

          <div className="px-4 py-2">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="">
                <label className="text-sm font-semibold text-primary/60">
                  Mobile Number
                </label>
                <div className="relative">
                  {/* <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" /> */}
                  <Input
                    type="tel"
                    placeholder="Enter your number"
                    className="p-2"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobileNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/60">
                  Password
                </label>
                <div className="relative">
                  {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="p-2"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                  <input type="checkbox" name="rememberme" id="rememberme" />
                  <label
                    htmlFor="rememberme"
                    className="text-xs text-primary/40"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className=" text-primary/60 font-medium text-xs hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                variant="hero"
                className="w-full bg-[#3A3A3A] p-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    🌻
                  </motion.div>
                ) : (
                  <>
                    <p className="font-medium text-white">Log In</p>
                  </>
                )}
              </button>
            </form>

            <div></div>
            <div className="mt-6 text-center">
              <p className="text-primary/50 text-xs">
                New here?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
