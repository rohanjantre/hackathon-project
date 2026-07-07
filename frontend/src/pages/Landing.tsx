import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Cpu,
  Database,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Search,
  Layers,
  Wrench,
  Terminal,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-grid text-slate-100 relative overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[800px] left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute top-[1400px] right-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm font-semibold text-blue-400 shadow-glow">
            <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Gen Industrial Knowledge Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-none"
          >
            One AI Brain for Every{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent text-glow">
              Industrial Document, Asset &amp; Decision.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Transform scattered manuals, maintenance records, SOPs and inspection reports into actionable AI intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2.5 font-bold shadow-glow text-base px-8 h-14">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto gap-2 font-semibold text-base px-8 h-14 border-slate-700/80 hover:border-blue-500/50"
              >
                <span>Login to Workspace</span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 max-w-3xl mx-auto text-slate-400 text-xs sm:text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>99.99% Diagnostic Accuracy</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>SOC2 Type II &amp; ISO 27001</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Zero-Hallucination RAG</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>On-Prem / Azure Ready</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Dashboard Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-20 relative max-w-6xl mx-auto"
        >
          <div className="p-2 sm:p-4 rounded-2xl bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-transparent border border-slate-700/60 shadow-premium backdrop-blur-xl">
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden text-left shadow-2xl">
              {/* Fake Window Header */}
              <div className="h-10 bg-slate-800/80 border-b border-slate-700/60 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">forgemind-ai-terminal // plant-turbine-04</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> ACTIVE TELEMETRY
                  </span>
                  <span>LATENCY: 12ms</span>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
                {/* Left Panel: Query Input */}
                <div className="lg:col-span-1 space-y-4 border-r border-slate-800/80 pr-0 lg:pr-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-400" /> AI Knowledge Assistant
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">GPT-4o Industrial</span>
                  </div>
                  
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <p className="text-xs font-medium text-slate-300">
                      &quot;Why is Generator #2 showing abnormal vibration at 3400 RPM despite normal oil pressure?&quot;
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-700/40">
                      <span>Sources: 4 SOP Manuals</span>
                      <span className="text-blue-400 font-semibold">Ready to parse &rarr;</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Indexed Document Sources</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 text-xs text-slate-300 border border-slate-700/40">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="truncate flex-1">Siemens-S7-1500-Maintenance-SOP.pdf</span>
                      <span className="text-green-400 font-mono text-[10px]">100%</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 text-xs text-slate-300 border border-slate-700/40">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span className="truncate flex-1">Turbine-Vibration-ISO-10816.pdf</span>
                      <span className="text-green-400 font-mono text-[10px]">99.4%</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel: AI Diagnosis Output */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-sky-400" /> Live AI Root-Cause Synthesis
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Confidence: <strong className="text-green-400">98.8%</strong></span>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-4 shadow-inner">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                        AI
                      </div>
                      <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                        <p>
                          Based on <strong className="text-blue-400">Section 4.2 of Siemens S7-1500 SOP</strong> and historical vibration logs, the root cause is high-frequency harmonic resonance caused by <strong className="text-amber-400">slight bearing misalignment on Shaft B</strong>.
                        </p>
                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1 font-mono text-slate-300">
                          <p className="text-red-400 font-semibold">// RECOMMENDED IMMEDIATE ACTION:</p>
                          <p>1. Reduce turbine load by 15% within 30 minutes.</p>
                          <p>2. Perform thermal imaging inspection on Bearing Housing #4.</p>
                          <p>3. Schedule dynamic balancing during the next maintenance window.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Stat Bar */}
                  <div className="grid grid-cols-3 gap-3 text-center pt-1">
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                      <p className="text-[11px] text-slate-400">Vibration Amplitude</p>
                      <p className="text-base font-bold text-amber-400 font-mono mt-0.5">4.8 mm/s</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                      <p className="text-[11px] text-slate-400">Oil Temperature</p>
                      <p className="text-base font-bold text-green-400 font-mono mt-0.5">68.2 °C</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                      <p className="text-[11px] text-slate-400">Time-to-Failure Est.</p>
                      <p className="text-base font-bold text-blue-400 font-mono mt-0.5">&gt; 140 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Why ForgeMind */}
      <section id="why-forgemind" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400">Why ForgeMind AI</h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for the Most Demanding Industrial Environments.
          </p>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Traditional software fails when confronted with millions of complex engineering PDFs, CAD specs, and SCADA sensor streams. ForgeMind bridges the gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card glass-card-hover p-2">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-glow">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Multi-Modal Industrial Ingestion</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ingest 10,000-page turbine manuals, electrical schematics, and P&amp;ID drawings. Our proprietary AI understands complex engineering tables and symbols natively.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glass-card-hover p-2">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-glow-accent">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Predictive Maintenance Copilot</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect real-time SCADA and PLC telemetry. When anomalies occur, ForgeMind automatically diagnoses the exact mechanical failure and retrieves the repair SOP.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card glass-card-hover p-2">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-glow">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Enterprise-Grade Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Deploy in your private cloud, AWS GovCloud, or on-premise air-gapped servers. Your intellectual property and telemetry never leave your perimeter.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10 mb-20">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-800/80 to-sky-900/40 border border-blue-500/40 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Industrial Operations?
            </h3>
            <p className="text-base text-slate-300">
              Join leading global manufacturing and energy leaders who rely on ForgeMind AI for zero-downtime operational excellence.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 h-12 font-bold shadow-glow">
                  <span>Create Enterprise Account</span>
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 font-semibold">
                  <span>Sign In to Portal</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
