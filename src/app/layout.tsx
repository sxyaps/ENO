import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Mono } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif' 
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'ENO-YEK | This is not a product. It\'s a signal.',
  description: '1 in 100 gain access. Are you one of them?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${spaceMono.variable} min-h-screen bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
