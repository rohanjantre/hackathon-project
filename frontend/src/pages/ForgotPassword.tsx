import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { useToast } from '../components/ui/toast';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid business email format.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      // Simulate API call for password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      showToast('info', 'Recovery Email Dispatched', `Reset instructions sent to ${data.email}.`);
    } catch (err) {
      showToast('error', 'Request Failed', 'Could not dispatch recovery link. Please contact IT support.');
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="w-full glass-card border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.25)] text-center p-8 sm:p-10">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mx-auto mb-6 text-blue-400">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Check Your Email</h2>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                We have dispatched a high-security temporary cryptographic link to{' '}
                <strong className="text-blue-400 font-mono">{getValues('email')}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 text-left space-y-2 mb-8 font-mono">
                <p className="text-amber-400 font-semibold">// SECURITY NOTE:</p>
                <p>• Link expires in exactly 15 minutes.</p>
                <p>• If not received, check your enterprise spam filter.</p>
              </div>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full font-semibold border-slate-700/80 hover:bg-slate-800"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Another Email Address
                </Button>
                <Link to="/login" className="block">
                  <Button className="w-full font-bold shadow-glow mt-2">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full glass-card border-slate-700/80 shadow-premium">
              <CardHeader className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Reset Password
                  </CardTitle>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Recovery</span>
                  </div>
                </div>
                <CardDescription className="text-slate-400">
                  Enter your enterprise email address and we will send you a secure link to reset your access credentials.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                      disabled={isSubmitting}
                      {...register('email')}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold shadow-glow text-base h-12 group"
                      isLoading={isSubmitting}
                    >
                      <span>Send Recovery Link</span>
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="justify-center text-sm text-slate-400 pt-4 pb-6">
                <Link
                  to="/login"
                  className="inline-flex items-center font-bold text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Login</span>
                </Link>
              </CardFooter>
            </Card>

            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>Identity verified via Azure AD / Enterprise SAML</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};
