import { NextResponse } from 'next/server';
import { saveSubmission } from '@/lib/storage';
import type { SubmissionPayload } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;

    if (!payload.formId || !payload.answers || !payload.freeText) {
      return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
    }

    const saved = await saveSubmission(payload);
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'failed to save' }, { status: 500 });
  }
}
