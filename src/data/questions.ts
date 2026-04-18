export type Category = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export type Question = {
  id: string;
  category: Category;
  text: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  A: 'A. 現在の業務課題',
  B: 'B. 情報収集と共有',
  C: 'C. 自動化ニーズ',
  D: 'D. 品質とレビュー',
  E: 'E. セキュリティと統制',
  F: 'F. 導入ハードル',
  G: 'G. 活用シーン',
  H: 'H. 将来像',
};

export const QUESTIONS: Question[] = [
  { id: 'A-1', category: 'A', text: '定型作業に時間が取られ、本来業務に集中できない。' },
  { id: 'A-2', category: 'A', text: '部門間で同じ情報を何度も入力・転記している。' },
  { id: 'B-1', category: 'B', text: '必要な資料や過去事例を探すのに時間がかかる。' },
  { id: 'B-2', category: 'B', text: 'ナレッジが個人に閉じ、共有されにくい。' },
  { id: 'C-1', category: 'C', text: 'メール・議事録・報告書の下書きを自動化したい。' },
  { id: 'C-2', category: 'C', text: 'データ入力や集計作業をAIに任せたい。' },
  { id: 'D-1', category: 'D', text: '成果物のレビュー観点を標準化したい。' },
  { id: 'D-5', category: 'D', text: 'アウトプット品質のばらつきを減らしたい。' },
  { id: 'E-1', category: 'E', text: '個人情報や機密情報の扱いに不安がある。' },
  { id: 'E-2', category: 'E', text: 'AI活用ルールや監査ログを整備したい。' },
  { id: 'F-1', category: 'F', text: '新しいツールの学習コストが導入障壁になっている。' },
  { id: 'F-2', category: 'F', text: '現場が効果を実感できるまでに時間がかかる。' },
  { id: 'G-1', category: 'G', text: '顧客対応の一次回答をAIで支援したい。' },
  { id: 'G-2', category: 'G', text: '社内問い合わせ窓口をAIチャット化したい。' },
  { id: 'H-1', category: 'H', text: '1年後にはAIを前提に業務設計を見直したい。' },
  { id: 'H-2', category: 'H', text: 'AI活用スキルを組織全体で底上げしたい。' },
];

export const CHOICE_OPTIONS = [
  { value: 'double', label: '◎' },
  { value: 'circle', label: '○' },
  { value: 'triangle', label: '△' },
  { value: 'cross', label: '×' },
] as const;

export type ChoiceValue = (typeof CHOICE_OPTIONS)[number]['value'];

export const FREE_TEXT_FIELDS = [
  { key: 'additionalRequests', label: '追加要望（任意）' },
  { key: 'notDelegatedToAI', label: 'AIに任せたくないもの（任意）' },
  { key: 'desiredTeamFeature', label: '仲間が欲しがる機能（任意）' },
] as const;

export type FreeTextKey = (typeof FREE_TEXT_FIELDS)[number]['key'];
