import './globals.css';
import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';
import Script from 'next/script';

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
        <head>
            {/* Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-C09MT1W5VN`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-ABCDE12345');
                `}
            </Script>
        </head>
        <body className="font-sans">{children}</body>
        </html>
    );
}
