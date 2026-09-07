import useSWR from 'swr';
import type { WorkflowAgent } from '@/lib/types';
import { fetcher } from '@/lib/api';

export function useWorkflowAgents() {
  return useSWR<WorkflowAgent[]>('/workflow-agents', fetcher);
}