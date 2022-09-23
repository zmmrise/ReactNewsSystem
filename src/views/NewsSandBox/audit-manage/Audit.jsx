import axios from '../../../util/http'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Space, Button, message } from 'antd'
import ZTable from "../../../components/Table/Table"
export default function Audit() {
  const [dataSource, setdataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { roleId, username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`news?auditState=1&_expand=category`).then(res => {
      if (roleId !== 1) {
        setdataSource(res.data.filter(value => value.roleId === roleId && value.author === username))
      } else {
        setdataSource(res.data)
      }
    })
  }, [roleId, username])
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

        <Button size="middle" type='primary' onClick={() => handlePass(item)}>通过</Button>
        <Button size="middle" type='danger' onClick={() => handleReject(item)}>驳回</Button>
      </Space>
    },
  ];
  const handlePass = (item) => {
    setdataSource(dataSource.filter(value => value.id !== item.id))
    axios.patch(`news/${item.id}`, {
      auditState: 2,
      publishState: 1
    }).then(res => {
      message.success('操作成功')
    })
  }
  const handleReject = (item) => {
    setdataSource(dataSource.filter(value => value.id !== item.id))
    axios.patch(`news/${item.id}`, {
      auditState: 3,
      publishState: 0
    }).then(res => {
      message.success('操作成功')
    })
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  return (
    <div>
      <ZTable dataSource={dataSource} columns={columns} pageSize={5} onSelectChange={onSelectChange} scroll={{
        y: 540,
      }} />
    </div>
  )
}
