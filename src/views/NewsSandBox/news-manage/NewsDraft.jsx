import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, notification } from 'antd'
import {
  EditTwoTone,
  DeleteTwoTone,
  UpCircleTwoTone,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from '../../../util/http';
import { Link } from 'react-router-dom';
export default function NewsDraft(props) {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`news?author=${username}&auditState=0&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username])
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
      render(title, item) {
        return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render(category) {
        return <b>{category.value}</b>
      }
    },

    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => <Space size="middle">

        <Button icon={<EditTwoTone />} size="large" shape="circle" onClick={() => props.history.push(`/news-manage/update/${item.id}`)}/>
        <Button icon={<DeleteTwoTone />} size="large" shape="circle" onClick={() => confirmMethod(item)} />
        <Button icon={<UpCircleTwoTone />} size="large" shape="circle" onClick={() => handleCheck(item)}/>
      </Space>
    },
  ];

  const handleCheck = (item) => {
    axios.patch(`news/${item.id}`, {
      auditState: 1
    }).then(res => {
      props.history.push("/audit-manage/list")
      notification.info({
        message: `通知`,
        description: '您可以到审核列表查看您的新闻',
        placement: 'bottomRight',
      });
    })
  }

  const confirmMethod = (item) => {

    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'ok',
      cancelText: 'cancel',
      onOk() {
        deleteItem(item)
      },
      onCancel() {
      }
    })
  }
  const deleteItem = (item) => {
    setDataSource(dataSource.filter(value => value.id !== item.id))
    axios.delete(`news/${item.id}`)


  }
  return (
    <div>
      <Table dataSource={dataSource} rowKey={(row) => row.id} columns={columns} pagination={{ pageSize: 5 }} scroll={{
        y: 540,
      }} />
    </div>
  )
}
