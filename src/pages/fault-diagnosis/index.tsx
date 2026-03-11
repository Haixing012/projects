import React from 'react';
import { Card, Row, Col, Tag, Alert, Steps, Space } from 'antd';
import ReactECharts from 'echarts-for-react';
import { WarningOutlined, BugOutlined, ToolOutlined, CheckCircleOutlined } from '@ant-design/icons';

// 故障诊断分析页面 - 展示新能源汽车关键电子设备的故障诊断功能
const FaultDiagnosis: React.FC = () => {
  const { Step } = Steps;

  // 因果链图谱配置
  const graphOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
          fontSize: 12,
          color: '#ffffff',
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 10,
          color: '#94a3b8',
        },
        data: [
          {
            name: '电池过热症状',
            x: 0,
            y: 300,
            itemStyle: { color: '#ef4444' },
            category: 0,
          },
          {
            name: '温度传感器异常',
            x: 200,
            y: 300,
            itemStyle: { color: '#f59e0b' },
            category: 1,
          },
          {
            name: 'BMS控制异常',
            x: 400,
            y: 300,
            itemStyle: { color: '#1677ff' },
            category: 2,
          },
          {
            name: '冷却系统故障',
            x: 600,
            y: 300,
            itemStyle: { color: '#22c55e' },
            category: 3,
          },
        ],
        links: [
          {
            source: '电池过热症状',
            target: '温度传感器异常',
            name: '触发',
            lineStyle: { color: '#94a3b8', width: 2 },
          },
          {
            source: '温度传感器异常',
            target: 'BMS控制异常',
            name: '导致',
            lineStyle: { color: '#94a3b8', width: 2 },
          },
          {
            source: 'BMS控制异常',
            target: '冷却系统故障',
            name: '根因',
            lineStyle: { color: '#ef4444', width: 3 },
          },
        ],
        categories: [
          { name: '症状' },
          { name: '信号异常' },
          { name: '模块故障' },
          { name: '根因' },
        ],
        force: {
          repulsion: 300,
          edgeLength: 120,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
      },
    ],
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>故障诊断分析</h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="因果链分析" bordered={false}>
            <ReactECharts option={graphOption} style={{ height: 400 }} />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="诊断流程" bordered={false}>
            <Steps direction="vertical" current={3}>
              <Step
                status="finish"
                title="故障症状识别"
                description="检测到电池温度异常升高"
                icon={<WarningOutlined style={{ color: '#ef4444' }} />}
              />
              <Step
                status="finish"
                title="信号异常分析"
                description="温度传感器数据异常波动"
                icon={<BugOutlined style={{ color: '#f59e0b' }} />}
              />
              <Step
                status="finish"
                title="模块故障定位"
                description="BMS控制系统响应异常"
                icon={<ToolOutlined style={{ color: '#1677ff' }} />}
              />
              <Step
                status="process"
                title="根因分析"
                description="冷却系统故障导致散热不足"
                icon={<CheckCircleOutlined style={{ color: '#22c55e' }} />}
              />
            </Steps>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="风险等级评估" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Alert
                message="高风险"
                description="故障可能导致电池热失控，存在安全风险"
                type="error"
                showIcon
              />
              <div>
                <h4 style={{ marginBottom: 12 }}>影响范围：</h4>
                <Tag color="red">电池包整体</Tag>
                <Tag color="orange">续航里程下降</Tag>
                <Tag color="blue">充电效率降低</Tag>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="维修建议" bordered={false}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Alert
                message="紧急处理"
                description="立即停止使用，联系专业维修人员"
                type="warning"
                showIcon
              />
              <div>
                <h4 style={{ marginBottom: 12 }}>推荐方案：</h4>
                <ul style={{ color: '#94a3b8', paddingLeft: 20 }}>
                  <li>检查冷却系统管路</li>
                  <li>更换故障冷却泵</li>
                  <li>校准温度传感器</li>
                  <li>更新BMS控制策略</li>
                </ul>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FaultDiagnosis;
