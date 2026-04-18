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
    text: 'メール下書き（過去の文体学習、ギャラ内訳やパフォーマンス仕様の自動差し込み）。',
  },
  {
    id: 'A-2',
    category: 'A',
    text: '英文メール・契約書の読解と作成（日本語要約、英語返信下書き、要注意ポイントコメント）。',
  },
  {
    id: 'A-3',
    category: 'A',
    text: '助成金申請書の下書き（公募要項の読解、過去実績反映、「助成金マスター」のコツ反映）。',
  },
  {
    id: 'A-4',
    category: 'A',
    text: 'パフォーマンス仕様書のテンプレ管理（日英対応、プロフィールデータの自動差し込み）。',
  },
  {
    id: 'B-1',
    category: 'B',
    text: 'ギャラ交渉メールの下書き（断り方・価格説明・内訳提示などパターン別）。',
  },
  { id: 'B-2', category: 'B', text: '相場データの蓄積（案件タイプ別にギャラ実績を参照）。' },
  { id: 'B-3', category: 'B', text: '見積もり・請求書の自動作成（案件情報から生成しメール添付）。' },
  { id: 'C-1', category: 'C', text: '朝の今日の予定通知（予定・未返信メール・要対応事項をLINEに集約）。' },
  {
    id: 'C-2',
    category: 'C',
    text: 'リモート会議のリマインド強化（Googleカレンダー連携で10分前にLINE通知）。',
  },
  { id: 'C-3', category: 'C', text: '案件確定時のカレンダー自動登録（LINE連絡をGoogleカレンダーへ反映）。' },
  { id: 'D-1', category: 'D', text: '領収書の自動仕訳（写真送信で日付・金額・店名を読み取り自動記帳）。' },
  { id: 'D-2', category: 'D', text: '月次の収支サマリー（前月の収入・経費・手残りを自動集計）。' },
  { id: 'D-3', category: 'D', text: '定期支出の自動記帳（スタジオ代やサブスクを月初に経費登録）。' },
  { id: 'D-4', category: 'D', text: '確定申告の準備サポート（カテゴリ別整理とCSV書き出し）。' },
  {
    id: 'D-5',
    category: 'D',
    text: '節税チェックリスト自動実行（時期に応じた節税項目の能動チェックと通知）。',
  },
  { id: 'E-1', category: 'E', text: '助成金の新規公募チェック（週次通知、締切・金額付き）。' },
  { id: 'E-2', category: 'E', text: '過去の助成金申請のアーカイブ（次回申請時の下書きに活用）。' },
  {
    id: 'F-1',
    category: 'F',
    text: 'LINEに投げたファイルの自動整理（Drive格納、適切なフォルダ分けと命名）。',
  },
  { id: 'F-2', category: 'F', text: '過去のやりとり検索（メールや記録から条件を即時参照）。' },
  { id: 'F-3', category: 'F', text: '未整理ファイルの整理（パソコン上のファイル群を構造化）。' },
  { id: 'G-1', category: 'G', text: 'SNS投稿の下書き（公演・告知文を過去トーンで生成）。' },
  {
    id: 'G-2',
    category: 'G',
    text: 'プロフィール文の自動更新（実績追記と媒体別の長さ最適化）。',
  },
  { id: 'G-3', category: 'G', text: '出演作品のポートフォリオ整理（時系列整理と資料形式保存）。' },
];

export const CHOICE_OPTIONS = [
  { value: 'double', label: '◎' },
  { value: 'circle', label: '○' },
  { value: 'triangle', label: '△' },
  { value: 'cross', label: '×' },
] as const;

export type ChoiceValue = (typeof CHOICE_OPTIONS)[number]['value'];

export const FREE_TEXT_FIELDS = [
  { key: 'additionalRequests', label: '実際に使うシーン（任意）' },
  { key: 'notDelegatedToAI', label: '「こうだったらもっといい」（任意）' },
  { key: 'desiredTeamFeature', label: 'その他コメント（任意）' },
] as const;

export type FreeTextKey = (typeof FREE_TEXT_FIELDS)[number]['key'];
