import type { ChoiceValue, FreeTextKey } from '@/data/questions';

export type SurveyAnswers = Record<string, ChoiceValue>;

export type FreeTextAnswers = Record<FreeTextKey, string>;

export type SubmissionPayload = {
  formId: string;
  answers: SurveyAnswers;
  freeText: FreeTextAnswers;
  submittedAt?: string;
};

export type StoredSubmission = SubmissionPayload & {
  id: string;
  submittedAt: string;
};
