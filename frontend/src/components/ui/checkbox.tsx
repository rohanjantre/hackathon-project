import * as React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, checked, onChange, onCheckedChange, id, ...props }, ref) => {
    const checkboxId = id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className="flex flex-col">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              checked={checked}
              onChange={handleChange}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                'h-5 w-5 rounded-md border border-slate-600 bg-slate-900/80 transition-all duration-200 cursor-pointer flex items-center justify-center',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900',
                'peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:shadow-[0_0_12px_rgba(37,99,235,0.5)]',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                error && 'border-red-500',
                className
              )}
              onClick={() => {
                const input = document.getElementById(checkboxId) as HTMLInputElement;
                if (input && !props.disabled) {
                  input.click();
                }
              }}
            >
              <Check className="h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
            </div>
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-slate-300 leading-none cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-400 pl-8">{error}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
