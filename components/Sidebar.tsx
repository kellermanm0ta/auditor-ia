'use client';

import { useCallback } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'bi-house' },
  { id: 'skills', label: 'Skills', icon: 'bi-gear' },
  { id: 'workflow', label: 'Workflow', icon: 'bi-diagram-3' },
  { id: 'historico', label: 'Histórico', icon: 'bi-clock-history' },
  { id: 'integracoes', label: 'Integrações', icon: 'bi-puzzle' },
  { id: 'config', label: 'Configurações', icon: 'bi-sliders' },
];

interface SidebarProps {
  activeTab: string;
  collapsed: boolean;
  onToggleSidebar: () => void;
  onTabChange: (tab: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Sidebar({ activeTab, collapsed, onToggleSidebar, onTabChange, mobileOpen, onMobileClose, theme, onToggleTheme }: SidebarProps) {
  const handleTabClick = useCallback((tabId: string) => {
    onTabChange(tabId);
    onMobileClose();
  }, [onTabChange, onMobileClose]);

  return (
    <>
      <div
        className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`}
        onClick={onMobileClose}
      />
      <nav className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="brand d-flex align-items-center justify-content-between px-3">
          <span><i className="bi bi-shield-check"></i> <span>Auditor</span><span>IA</span></span>
          <button className="sidebar-toggle d-none d-md-block" onClick={onToggleSidebar} title="Recolher">
            <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <a
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleTabClick(item.id); }}
                role="tab"
              >
                <i className={`bi ${item.icon}`}></i> <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto" style={{ borderTop: '1px solid var(--border-color)', paddingTop: 8 }}>
          <button
            className={`btn w-100 d-flex align-items-center gap-2 border-0 sidebar-toggle ${collapsed ? 'justify-content-center px-0' : 'px-3'}`}
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            style={{
              padding: collapsed ? '10px 0' : '10px 14px',
              margin: collapsed ? '2px 8px' : '2px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}`} style={{ width: '18px', textAlign: 'center', marginRight: collapsed ? 0 : 10 }} />
            {!collapsed && <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </button>
        </div>
      </nav>
    </>
  );
}