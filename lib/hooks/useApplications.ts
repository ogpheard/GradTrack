import { useState, useEffect } from 'react';
import { getSupabaseClient, TABLE_NAME, toStatusSlug } from '@/lib/supabase';

export interface Application {
  id: string;
  title: string;
  company: string;
  status: string;
  fitScore?: number;
  sector?: string;
  roleType?: string;
  location?: string;
  salary?: string;
  appliedDate?: string;
  addedDate?: string;
  keywords?: string[];
  summary?: string;
  description?: string;
  sourceUrl?: string;
  [key: string]: any;
}

export function useApplications(environment: 'test' | 'prod' = 'test') {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = getSupabaseClient(environment);
      const { data, error: fetchError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to match Application interface
      const transformed = (data || []).map((row: any) => ({
        id: row.id || row.row_id,
        title: row.job_title || row.title || '',
        company: row.company_name || row.company || '',
        status: toStatusSlug(row.status || ''),
        fitScore: row.ai_fit_score || row.fit_score,
        sector: row.sector || row.job_sector,
        roleType: row.role_type || row.job_role_type,
        location: Array.isArray(row.location) ? row.location.join(', ') : row.location,
        salary: row.salary_range || formatSalary(row),
        appliedDate: row.applied_date || row.date_applied,
        addedDate: row.created_at || row.added_date,
        keywords: Array.isArray(row.keywords) ? row.keywords :
                  typeof row.keywords === 'string' ? row.keywords.split(',').map((k: string) => k.trim()) : [],
        summary: row.job_summary || row.summary,
        description: row.job_description || row.description,
        sourceUrl: row.source_url || row.url,
        // Keep all original fields
        ...row
      }));

      setApplications(transformed);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [environment]);

  return { applications, loading, error, refetch: fetchApplications };
}

function formatSalary(row: any): string | undefined {
  const currency = row.salary_currency || '';
  const min = row.salary_min;
  const max = row.salary_max;
  const period = row.salary_period || '';

  if (!min && !max) return undefined;

  if (min && max) {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()} ${period}`;
  } else if (min) {
    return `${currency}${min.toLocaleString()}+ ${period}`;
  } else if (max) {
    return `Up to ${currency}${max.toLocaleString()} ${period}`;
  }

  return undefined;
}
