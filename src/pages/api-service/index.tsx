import React, { useState } from 'react';
import { Card, Table, Tag, Button, Modal, Tabs } from 'antd';
import { ApiOutlined, CodeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface ApiService {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  callCount: number;
  status: 'active' | 'inactive';
}

const ApiService: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApi, setSelectedApi] = useState<ApiService | null>(null);

  const apis: ApiService[] = [
    {
      name: '设备检测接口',
      endpoint: '/api/v1/detection/detect',
      method: 'POST',
      callCount: 15234,
      status: 'active',
    },
    {
      name: '故障诊断接口',
      endpoint: '/api/v1/diagnosis/analyze',
      method: 'POST',
      callCount: 8456,
      status: 'active',
    },
    {
      name: '数据上传接口',
      endpoint: '/api/v1/data/upload',
      method: 'POST',
      callCount: 12567,
      status: 'active',
    },
    {
      name: '报告查询接口',
      endpoint: '/api/v1/reports/list',
      method: 'GET',
      callCount: 5423,
      status: 'active',
    },
    {
      name: '设备管理接口',
      endpoint: '/api/v1/devices',
      method: 'GET',
      callCount: 3215,
      status: 'inactive',
    },
  ];

  const columns: ColumnsType<ApiService> = [
    {
      title: 'API名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '接口地址',
      dataIndex: 'endpoint',
      key: 'endpoint',
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <Tag
          color={
            method === 'GET'
              ? '#22c55e'
              : method === 'POST'
              ? '#1677ff'
              : method === 'PUT'
              ? '#f59e0b'
              : '#ef4444'
          }
        >
          {method}
        </Tag>
      ),
    },
    {
      title: '调用次数',
      dataIndex: 'callCount',
      key: 'callCount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? '#22c55e' : '#94a3b8'}>
          {status === 'active' ? '正常' : '停用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => { setSelectedApi(record); setModalVisible(true); }}>
          查看详情
        </Button>
      ),
    },
  ];

  const requestExample = `POST /api/v1/detection/detect
Content-Type: application/json

{
  "deviceType": "battery",
  "data": "base64_encoded_data"
}`;

  const responseExample = `{
  "code": 200,
  "message": "success",
  "data": {
    "deviceStatus": "abnormal",
    "faultProbability": 78.5,
    "riskLevel": "high",
    "possibleFaults": ["电池单体电压异常", "电池温度过高"],
    "repairSuggestions": ["立即停止使用", "检查BMS系统"]
  }
}`;

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <ApiOutlined /> API服务管理
      </h2>

      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={apis}
          rowKey="name"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={selectedApi?.name}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedApi && (
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="基本信息" key="1">
              <div>
                <p style={{ marginBottom: 8 }}>
                  <strong>接口地址：</strong> {selectedApi.endpoint}
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong>请求方式：</strong>{' '}
                  <Tag
                    color={
                      selectedApi.method === 'GET'
                        ? '#22c55e'
                        : selectedApi.method === 'POST'
                        ? '#1677ff'
                        : selectedApi.method === 'PUT'
                        ? '#f59e0b'
                        : '#ef4444'
                    }
                  >
                    {selectedApi.method}
                  </Tag>
                </p>
                <p style={{ marginBottom: 8 }}>
                  <strong>调用次数：</strong> {selectedApi.callCount}
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong>状态：</strong>{' '}
                  <Tag color={selectedApi.status === 'active' ? '#22c55e' : '#94a3b8'}>
                    {selectedApi.status === 'active' ? '正常' : '停用'}
                  </Tag>
                </p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="请求示例" key="2">
              <pre
                style={{
                  background: '#0f172a',
                  padding: 16,
                  borderRadius: 8,
                  color: '#94a3b8',
                  overflow: 'auto',
                }}
              >
                {requestExample}
              </pre>
            </Tabs.TabPane>
            <Tabs.TabPane tab="返回示例" key="3">
              <pre
                style={{
                  background: '#0f172a',
                  padding: 16,
                  borderRadius: 8,
                  color: '#94a3b8',
                  overflow: 'auto',
                }}
              >
                {responseExample}
              </pre>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
};

export default ApiService;
