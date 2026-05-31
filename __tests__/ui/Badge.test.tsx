import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>In-Person</Badge>);
    expect(screen.getByText('In-Person')).toBeInTheDocument();
  });

  it('applies in-person variant classes', () => {
    const { container } = render(<Badge variant="in-person">In-Person</Badge>);
    expect(container.firstChild).toHaveClass('bg-badge-in-person/20');
  });

  it('applies online variant classes', () => {
    const { container } = render(<Badge variant="online">Online</Badge>);
    expect(container.firstChild).toHaveClass('bg-badge-online/20');
  });
});
