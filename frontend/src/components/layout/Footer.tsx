import * as React from 'react';
import { Logo } from '../ui/logo';
import { ShieldCheck, Server, Lock, ArrowUpRight, Globe, Share2, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900/90 border-t border-slate-800/80 text-slate-400 py-12 sm:py-16 relative overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800/60">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Transforming scattered industrial manuals, maintenance logs, and sensor telemetry into actionable enterprise knowledge.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Industrial Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Predictive Maintenance AI</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">SOP & Compliance Copilot</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Digital Twin Intelligence</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Asset Inspection Parsing</a></li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Enterprise Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#why-forgemind" className="hover:text-blue-400 transition-colors flex items-center gap-1"><span>Architecture</span> <ArrowUpRight className="w-3.5 h-3.5 opacity-70" /></a></li>
              <li><a href="#security" className="hover:text-blue-400 transition-colors flex items-center gap-1"><span>SOC2 & ISO 27001</span> <ShieldCheck className="w-3.5 h-3.5 text-green-400" /></a></li>
              <li><a href="#security" className="hover:text-blue-400 transition-colors flex items-center gap-1"><span>On-Premise Deployment</span> <Server className="w-3.5 h-3.5 text-blue-400" /></a></li>
              <li><a href="#security" className="hover:text-blue-400 transition-colors flex items-center gap-1"><span>Zero-Trust Encryption</span> <Lock className="w-3.5 h-3.5 text-amber-400" /></a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Connect & Governance</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security Disclosure</a></li>
            </ul>
            <div className="flex items-center gap-3 pt-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Portal" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Network" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Community" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ForgeMind AI Inc. All rights reserved. Microsoft Azure, Vercel & Siemens aesthetic inspired.</p>
          <div className="flex items-center gap-6">
            <span>Built for Industrial Excellence</span>
            <span>v2.4.0-enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
