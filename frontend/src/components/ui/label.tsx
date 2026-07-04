import * as React from 'react';
import { cn } from '../../utils/cn';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-xs font-semibold uppercase tracking-wider text-slate-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-blue-400 ml-1">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';

export { Label };
