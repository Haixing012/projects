import React from 'react';
import { Card, Row, Col, Tabs, Table, Tag, Form, Input, Button, Select } from 'antd';
import { ControlOutlined, UserOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';

const System: React.FC = () => {
  const users = [
    { id: 1, username: 'admin', role: '管理员', status: 'active', lastLogin: '2024-01-15 10:30:00' },
    { id: 2, username: 'operator', role: '操作员', status: 'active', lastLogin: '2024-01-15 09:45:00' },
    { id: 3, username: 'viewer', role: '查看者', status: 'inactive', lastLogin: '2024-01-14 18:20:00' },
  ];

  const userColumns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? '#22c55e' : '#94a3b8'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
  ];

  const logs = [
    { id: 1, user: 'admin', action: '设备检测', time: '2024-01-15 10:30:00', ip: '192.168.1.100' },
    { id: 2, user: 'operator', action: '查看报告', time: '2024-01-15 10:28:00', ip: '192.168.1.101' },
    { id: 3, user: 'admin', action: '用户管理', time: '2024-01-15 10:25:00', ip: '192.168.1.100' },
    { id: 4, user: 'viewer', action: '数据查看', time: '2024-01-15 10:20:00', ip: '192.168.1.102' },
    { id: 5, user: 'admin', action: '系统配置', time: '2024-01-15 10:15:00', ip: '192.168.1.100' },
  ];

  const logColumns = [
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: '操作', dataIndex: 'action', key: 'action' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
        <ControlOutlined /> 系统管理
      </h2>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              用户管理
            </span>
          }
          key="1"
        >
          <Card title="用户列表" bordered={false}>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <SettingOutlined />
              角色权限
            </span>
          }
          key="2"
        >
          <Card title="角色列表" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card type="inner" title="管理员">
                  <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                    <strong>权限描述：</strong>
                  </p>
                  <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                    拥有系统所有权限，包括用户管理、系统配置等
                  </p>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card type="inner" title="操作员">
                  <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                    <strong>权限描述：</strong>
                  </p>
                  <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                    拥有检测、诊断、查看报告等操作权限
                  </p>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card type="inner" title="查看者">
                  <p style={{ marginBottom: 8, color: '#94a3b8' }}>
                    <strong>权限描述：</strong>
                  </p>
                  <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                    仅拥有数据查看权限，无操作权限
                  </p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <FileTextOutlined />
              系统日志
            </span>
          }
          key="3"
        >
          <Card title="操作日志" bordered={false}>
            <Table
              columns={logColumns}
              dataSource={logs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <SettingOutlined />
              系统配置
            </span>
          }
          key="4"
        >
          <Card title="系统参数配置" bordered={false}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="系统名称">
                    <Input defaultValue="新能源汽车关键电子设备智能检测平台" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="系统版本">
                    <Input defaultValue="v1.0.0" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="检测阈值">
                    <Input type="number" defaultValue="85" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="数据保留天数">
                    <Input type="number" defaultValue="90" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="通知邮箱">
                    <Input placeholder="请输入通知邮箱" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="日志级别">
                    <Select defaultValue="info">
                      <Select.Option value="debug">Debug</Select.Option>
                      <Select.Option value="info">Info</Select.Option>
                      <Select.Option value="warning">Warning</Select.Option>
                      <Select.Option value="error">Error</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item>
                    <Button type="primary">保存配置</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default System;
