import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Myforms Survey',
  description: '共有URLで回答できるアンケートフォーム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
