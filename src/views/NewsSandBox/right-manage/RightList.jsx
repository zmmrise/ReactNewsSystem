import React, { useEffect, useState } from 'react'
import {Table, Tag, Button, Space} from 'antd'
import axios from 'axios';
import {
  EditTwoTone,
  DeleteTwoTone
} from '@ant-design/icons';
export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3006/rights").then(res => {
      setdataSource(res.data)
    })
  }, [])
  
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return (
          <Tag color='geekblue' >
            {key}
          </Tag>
        );
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => <Space size="middle">
        <Button icon={<EditTwoTone /> } size="large" shape="circle"/>
        <Button icon={<DeleteTwoTone /> } size="large" shape="circle"/>
    </Space>
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}/>
    </div>
  )
}
