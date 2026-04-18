'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ThanksPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <main className="container">
      <section className="card">
        <h1>送信完了</h1>
        <p>ご回答ありがとうございました。回答ID: {id ?? 'N/A'}</p>
        <div className="actions">
          <Link href="/" className="textLink">
            再回答する
          </Link>
          <Link href="/admin" className="textLink">
            管理者向け集計ページへ
          </Link>
        </div>
      </section>
    </main>
  );
}
