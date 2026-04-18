'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ThanksPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const path = searchParams.get('path');
  const url = searchParams.get('url');

  return (
    <main className="container">
      <section className="card">
        <h1>送信完了</h1>
        <p>ご回答ありがとうございました。回答ID: {id ?? 'N/A'}</p>
        {path && <p>保存先: {path}</p>}
        {url && (
          <p>
            GitHub上のファイル: <a className="textLink" href={url} target="_blank" rel="noreferrer">確認する</a>
          </p>
        )}
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
