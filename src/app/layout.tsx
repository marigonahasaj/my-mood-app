import './globals.css';
import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';

const montserrat = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-montserrat'
});

export const metadata: Metadata = {
    title: 'Mood Tracker',
    description: 'Track and shift your vibe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${montserrat.variable}`}>
        <body className="font-sans">{children}</body>
        </html>
    );
}
