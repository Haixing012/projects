import React, { useState } from 'react';
import { Card, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastDetectionTime: string;
}

const DeviceManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [form] = Form.useForm();

  const devices: Device[] = [
    {
      id: 'DEV001',
      name: '电池组-01',
      type: '动力电池',
      status: 'online',
      lastDetectionTime: '2024-01-15 14:30:25',
    },
    {
      id: 'DEV002',
      name: '摄像头-01',
      type: '摄像头',
      status: 'online',
      lastDetectionTime: '2024-01-15 14:28:12',
    },
    {
      id: 'DEV003',
      name: '雷达-01',
      type: '毫米波雷达',
      status: 'maintenance',
      lastDetectionTime: '2024-01-15 14:25:45',
    },
    {
      id: 'DEV004',
      name: 'ECU-01',
      type: 'ECU',
      status: 'online',
      lastDetectionTime: '2024-01-15 14:22:33',
    },
    {
      id: 'DEV005',
      name: 'TBOX-01',
      type: 'TBOX',
      status: 'offline',
      lastDetectionTime: '2024-01-15 14:20:18',
    },
  ];

  const columns: ColumnsType<Device> = [
    {
      title: '设备ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          online: { color: '#22c55e', text: '在线' },
          offline: { color: '#ef4444', text: '离线' },
          maintenance: { color: '#f59e0b', text: '维护中' },
        };
        const statusConfig = config[status as keyof typeof config];
        return <Tag color={statusConfig.color}>{statusConfig.text}</Tag>;
      },
    },
    {
      title: '最后检测时间',
      dataIndex: 'lastDetectionTime',
      key: 'lastDetectionTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedDevice(record);
            setDetailModalVisible(true);
          }}
        >
          查看详情
        </Button>
      ),
    },
  ];

  const handleAddDevice = () => {
    form.validateFields().then((values) => {
      console.log('新增设备:', values);
      setModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
          <SettingOutlined /> 设备管理
        </h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          新增设备
        </Button>
      </div>

      <Card bordered={false}>
        <Table
          columns={columns}
          dataSource={devices}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增设备"
        open={modalVisible}
        onOk={handleAddDevice}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="设备名称"
            name="name"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          <Form.Item
            label="设备类型"
            name="type"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Select.Option value="动力电池">动力电池</Select.Option>
              <Select.Option value="摄像头">摄像头</Select.Option>
              <Select.Option value="毫米波雷达">毫米波雷达</Select.Option>
              <Select.Option value="ECU">ECU</Select.Option>
              <Select.Option value="TBOX">TBOX</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="设备详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
      >
        {selectedDevice && (
          <div>
            <p style={{ marginBottom: 8 }}>
              <strong>设备ID：</strong> {selectedDevice.id}
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>设备名称：</strong> {selectedDevice.name}
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>设备类型：</strong> {selectedDevice.type}
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>设备状态：</strong>{' '}
              <Tag
                color={
                  selectedDevice.status === 'online'
                    ? '#22c55e'
                    : selectedDevice.status === 'offline'
                    ? '#ef4444'
                    : '#f59e0b'
                }
              >
                {selectedDevice.status === 'online'
                  ? '在线'
                  : selectedDevice.status === 'offline'
                  ? '离线'
                  : '维护中'}
              </Tag>
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>最后检测时间：</strong> {selectedDevice.lastDetectionTime}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DeviceManagement;
