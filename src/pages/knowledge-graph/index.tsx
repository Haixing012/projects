import React from 'react';
import { Card, Modal } from 'antd';
import ReactECharts from 'echarts-for-react';
import { NodeIndexOutlined } from '@ant-design/icons';

const KnowledgeGraph: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState<any>(null);

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
    legend: {
      data: ['设备', '故障', '维修策略'],
      textStyle: {
        color: '#94a3b8',
      },
      top: 10,
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 60,
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
            name: '动力电池',
            symbolSize: 80,
            itemStyle: { color: '#1677ff' },
            category: 0,
          },
          {
            name: '摄像头',
            symbolSize: 70,
            itemStyle: { color: '#1677ff' },
            category: 0,
          },
          {
            name: '毫米波雷达',
            symbolSize: 70,
            itemStyle: { color: '#1677ff' },
            category: 0,
          },
          {
            name: 'ECU',
            symbolSize: 60,
            itemStyle: { color: '#1677ff' },
            category: 0,
          },
          {
            name: 'TBOX',
            symbolSize: 60,
            itemStyle: { color: '#1677ff' },
            category: 0,
          },
          {
            name: '电池过热',
            symbolSize: 50,
            itemStyle: { color: '#ef4444' },
            category: 1,
          },
          {
            name: '电池老化',
            symbolSize: 50,
            itemStyle: { color: '#ef4444' },
            category: 1,
          },
          {
            name: '图像模糊',
            symbolSize: 50,
            itemStyle: { color: '#ef4444' },
            category: 1,
          },
          {
            name: '传感器故障',
            symbolSize: 50,
            itemStyle: { color: '#ef4444' },
            category: 1,
          },
          {
            name: '软件异常',
            symbolSize: 50,
            itemStyle: { color: '#ef4444' },
            category: 1,
          },
          {
            name: '更换电池',
            symbolSize: 45,
            itemStyle: { color: '#22c55e' },
            category: 2,
          },
          {
            name: '维修电路',
            symbolSize: 45,
            itemStyle: { color: '#22c55e' },
            category: 2,
          },
          {
            name: '清洁镜头',
            symbolSize: 45,
            itemStyle: { color: '#22c55e' },
            category: 2,
          },
          {
            name: '升级固件',
            symbolSize: 45,
            itemStyle: { color: '#22c55e' },
            category: 2,
          },
        ],
        links: [
          { source: '动力电池', target: '电池过热', name: '导致' },
          { source: '动力电池', target: '电池老化', name: '导致' },
          { source: '摄像头', target: '图像模糊', name: '导致' },
          { source: '毫米波雷达', target: '传感器故障', name: '导致' },
          { source: 'ECU', target: '软件异常', name: '导致' },
          { source: '电池过热', target: '更换电池', name: '解决方案' },
          { source: '电池老化', target: '维修电路', name: '解决方案' },
          { source: '图像模糊', target: '清洁镜头', name: '解决方案' },
          { source: '传感器故障', target: '维修电路', name: '解决方案' },
          { source: '软件异常', target: '升级固件', name: '解决方案' },
        ],
        categories: [
          { name: '设备', itemStyle: { color: '#1677ff' } },
          { name: '故障', itemStyle: { color: '#ef4444' } },
          { name: '维修策略', itemStyle: { color: '#22c55e' } },
        ],
        force: {
          repulsion: 400,
          edgeLength: 150,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
          width: 2,
        },
      },
    ],
  };

  const onEvents = {
    click: (params: any) => {
      if (params.dataType === 'node') {
        setSelectedNode(params.data);
        setModalVisible(true);
      }
    },
  };

  const nodeDescriptions: Record<string, any> = {
    '动力电池': {
      type: '设备',
      description: '新能源汽车核心动力源，负责储存和释放电能',
      specs: '容量: 60kWh, 电压: 400V',
    },
    '摄像头': {
      type: '设备',
      description: '车辆环境感知设备，用于识别道路、车辆、行人等',
      specs: '分辨率: 2MP, 帧率: 30fps',
    },
    '电池过热': {
      type: '故障',
      description: '电池温度异常升高，可能导致热失控',
      impact: '安全隐患，续航下降',
    },
    '更换电池': {
      type: '维修策略',
      description: '更换故障或老化的电池组件',
      cost: '约￥5000-20000',
    },
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <NodeIndexOutlined /> 行业知识图谱
      </h2>

      <Card title="设备故障知识关系图谱" bordered={false}>
        <ReactECharts
          option={graphOption}
          style={{ height: 600 }}
          onEvents={onEvents}
        />
      </Card>

      <Modal
        title={selectedNode?.name}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedNode && (
          <div>
            <p style={{ marginBottom: 12 }}>
              <strong>类型：</strong>{' '}
              <span style={{ color: '#1677ff' }}>
                {nodeDescriptions[selectedNode.name]?.type || '未知'}
              </span>
            </p>
            <p style={{ marginBottom: 12 }}>
              <strong>描述：</strong>
              <span style={{ color: '#94a3b8' }}>
                {' '}
                {nodeDescriptions[selectedNode.name]?.description || '暂无描述'}
              </span>
            </p>
            {nodeDescriptions[selectedNode.name]?.specs && (
              <p style={{ marginBottom: 0 }}>
                <strong>规格：</strong>
                <span style={{ color: '#94a3b8' }}>
                  {' '}
                  {nodeDescriptions[selectedNode.name].specs}
                </span>
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default KnowledgeGraph;
