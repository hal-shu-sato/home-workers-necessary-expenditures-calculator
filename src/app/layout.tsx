import { CssBaseline } from '@mui/material';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書',
  description:
    '家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書',
  metadataBase: new URL(
    'https://home-workers-necessary-expenditures.vercel.app',
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
