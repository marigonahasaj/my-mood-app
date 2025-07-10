import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mood Tracker',
    description: 'Track and shift your vibe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <link
            href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Love+Light&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"/>
        <body className="montserrat-alternates-thin">{children}</body>
        </html>
    );
}
