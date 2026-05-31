import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function PageHeader({ title, subtitle, className, centered = true }: PageHeaderProps) {
  return (
    <div className={cn('py-16 md:py-24', className)}>
      <div className={cn('mx-auto max-w-3xl px-4', centered && 'text-center')}>
        <h1 className="text-4xl font-bold text-brand-gold md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
