import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-glow hover:bg-primary-hover hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-blue-500/30',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_20px_rgba(239,68,68,0.4)]',
        outline:
          'border border-border bg-transparent hover:bg-secondary hover:text-foreground hover:border-primary/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover border border-border/50',
        ghost: 'hover:bg-secondary/80 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        accent:
          'bg-accent text-accent-foreground font-semibold shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:bg-accent/90 hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]',
        glass:
          'bg-slate-800/60 backdrop-blur-md border border-slate-700/60 text-foreground hover:bg-slate-800/90 hover:border-primary/50 shadow-glass',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-13 rounded-xl px-8 py-3 text-base font-semibold',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
