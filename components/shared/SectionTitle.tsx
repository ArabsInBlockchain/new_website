import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, className, centered = false }: SectionTitleProps) {
  return (
    <div className={cn('mb-10', centered && 'text-center', className)}>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}
