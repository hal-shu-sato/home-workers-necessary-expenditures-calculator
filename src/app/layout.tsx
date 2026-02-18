import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書',
  description:
    '家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
