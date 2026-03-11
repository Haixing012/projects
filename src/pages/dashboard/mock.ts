export interface DetectionRecord {
  id: string;
  deviceType: string;
  detectionTime: string;
  status: 'success' | 'failed' | 'warning';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  todayDevices: number;
  successRate: number;
  abnormalDevices: number;
  modelCalls: number;
}

export const dashboardStats: DashboardStats = {
  todayDevices: 128,
  successRate: 96.8,
  abnormalDevices: 4,
  modelCalls: 1523,
};

export const detectionTrendData = {
  xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  data: [15, 28, 45, 62, 48, 35, 18],
};

export const faultTypeData = [
  { value: 35, name: '电池故障' },
  { value: 25, name: '摄像头异常' },
  { value: 20, name: '雷达故障' },
  { value: 12, name: 'ECU异常' },
  { value: 8, name: 'TBOX故障' },
];

export const recentDetectionRecords: DetectionRecord[] = [
  {
    id: 'DEV001',
    deviceType: '动力电池',
    detectionTime: '2024-01-15 14:30:25',
    status: 'success',
    riskLevel: 'low',
  },
  {
    id: 'DEV002',
    deviceType: '摄像头',
    detectionTime: '2024-01-15 14:28:12',
    status: 'warning',
    riskLevel: 'medium',
  },
  {
    id: 'DEV003',
    deviceType: '毫米波雷达',
    detectionTime: '2024-01-15 14:25:45',
    status: 'success',
    riskLevel: 'low',
  },
  {
    id: 'DEV004',
    deviceType: 'ECU',
    detectionTime: '2024-01-15 14:22:33',
    status: 'failed',
    riskLevel: 'high',
  },
  {
    id: 'DEV005',
    deviceType: 'TBOX',
    detectionTime: '2024-01-15 14:20:18',
    status: 'success',
    riskLevel: 'low',
  },
  {
    id: 'DEV006',
    deviceType: '动力电池',
    detectionTime: '2024-01-15 14:18:05',
    status: 'success',
    riskLevel: 'low',
  },
  {
    id: 'DEV007',
    deviceType: '摄像头',
    detectionTime: '2024-01-15 14:15:42',
    status: 'warning',
    riskLevel: 'medium',
  },
  {
    id: 'DEV008',
    deviceType: '毫米波雷达',
    detectionTime: '2024-01-15 14:12:30',
    status: 'success',
    riskLevel: 'low',
  },
];
