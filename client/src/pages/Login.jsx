import { useState, useContext } from "react";
import { 
  ArrowRight, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Gamepad2,
  Trophy,
  Users,
  Bell,
  Sword,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  // Form state
  const [formState, setFormState] = useState({
    userName: "",
    password: "",
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const {serverURL} = useContext(authDataContext);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.userName.trim()) {
      newErrors.userName = "Username is required";
    }
    
    if (!formState.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    setTouched({
      userName: true,
      password: true
    });
    
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const res = await axios.post(
          `${serverURL}/api/auth/login`,
          formState,
          { withCredentials: true }
        );
  
        if (res.status === 200) {
          
          navigate("/");
        } else {
          setErrors(prev => ({
            ...prev,
            server: res.data?.message || "Login failed. Please try again."
          }));
        }
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          server:
            error.response?.data?.message || "An unexpected error occurred."
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 bg-zinc-900 min-h-screen flex items-center justify-center p-6 md:p-8 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#42a5f5_1px,transparent_1px)] [background-size:20px_20px] opacity-5"></div>
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-purple-700 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-40 h-40 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
        
        <div className="w-full max-w-md z-10">
          {/* Header */}
          <div className="flex justify-center items-center mb-6">
            <Gamepad2 className="h-8 w-8 text-[#42a5f5] mr-2" />
            <h1 className="text-3xl text-white font-bold">GlitchLair</h1>
          </div>
          <h2 className="text-[#42a5f5] text-center text-lg mb-8">
            Welcome back, gamer!
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="userName" className="text-sm text-zinc-400 block font-medium">
                  USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <input
                    id="userName"
                    name="userName"
                    value={formState.userName}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className={`w-full pl-10 py-3 bg-zinc-800 border ${
                      touched.userName && errors.userName ? 'border-red-500' : 'border-zinc-700'
                    } rounded-md text-white placeholder:text-zinc-500 
                      focus:outline-none focus:border-[#42a5f5] focus:ring-1 focus:ring-[#42a5f5]/20 transition-all`}
                  />
                  {touched.userName && errors.userName && (
                    <p className="mt-1 text-sm text-red-500">{errors.userName}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-zinc-400 block font-medium">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-3 bg-zinc-800 border ${
                      touched.password && errors.password ? 'border-red-500' : 'border-zinc-700'
                    } rounded-md text-white placeholder:text-zinc-500 
                      focus:outline-none focus:border-[#42a5f5] focus:ring-1 focus:ring-[#42a5f5]/20 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#42a5f5] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Server error message */}
              {errors.server && (
                <div className="text-red-500 text-sm text-center">
                  {errors.server}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-zinc-800 hover:bg-zinc-700 text-[#42a5f5] border border-[#42a5f5] 
                  rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium
                  transition-all hover:shadow-[0_0_10px_rgba(66,165,245,0.5)] relative overflow-hidden
                  ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">LOGGING IN</span>
                    <div className="animate-spin h-5 w-5 border-2 border-[#42a5f5] border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  <>
                    LOG IN
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")} className="text-[#b388ff] hover:text-[#42a5f5] transition-colors cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Benefits (same as signup) */}
      <div className="w-full md:w-1/2 bg-zinc-950 p-6 md:p-8 flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#111] opacity-80"></div>
          <div className="absolute w-96 h-96 -top-12 -right-12 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-12 -left-12 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="max-w-md z-10">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Trophy className="h-8 w-8 text-[#69f0ae] mr-3" />
            <h2 className="text-2xl font-bold text-white">Level up your gaming experience</h2>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            {[
              {
                icon: <Users className="h-5 w-5 text-[#69f0ae]" />,
                title: "Connect with gamers",
                description: "Join discussions with players who share your passion for gaming"
              },
              {
                icon: <Bell className="h-5 w-5 text-[#69f0ae]" />,
                title: "Stay updated",
                description: "Get the latest news, reviews, and updates about your favorite games"
              },
              {
                icon: <Sword className="h-5 w-5 text-[#69f0ae]" />,
                title: "Find teammates",
                description: "Build your squad with players who match your skill level and play style"
              },
              {
                icon: <Award className="h-5 w-5 text-[#69f0ae]" />,
                title: "Share your achievements",
                description: "Showcase your gaming highlights and achievements with the community"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-zinc-800 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5 border border-[#69f0ae]/20">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                  <p className="text-zinc-400 mt-1 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;