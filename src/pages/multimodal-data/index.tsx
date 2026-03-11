import React from 'react';
import { Card, Row, Col, Table, Tag, Tabs } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ExperimentOutlined } from '@ant-design/icons';

const MultimodalData: React.FC = () => {
  // 波形数据配置
  const waveformOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: {
        color: '#ffffff',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 20 }, (_, i) => `${i}s`),
      axisLine: {
        lineStyle: {
          color: '#94a3b8',
        },
      },
      axisLabel: {
        color: '#94a3b8',
      },
    },
    yAxis: {
      type: 'value',
      name: '电压(V)',
      axisLine: {
        lineStyle: {
          color: '#94a3b8',
        },
      },
      axisLabel: {
        color: '#94a3b8',
      },
      splitLine: {
        lineStyle: {
          color: '#334155',
        },
      },
    },
    series: [
      {
        name: '电压值',
        type: 'line',
        smooth: true,
        data: [3.7, 3.8, 3.7, 3.9, 4.0, 3.9, 3.8, 3.7, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6, 3.7],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(34, 197, 94, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(34, 197, 94, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#22c55e',
          width: 2,
        },
        itemStyle: {
          color: '#22c55e',
        },
      },
    ],
  };

  // CAN报文数据
  const canData = [
    { id: 1, canId: '0x1A0', length: 8, data: '01 02 03 04 05 06 07 08', timestamp: '2024-01-15 10:30:00' },
    { id: 2, canId: '0x2B0', length: 8, data: 'FF FE FD FC FB FA F9 F8', timestamp: '2024-01-15 10:30:01' },
    { id: 3, canId: '0x3C0', length: 8, data: 'AA BB CC DD EE FF 00 11', timestamp: '2024-01-15 10:30:02' },
    { id: 4, canId: '0x4D0', length: 8, data: '10 20 30 40 50 60 70 80', timestamp: '2024-01-15 10:30:03' },
    { id: 5, canId: '0x5E0', length: 8, data: '90 A0 B0 C0 D0 E0 F0 00', timestamp: '2024-01-15 10:30:04' },
  ];

  const canColumns = [
    { title: 'CAN ID', dataIndex: 'canId', key: 'canId' },
    { title: '长度', dataIndex: 'length', key: 'length' },
    { title: '数据', dataIndex: 'data', key: 'data' },
    { title: '时间戳', dataIndex: 'timestamp', key: 'timestamp' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <ExperimentOutlined /> 多模态数据分析中心
      </h2>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="图像检测" key="1">
          <Card title="设备缺陷检测示例" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div
                  style={{
                    background: '#0f172a',
                    padding: 16,
                    borderRadius: 8,
                    textAlign: 'center',
                    border: '1px solid #334155',
                  }}
                >
                  <div
                    style={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#1e293b',
                      marginBottom: 12,
                      borderRadius: 4,
                      color: '#94a3b8',
                    }}
                  >
                    图像区域
                  </div>
                  <Tag color="error">检测到裂纹缺陷</Tag>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div
                  style={{
                    background: '#0f172a',
                    padding: 16,
                    borderRadius: 8,
                    textAlign: 'center',
                    border: '1px solid #334155',
                  }}
                >
                  <div
                    style={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#1e293b',
                      marginBottom: 12,
                      borderRadius: 4,
                      color: '#94a3b8',
                    }}
                  >
                    图像区域
                  </div>
                  <Tag color="success">无缺陷</Tag>
                </div>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="波形数据分析" key="2">
          <Card title="电池电压波形图" bordered={false}>
            <ReactECharts option={waveformOption} style={{ height: 400 }} />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="CAN报文解析" key="3">
          <Card title="CAN通信数据" bordered={false}>
            <Table
              columns={canColumns}
              dataSource={canData}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="文本检测报告解析" key="4">
          <Card title="检测报告解析" bordered={false}>
            <div style={{ background: '#0f172a', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
              <h4 style={{ marginBottom: 12, color: '#ffffff' }}>设备检测报告</h4>
              <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                <strong>设备ID：</strong> DEV001
              </p>
              <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                <strong>检测时间：</strong> 2024-01-15 10:30:00
              </p>
              <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                <strong>检测结果：</strong> <Tag color="error">异常</Tag>
              </p>
              <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                <strong>风险等级：</strong> <Tag color="red">高风险</Tag>
              </p>
              <p style={{ marginBottom: 12, color: '#94a3b8' }}>
                <strong>问题描述：</strong>
                电池温度异常升高，可能存在热失控风险，建议立即停止使用并进行检修。
              </p>
              <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                <strong>维修建议：</strong>
                检查冷却系统，更换故障组件，校准传感器。
              </p>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MultimodalData;
