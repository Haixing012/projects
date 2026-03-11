export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard首页',
    icon: 'DashboardOutlined',
    path: '/',
  },
  {
    key: 'smart-detection',
    label: '智能检测中心',
    icon: 'ScanOutlined',
    path: '/smart-detection',
  },
  {
    key: 'fault-diagnosis',
    label: '故障诊断分析',
    icon: 'BugOutlined',
    path: '/fault-diagnosis',
  },
  {
    key: 'multimodal-data',
    label: '多模态数据分析中心',
    icon: 'ExperimentOutlined',
    path: '/multimodal-data',
  },
  {
    key: 'knowledge-graph',
    label: '行业知识图谱',
    icon: 'NodeIndexOutlined',
    path: '/knowledge-graph',
  },
  {
    key: 'reports',
    label: '检测报告中心',
    icon: 'FileSearchOutlined',
    path: '/reports',
  },
  {
    key: 'device-management',
    label: '设备管理',
    icon: 'SettingOutlined',
    path: '/device-management',
  },
  {
    key: 'data-management',
    label: '数据管理',
    icon: 'DatabaseOutlined',
    path: '/data-management',
  },
  {
    key: 'api-service',
    label: 'API服务管理',
    icon: 'ApiOutlined',
    path: '/api-service',
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'ControlOutlined',
    path: '/system',
  },
];
