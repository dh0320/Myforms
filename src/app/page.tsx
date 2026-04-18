import { Suspense } from 'react';
import SurveyForm from '@/components/SurveyForm';

export default function Home() {
  return (
    <main className="container">
      <header className="card">
        <h1>AI活用アンケート</h1>
        <p>本アンケートは、現場でのAI活用ニーズを把握するための簡易調査です。</p>
        <ol>
          <li>各設問を「◎ / ○ / △ / ×」から1タップで選択</li>
          <li>カテゴリを下部の「次へ」で進む</li>
          <li>最終カテゴリで自由記述を入力し「入力完了」へ</li>
        </ol>
        <p className="subtle">共有URLに formId クエリ（例: ?formId=team-2026Q2）を付けるとアンケートを識別できます。</p>
        <p className="subtle">最終送信時に GitHub API へ Markdown を保存します（確認画面で保存先を設定）。</p>
      </header>
      <Suspense fallback={<div className="card">読み込み中...</div>}><SurveyForm /></Suspense>
    </main>
  );
}
