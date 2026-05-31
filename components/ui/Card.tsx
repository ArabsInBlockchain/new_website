import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export default function Card({ children, className, hoverable = false, style }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card p-6',
        hoverable && 'cursor-pointer transition-all duration-300 hover:-translate-y-1',
        className,
      )}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
