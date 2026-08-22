import useSWR from 'swr';
import type { Config } from '@/lib/types';
import { fetcher } from '@/lib/api';

export function useConfig() {
  return useSWR<Config>('/config', fetcher);
}