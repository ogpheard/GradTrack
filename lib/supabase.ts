import { createClient } from '@supabase/supabase-js';

// Supabase configuration from original app
const SUPABASE_CONFIG = {
  test: {
    url: 'https://bmudgeqzuhdjowcibwyx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdWRnZXF6dWhkam93Y2lid3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzExODUsImV4cCI6MjA3MzAwNzE4NX0.sGQ0YfX_TBKHVtrMSE77kifuXnRBdRjhaIcGZQpDLLc'
  },
  prod: {
    url: 'https://bmudgeqzuhdjowcibwyx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdWRnZXF6dWhkam93Y2lid3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzExODUsImV4cCI6MjA3MzAwNzE4NX0.sGQ0YfX_TBKHVtrMSE77kifuXnRBdRjhaIcGZQpDLLc'
  }
};

export const TABLE_NAME = 'graduate_job_helper';

// Create Supabase client based on environment
export function getSupabaseClient(environment: 'test' | 'prod' = 'test') {
  const config = SUPABASE_CONFIG[environment];
  return createClient(config.url, config.key);
}

// Status mapping utilities
export const STATUS_MAP = {
  saved: 'Saved',
  applied: 'Applied',
  oa: 'OA',
  hirevue: 'HireVue',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
  withdrew: 'Withdrew',
  'on-hold': 'On-hold',
  'role-closed': 'Role-closed',
  ghosted: 'Ghosted',
};

export function toStatusSlug(status: string): string {
  const raw = String(status || '').trim();
  if (!raw) return '';
  const lc = raw.toLowerCase();

  const alias: Record<string, string> = {
    'online assessment': 'oa',
    'online-assessment': 'oa',
    'video interview (hirevue)': 'hirevue',
    'video-interview-(hirevue)': 'hirevue',
    'hire vue': 'hirevue',
    'on hold': 'on-hold',
    'role closed': 'role-closed',
  };

  if (alias[lc]) return alias[lc];
  return lc.replace(/\s+/g, '-');
}

export function toStatusDisplay(slug: string): string {
  return STATUS_MAP[slug as keyof typeof STATUS_MAP] || slug;
}
