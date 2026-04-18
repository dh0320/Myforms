'use client';

import { useEffect, useMemo, useState } from 'react';
import { CATEGORY_LABELS, QUESTIONS } from '@/data/questions';
import type { StoredSubmission } from '@/lib/types';

const LABEL_MAP: Record<string, string> = {
  double: '◎',
  circle: '○',
  triangle: '△',
  cross: '×',
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('surveySubmissions');
    if (!stored) {
      return;
    }
    setSubmissions(JSON.parse(stored) as StoredSubmission[]);
  }, []);

  const aggregate = useMemo(
    () =>
      QUESTIONS.map((q) => {
        const counts = { double: 0, circle: 0, triangle: 0, cross: 0 };

        submissions.forEach((submission) => {
          const value = submission.answers[q.id];
          if (value && value in counts) {
            counts[value as keyof typeof counts] += 1;
          }
        });

        return { ...q, counts };
      }),
    [submissions],
  );

  return (
    <main className="container">
      <section className="card">
        <h1>管理者向け集計</h1>
        <p>総回答数: {submissions.length}</p>
      </section>

      {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
        <section className="card" key={category}>
          <h2>{label}</h2>
          <ul className="answerList vertical">
            {aggregate
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id}>
                  <span>
                    {item.id} {item.text}
                  </span>
                  <strong>
                    {Object.entries(item.counts)
                      .map(([key, count]) => `${LABEL_MAP[key]}:${count}`)
                      .join(' / ')}
                  </strong>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
