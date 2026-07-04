import * as React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  icon,
  error,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 shadow-sm cursor-pointer transition-all duration-200 select-none',
          isOpen ? 'border-blue-500 ring-2 ring-blue-500/20 bg-slate-900/90 shadow-[0_0_15px_rgba(37,99,235,0.25)]' : 'hover:border-slate-600',
          disabled && 'cursor-not-allowed opacity-50',
          error && 'border-red-500 ring-red-500/20',
          className
        )}
      >
        <div className="flex items-center gap-3 truncate">
          {icon && <span className="text-slate-400 flex-shrink-0">{icon}</span>}
          <span className={cn('truncate', !selectedOption && 'text-slate-500')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2',
            isOpen && 'transform rotate-180 text-blue-400'
          )}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-2xl max-h-60 overflow-auto animate-accordion-down">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-colors duration-150',
                  isSelected
                    ? 'bg-blue-600/20 text-blue-400 font-medium'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="h-4 w-4 text-blue-400" />}
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-400 flex items-center gap-1 animate-fadeIn">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
          {error}
        </p>
      )}
    </div>
  );
};
