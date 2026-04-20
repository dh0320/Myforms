'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CATEGORY_LABELS,
  CHOICE_OPTIONS,
  FREE_TEXT_FIELDS,
  QUESTIONS,
  type Category,
  type ChoiceValue,
} from '@/data/questions';
import type { FreeTextAnswers, SurveyAnswers } from '@/lib/types';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const CATEGORY_COLORS: Record<Category, string> = {
  A: '#3b82f6',
  B: '#8b5cf6',
  C: '#0891b2',
  D: '#059669',
  E: '#d97706',
  F: '#db2777',
  G: '#6366f1',
};

const blankFreeText = (): FreeTextAnswers => ({
  notDelegatedToAI: '',
  desiredTeamFeature: '',
});

export default function SurveyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const formId = searchParams.get('formId') ?? 'default-form';

  const grouped = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      title: CATEGORY_LABELS[category],
      questions: QUESTIONS.filter((q) => q.category === category),
    }));
  }, []);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [freeText, setFreeText] = useState<FreeTextAnswers>(blankFreeText);

  const current = grouped[step];
  const isLast = step === grouped.length - 1;

  const updateAnswer = (id: string, value: ChoiceValue) => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(8);
    }
    setAnswers((prev) => {
      if (prev[id] === value) {
        const next = { ...prev };
        delete next[id];
        return next;
      }

      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const goConfirm = () => {
    localStorage.setItem(
      'surveyDraft',
      JSON.stringify({
        formId,
        answers,
        freeText,
      }),
    );
    router.push('/confirm');
  };

  const catColor = CATEGORY_COLORS[current.category];

  return (
    <section className="survey">
      <div className="card categoryCard" style={{ '--cat-color': catColor } as React.CSSProperties}>
        <div className="progressWrap">
          <div className="progressFill" style={{ width: `${((step + 1) / grouped.length) * 100}%` }} />
        </div>
        <p className="chip">{`カテゴリ ${step + 1} / ${grouped.length}`}</p>
        <h2>{current.title}</h2>
        <div className="questionList">
          {current.questions.map((question) => (
            <article key={question.id} className="question">
              <p className="qid">{question.id}</p>
              <p>{question.text}</p>
              <div className="options" role="radiogroup" aria-label={`${question.id}の回答`}>
                {CHOICE_OPTIONS.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      type="button"
                      key={option.value}
                      className={`option${selected ? ' selected' : ''}`}
                      onClick={() => updateAnswer(question.id, option.value)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>

      {isLast && (
        <div className="card freeText">
          <h3>自由記述（任意）</h3>
          {FREE_TEXT_FIELDS.map((field) => (
            <label key={field.key} className="textareaWrap">
              {field.label}
              <textarea
                rows={4}
                value={freeText[field.key]}
                onChange={(e) =>
                  setFreeText((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            </label>
          ))}
        </div>
      )}

      <nav className="bottomNav" aria-label="カテゴリナビゲーション">
        <button
          type="button"
          onClick={() => {
            setStep((s) => Math.max(s - 1, 0));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={step === 0}
        >
          戻る
        </button>
        {isLast ? (
          <button type="button" className="primary" onClick={goConfirm}>
            入力完了
          </button>
        ) : (
          <button
            type="button"
            className="primary"
            onClick={() => {
              setStep((s) => Math.min(s + 1, grouped.length - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            次へ
          </button>
        )}
      </nav>
    </section>
  );
}
