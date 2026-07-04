import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/logo';
import { ShieldCheck, Cpu, Database, Activity, Lock, CheckCircle2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-slate-900 bg-grid relative overflow-hidden">
      {/* Background glowing cyber nodes */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none animate-float" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Column: Industrial Intelligence Showcase (Hidden on smaller screens, shown on LG) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 flex-col justify-between p-12 lg:p-16 border-r border-slate-800/80 relative z-10 bg-slate-900/40 backdrop-blur-sm">
        <div>
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Industrial AI Knowledge Engine v2.4</span>
          </div>
        </div>

        {/* Dynamic Interactive Node Display */}
        <div className="my-auto py-12 space-y-8 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Enterprise AI Built for Heavy Industry & Manufacturing.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Empower engineering teams with real-time generative intelligence trained across your proprietary SCADA logs, Siemens PLC manuals, and ISO compliance docs.
            </p>
          </motion.div>

          {/* Features cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md shadow-glass"
            >
              <div className="flex items-center gap-3 text-blue-400 mb-2">
                <Database className="w-5 h-5" />
                <h3 className="font-semibold text-white text-sm">Unified Telemetry & Docs</h3>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Seamlessly query unstructured PDF maintenance logs alongside real-time IoT time-series data.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md shadow-glass"
            >
              <div className="flex items-center gap-3 text-sky-400 mb-2">
                <Activity className="w-5 h-5" />
                <h3 className="font-semibold text-white text-sm">Zero-Hallucination Guard</h3>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Strict citation engine verifies every AI recommendation against verified engineering drawings.
              </p>
            </motion.div>
          </div>

          {/* Testimonial Quote / Siemens style highlight */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900/30 via-slate-800/40 to-slate-900/50 border-l-4 border-l-blue-500 border border-slate-700/40">
            <p className="text-sm italic text-slate-300">
              &quot;ForgeMind AI reduced our turbine diagnostics turnaround from 14 hours to under 4 minutes. It is the missing AI operating system for modern industrial manufacturing.&quot;
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center font-bold text-xs text-blue-300">
                DR
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Dr. Robert Vance</p>
                <p className="text-[11px] text-slate-400">Chief Systems Architect, Global Industrial Dynamics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-800/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> SOC-2 Type II Certified
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> 256-bit AES Encryption
            </span>
          </div>
          <span>© {new Date().getFullYear()} ForgeMind AI</span>
        </div>
      </div>

      {/* Right Column: Auth Form Area */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex items-center justify-center p-6 sm:p-10 md:p-16 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          <div className="lg:hidden mb-8 text-center flex flex-col items-center">
            <Link to="/" className="inline-block mb-3">
              <Logo size="lg" />
            </Link>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span>Enterprise Industrial Intelligence</span>
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
