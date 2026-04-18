'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, FREE_TEXT_FIELDS, QUESTIONS, type Category } from '@/data/questions';
import type { StoredSubmission, SubmissionPayload } from '@/lib/types';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const LABEL_MAP: Record<string, string> = {
  double: '◎',
  circle: '○',
  triangle: '△',
  cross: '×',
};

export default function ConfirmPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<SubmissionPayload | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('surveyDraft');
    if (!saved) {
      router.replace('/');
      return;
    }
    setDraft(JSON.parse(saved) as SubmissionPayload);
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

    const saved: StoredSubmission = {
      ...draft,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    const raw = localStorage.getItem('surveySubmissions');
    const submissions = raw ? (JSON.parse(raw) as StoredSubmission[]) : [];
    submissions.push(saved);
    localStorage.setItem('surveySubmissions', JSON.stringify(submissions));
    localStorage.removeItem('surveyDraft');
    router.push(`/thanks?id=${saved.id}`);
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
    </main>
  );
}
