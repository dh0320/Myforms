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

const ENV_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? '';

const PRESET: Omit<GithubSubmissionConfig, 'token'> = {
  owner: 'dh0320',
  repo: 'myforms',
  branch: 'main',
  folder: 'responses',
};

export default function ConfirmPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<SubmissionPayload | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [dest, setDest] = useState<Omit<GithubSubmissionConfig, 'token'>>(PRESET);

  useEffect(() => {
    const saved = localStorage.getItem('surveyDraft');
    if (!saved) {
      router.replace('/');
      return;
    }

    setDraft(JSON.parse(saved) as SubmissionPayload);

    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig) as Partial<Omit<GithubSubmissionConfig, 'token'>>;
      setDest((prev) => ({ ...prev, ...parsed }));
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
    if (!ENV_TOKEN) {
      setSubmitError('GitHub Token が設定されていません。管理者にお問い合わせください。');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    const saved: StoredSubmission = {
      ...draft,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(dest));

      const config: GithubSubmissionConfig = { ...dest, token: ENV_TOKEN };
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

      <section className="card githubCard">
        <h2>GitHub保存先設定</h2>
        <div className="githubDest">
          <span className="githubRepo">{dest.owner}/{dest.repo}</span>
          <span className="githubPath">{dest.branch} / {dest.folder}/</span>
        </div>
        <details>
          <summary className="configToggle">送信先を変更する</summary>
          <div className="formGrid advancedConfig">
            <label>
              Owner
              <input
                type="text"
                value={dest.owner}
                onChange={(e) => setDest((prev) => ({ ...prev, owner: e.target.value }))}
                placeholder="example-org"
              />
            </label>
            <label>
              Repository
              <input
                type="text"
                value={dest.repo}
                onChange={(e) => setDest((prev) => ({ ...prev, repo: e.target.value }))}
                placeholder="survey-replies"
              />
            </label>
            <label>
              Branch
              <input
                type="text"
                value={dest.branch}
                onChange={(e) => setDest((prev) => ({ ...prev, branch: e.target.value }))}
                placeholder="main"
              />
            </label>
            <label>
              回答格納フォルダ
              <input
                type="text"
                value={dest.folder}
                onChange={(e) => setDest((prev) => ({ ...prev, folder: e.target.value }))}
                placeholder="responses"
              />
            </label>
          </div>
        </details>
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
