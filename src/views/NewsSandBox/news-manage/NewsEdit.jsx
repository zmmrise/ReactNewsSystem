import React, { useEffect, useRef, useState } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from '../../../util/http';
import NewsEditor from '../../../components/news-manage/NewsEditor'

export default function NewsEdit(props) {
    const [current, setCurrent] = useState(0);
    const [categoryList, setCategoryList] = useState([])
    const [editorContent, setEditorContent] = useState("")
    const [formInfo, setFormInfo] = useState({})
    const [newsInfo, setNewsInfo] = useState(null)
    const FormRef = useRef()
    const steps = [
      {
        title: '基本信息',
        description: '新闻标题，新闻分类',
      },
      {
        title: '新闻内容',
        description: '新闻主体内容',
      },
      {
        title: '新闻提交',
        description: '保存草稿或者提交审核',
      },
    ];
    useEffect(() => {
        axios.get(`news?_expand=category&_expand=role&id=${props.match.params.id}`).then(res => {
            setNewsInfo(res.data[0])
            console.log(FormRef.current)
            if (res.data.length > 0) {
                let {title, categoryId, content} = res.data[0]
                FormRef.current.setFieldsValue({title, categoryId})
                console.log(content)
                setEditorContent(content)
            }
            
        })
    }, [props.match.params.id])

    useEffect(() => {
        axios.get('categories').then(res => {
          setCategoryList(res.data)
        })
      }
        , [])
    const next = () => {
  
      if (current === 0) {
        FormRef.current.validateFields().then(res => {
          setFormInfo(res)
          setCurrent(current + 1);
        }).catch(error => {
          message.error(error.errorFields[0].errors[0])
        })
  
      }else if (current === 1) {
        if (editorContent.trim() === '' || editorContent.trim() === "<p></p>") {
          return message.error('新闻内容不能为空')
        }
        setCurrent(current + 1);
      }else {
        setCurrent(current + 1);
      }
  
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
    const handleSave = (auditState) => {
      axios.patch(`news/${props.match.params.id}`, {
        ...formInfo,
        auditState,
        content: editorContent
      }).then(res => {
        message.success('操作成功')
        auditState === 0 ? props.history.push("/news-manage/draft") : props.history.push("/audit-manage/list")
        notification.info({
          message: `通知`,
          description:
          auditState === 0 ? '您可以到草稿箱查看您的新闻' : '您可以到审核列表查看您的新闻',
          placement: 'bottomRight',
        });
      })
    }
    const getNewsEditorContent = (EditorContent) => {
      setEditorContent(EditorContent)
    }
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="更新新闻"
          onBack={() => window.history.back()}
        />
        <Steps current={current}>
          {steps.map(value => <Steps.Step title={value.title} description={value.description} key={value.title} />)}
        </Steps>
        <div className={current === 0 ? '' : style.active} style={{ marginTop: '40px' }}>
          <Form
            ref={FormRef}
            labelAlign="center"
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请输入新闻标题!',
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
  
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: '请选择新闻分类!',
                },
              ]}
            >
              <Select
                style={{
                  width: '100%',
                }}
              >
                {
                  categoryList.map(item => <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : style.active}>
          <NewsEditor getNewsEditorContent={getNewsEditorContent} editorContent={editorContent}/>
        </div>
        <div className={current === 2 ? '' : style.active}></div>
  
        <div className="steps-action" style={{ marginTop: '40px' }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <span>
              <Button type="primary" onClick={() => handleSave(0)}>
                保存草稿箱
              </Button>
              <Button type="primary" onClick={() => handleSave(1)} style={{
                margin: '0 8px',
              }}>
                提交审核
              </Button>
            </span>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              上一步
            </Button>
          )}
        </div>
      </div>
    )
}
