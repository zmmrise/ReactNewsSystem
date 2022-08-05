import { Table, Button, Space, Modal, Tree } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState([]);
  // 记录当前修改提交的角色ID
  const [roleId, setRoleId] = useState(0);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
      key: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <Space size="middle">
          <Button
            icon={<EditTwoTone />}
            size="large"
            shape="circle"
            onClick={() => showModal(item)}
          />
          <Button
            icon={<DeleteTwoTone />}
            size="large"
            shape="circle"
            onClick={() => confirmMethod(item)}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    axios.get("http://localhost:3006/roles").then((res) => {
      setDataSource(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3006/rights?_embed=children").then((res) => {
      setRightList(res.data);
    });
  }, []);

  const confirmMethod = (item) => {
    Modal.confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "ok",
      cancelText: "cancel",
      onOk() {
        deleteItem(item);
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };
  const deleteItem = (item) => {
    setDataSource(dataSource.filter((value) => item.id !== value.id));
    axios.delete(`http://localhost:3006/roles/${item.id}`);
  };

  const handleOk = () => {
    setDataSource(
      dataSource.map((item) => {
        if (item.id === roleId) {
          item.rights = defaultCheckedKeys;
        }
        return item;
      })
    );
    console.log(defaultCheckedKeys);
    axios.patch(`http://localhost:3006/roles/${roleId}`, {
      rights: defaultCheckedKeys,
    });
    setModalVisible(false);
  };
  const showModal = (item) => {
    setRoleId(0);
    console.log(item.rights);
    setDefaultCheckedKeys(item.rights);
    setRoleId(item.id);
    setModalVisible(true);
  };
  const closeModal = () => {
    setRoleId(0);
    setModalVisible(false);
  };
  const onCheck = (value) => {
    console.log(value);
    setDefaultCheckedKeys(value.checked);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Tree
          checkable
          checkStrictly
          treeData={rightList}
          checkedKeys={defaultCheckedKeys}
          onCheck={onCheck}
        />
      </Modal>
    </div>
  );
}
