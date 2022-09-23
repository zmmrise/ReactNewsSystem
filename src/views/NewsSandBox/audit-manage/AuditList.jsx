import React, { useEffect, useState } from 'react'
import { Button, notification, Tag } from 'antd'
import ZTable from "../../../components/Table/Table"
import axios from '../../../util/http';
import { Link } from 'react-router-dom';
export default function AuditList(props) {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))
  const buttonText = ['撤销', '发布', '修改']
  useEffect(() => {
    axios.get(`news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
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
      title: '审核状态',
      dataIndex: 'auditState',
      render(auditState) {
        let displayState
        switch (auditState) {
          case 1:
            displayState = <Tag color="warning">审核中</Tag>
            break
          case 2:
            displayState = <Tag color="success">已通过</Tag>
            break
          case 3:
            displayState = <Tag color="error">未通过</Tag>
            break
          default:
            displayState = <Tag color="default">未审核</Tag>
        }
        return displayState
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) =>
        <Button size="middle" type='primary' onClick={() => handleClick(item)}>{buttonText[item.auditState - 1]}</Button>
    },
  ];
  const handleClick = (item) => {
    console.log(item.auditState)
    switch (item.auditState) {
      case 1: //撤销
        setDataSource(dataSource.filter(value => value.id !== item.id))
        axios.patch(`news/${item.id}`, {
          auditState: 0
        }).then(res => {
          notification.info({
            message: `通知`,
            description: '您可以到草稿箱查看您的新闻',
            placement: 'bottomRight',
          });
        })
        break;
      case 2: //发布
        axios.patch(`news/${item.id}`, {
          publishState: 2, publishTime: Date.now()
        })
        notification.info({
          message: `通知`,
          description: '您可以到【发布管理/已发布】查看您的新闻',
          placement: 'bottomRight',
        });
        break;
      case 3: //更新
        props.history.push(`/news-manage/update/${item.id}`)

        break;
      default:
        break;
    }

  }
  return (
    <div>
      <ZTable dataSource={dataSource} columns={columns} pageSize={5} scroll={{
        y: 540,
      }} />
    </div>
  )
}
