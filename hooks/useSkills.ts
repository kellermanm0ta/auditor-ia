import useSWR from 'swr';
import type { Skill } from '@/lib/types';
import { fetcher } from '@/lib/api';

export function useSkills() {
  return useSWR<Skill[]>('/skills', fetcher);
}