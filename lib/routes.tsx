import { createBrowserRouter } from 'react-router-dom';
import AppTemplate from '@/components/AppTemplate';
import HomeTab from '@/components/HomeTab';
import SkillsTab from '@/components/SkillsTab';
import WorkflowTab from '@/components/WorkflowTab';
import HistoryTab from '@/components/HistoryTab';
import IntegrationsTab from '@/components/IntegrationsTab';
import ConfigTab from '@/components/ConfigTab';

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <AppTemplate />,
      children: [
        { index: true, element: <HomeTab /> },
        { path: 'skills', element: <SkillsTab /> },
        { path: 'workflow', element: <WorkflowTab /> },
        { path: 'historico', element: <HistoryTab /> },
        { path: 'integracoes', element: <IntegrationsTab /> },
        { path: 'config', element: <ConfigTab /> },
      ],
    },
  ]);
}