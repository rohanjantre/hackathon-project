import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select } from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';

// Zod Validation Schema for Signup
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters.' })
      .max(100, { message: 'Name is too long.' }),
    companyName: z
      .string()
      .min(2, { message: 'Company organization name is required.' }),
    industry: z
      .string()
      .min(1, { message: 'Please select your industrial sector.' }),
    email: z
      .string()
      .min(1, { message: 'Email address is required.' })
      .email({ message: 'Please enter a valid business email format.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Enterprise Terms of Service & Privacy Policy.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please verify.",
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const INDUSTRY_OPTIONS = [
  { value: 'aerospace', label: 'Aerospace & Defense' },
  { value: 'automotive', label: 'Automotive & Heavy Vehicles' },
  { value: 'energy', label: 'Energy, Oil & Gas' },
  { value: 'manufacturing', label: 'Industrial Manufacturing & PLC' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals & Biotech' },
  { value: 'semiconductors', label: 'Semiconductors & Electronics' },
  { value: 'logistics', label: 'Supply Chain & Heavy Logistics' },
];

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSuccessState, setIsSuccessState] = React.useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      industry: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
      // Show animated success state as requested
      setIsSuccessState(true);
      setTimeout(() => {
        navigate('/decision');
      }, 2000);
    } catch (err) {
      // Error toast is handled in useAuth signup method
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {isSuccessState ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="w-full glass-card border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] text-center p-8 sm:p-12">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-6 text-green-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">Workspace Created!</h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-sm mx-auto leading-relaxed mb-6">
                Your enterprise account has been verified. Redirecting you to the ForgeMind AI Knowledge Dashboard...
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <span>INITIALIZING INDUSTRIAL AI CORES...</span>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full glass-card border-slate-700/80 shadow-premium">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Create Account
                  </CardTitle>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Enterprise Tier</span>
                  </div>
                </div>
                <CardDescription className="text-slate-400">
                  Deploy ForgeMind AI intelligence across your industrial assets today.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Full Name & Company in 2 columns on sm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="fullName" required>
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Dr. Elena Vance"
                        icon={<User className="w-4 h-4" />}
                        error={errors.fullName?.message}
                        disabled={isSubmitting || isLoading}
                        {...register('fullName')}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="companyName" required>
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Siemens / Dynamics"
                        icon={<Building2 className="w-4 h-4" />}
                        error={errors.companyName?.message}
                        disabled={isSubmitting || isLoading}
                        {...register('companyName')}
                      />
                    </div>
                  </div>

                  {/* Industry Dropdown */}
                  <div className="space-y-1">
                    <Label htmlFor="industry" required>
                      Industry Sector
                    </Label>
                    <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={INDUSTRY_OPTIONS}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select industrial sector..."
                          icon={<Briefcase className="w-4 h-4" />}
                          error={errors.industry?.message}
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <Label htmlFor="email" required>
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="elena.vance@company.com"
                      icon={<Mail className="w-4 h-4" />}
                      error={errors.email?.message}
                      disabled={isSubmitting || isLoading}
                      {...register('email')}
                    />
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="password" required>
                        Password
                      </Label>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-white transition-colors focus:outline-none p-1"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                        error={errors.password?.message}
                        disabled={isSubmitting || isLoading}
                        {...register('password')}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="confirmPassword" required>
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-slate-400 hover:text-white transition-colors focus:outline-none p-1"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                        error={errors.confirmPassword?.message}
                        disabled={isSubmitting || isLoading}
                        {...register('confirmPassword')}
                      />
                    </div>
                  </div>

                  {/* Accept Terms Checkbox */}
                  <div className="pt-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={!!acceptTerms}
                      onCheckedChange={(checked) => setValue('acceptTerms', checked, { shouldValidate: true })}
                      label={
                        <span className="text-xs sm:text-sm text-slate-300">
                          I agree to ForgeMind AI&apos;s{' '}
                          <a href="#" className="text-blue-400 hover:underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-blue-400 hover:underline">
                            Data Privacy Policy
                          </a>
                          .
                        </span>
                      }
                      error={errors.acceptTerms?.message}
                      disabled={isSubmitting || isLoading}
                    />
                  </div>

                  {/* Create Account Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold shadow-glow text-base h-12 group"
                      isLoading={isSubmitting || isLoading}
                    >
                      <span>Create Enterprise Account</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="justify-center text-sm text-slate-400 pt-4 pb-6">
                <span>Already have an account?</span>{' '}
                <Link
                  to="/login"
                  className="ml-1.5 font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                >
                  Login
                </Link>
              </CardFooter>
            </Card>

            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>SOC2 Type II compliant &amp; On-Premise deployment ready</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};
