import * as React from 'react';
import { Cpu, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)}>
      <div className="relative flex items-center justify-center">
        {/* Glow behind icon */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-xl blur-md opacity-70 animate-pulse-glow" />
        
        {/* Icon container */}
        <div
          className={cn(
            'relative flex items-center justify-center rounded-xl bg-slate-900 border border-blue-500/50 p-1.5 text-blue-400 shadow-glow',
            iconSizes[size]
          )}
        >
          <Cpu className="h-full w-full text-blue-400" />
          <Zap className="absolute h-1/2 w-1/2 text-sky-400 bottom-1 right-1 fill-sky-400" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={cn('font-extrabold tracking-tight text-white flex items-center', textSizes[size])}>
            <span>Forge</span>
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Mind
            </span>
            <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
              AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
