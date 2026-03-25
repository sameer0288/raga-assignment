import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { mockPatients } from '../services/patientService';
import { 
  ArrowLeft, 
  Heart, 
  Droplets, 
  Thermometer, 
  Activity, 
  ExternalLink, 
  Stethoscope,
  Pill,
  BellRing,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('clinical');

  if (!patient) return <div>Patient not found</div>;

  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Patient Alert', {
        body: `Critical update for ${patient.name}`,
        icon: '/vite.svg'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  };

  return (
    <DashboardLayout title={`Profile: ${patient.name}`}>
      <button 
        onClick={() => navigate('/')}
        className="glass" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.6rem 1.25rem', 
          borderRadius: '100px', 
          fontSize: '0.85rem',
          marginBottom: '2.5rem',
          color: 'var(--text-secondary)'
        }}
      >
        <ArrowLeft size={16} /> Dashboard
      </button>

      <div className="profile-container" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2.5rem' }}>
        {/* Left Side: Profile Side Bar */}
        <div className="profile-sidebar">
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center', marginBottom: '1.5rem' }}>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={patient.image} 
              alt={patient.name} 
              style={{ width: '120px', height: '120px', borderRadius: '32px', marginBottom: '1.5rem', objectFit: 'cover', border: '4px solid var(--panel-border)' }} 
            />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{patient.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{patient.id} • {patient.age}y {patient.gender}</p>
            
            <div style={{ 
              background: patient.status === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
              color: patient.status === 'Critical' ? 'var(--error)' : 'var(--success)',
              padding: '8px 16px',
              borderRadius: '100px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <Activity size={16} /> 
              {patient.status} Condition
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Blood Type</div>
                <div style={{ fontWeight: 600 }}>O Positive (O+)</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Height/Weight</div>
                <div style={{ fontWeight: 600 }}>182cm / 78kg</div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BellRing size={20} color="var(--accent-primary)" /> Monitoring Tools
            </h4>
            <button 
              onClick={showNotification}
              className="gradient-btn" 
              style={{ 
                width: '100%', 
                padding: '0.85rem', 
                borderRadius: '12px', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Push Patient Alert
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Info */}
        <div className="clinical-data">
          <div className="tabs" style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--panel-border)' }}>
            <TabButton active={activeTab === 'clinical'} onClick={() => setActiveTab('clinical')} label="Clinical Vitals" />
            <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} label="Medical History" />
            <TabButton active={activeTab === 'meds'} onClick={() => setActiveTab('meds')} label="Medications" />
            <TabButton active={activeTab === 'labs'} onClick={() => setActiveTab('labs')} label="Lab Reports" />
          </div>

          <div className="tab-content">
            {activeTab === 'clinical' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
              >
                <VitalMonitor icon={<Heart color="#ef4444" />} label="Cardiac Rhythm" value={patient.vitals.heartRate} unit="bpm" trend="Normal stable" history={[68, 72, 75, 71, 74, 72]} />
                <VitalMonitor icon={<Droplets color="#0066ff" />} label="Blood Pressure" value={patient.vitals.bp} unit="mmHg" trend="Slightly elevated" history={[115, 120, 118, 122, 125, 120]} />
                <VitalMonitor icon={<Thermometer color="#f59e0b" />} label="Core Temp" value={patient.vitals.temp} unit="°C" trend="Optimal" history={[36.5, 36.6, 36.7, 36.6, 36.6, 36.6]} />
                <VitalMonitor icon={<Activity color="#10b981" />} label="Oxygen Sat (SpO2)" value="98" unit="%" trend="Normal" history={[98, 97, 98, 99, 98, 98]} />
              </motion.div>
            )}

            {activeTab === 'history' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="timeline">
                  <TimelineItem date="24 Mar 2026" title="Cardiac Consultation" type="Checkup" practitioner="Dr. Sarah Mitchell" />
                  <TimelineItem date="15 Feb 2026" title="Severe Hypertension Episode" type="Emergency" practitioner="Dr. Robert Fox" isCritical />
                  <TimelineItem date="10 Jan 2026" title="Routine Lab Screening" type="Labs" practitioner="City General Hospital" />
                  <TimelineItem date="12 Dec 2025" title="Initial Assessment" type="Admission" practitioner="HealBase AI Intake" />
               </motion.div>
            )}

            {activeTab === 'meds' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                  <MedicationItem name="Lisinopril" dosage="20mg" frequency="Once Daily" status="Active" icon={<Pill size={18} color="var(--accent-primary)" />} />
                  <MedicationItem name="Atorvastatin" dosage="40mg" frequency="At Bedtime" status="Active" icon={<Pill size={18} color="var(--accent-primary)" />} />
                  <MedicationItem name="Aspirin" dosage="81mg" frequency="Once Daily" status="Paused" icon={<Pill size={18} color="var(--text-muted)" />} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Sub-components
const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      padding: '0.75rem 0', 
      fontSize: '1rem', 
      fontWeight: 600, 
      color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
      borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
      transition: 'all 0.2s',
      marginBottom: '-1px'
    }}
  >
    {label}
  </button>
);

const VitalMonitor = ({ icon, label, value, unit, trend, history }: any) => (
  <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '10px' }}>{icon}</div>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
      </div>
      <button style={{ color: 'var(--text-muted)' }}><ExternalLink size={16} /></button>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
      <span style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</span>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{unit}</span>
    </div>
    
    {/* Micro Sparkline Placeholder */}
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '30px', marginBottom: '1rem' }}>
      {history.map((h: number, i: number) => {
        const height = ((h - Math.min(...history)) / (Math.max(...history) - Math.min(...history) + 1)) * 100 + 10;
        return (
          <div key={i} style={{ flex: 1, background: 'var(--accent-primary)', opacity: 0.3 + (i * 0.1), height: `${height}%`, borderRadius: '2px' }} />
        );
      })}
    </div>

    <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)' }}>
      <TrendingUp size={12} /> {trend}
    </div>
  </div>
);

const TimelineItem = ({ date, title, type, practitioner, isCritical }: any) => (
  <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', position: 'relative' }}>
    <div style={{ width: '100px', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '4px' }}>{date}</div>
    <div style={{ position: 'relative' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isCritical ? 'var(--error)' : 'var(--accent-primary)', zIndex: 2, position: 'relative' }} />
      <div style={{ position: 'absolute', top: '12px', left: '5px', bottom: '-40px', width: '2px', background: 'var(--panel-border)' }} />
    </div>
    <div className="glass" style={{ flex: 1, padding: '1.25rem', borderRadius: '16px', marginTop: '-4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h5 style={{ fontWeight: 600 }}>{title}</h5>
        <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{type}</span>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Stethoscope size={14} /> {practitioner}
      </div>
    </div>
  </div>
);

const MedicationItem = ({ name, dosage, frequency, status, icon }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--panel-border)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '10px' }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dosage} • {frequency}</div>
      </div>
    </div>
    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: status === 'Active' ? 'var(--success)' : 'var(--text-muted)' }}>{status}</div>
  </div>
);

export default PatientDetailsPage;
