
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}: ButtonProps) => {
  const baseClasses = variant === 'primary' 
    ? 'bg-brand-green text-white hover:bg-brand-green-light transition-colors' 
    : 'border border-brand-green text-brand-green hover:bg-brand-green/5 transition-colors';
  
  return (
    <button 
      type={type}
      className={cn(
        baseClasses, 
        'py-3 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-opacity-50',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
