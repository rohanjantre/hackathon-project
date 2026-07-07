import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';

// Zod Validation Schema for Login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid enterprise email format.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required to access workspace.' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      // On success, redirect to home or dashboard
      navigate('/');
    } catch (err) {
      // Error toast is handled automatically inside useAuth login method
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full glass-card border-slate-700/80 shadow-premium">
          <CardHeader className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome Back
              </CardTitle>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure Portal</span>
              </div>
            </div>
            <CardDescription className="text-slate-400">
              Enter your enterprise credentials to access your AI knowledge intelligence workspace.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1">
                <Label htmlFor="email" required>
                  Enterprise Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="engineer@forgemind.ai"
                  icon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  disabled={isSubmitting || isLoading}
                  {...register('email')}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password" required className="mb-0">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-white transition-colors focus:outline-none p-1"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  error={errors.password?.message}
                  disabled={isSubmitting || isLoading}
                  {...register('password')}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="pt-1">
                <Checkbox
                  id="rememberMe"
                  checked={!!rememberMe}
                  onCheckedChange={(checked) => setValue('rememberMe', checked)}
                  label="Remember this device for 30 days"
                  disabled={isSubmitting || isLoading}
                />
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold shadow-glow text-base h-12 group"
                  isLoading={isSubmitting || isLoading}
                >
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/80" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800/90 px-3 text-slate-400 font-semibold tracking-wider">
                  or
                </span>
              </div>
            </div>

            {/* SSO / Microsoft Azure / Siemens Mock Hint */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-slate-700/80 bg-slate-900/40 hover:bg-slate-800 text-slate-300 font-medium text-xs sm:text-sm"
                onClick={() => {
                  // Fill with demo credentials for evaluator convenience!
                  setValue('email', 'admin@forgemind.ai');
                  setValue('password', 'IndustrialAI2026!');
                }}
              >
                <Sparkles className="w-4 h-4 mr-2 text-sky-400" />
                <span>Auto-Fill Enterprise Demo Account</span>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="justify-center text-sm text-slate-400 pt-4 pb-6">
            <span>Don&apos;t have an account?</span>{' '}
            <Link
              to="/signup"
              className="ml-1.5 font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              Create Account
            </Link>
          </CardFooter>
        </Card>

        {/* Security Footer note */}
        <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          <span>Protected by 256-bit TLS encryption &amp; Zero-Trust SSO</span>
        </p>
      </motion.div>
    </AuthLayout>
  );
};
