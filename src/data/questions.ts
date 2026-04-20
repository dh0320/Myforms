export type Category = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type Question = {
  id: string;
  category: Category;
  text: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  A: 'A. 文書作成まわり',
  B: 'B. ギャラ・交渉まわり',
  C: 'C. スケジュール・リマインド',
  D: 'D. 経費・お金まわり',
  E: 'E. 情報収集',
  F: 'F. ファイル・情報整理',
  G: 'G. 本業サポート系',
};

export const QUESTIONS: Question[] = [
  {
    id: 'A-1',
    category: 'A',
    text: 'AIに「◯◯さんへ、来月の公演の件で返信したい」と伝えると、過去の文体を学習したうえで下書きを作ってくれる。ギャラ内訳、パフォーマンス仕様も自動で差し込む。',
  },
  {
    id: 'A-2',
    category: 'A',
    text: '海外からの依頼メールや契約書を日本語で要約してくれて、返信も英語で下書きしてくれる。重要な条件や要注意ポイントは日本語でコメント。',
  },
  {
    id: 'A-3',
    category: 'A',
    text: '公募要項を読み込んで、過去の活動実績・プロフィールから初稿を書いてくれる。「助成金マスター」の書き方のコツも反映した叩き台を出す。',
  },
  {
    id: 'A-4',
    category: 'A',
    text: 'パフォーマンス内容、必要器具、スペースの数値、出演時間などを一度まとめて「プロフィールデータ」に登録しておけば、以降メール作成時に自動で差し込める。日英両対応。',
  },
  {
    id: 'B-1',
    category: 'B',
    text: '「安すぎる依頼を断る」「提示額が高いと言われた時の返し」「内訳を提示する」など、過去の事例とトーンをもとに下書き。',
  },
  {
    id: 'B-2',
    category: 'B',
    text: '過去のギャラ実績を自動的に「プロフィールデータ」に蓄積していき、案件タイプ別の相場感をいつでも確認できる。',
  },
  { id: 'B-3', category: 'B', text: '案件情報を伝えると、見積書・請求書を自動で作ってメールに添付。' },
  {
    id: 'C-1',
    category: 'C',
    text: '毎朝LINEに「今日の予定・未返信メール・要対応事項」をまとめて投稿。これ一つ見れば今日やることがわかる。',
  },
  {
    id: 'C-2',
    category: 'C',
    text: 'Googleカレンダーのリモート会議を検知して、10分前にLINEで念押し通知（URLと参加ボタン付き）。',
  },
  {
    id: 'C-3',
    category: 'C',
    text: 'LINEで「◯月◯日のリハ決まった」と伝えるだけで、Googleカレンダーに自動登録。',
  },
  {
    id: 'D-1',
    category: 'D',
    text: 'レシートの写真をLINEに送るだけで、日付・金額・店名を読み取って経費台帳に自動記帳。',
  },
  { id: 'D-2', category: 'D', text: '毎月初めに、前月の収入・経費・手残りを自動集計してレポート。経費内訳も可視化。' },
  { id: 'D-3', category: 'D', text: 'スタジオ代やサブスクなど毎月決まった支出を、月初に自動で経費登録。' },
  { id: 'D-4', category: 'D', text: '年間の経費を仕訳カテゴリ別に自動整理。確定申告に必要なデータをCSVで書き出す。' },
  {
    id: 'D-5',
    category: 'D',
    text: '青色申告の申請漏れ、小規模企業共済、機材購入タイミングなど、時期に応じて能動的にチェックして通知。節税に効くチェックリストに沿って教えてくれる。',
  },
  {
    id: 'E-1',
    category: 'E',
    text: '週次で主要な助成金サイトをチェック。プロフィールにマッチしそうな公募をLINEに通知（締切・金額付き）。',
  },
  { id: 'E-2', category: 'E', text: '過去の申請書を保存。次回の申請時にAIが過去の書き方を参考にして下書き。' },
  {
    id: 'F-1',
    category: 'F',
    text: '契約書、請求書、領収書、台本などをLINEに投げると、Google Driveの適切なフォルダに自動で格納・命名。',
  },
  {
    id: 'F-2',
    category: 'F',
    text: '「B社とのギャラ交渉、前回いくらだっけ？」と聞くと、過去のメールや記録から即答。',
  },
  { id: 'F-3', category: 'F', text: 'パソコンに溜まってる過去のファイル群を、AIに渡せば整理して構造化。' },
  { id: 'G-1', category: 'G', text: '公演情報やワークショップ告知のSNS投稿文を、過去のトーンを学習して下書き。' },
  {
    id: 'G-2',
    category: 'G',
    text: '先月のワークショップや公演実績をプロフィールに追記。媒体ごと（事務所用、オーディション用、SNS用）に長さを調整。',
  },
  {
    id: 'G-3',
    category: 'G',
    text: '公演・映像作品を時系列で整理し、ポートフォリオサイトや紹介資料に使える形式で保存。',
  },
];

export const CHOICE_OPTIONS = [
  { value: 'double', label: '◎' },
  { value: 'circle', label: '○' },
  { value: 'triangle', label: '△' },
  { value: 'cross', label: '×' },
] as const;

export type ChoiceValue = (typeof CHOICE_OPTIONS)[number]['value'];

export const FREE_TEXT_FIELDS = [
  { key: 'notDelegatedToAI', label: '「こうだったらもっといい」（任意）' },
  { key: 'desiredTeamFeature', label: 'その他コメント（任意）' },
] as const;

export type FreeTextKey = (typeof FREE_TEXT_FIELDS)[number]['key'];
