import { Suspense } from 'react';
import SurveyForm from '@/components/SurveyForm';

export default function Home() {
  return (
    <main className="container">
      <header className="card">
        <h1>AI — 機能一覧</h1>
        <p>目的: どの機能から作ると一番役に立つか、率直な意見を聞かせてほしい。</p>
        <ol>
          <li>気になる機能に「◎（めちゃ欲しい） / ○（あれば嬉しい） / △（まあまあ） / ×（いらない）」で回答</li>
          <li>カテゴリを下部の「次へ」で進む</li>
          <li>最後に自由記述へ、使うシーンや改善案があれば入力して「入力完了」へ</li>
        </ol>
        <p className="subtle">共有URLに formId クエリ（例: ?formId=team-2026Q2）を付けるとアンケートを識別できます。</p>
        <p className="subtle">最終送信時に GitHub API へ Markdown を保存します（確認画面で保存先を設定）。</p>
      </header>
      <Suspense fallback={<div className="card">読み込み中...</div>}><SurveyForm /></Suspense>
    </main>
  );
}
