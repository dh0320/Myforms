import { Suspense } from 'react';
import SurveyForm from '@/components/SurveyForm';

export default function Home() {
  return (
    <main className="container">
      <header className="card">
        <h1>AI — 機能一覧</h1>
        <p>目的: どの機能から作ると一番役に立つか、率直な意見を聞かせてほしい。</p>
        <p>
          気になる機能に <strong>◎（めちゃ欲しい） / ○（あれば嬉しい） / △（まあまあ） / ×（いらない）</strong> をつけてもらうのと、
          実際に使うシーンや「こうだったらもっといい」があれば一言もらえると助かる。
        </p>
        <p className="subtle">共有URLに formId クエリ（例: ?formId=team-2026Q2）を付けるとアンケートを識別できます。</p>
        <p className="subtle">最終送信時に GitHub API へ Markdown を保存します（確認画面で保存先を設定）。</p>
      </header>
      <Suspense fallback={<div className="card">読み込み中...</div>}><SurveyForm /></Suspense>
    </main>
  );
}
