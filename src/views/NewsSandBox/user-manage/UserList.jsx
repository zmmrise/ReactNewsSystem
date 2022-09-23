import React, { useEffect, useState, useRef } from 'react'
import { Button, Space, Modal, Switch, message } from 'antd'
import ZTable from "components/Table/Table"
import axios from '@/util/http';
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import Draggable from 'react-draggable';
import UserForm from '../../../components/Form/UserForm'


export default function UserList() {
  const UserFormRef = useRef()
  const [dataSource, setdataSource] = useState([])
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [dataType, setDataType] = useState(0);
  const [editUserId, setEditUserId] = useState(0)
  const [regionDisabled, setRegionDisabled] = useState(false)
  const [DateTime, setDateTime] = useState(0)
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const draggleRef = useRef(null);
  useEffect(() => {
    const { roleId } = JSON.parse(localStorage.getItem('token'))
    axios.get("users").then(res => {
      if (roleId !== 1) {
        setdataSource(res.data.filter(value => value.roleId === roleId))
      } else {
        setdataSource(res.data)
      }

    })
  }, [])
  useEffect(() => {
    axios.get("roles").then(res => {

      setRoleList(res.data)
    })
  }, [])


  useEffect(() => {
    axios.get("regions").then(res => {

      setRegionList(res.data)
    })
  }, [])

  const columns = [
    {
      title: '地区',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: '',
      render: (item) => {
        return <Switch defaultChecked={item.roleState} onChange={() => switchChange(item)} disabled={item.default}></Switch>
      }
    },

    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => <Space size="middle">
        <Button icon={<EditTwoTone />} size="large" shape="circle" onClick={() => editUser(item)} disabled={item.default} />
        <Button icon={<DeleteTwoTone />} size="large" shape="circle" onClick={() => confirmMethod(item)} disabled={item.default} />
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
        console.log('cancel')
      }
    })
  }

  const editUser = async (item) => {
    setDateTime(new Date().getTime())
    if (item.roleId === 1) {
      setRegionDisabled(true)
    } else {
      setRegionDisabled(false)
    }
    console.log(item)
    setEditUserId(item.id)
    setDataType(1)
    // await AsyncModalVisible()
    setModalVisible(true)
    setTimeout(() => {
      UserFormRef.current.setFieldsValue(item)
    }, 0);
  }

  const AsyncModalVisible = () => {
    return new Promise(resolve => {
      resolve()
      setModalVisible(true)
    })
  }

  const switchChange = (item) => {
    item.roleState === true ? item.roleState = false : item.roleState = true
    console.log(item)
    // dataSource.map(value => {
    //   if (value.id === item.id) {
    //     value.roleState = item.roleState
    //   }
    //   return value
    // })

    axios.patch(`users/${item.id}`, { roleState: item.roleState })
  }
  const deleteItem = (item) => {
    console.log(item)
    setdataSource(dataSource.filter(value => value.id !== item.id))
    axios.delete(`users/${item.id}`)


  }

  const handleOk = () => {

    UserFormRef.current.validateFields()
      .then(values => {
        console.log(values)
        if (values.errorFields === undefined) {
          const { username, password, region, roleId } = values
          let user = { username, password, region, roleId, roleState: true, default: false }
          console.log(user)
          if (dataType === 2) {
            setdataSource([...dataSource, user])
            axios.post(`users`, user)
          }
          else {
            let editUser = user
            editUser.id = editUserId
            setdataSource(dataSource.map(value => {
              if (value.id === editUserId) {
                value = Object.assign(value, values)
              }
              return value
            }))
            axios.patch(`users/${editUserId}`, editUser)
          }
          message.success('操作成功')
          setModalVisible(false)
        }
      })
      .catch(err => console.log(err))
  }
  const handleCancel = () => {
    UserFormRef.current.resetFields()
    setModalVisible(false)
  }
  const addUser = () => {
    setDataType(2)
    setModalVisible(true)
  }
  const onSelectChange = (SelectedRows) => {
    //do something
  }
  // useEffect(() => {
  //   console.log(selectedRows)
  // }, [selectedRows])
  return (
    <div>
      <Button type="primary" style={{ marginBottom: '20px' }} size="large" onClick={addUser}>添加用户</Button>
      <ZTable isPagination={true}  onSelectChange={onSelectChange} isSelect={true} dataSource={dataSource} columns={columns}  pageSize={5}  scroll={{
        y: 540,
      }} />
      <Modal title={<div
        style={{
          width: '100%',
          cursor: 'move',
        }}
        onMouseOver={() => {
          if (disabled) {
            setDisabled(false);
          }
        }}
        onMouseOut={() => {
          setDisabled(true);
        }}
        onFocus={() => { }}
        onBlur={() => { }}
      >
        {dataType === 1 ? '修改用户信息' : '添加用户信息'}
      </div>} visible={modalVisible} onOk={handleOk} onCancel={handleCancel} modalRender={(modal) => (
        <Draggable
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}>
        <UserForm roleList={roleList} regionList={regionList} ref={UserFormRef} regionDisabled={regionDisabled} DateTime={DateTime}></UserForm>
      </Modal>
    </div>

  )
}



