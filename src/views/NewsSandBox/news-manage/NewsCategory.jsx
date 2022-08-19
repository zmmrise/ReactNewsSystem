import React, { useEffect, useState, useRef, useContext } from 'react'
import { Table, Form, Button, Modal, Input } from 'antd'
import {
  EditTwoTone,
  DeleteTwoTone,
  UpCircleTwoTone,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from '../../../util/http';

export default function NewsCategory() {
  const [dataSource, setDataSource] = useState([])
  const EditableContext = React.createContext(null);
  useEffect(() => {
    axios.get(`categories`).then(res => {
      setDataSource(res.data)
    })
  }, [])
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} autoComplete='off' />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  const defaultColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'value',
      editable: true
    },


    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) =>
        <Button icon={<DeleteTwoTone />} size="large" shape="circle" onClick={() => confirmMethod(item)} />
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
  const deleteItem = (item) => {
    setDataSource(dataSource.filter(value => value.id !== item.id))
    axios.delete(`categories/${item.id}`)
  }
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const handleSave = (row) => {
    console.log(row)
    setDataSource(dataSource.map(value => {
      if (value.id === row.id) {
        value.value = row.value
      }
      return value
    }))
    axios.patch(`categories/${row.id}`, {value: row.value})
  };
  return (
    <div>
      <Table dataSource={dataSource} rowKey={(row) => row.id} columns={columns} pagination={{ pageSize: 8 }} scroll={{
        y: 540,
      }} components={components} />
    </div>
  )
}

