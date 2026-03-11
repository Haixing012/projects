import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// 懒加载页面组件
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const SmartDetection = React.lazy(() => import('../pages/smart-detection'));
const FaultDiagnosis = React.lazy(() => import('../pages/fault-diagnosis'));
const MultimodalData = React.lazy(() => import('../pages/multimodal-data'));
const KnowledgeGraph = React.lazy(() => import('../pages/knowledge-graph'));
const Reports = React.lazy(() => import('../pages/reports'));
const DeviceManagement = React.lazy(() => import('../pages/device-management'));
const DataManagement = React.lazy(() => import('../pages/data-management'));
const ApiService = React.lazy(() => import('../pages/api-service'));
const System = React.lazy(() => import('../pages/system'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'smart-detection',
        element: <SmartDetection />,
      },
      {
        path: 'fault-diagnosis',
        element: <FaultDiagnosis />,
      },
      {
        path: 'multimodal-data',
        element: <MultimodalData />,
      },
      {
        path: 'knowledge-graph',
        element: <KnowledgeGraph />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'device-management',
        element: <DeviceManagement />,
      },
      {
        path: 'data-management',
        element: <DataManagement />,
      },
      {
        path: 'api-service',
        element: <ApiService />,
      },
      {
        path: 'system',
        element: <System />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
