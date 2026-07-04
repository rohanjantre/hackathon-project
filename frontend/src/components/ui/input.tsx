import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 transition-all duration-200',
              'focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-slate-900/90 focus-visible:shadow-[0_0_15px_rgba(37,99,235,0.25)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              rightIcon && 'pr-11',
              error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-400 flex items-center gap-1 animate-fadeIn">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
