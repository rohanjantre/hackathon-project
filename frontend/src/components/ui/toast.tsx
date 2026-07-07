import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (type: ToastType, title: string, description?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback((type: ToastType, title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl border shadow-2xl backdrop-blur-xl relative overflow-hidden',
                toast.type === 'success' &&
                  'bg-slate-900/90 border-green-500/40 text-green-100 shadow-[0_0_30px_rgba(34,197,94,0.2)]',
                toast.type === 'error' &&
                  'bg-slate-900/90 border-red-500/40 text-red-100 shadow-[0_0_30px_rgba(239,68,68,0.2)]',
                toast.type === 'info' &&
                  'bg-slate-900/90 border-blue-500/40 text-blue-100 shadow-[0_0_30px_rgba(37,99,235,0.2)]'
              )}
            >
              {/* Accent glow line at top */}
              <div
                className={cn(
                  'absolute top-0 left-0 right-0 h-0.5',
                  toast.type === 'success' && 'bg-green-500',
                  toast.type === 'error' && 'bg-red-500',
                  toast.type === 'info' && 'bg-blue-500'
                )}
              />

              <div className="flex-shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
                {toast.type === 'info' && <Info className="h-5 w-5 text-blue-400" />}
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <h4 className="text-sm font-semibold leading-tight">{toast.title}</h4>
                {toast.description && (
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
