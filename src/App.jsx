import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SelectUserType from "./pages/SelectUserType";
import ParentRegister from "./pages/parent/ParentRegister";
import ParentPolicies from "./pages/parent/ParentPolicies";
import ChildRegisterBasic from "./pages/child/ChildRegisterBasic";
import ChildRegisterEducation from "./pages/child/ChildRegisterEducation";
import ChildRegisterPreferences from "./pages/child/ChildRegisterPreferences";
import ChildRegisterReward from "./pages/child/ChildRegisterReward";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Garden from "./pages/Garden";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* User Type Selection */}
          <Route path="/select-user-type" element={<SelectUserType />} />
          
          {/* Parent Registration */}
          <Route path="/parent/register" element={<ParentRegister />} />
          <Route path="/parent/register/policies" element={<ParentPolicies />} />
          
          {/* Child Registration */}
          <Route path="/child/register/basic" element={<ChildRegisterBasic />} />
          <Route path="/child/register/education" element={<ChildRegisterEducation />} />
          <Route path="/child/register/preferences" element={<ChildRegisterPreferences />} />
          <Route path="/child/register/reward" element={<ChildRegisterReward />} />
          
          {/* Main App */}
          <Route path="/home" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/change-password" element={<ChangePassword />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
