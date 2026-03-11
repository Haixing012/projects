import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { ColumnsType } from 'antd/es/table';
import {
  dashboardStats,
  detectionTrendData,
  faultTypeData,
  recentDetectionRecords,
  type DetectionRecord,
} from './mock';

const Dashboard: React.FC = () => {
  // 趋势图配置
  const trendChartOption = {
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
      boundaryGap: false,
      data: detectionTrendData.xAxis,
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
        name: '检测数量',
        type: 'line',
        smooth: true,
        data: detectionTrendData.data,
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
                color: 'rgba(22, 119, 255, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(22, 119, 255, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#1677ff',
          width: 2,
        },
        itemStyle: {
          color: '#1677ff',
        },
      },
    ],
  };

  // 饼图配置
  const pieChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: {
        color: '#ffffff',
      },
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: {
        color: '#94a3b8',
      },
    },
    series: [
      {
        name: '故障类型',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#1e293b',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff',
          },
        },
        labelLine: {
          show: false,
        },
        data: faultTypeData,
      },
    ],
  };

  // 表格列配置
  const columns: ColumnsType<DetectionRecord> = [
    {
      title: '设备ID',
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
      title: '检测状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          success: {
            icon: <CheckCircleOutlined />,
            color: '#22c55e',
            text: '正常',
          },
          warning: {
            icon: <WarningOutlined />,
            color: '#f59e0b',
            text: '警告',
          },
          failed: {
            icon: <CloseCircleOutlined />,
            color: '#ef4444',
            text: '失败',
          },
        };
        const statusConfig = config[status as keyof typeof config];
        return (
          <Tag icon={statusConfig.icon} color={statusConfig.color}>
            {statusConfig.text}
          </Tag>
        );
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
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>Dashboard首页</h2>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="今日检测设备"
              value={dashboardStats.todayDevices}
              valueStyle={{ color: '#1677ff' }}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="检测成功率"
              value={dashboardStats.successRate}
              precision={1}
              suffix="%"
              valueStyle={{ color: '#22c55e' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="异常设备数量"
              value={dashboardStats.abnormalDevices}
              valueStyle={{ color: '#f59e0b' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="模型调用次数"
              value={dashboardStats.modelCalls}
              valueStyle={{ color: '#1677ff' }}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="设备检测趋势" bordered={false}>
            <ReactECharts option={trendChartOption} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="故障类型分布" bordered={false}>
            <ReactECharts option={pieChartOption} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>

      {/* 最近检测记录 */}
      <Card title="最近检测记录" bordered={false}>
        <Table
          columns={columns}
          dataSource={recentDetectionRecords}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
