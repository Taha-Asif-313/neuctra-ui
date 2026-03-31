import React, { useState } from 'react'
import { Container } from '@neuctra/ui'
import { Button } from '@neuctra/ui'
import { Text } from '@neuctra/ui'
import { Image } from '@neuctra/ui'
import { Input } from '@neuctra/ui'
import { Textarea } from '@neuctra/ui'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Apple, Chrome, Loader2 } from 'lucide-react'

const TemplateAuthPages = () => {
  const [activeTemplate, setActiveTemplate] = useState('login')
  const [loading, setLoading] = useState(false)
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [forgotData, setForgotData] = useState({ email: '' })
  const [resetData, setResetData] = useState({ password: '', confirmPassword: '' })
  
  // Error states
  const [errors, setErrors] = useState({})
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Login:', loginData)
      setLoading(false)
    }, 1500)
  }
  
  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      console.log('Register:', registerData)
      setLoading(false)
    }, 1500)
  }
  
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      console.log('Forgot password:', forgotData)
      setLoading(false)
    }, 1500)
  }
  
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (resetData.password !== resetData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      console.log('Reset password:', resetData)
      setLoading(false)
    }, 1500)
  }
  
  // Template 1: Modern Glassmorphism Login
  const ModernGlassLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4">
      <Container size="md" padding="lg" center>
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <Text as="h2" size="2xl" weight={700} className="text-white">Welcome Back</Text>
            <Text size="sm" className="text-white/70 mt-2">Sign in to continue to your account</Text>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={loginData.email}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              icon={Mail}
              required
              primaryTheme={false}
              primaryColor="#8b5cf6"
              className="bg-white/5 border-white/20 text-white"
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              icon={Lock}
              required
              primaryTheme={false}
              primaryColor="#8b5cf6"
              className="bg-white/5 border-white/20 text-white"
            />
            
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                <Text size="xs" className="text-white/70">Remember me</Text>
              </label>
              <button type="button" onClick={() => setActiveTemplate('forgot')} className="text-xs text-purple-300 hover:text-purple-200">
                Forgot password?
              </button>
            </div>
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              primaryColor="#8b5cf6"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Sign In
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-transparent text-white/50">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" primaryColor="#fff" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Github size={18} />
              </Button>
              <Button variant="outline" size="sm" primaryColor="#fff" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Apple size={18} />
              </Button>
              <Button variant="outline" size="sm" primaryColor="#fff" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <Chrome size={18} />
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <Text size="sm" className="text-white/70">
                Don't have an account?{' '}
                <button type="button" onClick={() => setActiveTemplate('register')} className="text-purple-300 hover:text-purple-200 font-medium">
                  Sign up
                </button>
              </Text>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
  
  // Template 2: Split Screen Register
  const SplitScreenRegister = () => (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <Text as="h1" size="2xl" weight={800} className="mb-4">Join Our Community</Text>
          <Text className="text-white/90 mb-8">Start your journey with us and discover amazing features designed for you.</Text>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <Text>Access to exclusive content</Text>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <Text>24/7 customer support</Text>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
              <Text>Free updates & new features</Text>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <Container size="md" center>
          <div className="text-center mb-8">
            <Text as="h2" size="2xl" weight={700} className="text-gray-900 dark:text-white">Create Account</Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-2">Get started with your free account</Text>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={registerData.name}
              onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
              icon={User}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={registerData.email}
              onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
              icon={Mail}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={registerData.password}
              onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
              icon={Lock}
              required
              error={errors.confirmPassword && registerData.password !== registerData.confirmPassword}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
              icon={Lock}
              required
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingText="Creating account..."
              size="lg"
            >
              Sign Up
            </Button>
            
            <div className="text-center mt-4">
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button type="button" onClick={() => setActiveTemplate('login')} className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </button>
              </Text>
            </div>
          </form>
        </Container>
      </div>
    </div>
  )
  
  // Template 3: Minimalist Forgot Password
  const MinimalistForgotPassword = () => (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <Container size="sm" padding="lg" center>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Lock size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <Text as="h2" size="xl" weight={700} className="text-gray-900 dark:text-white">Forgot Password?</Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-2">
            No worries! Enter your email and we'll send you a reset link.
          </Text>
        </div>
        
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={forgotData.email}
            onChange={(name, value) => setForgotData({ ...forgotData, [name]: value })}
            icon={Mail}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            loading={loading}
            loadingText="Sending reset link..."
            size="lg"
          >
            Send Reset Link
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setActiveTemplate('login')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              ← Back to Sign In
            </button>
          </div>
        </form>
      </Container>
    </div>
  )
  
  // Template 4: Card Style Reset Password
  const CardResetPassword = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Container size="sm" center>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ArrowRight size={28} className="text-green-600 dark:text-green-400" />
            </div>
            <Text as="h2" size="xl" weight={700} className="text-gray-900 dark:text-white">Set New Password</Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-2">
              Your new password must be different from previous used passwords.
            </Text>
          </div>
          
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={resetData.password}
              onChange={(name, value) => setResetData({ ...resetData, [name]: value })}
              icon={Lock}
              required
              error={errors.confirmPassword && resetData.password !== resetData.confirmPassword}
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={resetData.confirmPassword}
              onChange={(name, value) => setResetData({ ...resetData, [name]: value })}
              icon={Lock}
              required
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingText="Resetting password..."
              size="lg"
            >
              Reset Password
            </Button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setActiveTemplate('login')}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
              >
                ← Return to Sign In
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
  
  // Template 5: Dark Theme Login with Social Auth
  const DarkThemeLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Container size="md" center>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Text as="h2" size="2xl" weight={700} className="text-white">Welcome Back</Text>
            <Text className="text-gray-400 mt-2">Sign in to access your dashboard</Text>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={loginData.email}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              required
              className="bg-gray-800/50 border-gray-700 text-white"
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              required
              className="bg-gray-800/50 border-gray-700 text-white"
            />
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              size="lg"
              primaryColor="#6366f1"
            >
              Sign In
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gray-800 text-gray-400">Or</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" fullWidth size="md" primaryColor="#fff" className="border-gray-700 text-white hover:bg-gray-800">
                <Github size={18} />
                Continue with GitHub
              </Button>
              <Button variant="outline" fullWidth size="md" primaryColor="#fff" className="border-gray-700 text-white hover:bg-gray-800">
                <Chrome size={18} />
                Continue with Google
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <Text size="sm" className="text-gray-400">
                Don't have an account?{' '}
                <button type="button" onClick={() => setActiveTemplate('register')} className="text-indigo-400 hover:text-indigo-300">
                  Create account
                </button>
              </Text>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
  
  // Template 6: 3D Card Login with Animation
  const ThreeDLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <Container size="md" center>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">AI</span>
            </div>
            <Text as="h2" size="2xl" weight={700} className="text-white">AI Platform</Text>
            <Text className="text-white/70 mt-2">Sign in to access AI features</Text>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={loginData.email}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              icon={Mail}
              required
              primaryTheme={false}
              primaryColor="#a855f7"
              className="bg-white/5 border-white/20 text-white"
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
              icon={Lock}
              required
              primaryTheme={false}
              primaryColor="#a855f7"
              className="bg-white/5 border-white/20 text-white"
            />
            
            <Button
              type="submit"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              size="lg"
              primaryColor="#a855f7"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Sign In
            </Button>
            
            <div className="text-center mt-4">
              <button type="button" onClick={() => setActiveTemplate('forgot')} className="text-sm text-purple-300 hover:text-purple-200">
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
  
  // Template 7: Sidebar Layout with Illustration
  const SidebarIllustrationAuth = () => (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <Text as="h1" size="3xl" weight={800} className="text-white mb-4">Start your journey</Text>
            <Text className="text-white/80 text-lg">Join thousands of satisfied users worldwide</Text>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-8 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <Container size="sm" center>
          <div className="mb-8">
            <Text as="h2" size="2xl" weight={700} className="text-gray-900 dark:text-white mb-2">
              {activeTemplate === 'login' ? 'Welcome back' : 'Create account'}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              {activeTemplate === 'login' 
                ? 'Sign in to continue to your account' 
                : 'Fill in the details to get started'}
            </Text>
          </div>
          
          {activeTemplate === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
                required
              />
              <Button type="submit" fullWidth loading={loading}>
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Full name"
                value={registerData.name}
                onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={registerData.email}
                onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                required
              />
              <Button type="submit" fullWidth loading={loading}>
                Sign Up
              </Button>
            </form>
          )}
          
          <div className="text-center mt-6">
            <button
              onClick={() => setActiveTemplate(activeTemplate === 'login' ? 'register' : 'login')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700"
            >
              {activeTemplate === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
  
  // Template 8: Floating Label Modern Auth
  const FloatingLabelAuth = () => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-rose-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Container size="md" center>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTemplate('login')}
                className={`pb-3 px-4 text-lg font-semibold transition-colors relative ${
                  activeTemplate === 'login' 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
                {activeTemplate === 'login' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 dark:bg-rose-400 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTemplate('register')}
                className={`pb-3 px-4 text-lg font-semibold transition-colors relative ${
                  activeTemplate === 'register' 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
                {activeTemplate === 'register' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 dark:bg-rose-400 rounded-full"></div>
                )}
              </button>
            </div>
            
            {activeTemplate === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={loginData.email}
                    onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
                    required
                    className="pt-6 pb-2 peer"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all peer-focus:-translate-y-6 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-sm pointer-events-none">
                    Email Address
                  </label>
                </div>
                
                <div className="relative">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder=" "
                      value={loginData.password}
                      onChange={(name, value) => setLoginData({ ...loginData, [name]: value })}
                      required
                      className="pt-6 pb-2 pr-10 peer"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all peer-focus:-translate-y-6 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-sm pointer-events-none">
                    Password
                  </label>
                </div>
                
                <Button type="submit" fullWidth loading={loading} primaryColor="#e11d48">
                  Sign In
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={registerData.name}
                    onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                    required
                    className="pt-6 pb-2 peer"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all peer-focus:-translate-y-6 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-sm pointer-events-none">
                    Full Name
                  </label>
                </div>
                
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={registerData.email}
                    onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                    required
                    className="pt-6 pb-2 peer"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all peer-focus:-translate-y-6 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-sm pointer-events-none">
                    Email Address
                  </label>
                </div>
                
                <div className="relative">
                  <Input
                    type="password"
                    name="password"
                    placeholder=" "
                    value={registerData.password}
                    onChange={(name, value) => setRegisterData({ ...registerData, [name]: value })}
                    required
                    className="pt-6 pb-2 peer"
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all peer-focus:-translate-y-6 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-sm pointer-events-none">
                    Password
                  </label>
                </div>
                
                <Button type="submit" fullWidth loading={loading} primaryColor="#e11d48">
                  Create Account
                </Button>
              </form>
            )}
          </div>
        </Container>
      </div>
    )
  }
  
  // Render the selected template
  const renderTemplate = () => {
    switch(activeTemplate) {
      case 'login':
        return <ModernGlassLogin />
      case 'register':
        return <SplitScreenRegister />
      case 'forgot':
        return <MinimalistForgotPassword />
      case 'reset':
        return <CardResetPassword />
      case 'dark':
        return <DarkThemeLogin />
      case '3d':
        return <ThreeDLogin />
      case 'sidebar':
        return <SidebarIllustrationAuth />
      case 'floating':
        return <FloatingLabelAuth />
      default:
        return <ModernGlassLogin />
    }
  }
  
  // Template selector for demonstration
  const TemplateSelector = () => (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex gap-2 flex-wrap justify-center">
      {['login', 'register', 'forgot', 'reset', 'dark', '3d', 'sidebar', 'floating'].map((template) => (
        <button
          key={template}
          onClick={() => setActiveTemplate(template)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            activeTemplate === template
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {template.charAt(0).toUpperCase() + template.slice(1)}
        </button>
      ))}
    </div>
  )
  
  return (
    <div className="relative min-h-screen">
      <TemplateSelector />
      {renderTemplate()}
    </div>
  )
}

export default TemplateAuthPages