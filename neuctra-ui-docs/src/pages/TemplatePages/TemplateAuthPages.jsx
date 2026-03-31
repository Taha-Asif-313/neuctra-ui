"use client";

import React, { useState } from "react";
import { Container, Button, Text, Input } from "@neuctra/ui";
import { Mail, Lock, User } from "lucide-react";

const TemplateAuthPages = () => {
  const [loading, setLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Register:", registerData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="min-h-screen flex">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col justify-center px-12">
            
            <Text
              as="h1"
              size="2xl"
              weight={800}
              className="mb-4 text-gray-900 dark:text-white"
            >
              Join Our Community
            </Text>

            <Text className="mb-8 text-gray-600 dark:text-zinc-400">
              Start your journey with us and discover amazing features designed for you.
            </Text>

            <div className="space-y-4">
              {[
                "Access to exclusive content",
                "24/7 customer support",
                "Free updates & new features",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-sm text-gray-700 dark:text-zinc-300">
                    ✓
                  </div>
                  <Text className="text-gray-700 dark:text-zinc-300">
                    {item}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-zinc-950">
          <Container size="md" center>
            
            <div className="text-center mb-8">
              <Text
                as="h2"
                size="2xl"
                weight={700}
                className="text-gray-900 dark:text-white"
              >
                Create Account
              </Text>

              <Text className="text-gray-600 dark:text-zinc-400 mt-2">
                Get started with your free account
              </Text>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                icon={Mail}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                icon={Lock}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                icon={Lock}
                required
                error={
                  registerData.confirmPassword &&
                  registerData.password !== registerData.confirmPassword
                    ? "Passwords do not match"
                    : undefined
                }
              />

              <Button
                type="submit"
                fullWidth
                primaryColor="var(--primary)"
                loading={loading}
                loadingText="Creating account..."
                size="lg"
              >
                Sign Up
              </Button>

              <div className="text-center mt-4">
                <Text className="text-gray-600 dark:text-zinc-400 text-sm">
                  Already have an account?{" "}
                  <Text
                    as="a"
                    href="/login"
                    className="text-blue-600 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Sign in
                  </Text>
                </Text>
              </div>

            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default TemplateAuthPages;