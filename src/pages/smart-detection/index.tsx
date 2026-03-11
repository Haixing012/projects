import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Upload,
  Button,
  Select,
  Radio,
  Space,
  Tag,
  List,
  Alert,
  Spin,
  Empty,
} from 'antd';
import {
  InboxOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { deviceTypes, mockDetectionResults } from './mock';

const { Dragger } = Upload;
const { Option } = Select;

const SmartDetection: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('battery');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<typeof mockDetectionResults.battery | null>(null);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: true,
    beforeUpload: () => false, // 阻止自动上传
  };

  const handleStartDetection = () => {
    setIsDetecting(true);
    setDetectionResult(null);

    // 模拟检测过程
    setTimeout(() => {
      const result = mockDetectionResults[selectedDevice];
      setDetectionResult(result);
      setIsDetecting(false);
    }, 2000);
  };

  const getRiskLevelConfig = (level: string) => {
    const config = {
      low: { color: '#22c55e', text: '低风险', icon: <CheckCircleOutlined /> },
      medium: { color: '#f59e0b', text: '中风险', icon: <WarningOutlined /> },
      high: { color: '#ef4444', text: '高风险', icon: <CloseCircleOutlined /> },
    };
    return config[level as keyof typeof config];
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>智能检测中心</h2>

      <Row gutter={[16, 16]}>
        {/* 左侧：数据上传区域 */}
        <Col xs={24} md={8}>
          <Card title="检测数据上传" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ fontSize: 48, color: '#1677ff' }} />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                <p className="ant-upload-hint">
                  支持图像文件、波形文件、CAN报文、文本检测报告
                </p>
              </Dragger>

              <div>
                <h4 style={{ marginBottom: 12 }}>支持的文件类型：</h4>
                <Space wrap>
                  <Tag color="blue">图像 (JPG/PNG)</Tag>
                  <Tag color="green">波形 (CSV/WAV)</Tag>
                  <Tag color="orange">CAN报文 (BIN/LOG)</Tag>
                  <Tag color="purple">报告 (PDF/TXT)</Tag>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 中间：设备类型选择 */}
        <Col xs={24} md={8}>
          <Card title="设备类型选择" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>
                  选择设备类型
                </label>
                <Select
                  style={{ width: '100%' }}
                  value={selectedDevice}
                  onChange={setSelectedDevice}
                  size="large"
                >
                  {deviceTypes.map((device) => (
                    <Option key={device.id} value={device.id}>
                      {device.icon} {device.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <h4 style={{ marginBottom: 12 }}>设备信息：</h4>
                <div
                  style={{
                    background: '#0f172a',
                    padding: 16,
                    borderRadius: 8,
                    border: '1px solid #334155',
                  }}
                >
                  <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                    设备名称：{deviceTypes.find((d) => d.id === selectedDevice)?.name}
                  </p>
                  <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                    设备类型：智能检测设备
                  </p>
                  <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                    检测状态：待检测
                  </p>
                </div>
              </div>

              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                size="large"
                block
                onClick={handleStartDetection}
                disabled={isDetecting}
              >
                {isDetecting ? '检测中...' : '开始检测'}
              </Button>
            </Space>
          </Card>
        </Col>

        {/* 右侧：AI检测结果 */}
        <Col xs={24} md={8}>
          <Card title="AI检测结果" bordered={false}>
            {isDetecting ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Spin size="large" />
                <p style={{ marginTop: 16, color: '#94a3b8' }}>正在进行智能检测...</p>
              </div>
            ) : detectionResult ? (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Alert
                  message={detectionResult.deviceStatus === 'normal' ? '设备正常' : '发现异常'}
                  description={
                    <Space>
                      <span>故障概率：{detectionResult.faultProbability}%</span>
                      {getRiskLevelConfig(detectionResult.riskLevel).icon}
                    </Space>
                  }
                  type={detectionResult.deviceStatus === 'normal' ? 'success' : 'warning'}
                  showIcon
                />

                <div>
                  <h4 style={{ marginBottom: 12 }}>风险等级：</h4>
                  <Tag
                    icon={getRiskLevelConfig(detectionResult.riskLevel).icon}
                    color={getRiskLevelConfig(detectionResult.riskLevel).color}
                    style={{ fontSize: 16, padding: '4px 12px' }}
                  >
                    {getRiskLevelConfig(detectionResult.riskLevel).text}
                  </Tag>
                </div>

                <div>
                  <h4 style={{ marginBottom: 12 }}>可能故障原因：</h4>
                  <List
                    size="small"
                    dataSource={detectionResult.possibleFaults}
                    renderItem={(item) => (
                      <List.Item>
                        <span style={{ color: '#ef4444' }}>•</span>
                        <span style={{ marginLeft: 8 }}>{item}</span>
                      </List.Item>
                    )}
                  />
                </div>

                <div>
                  <h4 style={{ marginBottom: 12 }}>建议维修策略：</h4>
                  <List
                    size="small"
                    dataSource={detectionResult.repairSuggestions}
                    renderItem={(item) => (
                      <List.Item>
                        <span style={{ color: '#22c55e' }}>✓</span>
                        <span style={{ marginLeft: 8 }}>{item}</span>
                      </List.Item>
                    )}
                  />
                </div>
              </Space>
            ) : (
              <Empty description="请选择设备类型并点击开始检测" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmartDetection;
