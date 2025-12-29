import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogIn,
  Eye,
  EyeOff,
  GoalIcon,
  Smartphone,
  LockKeyhole,
} from "lucide-react";
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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
        <div className="flex flex-col gap-3 bg-white rounded-xl p-2">
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
          <div className="px-4 py-2 flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/60">
                  Mobile Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-primary/60 w-[20px] h-[20px]" />
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={formData.mobileNumber}
                    className="p-2 pl-10 border border-primary/60 rounded-sm"
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        mobileNumber: value,
                      })
                    }
                    defaultCountry="IN"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary/60">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="p-2 pl-10 border border-primary/60"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e?.target?.value })
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

              <div className="flex items-center justify-between py-2">
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

            <div className="flex flex-col">
              <div className="flex items-center py-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">or log in</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div className="flex items-center justify-between gap-3 w-full">
                <Link to="#">
                  <div className="px-8 py-3 border rounded-lg cursor-pointer">
                    <img
                      src={Images.GOOGLELOGO}
                      alt="googleLogo"
                      className="h-[30px] w-[30px] object-contain"
                    />
                  </div>
                </Link>
                <Link to="#">
                  <div className="px-8 py-3 border rounded-lg cursor-pointer">
                    <img
                      src={Images.FBlOGO}
                      alt="googleLogo"
                      className="h-[30px] w-[30px] object-contain"
                    />
                  </div>
                </Link>
                <Link to="#">
                  <div className="px-8 py-3 border rounded-lg cursor-pointer">
                    <img
                      src={Images.APPLELOGO}
                      alt="googleLogo"
                      className="h-[30px] w-[30px] object-contain"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="text-center">
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
