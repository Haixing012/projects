import React, { useState } from 'react';
import { Card, Table, Tag, Button, Modal, Descriptions } from 'antd';
import { FileSearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Report {
  id: string;
  deviceType: string;
  detectionTime: string;
  result: 'success' | 'failed' | 'warning';
  riskLevel: 'low' | 'medium' | 'high';
}

const Reports: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports: Report[] = [
    {
      id: 'RPT001',
      deviceType: '动力电池',
      detectionTime: '2024-01-15 14:30:25',
      result: 'failed',
      riskLevel: 'high',
    },
    {
      id: 'RPT002',
      deviceType: '摄像头',
      detectionTime: '2024-01-15 14:28:12',
      result: 'warning',
      riskLevel: 'medium',
    },
    {
      id: 'RPT003',
      deviceType: '毫米波雷达',
      detectionTime: '2024-01-15 14:25:45',
      result: 'success',
      riskLevel: 'low',
    },
    {
      id: 'RPT004',
      deviceType: 'ECU',
      detectionTime: '2024-01-15 14:22:33',
      result: 'success',
      riskLevel: 'low',
    },
    {
      id: 'RPT005',
      deviceType: 'TBOX',
      detectionTime: '2024-01-15 14:20:18',
      result: 'warning',
      riskLevel: 'medium',
    },
  ];

  const columns: ColumnsType<Report> = [
    {
      title: '报告ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: '检测时间',
      dataIndex: 'detectionTime',
      key: 'detectionTime',
    },
    {
      title: '检测结果',
      dataIndex: 'result',
      key: 'result',
      render: (result: string) => {
        const config = {
          success: { color: '#22c55e', text: '正常' },
          warning: { color: '#f59e0b', text: '警告' },
          failed: { color: '#ef4444', text: '异常' },
        };
        const statusConfig = config[result as keyof typeof config];
        return <Tag color={statusConfig.color}>{statusConfig.text}</Tag>;
      },
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level: string) => {
        const config = {
          low: { color: '#22c55e', text: '低风险' },
          medium: { color: '#f59e0b', text: '中风险' },
          high: { color: '#ef4444', text: '高风险' },
        };
        const levelConfig = config[level as keyof typeof config];
        return <Tag color={levelConfig.color}>{levelConfig.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedReport(record);
            setModalVisible(true);
          }}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <FileSearchOutlined /> 检测报告中心
      </h2>

      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="检测报告详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedReport && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="报告ID">{selectedReport.id}</Descriptions.Item>
            <Descriptions.Item label="设备类型">{selectedReport.deviceType}</Descriptions.Item>
            <Descriptions.Item label="检测时间">{selectedReport.detectionTime}</Descriptions.Item>
            <Descriptions.Item label="检测结果">
              <Tag
                color={
                  selectedReport.result === 'success'
                    ? '#22c55e'
                    : selectedReport.result === 'warning'
                    ? '#f59e0b'
                    : '#ef4444'
                }
              >
                {selectedReport.result === 'success'
                  ? '正常'
                  : selectedReport.result === 'warning'
                  ? '警告'
                  : '异常'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="风险等级" span={2}>
              <Tag
                color={
                  selectedReport.riskLevel === 'low'
                    ? '#22c55e'
                    : selectedReport.riskLevel === 'medium'
                    ? '#f59e0b'
                    : '#ef4444'
                }
              >
                {selectedReport.riskLevel === 'low'
                  ? '低风险'
                  : selectedReport.riskLevel === 'medium'
                  ? '中风险'
                  : '高风险'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="设备信息" span={2}>
              设备ID: {selectedReport.id.replace('RPT', 'DEV')}<br />
              设备型号: NEV-2024-{selectedReport.deviceType}<br />
              设备状态: 在线
            </Descriptions.Item>
            <Descriptions.Item label="AI分析结论" span={2}>
              {selectedReport.result === 'failed'
                ? '检测到异常信号，建议立即检修'
                : selectedReport.result === 'warning'
                ? '存在潜在风险，建议关注'
                : '设备运行正常，无异常'}
            </Descriptions.Item>
            <Descriptions.Item label="故障诊断" span={2}>
              {selectedReport.result === 'failed'
                ? '电池温度异常升高，可能存在热失控风险'
                : selectedReport.result === 'warning'
                ? '部分参数偏离正常范围，需要进一步检查'
                : '未发现明显故障'}
            </Descriptions.Item>
            <Descriptions.Item label="维修建议" span={2}>
              {selectedReport.result === 'failed'
                ? '1. 立即停止使用\n2. 检查冷却系统\n3. 更换故障组件'
                : selectedReport.result === 'warning'
                ? '1. 加强监控\n2. 定期检查\n3. 预防性维护'
                : '继续保持正常运行，定期检测'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Reports;
