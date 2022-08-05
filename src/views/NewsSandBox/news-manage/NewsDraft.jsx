import React, { useEffect, useState } from 'react'
import {Table, Space, Button, Tag} from 'antd'
import {
  EditTwoTone,
  DeleteTwoTone
} from '@ant-design/icons';
import axios from 'axios';
export default function NewsDraft() {
  const [dataSource, setDataSource] = useState([])
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3006/news?&auditState=0").then(res => {
      setDataSource(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get("http://localhost:3006/categories").then(res => {
      setCategoryList(res.data)
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
      title: '新闻标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'categoryId',
      render(categoryId) {
        // categoryList.forEach(value => {
        //   console.log(value, categoryId)
        //   if (value.id === categoryId) {
            
        //   }
        // })
        return <b>{categoryId}</b>
      }
    },
    
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => <Space size="middle">
        
        <Button icon={<EditTwoTone />} size="large" shape="circle" />
        <Button icon={<DeleteTwoTone />} size="large" shape="circle"  />
      </Space>
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} rowKey={(row) => row.id} columns={columns} pagination={{ pageSize: 5 }} scroll={{
        y: 540,
      }} />
    </div>
  )
}
