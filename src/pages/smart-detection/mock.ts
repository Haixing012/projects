export interface DetectionResult {
  deviceStatus: 'normal' | 'abnormal';
  faultProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  possibleFaults: string[];
  repairSuggestions: string[];
}

export const deviceTypes = [
  { id: 'battery', name: '动力电池', icon: '🔋' },
  { id: 'camera', name: '摄像头', icon: '📷' },
  { id: 'radar', name: '毫米波雷达', icon: '📡' },
  { id: 'ecu', name: 'ECU', icon: '💻' },
  { id: 'tbox', name: 'TBOX', icon: '📱' },
];

export const mockDetectionResults: Record<string, DetectionResult> = {
  battery: {
    deviceStatus: 'abnormal',
    faultProbability: 78.5,
    riskLevel: 'high',
    possibleFaults: [
      '电池单体电压异常',
      '电池温度过高',
      '内阻增加',
      '容量衰减',
    ],
    repairSuggestions: [
      '立即停止使用该电池组',
      '检查电池管理系统（BMS）',
      '更换故障单体电池',
      '进行电池均衡处理',
    ],
  },
  camera: {
    deviceStatus: 'normal',
    faultProbability: 12.3,
    riskLevel: 'low',
    possibleFaults: [
      '镜头轻微污渍',
      '图像质量下降',
    ],
    repairSuggestions: [
      '清洁镜头表面',
      '校准摄像头参数',
    ],
  },
  radar: {
    deviceStatus: 'abnormal',
    faultProbability: 56.8,
    riskLevel: 'medium',
    possibleFaults: [
      '信号强度不稳定',
      '探测距离缩短',
      '数据漂移',
    ],
    repairSuggestions: [
      '检查雷达安装位置',
      '校准雷达参数',
      '更新雷达固件',
    ],
  },
  ecu: {
    deviceStatus: 'normal',
    faultProbability: 8.2,
    riskLevel: 'low',
    possibleFaults: [
      '软件版本较旧',
    ],
    repairSuggestions: [
      '升级ECU固件',
      '检查系统日志',
    ],
  },
  tbox: {
    deviceStatus: 'abnormal',
    faultProbability: 45.6,
    riskLevel: 'medium',
    possibleFaults: [
      '网络连接不稳定',
      '数据传输延迟',
      '通信中断',
    ],
    repairSuggestions: [
      '检查网络连接',
      '重启TBOX设备',
      '更新通信模块',
    ],
  },
};
