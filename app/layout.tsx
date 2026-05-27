import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Naveen Meel — Network & Cloud Engineer', template: '%s | Naveen Meel' },
  description: 'Network Engineer at Airtel. Writing about Networking, Cloud, DevOps, DevSecOps, Kubernetes, Terraform, and Basketball.',
  authors: [{ name: 'Naveen Meel', url: 'https://naveenmeel.vercel.app' }],
  keywords: ['Naveen Meel', 'Network Engineer', 'Cloud', 'DevOps', 'MPLS', 'Airtel', 'Kubernetes', 'Terraform'],
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Naveen.dev' },
  openGraph: {
    type: 'website',
    siteName: 'Naveen Meel',
    title: 'Naveen Meel | Network & Cloud Engineer',
    description: 'Writing about Networking, Cloud, DevOps, K8s, Terraform, and Basketball.',
  },
  twitter: { card: 'summary_large_image', title: 'Naveen Meel | Portfolio' },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#080A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
