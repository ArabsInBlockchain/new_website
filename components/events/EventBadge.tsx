import { cn } from '@/lib/utils';

type EventType = 'in-person' | 'online' | 'side-event';

interface EventBadgeProps {
  type: EventType;
  label: string;
  className?: string;
}

const styles: Record<EventType, string> = {
  'in-person': 'bg-badge-in-person/15 text-badge-in-person border-badge-in-person/30',
  'online': 'bg-badge-online/15 text-badge-online border-badge-online/30',
  'side-event': 'bg-badge-side-event/15 text-badge-side-event border-badge-side-event/30',
};

export default function EventBadge({ type, label, className }: EventBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-badge border px-2.5 py-0.5 text-xs font-semibold',
        styles[type],
        className,
      )}
    >
      {label}
    </span>
  );
}
