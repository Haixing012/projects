import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { DatabaseOutlined, FileImageOutlined, FileTextOutlined, LineChartOutlined } from '@ant-design/icons';

const DataManagement: React.FC = () => {
  const dataStats = [
    { title: '图像数据', value: 15234, icon: <FileImageOutlined />, color: '#1677ff' },
    { title: '文本数据', value: 8456, icon: <FileTextOutlined />, color: '#22c55e' },
    { title: '波形数据', value: 12567, icon: <LineChartOutlined />, color: '#f59e0b' },
    { title: 'CAN通信数据', value: 34521, icon: <DatabaseOutlined />, color: '#ef4444' },
  ];

  const dataList = [
    { id: 1, name: 'battery_image_001.jpg', type: '图像', size: '2.5MB', uploadTime: '2024-01-15 10:30:00' },
    { id: 2, name: 'camera_data_002.csv', type: '波形', size: '5.2MB', uploadTime: '2024-01-15 10:28:00' },
    { id: 3, name: 'can_log_003.bin', type: 'CAN通信', size: '12.8MB', uploadTime: '2024-01-15 10:25:00' },
    { id: 4, name: 'report_004.txt', type: '文本', size: '156KB', uploadTime: '2024-01-15 10:22:00' },
    { id: 5, name: 'radar_wave_005.csv', type: '波形', size: '8.1MB', uploadTime: '2024-01-15 10:20:00' },
  ];

  const columns = [
    { title: '数据名称', dataIndex: 'name', key: 'name' },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const config = {
          图像: { color: '#1677ff' },
          文本: { color: '#22c55e' },
          波形: { color: '#f59e0b' },
          'CAN通信': { color: '#ef4444' },
        };
        return <Tag color={config[type as keyof typeof config]?.color}>{type}</Tag>;
      },
    },
    { title: '文件大小', dataIndex: 'size', key: 'size' },
    { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <DatabaseOutlined /> 数据管理
      </h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {dataStats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="数据列表" bordered={false}>
        <Table
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DataManagement;
