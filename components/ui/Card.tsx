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
        'rounded-card bg-surface p-6',
        hoverable && 'cursor-pointer transition-all duration-300 hover:-translate-y-1',
        className,
      )}
      style={{
        boxShadow: 'var(--shadow-card)',
        ...(hoverable ? {} : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
