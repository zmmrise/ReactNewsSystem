import React, { useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import {MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined} from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              zmm
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              lmm
            </a>
          ),
        },
        {
          key: '4',
          danger: true,
          label: '退出',
        },
      ]}
    />
  );
  return (
    <Header
          className="site-layout-background"
          style={{
            padding: '0 16px',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div style={{float: 'right'}}>
            <span >欢迎回来</span>
            <Dropdown overlay={menu}>
              <Avatar size="large" icon={<UserOutlined />}></Avatar>
            </Dropdown>
          </div>
        </Header>
  )
}
