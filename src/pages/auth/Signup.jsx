import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, number } from "framer-motion";
import { Mail, Lock, UserPlus, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GardenBackground from "@/components/layout/GardenBackground";
import { Images } from "../../utils/Image";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <GardenBackground />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="border-2 border-white/30 text-center">
              <CardContent className="pt-8 pb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-6 bg-garden-green/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-12 h-12 text-garden-green" />
                </motion.div>

                <h2 className="text-2xl font-fredoka font-bold text-primary mb-2">
                  Verification Email Sent! 📧
                </h2>
                <p className="text-muted-foreground mb-6">
                  We've sent a verification link to
                  <br />
                  <span className="font-semibold text-foreground">
                    {formData.email}
                  </span>
                </p>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GardenBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-white/30">
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
                  <label className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className={`${errors.name ? "border-destructive" : ""}`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  {errors.namem && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="">
                  <label className="text-sm font-medium text-foreground">
                    Mobile Number
                  </label>
                  <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                    <Input
                      type="tel"
                      placeholder="Enter your number"
                      className={`${errors.number ? "border-destructive" : ""}`}
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                    />
                  </div>
                  {errors.number && (
                    <p className="text-sm text-destructive">{errors.number}</p>
                  )}
                </div>
                <div className="">
                  <label className="text-sm font-medium text-foreground">
                    Date of Birth
                  </label>
                  <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                    <Input
                      type="date"
                      placeholder="Enter your number"
                      className={`${errors.dob ? "border-destructive" : ""}`}
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-sm text-destructive">{errors.dob}</p>
                  )}
                </div>
                <div className="">
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className={`${
                        errors.password ? "border-destructive" : ""
                      }`}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter password again"
                      className={` ${
                        errors.confirmPassword ? "border-destructive" : ""
                      }`}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
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
                      {/* <UserPlus className="w-5 h-5 text-white" /> */}
                      <p className="font-medium text-white">
                        Create Account
                      </p>{" "}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Old here?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
