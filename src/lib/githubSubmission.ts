import { CATEGORY_LABELS, FREE_TEXT_FIELDS, QUESTIONS, type Category } from '@/data/questions';
import type { StoredSubmission } from '@/lib/types';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const LABEL_MAP: Record<string, string> = {
  double: '◎',
  circle: '○',
  triangle: '△',
  cross: '×',
};

export type GithubSubmissionConfig = {
  owner: string;
  repo: string;
  branch: string;
  folder: string;
  token: string;
};

const normalize = (value: string) => value.trim();

const encodeBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const sanitizeForFile = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const toDateStamp = (iso: string) => {
  const date = new Date(iso);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mi = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
};

export const buildSubmissionMarkdown = (submission: StoredSubmission) => {
  const lines: string[] = [];

  lines.push('# アンケート回答');
  lines.push('');
  lines.push(`- 回答ID: ${submission.id}`);
  lines.push(`- formId: ${submission.formId}`);
  lines.push(`- submittedAt(UTC): ${submission.submittedAt}`);
  lines.push('');

  CATEGORIES.forEach((category) => {
    lines.push(`## ${CATEGORY_LABELS[category]}`);
    lines.push('');

    QUESTIONS.filter((q) => q.category === category).forEach((q) => {
      const choice = submission.answers[q.id];
      const label = choice ? LABEL_MAP[choice] : '未回答';
      lines.push(`- ${q.id} ${q.text}: ${label}`);
    });

    lines.push('');
  });

  lines.push('## 自由記述');
  lines.push('');

  FREE_TEXT_FIELDS.forEach((field) => {
    const value = submission.freeText[field.key]?.trim();
    lines.push(`### ${field.label}`);
    lines.push(value ? value : '（未入力）');
    lines.push('');
  });

  return lines.join('\n').trimEnd() + '\n';
};

export const buildSubmissionFilePath = (submission: StoredSubmission, folder: string) => {
  const safeFormId = sanitizeForFile(submission.formId) || 'form';
  const prefix = sanitizeForFile(folder) || 'responses';
  const stamp = toDateStamp(submission.submittedAt);
  const shortId = submission.id.slice(0, 8);

  return `${prefix}/${safeFormId}-${stamp}-${shortId}.md`;
};

export const submitMarkdownToGitHub = async (
  configInput: GithubSubmissionConfig,
  submission: StoredSubmission,
): Promise<{ path: string; htmlUrl: string }> => {
  const config = {
    owner: normalize(configInput.owner),
    repo: normalize(configInput.repo),
    branch: normalize(configInput.branch),
    folder: normalize(configInput.folder),
    token: normalize(configInput.token),
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`GitHub設定が不足しています: ${missing.join(', ')}`);
  }

  const path = buildSubmissionFilePath(submission, config.folder);
  const markdown = buildSubmissionMarkdown(submission);

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `Add survey response ${submission.id}`,
        content: encodeBase64(markdown),
        branch: config.branch,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub保存に失敗しました (${response.status}): ${body || response.statusText}`);
  }

  const json = (await response.json()) as {
    content?: { path?: string; html_url?: string };
  };

  return {
    path: json.content?.path ?? path,
    htmlUrl: json.content?.html_url ?? '',
  };
};
