import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={5}
          className={cn(
            'w-full rounded-input border border-muted/30 bg-page px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand-teal focus:outline-none resize-y disabled:opacity-50',
            error && 'border-error focus:border-error',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
