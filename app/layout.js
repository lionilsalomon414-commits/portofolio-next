import './globals.css';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '800'], variable: '--font-display' });
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });

export const metadata = {
  title: 'Lioniel Salomon Siregar – Front-end Developer',
  description: 'Website perkenalan Lioniel Salomon Siregar, mahasiswa Sistem Informasi UT yang lagi lari menuju front-end developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
