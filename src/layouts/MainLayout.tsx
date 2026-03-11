import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ScanOutlined,
  BugOutlined,
  ExperimentOutlined,
  NodeIndexOutlined,
  FileSearchOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ApiOutlined,
  ControlOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { menuItems } from '../utils/menuConfig';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  // 图标映射
  const iconMap: Record<string, React.ReactNode> = {
    DashboardOutlined: <DashboardOutlined />,
    ScanOutlined: <ScanOutlined />,
    BugOutlined: <BugOutlined />,
    ExperimentOutlined: <ExperimentOutlined />,
    NodeIndexOutlined: <NodeIndexOutlined />,
    FileSearchOutlined: <FileSearchOutlined />,
    SettingOutlined: <SettingOutlined />,
    DatabaseOutlined: <DatabaseOutlined />,
    ApiOutlined: <ApiOutlined />,
    ControlOutlined: <ControlOutlined />,
  };

  const menuItemsWithIcon = menuItems.map((item) => ({
    key: item.path,
    icon: iconMap[item.icon] || <SettingOutlined />,
    label: item.label,
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <h2
            style={{
              color: token.colorText,
              margin: 0,
              fontSize: collapsed ? 16 : 18,
              fontWeight: 'bold',
            }}
          >
            {collapsed ? 'AI检测' : '智能检测平台'}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItemsWithIcon}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: token.colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: 20, color: token.colorText, cursor: 'pointer' },
              }
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <BellOutlined style={{ fontSize: 20, color: token.colorTextSecondary, cursor: 'pointer' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserOutlined style={{ fontSize: 20, color: token.colorTextSecondary }} />
              <span style={{ color: token.colorText }}>管理员</span>
            </div>
            <LogoutOutlined
              style={{ fontSize: 20, color: token.colorTextSecondary, cursor: 'pointer' }}
              onClick={() => console.log('退出登录')}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px',
            padding: 24,
            background: token.colorBgBase,
            borderRadius: token.borderRadius,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
