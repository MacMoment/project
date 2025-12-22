import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', asChild, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#F73AFF] to-[#A634FF] text-white hover:opacity-90 focus:ring-[#F73AFF] shadow-lg shadow-purple-500/25',
      secondary: 'bg-[#220735] text-white hover:bg-[#220735]/90 focus:ring-[#220735]',
      outline: 'border-2 border-[#F73AFF] text-[#F73AFF] hover:bg-[#F73AFF] hover:text-white focus:ring-[#F73AFF]',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    // If asChild is true and children is a valid element, clone it with button styles
    if (asChild && children) {
      // For asChild, we just render the children directly without wrapping in a button
      // The children should be a Link or anchor element
      return <span className={combinedClassName}>{children}</span>;
    }
    
    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
