export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Stable' | 'Critical' | 'Observation';
  lastVisit: string;
  vitals: {
    heartRate: number;
    bp: string;
    temp: number;
  };
  image: string;
}

export const mockPatients: Patient[] = [
  {
    id: 'P-001',
    name: 'Alexander Thompson',
    age: 42,
    gender: 'Male',
    status: 'Stable',
    lastVisit: '2026-03-24',
    vitals: { heartRate: 72, bp: '120/80', temp: 36.6 },
    image: 'https://i.pravatar.cc/150?u=P-001'
  },
  {
    id: 'P-002',
    name: 'Elena Rodriguez',
    age: 29,
    gender: 'Female',
    status: 'Observation',
    lastVisit: '2026-03-23',
    vitals: { heartRate: 88, bp: '135/92', temp: 37.2 },
    image: 'https://i.pravatar.cc/150?u=P-002'
  },
  {
    id: 'P-003',
    name: 'Marcus Chen',
    age: 65,
    gender: 'Male',
    status: 'Critical',
    lastVisit: '2026-03-25',
    vitals: { heartRate: 110, bp: '150/100', temp: 38.5 },
    image: 'https://i.pravatar.cc/150?u=P-003'
  },
  {
    id: 'P-004',
    name: 'Sarah Jenkins',
    age: 34,
    gender: 'Female',
    status: 'Stable',
    lastVisit: '2026-03-20',
    vitals: { heartRate: 68, bp: '118/75', temp: 36.4 },
    image: 'https://i.pravatar.cc/150?u=P-004'
  },
  {
    id: 'P-005',
    name: 'Robert Miller',
    age: 52,
    gender: 'Male',
    status: 'Observation',
    lastVisit: '2026-03-21',
    vitals: { heartRate: 92, bp: '140/95', temp: 37.1 },
    image: 'https://i.pravatar.cc/150?u=P-005'
  },
  {
    id: 'P-006',
    name: 'Linda Gao',
    age: 47,
    gender: 'Female',
    status: 'Stable',
    lastVisit: '2026-03-22',
    vitals: { heartRate: 75, bp: '122/82', temp: 36.8 },
    image: 'https://i.pravatar.cc/150?u=P-006'
  }
];
