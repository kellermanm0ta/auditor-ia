'use client';

import { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNavbar from '@/components/TopNavbar';
import HomeTab from '@/components/HomeTab';
import SkillsTab from '@/components/SkillsTab';
import WorkflowTab from '@/components/WorkflowTab';
import HistoryTab from '@/components/HistoryTab';
import IntegrationsTab from '@/components/IntegrationsTab';
import ConfigTab from '@/components/ConfigTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleSidebar = useCallback(() => setCollapsed((prev) => !prev), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);

  const tabs: Record<string, React.ReactNode> = {
    home: <HomeTab />,
    skills: <SkillsTab />,
    workflow: <WorkflowTab />,
    historico: <HistoryTab />,
    integracoes: <IntegrationsTab />,
    config: <ConfigTab />,
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar
        activeTab={activeTab}
        collapsed={collapsed}
        onToggleSidebar={toggleSidebar}
        onTabChange={setActiveTab}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobile}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className={`main-content flex-grow-1 ${collapsed ? 'expanded' : ''}`}>
        <TopNavbar onHamburgerClick={openMobile} theme={theme} onToggleTheme={toggleTheme} />
        <div className="tab-content">
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  );
}