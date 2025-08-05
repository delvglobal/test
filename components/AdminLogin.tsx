import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from './ui/utils';
import type { LoginCredentials, LoginFormErrors } from '../types';

interface AdminLoginProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function AdminLogin({ onLogin, isLoading, error }: AdminLoginProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const errors: LoginFormErrors = {};
    
    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onLogin(credentials);
    } catch (err) {
      // Error handling is done in the parent component
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof LoginCredentials) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-[#2E5E47] rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
            <p className="text-sm text-gray-600">DELV Global Cockpit</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-3 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#2E5E47]/10 rounded-full mx-auto">
                <Shield className="h-8 w-8 text-[#2E5E47]" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Admin Sign In</CardTitle>
              <CardDescription className="text-gray-600">
                Access the DELV Global Cockpit administration panel
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* General Error Alert */}
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@delv.global"
                    value={credentials.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={cn(
                      "w-full",
                      fieldErrors.email && touched.email && "border-red-300 ring-red-300 focus:border-red-500 focus:ring-red-500"
                    )}
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                  {fieldErrors.email && touched.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={cn(
                        "w-full pr-10",
                        fieldErrors.password && touched.password && "border-red-300 ring-red-300 focus:border-red-500 focus:ring-red-500"
                      )}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      disabled={isLoading}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && touched.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#2E5E47] hover:bg-[#2E5E47]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-[#2E5E47] hover:text-[#2E5E47]/80 hover:underline focus:outline-none focus:underline"
                    disabled={isLoading}
                    onClick={() => {
                      // Handle forgot password functionality
                      alert('Forgot password functionality would be implemented here');
                    }}
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
            <div className="space-y-1 text-sm text-blue-700">
              <p><strong>Email:</strong> admin@delv.global</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="text-center text-sm text-gray-500">
          <p>Powered by DELV Global • Version 1.0.0</p>
          <p className="mt-1">© 2024 Found24. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}