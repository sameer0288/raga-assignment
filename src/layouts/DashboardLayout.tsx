import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Bell, 
  Activity,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.85rem 1.25rem',
      borderRadius: '12px',
      marginBottom: '0.5rem',
      color: 'var(--text-secondary)',
      transition: 'all 0.2s',
      fontWeight: 500,
      fontSize: '0.95rem'
    }}
  >
    {icon}
    <span>{label}</span>
    <ChevronRight size={14} className="chevron" style={{ opacity: 0, marginLeft: 'auto' }} />
  </NavLink>
);

const DashboardLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{
        width: '280px',
        borderRight: '1px solid var(--panel-border)',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <div className="logo" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          padding: '0 0.5rem',
          marginBottom: '3rem' 
        }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: '10px' }}>
            <Activity color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>HealBase AI</span>
        </div>

        <nav style={{ flex: 1 }}>
          <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarLink to="/analytics" icon={<BarChart3 size={20} />} label="Health Analytics" />
          <SidebarLink to="/patients" icon={<Users size={20} />} label="Patients" />
          <SidebarLink to="/monitoring" icon={<Activity size={20} />} label="Real-time Stats" />
          
          <div style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', padding: '0 1.25rem' }}>System</span>
          </div>
          <SidebarLink to="/settings" icon={<Settings size={20} />} label="Admin Console" />
        </nav>

        <div className="sidebar-footer" style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1.5rem' }}>
          <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #0066ff, #00d4ff)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email?.split('@')[0]}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Chief Surgeon</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              color: 'var(--error)',
              padding: '0.75rem 1.25rem',
              width: '100%',
              borderRadius: '10px',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
            className="logout-btn"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <header style={{
          height: '80px',
          borderBottom: '1px solid var(--panel-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3rem',
          backdropFilter: 'var(--glass-blur)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{title}</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button className="glass" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '100px',
              fontSize: '0.85rem',
              color: 'var(--accent-primary)',
            }}>
              <Plus size={16} />
              Register Patient
            </button>
            <button style={{ position: 'relative', color: 'var(--text-secondary)' }}>
              <Bell size={22} />
              <span style={{ position: 'absolute', top: -4, right: -4, width: '10px', height: '10px', background: 'var(--error)', borderRadius: '50%', border: '2px solid var(--bg-color)' }} />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <div style={{ padding: '3rem' }}>
          {children}
        </div>
      </main>

      <style>{`
        .sidebar-link.active {
          background: rgba(0, 102, 255, 0.1);
          color: var(--accent-primary) !important;
        }
        .sidebar-link.active .chevron {
          opacity: 1 !important;
        }
        .sidebar-link:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
