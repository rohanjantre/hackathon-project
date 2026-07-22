import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/logo';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User as UserIcon, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="md" />
        </Link>

        {/* Navigation Links for Desktop */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Capabilities</span>
            </a>
            <a href="#why-forgemind" className="hover:text-blue-400 transition-colors">
              Why ForgeMind
            </a>
            <a href="#security" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>Enterprise Security</span>
            </a>
          </nav>
        )}

        {/* Auth CTAs */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/decision">
                <Button className="font-semibold shadow-glow bg-blue-600 hover:bg-blue-500 text-white">
                  Open Command Center
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">{user?.name || user?.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="gap-1.5 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-medium text-slate-200 hover:text-white">
                    Login
                  </Button>
                </Link>
              )}
              {location.pathname !== '/signup' && (
                <Link to="/signup">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="default" size="sm" className="font-semibold shadow-glow bg-blue-600 hover:bg-blue-500 text-white">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
