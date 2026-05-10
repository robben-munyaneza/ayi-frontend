import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AYI Group | Africa Youth Investment Group',
  description: 'Empowering Africa\'s Youth through investment, community, and finance.',
};

import { Providers } from '../components/Providers.jsx';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#030712] text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
