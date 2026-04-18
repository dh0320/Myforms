import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { StoredSubmission, SubmissionPayload } from '@/lib/types';

const DATA_PATH = path.join(process.cwd(), 'data', 'submissions.json');

async function ensureStore() {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf8');
  }
}

export async function readSubmissions(): Promise<StoredSubmission[]> {
  await ensureStore();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw) as StoredSubmission[];
}

export async function saveSubmission(payload: SubmissionPayload): Promise<StoredSubmission> {
  const records = await readSubmissions();
  const saved: StoredSubmission = {
    ...payload,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  records.push(saved);
  await fs.writeFile(DATA_PATH, JSON.stringify(records, null, 2), 'utf8');
  return saved;
}
