export interface Skill {
  id: string;
  name: string;
  icon: string;
  desc: string;
  enabled: boolean;
  prompt: string;
}

export interface HistoryItem {
  repo: string;
  date: string;
  issues: number;
  severity: string;
  agents: number;
  time: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: 'connected' | 'disconnected';
  statusLabel: string;
  docUrl: string;
  steps: string[];
  yaml: string;
}

export interface OutputFormat {
  id: number;
  value: string;
  label: string;
}

export enum ExecutionMode {
  Parallel = 'Paralelo',
  Serial = 'Série',
}

export interface Config {
  id: number;
  executionMode: ExecutionMode;
  outputFormatId: number;
  skillIds: string[];
}