import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "antd/lib/layout/layout";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              {roleName}
            </a>
          ),
        },
        {
          key: "4",
          danger: true,
          onClick: () => {
            localStorage.removeItem("token");
          },
          label: <Link to="/login">退出</Link>,
        },
      ]}
    />
  );
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}

      <div style={{ float: "right" }}>
        <span>
          欢迎回来，<span style={{ color: "#1890ff" }}>{username}</span>
        </span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />}></Avatar>
        </Dropdown>
      </div>
    </Header>
  );
}
