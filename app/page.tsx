import { redirect } from 'next/navigation';

// Middleware handles locale routing; this is a safety fallback
export default function RootPage() {
  redirect('/ar');
}
