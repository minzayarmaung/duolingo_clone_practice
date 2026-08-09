import type { Metadata } from 'next';
import './globals.css';
import './library.css';
import './list-picker.css';
import './speaking-sample.css';

export const metadata: Metadata = { title: 'English Speaking Partner', description: 'Friendly speaking practice' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
