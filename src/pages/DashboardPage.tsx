import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { mockPatients } from '../services/patientService';
import type { Patient } from '../services/patientService';
import { 
  LayoutGrid, 
  List, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Heart, 
  Droplets,
  Clock,
  MoreVertical,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Patient Directory">
      {/* Stats Summary */}
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard icon={<Users color="#0066ff" />} label="Total Patients" value="1,284" trend="+12% from last month" color="var(--accent-primary)" />
        <StatCard icon={<TrendingUp color="#10b981" />} label="Avg Recovery Rate" value="94.2%" trend="+2% improving" color="var(--success)" />
        <StatCard icon={<Heart color="#ef4444" />} label="Critical Status" value="12" trend="Down from 15 yesterday" color="var(--error)" />
        <StatCard icon={<Clock color="#f59e0b" />} label="New Registrations" value="28" trend="Last 24 hours" color="var(--warning)" />
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search patients by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="view-toggle glass" style={{
          display: 'flex',
          padding: '4px',
          borderRadius: '12px',
          gap: '4px'
        }}>
          <button 
            onClick={() => setView('grid')}
            className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Patient Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'grid' ? (
            <div className="patient-grid">
              {filteredPatients.map((patient) => (
                <PatientGridCard key={patient.id} patient={patient} onClick={() => navigate(`/patient/${patient.id}`)} />
              ))}
            </div>
          ) : (
            <div className="patient-list">
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <th style={{ textAlign: 'left', padding: '0 1.5rem' }}>Patient Name</th>
                    <th style={{ textAlign: 'left' }}>Status</th>
                    <th style={{ textAlign: 'left' }}>Vitals</th>
                    <th style={{ textAlign: 'left' }}>Last Visit</th>
                    <th style={{ textAlign: 'right', padding: '0 1.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <PatientListRow key={patient.id} patient={patient} onClick={() => navigate(`/patient/${patient.id}`)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          border-radius: 12px;
          color: white;
          outline: none;
        }
        .search-input:focus {
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .toggle-btn {
          padding: 0.5rem;
          border-radius: 8px;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        }
        .patient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .patient-card {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--panel-border);
          overflow: hidden;
        }
        .patient-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 12px 30px -10px rgba(0, 102, 255, 0.2);
        }
      `}</style>
    </DashboardLayout>
  );
};

// Sub-components
const StatCard = ({ icon, label, value, trend, color }: any) => (
  <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ background: `${color}15`, padding: '0.5rem', borderRadius: '10px' }}>
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
    <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: trend.includes('+') || trend.includes('improving') ? 'var(--success)' : (trend.includes('Down') ? 'var(--success)' : 'var(--text-muted)') }}>{trend}</div>
  </div>
);

const PatientGridCard = ({ patient, onClick }: { patient: Patient, onClick: () => void }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Stable': return 'var(--success)';
      case 'Critical': return 'var(--error)';
      default: return 'var(--warning)';
    }
  };

  return (
    <div className="glass patient-card" onClick={onClick} style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <img src={patient.image} alt={patient.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '4px' }}>{patient.name}</h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{patient.id} • {patient.age}y {patient.gender}</span>
          </div>
        </div>
        <div style={{ 
          background: `${getStatusColor(patient.status)}15`, 
          color: getStatusColor(patient.status),
          padding: '4px 10px',
          borderRadius: '100px',
          fontSize: '0.75rem',
          fontWeight: 600,
          height: 'fit-content'
        }}>
          {patient.status}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '4px', gap: '0.4rem', alignItems: 'center' }}>
            <Heart size={12} color="#ef4444" /> Pulse
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{patient.vitals.heartRate} bpm</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '10px' }}>
          <div style={{ display: 'flex', color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '4px', gap: '0.4rem', alignItems: 'center' }}>
            <Droplets size={12} color="#0066ff" /> BP
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{patient.vitals.bp} mmHg</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <Clock size={14} /> Last visit: {patient.lastVisit}
        </div>
        <div style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
          Details <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};

const PatientListRow = ({ patient, onClick }: { patient: Patient, onClick: () => void }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Stable': return 'var(--success)';
      case 'Critical': return 'var(--error)';
      default: return 'var(--warning)';
    }
  };

  return (
    <tr onClick={onClick} style={{ cursor: 'pointer', transition: 'background 0.2s' }} className="patient-row">
      <td style={{ padding: '1rem 1.5rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={patient.image} alt={patient.name} style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
          <div>
            <div style={{ fontWeight: 600 }}>{patient.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{patient.id}</div>
          </div>
        </div>
      </td>
      <td>
        <div style={{ 
          background: `${getStatusColor(patient.status)}15`, 
          color: getStatusColor(patient.status),
          padding: '4px 10px',
          borderRadius: '100px',
          fontSize: '0.75rem',
          fontWeight: 600,
          display: 'inline-block'
        }}>
          {patient.status}
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <span>HR: <strong style={{ color: '#ef4444' }}>{patient.vitals.heartRate}</strong></span>
          <span>BP: <strong style={{ color: '#0066ff' }}>{patient.vitals.bp}</strong></span>
          <span>Temp: <strong style={{ color: '#f59e0b' }}>{patient.vitals.temp}°C</strong></span>
        </div>
      </td>
      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{patient.lastVisit}</td>
      <td style={{ textAlign: 'right', padding: '0 1.5rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
        <button style={{ color: 'var(--text-muted)' }}><MoreVertical size={20} /></button>
      </td>
      <style>{`
        .patient-row {
          background: rgba(255, 255, 255, 0.02);
        }
        .patient-row:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .patient-row td {
          border-top: 1px solid var(--panel-border);
          border-bottom: 1px solid var(--panel-border);
        }
        .patient-row td:first-child { border-left: 1px solid var(--panel-border); }
        .patient-row td:last-child { border-right: 1px solid var(--panel-border); }
      `}</style>
    </tr>
  );
};

export default DashboardPage;
