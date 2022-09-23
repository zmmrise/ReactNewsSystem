import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  SecurityScanOutlined,
  MessageOutlined,
  FileDoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./index.css";
import axios from "../../util/http";
import { connect } from "react-redux";
const logoImg = require('../../assets/img/logo.png')
function SideMenu(props) {
  const [MenuList, setMenuList] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/right-manage": <SecurityScanOutlined />,
    "/news-manage": <MessageOutlined />,
    "/audit-manage": <FileDoneOutlined />,
    "/publish-manage": <SendOutlined />,
  };

  
  const rootSubmenuKeys = [
    "/user-manage",
    "/right-manage",
    "/news-manage",
    "/audit-manage",
    "/publish-manage",
  ];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const {
      role: { rights },
    } = JSON.parse(localStorage.getItem("token"));
    axios.get("rights?_embed=children").then((res) => {
      let newMenuList = res.data.filter((item) => {
        if (rights.includes(item.key) && item.pagepermisson === 1) {
          item.key === "/home"
            ? (item.label = <Link to={item.key}>{item.title}</Link>)
            : (item.label = `${item.title}`);
          item.icon = iconList[item.key];
          item.children =
            item.children.length > 0 &&
            item.children.filter((item1) => {
              if (rights.includes(item1.key)) {
                delete item1["rightId"];
                item1.label = <Link to={item1.key}>{item1.title}</Link>;
                return item1.pagepermisson === 1 || item1.routepermisson === 1;
              }
            });
          return item;
        }
      });
      setMenuList(newMenuList);
    });
  }, []);
  

  return (
    <Layout.Sider trigger={null} collapsible collapsed={props.Collapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">{props.Collapsed ? <img src={logoImg} style={{width: '40px', height: '40px'}} alt=""/> : '全球新闻发布管理系统'}</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${window.location.hash.substring(1)}`]}
            items={MenuList}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          ></Menu>
        </div>
      </div>
    </Layout.Sider>
  );
}

const mapStateToProps = (state) => {
  return {
    Collapsed: state.CollapsedReducer
  }
}

export default connect(mapStateToProps)(SideMenu)