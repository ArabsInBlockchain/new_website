import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'teal';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-violet text-foreground hover:opacity-90',
  /* text-on-gold is #1a1040 — a fixed CSS var that never changes with theme,
     unlike text-page which becomes near-white in light mode */
  gold: 'text-on-gold font-semibold hover:opacity-90',
  outline: 'border border-foreground/30 text-foreground hover:border-brand-teal hover:text-brand-teal',
  ghost: 'text-muted hover:text-foreground hover:bg-surface',
  teal: 'bg-brand-teal text-on-gold font-semibold hover:opacity-90',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-7 py-3 text-base min-h-[52px]',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, style, ...props }, ref) => {
    const goldStyle =
      variant === 'gold'
        ? { background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-cta)', ...style }
        : style;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        style={goldStyle}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
