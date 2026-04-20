'use client';

import { Suspense } from 'react';
import Link from 'next/link';

function ThanksContent() {
  return (
    <section className="card">
      <h1>送信完了</h1>
      <p>ご回答ありがとうございました。</p>
      <div className="actions">
        <Link href="/" className="textLink">
          再回答する
        </Link>
        <Link href="/admin" className="textLink">
          管理者向け集計ページへ
        </Link>
      </div>
    </section>
  );
}

export default function ThanksPage() {
  return (
    <main className="container">
      <Suspense fallback={<section className="card">読み込み中...</section>}>
        <ThanksContent />
      </Suspense>
    </main>
  );
}
