import { cn } from '@/lib/utils';

type EventType = 'in-person' | 'online' | 'side-event';
type Variant = EventType | 'default' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  'in-person': 'bg-badge-in-person/20 text-badge-in-person border-badge-in-person/30',
  online: 'bg-badge-online/20 text-badge-online border-badge-online/30',
  'side-event': 'bg-badge-side-event/20 text-badge-side-event border-badge-side-event/30',
  default: 'bg-surface text-muted border-muted/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  error: 'bg-error/20 text-error border-error/30',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badge border px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
