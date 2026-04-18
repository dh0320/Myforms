'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, FREE_TEXT_FIELDS, QUESTIONS, type Category } from '@/data/questions';
import { submitMarkdownToGitHub, type GithubSubmissionConfig } from '@/lib/githubSubmission';
import type { StoredSubmission, SubmissionPayload } from '@/lib/types';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const LABEL_MAP: Record<string, string> = {
  double: '◎',
  circle: '○',
  triangle: '△',
  cross: '×',
};

const CONFIG_KEY = 'githubSubmissionConfig';

const initialConfig: GithubSubmissionConfig = {
  owner: '',
  repo: '',
  branch: 'main',
  folder: 'responses',
  token: '',
};

export default function ConfirmPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<SubmissionPayload | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [config, setConfig] = useState<GithubSubmissionConfig>(initialConfig);

  useEffect(() => {
    const saved = localStorage.getItem('surveyDraft');
    if (!saved) {
      router.replace('/');
      return;
    }

    setDraft(JSON.parse(saved) as SubmissionPayload);

    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      setConfig((prev) => ({ ...prev, ...(JSON.parse(savedConfig) as GithubSubmissionConfig) }));
    }
  }, [router]);

  const grouped = useMemo(() => {
    if (!draft) {
      return [];
    }
    return CATEGORIES.map((category) => ({
      category,
      title: CATEGORY_LABELS[category],
      answers: QUESTIONS.filter((q) => q.category === category).map((q) => ({
        id: q.id,
        text: q.text,
        value: draft.answers[q.id] ? LABEL_MAP[draft.answers[q.id]] : '未回答',
      })),
    }));
  }, [draft]);

  const submit = async () => {
    if (!draft) return;
    setSubmitting(true);
    setSubmitError('');

    const saved: StoredSubmission = {
      ...draft,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));

      const result = await submitMarkdownToGitHub(config, saved);

      const raw = localStorage.getItem('surveySubmissions');
      const submissions = raw ? (JSON.parse(raw) as StoredSubmission[]) : [];
      submissions.push(saved);
      localStorage.setItem('surveySubmissions', JSON.stringify(submissions));
      localStorage.removeItem('surveyDraft');
      router.push(`/thanks?id=${saved.id}&path=${encodeURIComponent(result.path)}&url=${encodeURIComponent(result.htmlUrl)}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '不明なエラーが発生しました。');
      setSubmitting(false);
    }
  };

  if (!draft) {
    return (
      <main className="container">
        <section className="card">読込中です...</section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card">
        <h1>回答確認</h1>
        <p>formId: {draft.formId}</p>
        <Link href="/" className="textLink">
          編集に戻る
        </Link>
      </section>

      <section className="card">
        <h2>GitHub保存先設定</h2>
        <p className="subtle">送信時に Markdown ファイルを GitHub リポジトリに作成します（GitHub Pages でも動作）。</p>
        <div className="formGrid">
          <label>
            Owner
            <input
              type="text"
              value={config.owner}
              onChange={(e) => setConfig((prev) => ({ ...prev, owner: e.target.value }))}
              placeholder="example-org"
            />
          </label>
          <label>
            Repository
            <input
              type="text"
              value={config.repo}
              onChange={(e) => setConfig((prev) => ({ ...prev, repo: e.target.value }))}
              placeholder="survey-replies"
            />
          </label>
          <label>
            Branch
            <input
              type="text"
              value={config.branch}
              onChange={(e) => setConfig((prev) => ({ ...prev, branch: e.target.value }))}
              placeholder="main"
            />
          </label>
          <label>
            回答格納フォルダ
            <input
              type="text"
              value={config.folder}
              onChange={(e) => setConfig((prev) => ({ ...prev, folder: e.target.value }))}
              placeholder="responses"
            />
          </label>
          <label className="wide">
            GitHub Token (repo 内容への書き込み権限)
            <input
              type="password"
              value={config.token}
              onChange={(e) => setConfig((prev) => ({ ...prev, token: e.target.value }))}
              placeholder="github_pat_xxx"
            />
          </label>
        </div>
      </section>

      {grouped.map((group) => (
        <section key={group.category} className="card">
          <h2>{group.title}</h2>
          <ul className="answerList">
            {group.answers.map((row) => (
              <li key={row.id}>
                <span>
                  {row.id} {row.text}
                </span>
                <strong>{row.value}</strong>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="card">
        <h2>自由記述</h2>
        <ul className="answerList">
          {FREE_TEXT_FIELDS.map((field) => (
            <li key={field.key}>
              <span>{field.label}</span>
              <strong>{draft.freeText[field.key] || '（未入力）'}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="bottomNav staticNav">
        <button type="button" onClick={() => router.push('/')}>
          編集に戻る
        </button>
        <button type="button" className="primary" disabled={submitting} onClick={submit}>
          {submitting ? '送信中...' : '最終送信'}
        </button>
      </section>

      {submitError && (
        <section className="card errorCard">
          <strong>送信に失敗しました。</strong>
          <p>{submitError}</p>
        </section>
      )}
    </main>
  );
}
