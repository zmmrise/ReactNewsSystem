import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Space, Modal, Popover, Switch } from 'antd'
import axios from '../../../util/http';
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined
} from '@ant-design/icons';




export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get("rights?_embed=children").then(res => {
      let newDataSource = res.data.map(item => {
        if (item.key === '/home') {
          delete item['children']
        }
        return item
      })
      setdataSource(newDataSource)
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
      render: (item) => <Space size="middle">
        <Popover trigger={item.pagepermisson===undefined ? '' : 'click'} title='配置项' content={(<div style={{textAlign: 'center'}}>
          <Switch checked={item.pagepermisson===1} onChange={() => switchChange(item)}></Switch>
        </div>)}>
          <Button icon={<EditTwoTone />} size="large" shape="circle" disabled={item.pagepermisson===undefined}/>
        </Popover>
        
        <Button icon={<DeleteTwoTone />} size="large" shape="circle" onClick={() => confirmMethod(item)} />
      </Space>
    },
  ];
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

  const switchChange = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setdataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`rights/${item.id}`, {pagepermisson: item.pagepermisson})
    }else {
      axios.patch(`children/${item.id}`, {pagepermisson: item.pagepermisson})
    }
  }
  const deleteItem = (item) => {
    if (item.grade === 1) {
      setdataSource(dataSource.filter(value => value.id !== item.id))
      axios.delete(`rights/${item.id}`)
    } else {
      let element = dataSource.find(value => value.id === item.rightId)
      let elementIndex = dataSource.indexOf(element)
      let newElement = element.children.filter(childValue => childValue.id !== item.id)
      dataSource[elementIndex].children = [...newElement]
      setdataSource([...dataSource])
      axios.delete(`children/${item.id}`)
    }


  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} scroll={{
        y: 540,
      }} />
    </div>
  )
}
