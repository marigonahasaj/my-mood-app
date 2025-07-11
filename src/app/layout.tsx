import './globals.css';
import type { Metadata } from 'next';
import Head from "next/head";

export const metadata: Metadata = {
    title: 'Mood Tracker',
    description: 'Track and shift your vibe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
    <html lang="en">
    <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
            href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Love+Light&family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />
    </Head>
    <body className="montserrat-alternates-thin">{children}</body>
    </html>
    );
}
