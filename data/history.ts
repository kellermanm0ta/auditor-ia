export interface HistoryItem {
  repo: string;
  date: string;
  issues: number;
  severity: string;
  agents: number;
  time: string;
}

export const historyData: HistoryItem[] = [
  { repo: 'https://github.com/time/backend-api', date: '07/08/2026 14:32', issues: 12, severity: 'Alto', agents: 4, time: '1m 23s' },
  { repo: 'https://github.com/time/frontend-app', date: '06/08/2026 09:15', issues: 5, severity: 'Médio', agents: 3, time: '52s' },
  { repo: 'https://github.com/exemplo/mobile-app', date: '05/08/2026 18:44', issues: 8, severity: 'Alto', agents: 4, time: '1m 05s' },
  { repo: 'https://github.com/exemplo/meu-projeto', date: '04/08/2026 10:00', issues: 7, severity: 'Médio', agents: 4, time: '58s' },
  { repo: 'https://github.com/time/microservice-pagamentos', date: '03/08/2026 22:30', issues: 3, severity: 'Baixo', agents: 2, time: '35s' },
];