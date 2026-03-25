import DashboardLayout from '../layouts/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Download,
  Calendar
} from 'lucide-react';

const analyticsData = [
  { name: 'Mon', admitted: 24, discharged: 18, critical: 4 },
  { name: 'Tue', admitted: 32, discharged: 25, critical: 6 },
  { name: 'Wed', admitted: 18, discharged: 22, critical: 3 },
  { name: 'Thu', admitted: 45, discharged: 38, critical: 8 },
  { name: 'Fri', admitted: 38, discharged: 42, critical: 5 },
  { name: 'Sat', admitted: 15, discharged: 20, critical: 2 },
  { name: 'Sun', admitted: 10, discharged: 15, critical: 1 },
];

const patientDistribution = [
  { name: 'Stable', value: 65, color: '#10b981' },
  { name: 'Observation', value: 25, color: '#f59e0b' },
  { name: 'Critical', value: 10, color: '#ef4444' },
];

const AnalyticsPage = () => {
  return (
    <DashboardLayout title="Health Analytics Intelligence">
      {/* Top Header Controls */}
      <div className="analytics-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
            <Calendar size={16} /> Last 7 Days
          </button>
          <button className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
            Department: Cardiology
          </button>
        </div>
        <button className="gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '10px', fontSize: '0.85rem' }}>
          <Download size={16} /> Export Systems Report
        </button>
      </div>

      {/* Main Grid */}
      <div className="analytics-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto auto',
        gap: '2rem'
      }}>
        {/* Main Chart */}
        <div className="glass chart-card" style={{ gridColumn: 'span 2', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h4 style={{ fontWeight: 600 }}>Patient Movement Trend</h4>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)' }} /> Admitted
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} /> Discharged
              </span>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDischarged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#161618', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                  itemStyle={{ fontSize: '0.85rem' }}
                />
                <Area type="monotone" dataKey="admitted" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorAdmitted)" strokeWidth={2} />
                <Area type="monotone" dataKey="discharged" stroke="var(--success)" fillOpacity={1} fill="url(#colorDischarged)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="glass chart-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '2rem' }}>Condition Distribution</h4>
          <div style={{ width: '100%', height: '230px', position: 'relative' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={patientDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {patientDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#161618', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1.2k</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Patients</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            {patientDistribution.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} /> {item.name}
                </span>
                <span style={{ fontWeight: 600 }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Chart */}
        <div className="glass chart-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '2rem' }}>Weekly Critical Cases</h4>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ background: '#161618', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
                <Bar dataKey="critical" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Indices */}
        <div className="glass chart-card" style={{ gridColumn: 'span 2', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h4 style={{ fontWeight: 600 }}>Vital Signs Stability Index</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>
                Stable: 92%
              </div>
            </div>
          </div>
          <div className="vital-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <VitalGauge label="Avg Heart Rate" value="74" unit="bpm" status="Normal" color="#ef4444" />
            <VitalGauge label="Avg BP" value="118/72" unit="mmHg" status="Optimized" color="#0066ff" />
            <VitalGauge label="Avg Temp" value="36.8" unit="°C" status="Stable" color="#f59e0b" />
          </div>
        </div>
      </div>
      
      <style>{`
        .chart-card {
          border: 1px solid var(--panel-border);
          transition: transform 0.3s;
        }
        .chart-card:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.15);
        }
      `}</style>
    </DashboardLayout>
  );
};

const VitalGauge = ({ label, value, unit, status, color }: any) => (
  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '16px', borderLeft: `4px solid ${color}` }}>
    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>{unit}</span></div>
    <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem', fontWeight: 600 }}>● {status}</div>
  </div>
);

export default AnalyticsPage;
