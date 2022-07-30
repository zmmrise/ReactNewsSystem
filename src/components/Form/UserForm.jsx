import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select} from 'antd'


const {Option} = Select
const UserForm = forwardRef((props, ref) => {
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        setDisabled(props.regionDisabled)
    }, [props.regionDisabled, props.DateTime])
    return (
        <div>
            <Form
                ref={ref}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password allowClear/>
                </Form.Item>
                <Form.Item
                    label="区域"
                    name="region"
                    rules={!disabled && [
                        {
                            required: true,
                            message: 'Please select your region!',
                        },
                    ]}
                >
                    <Select
                        disabled={disabled}
                        allowClear
                        style={{
                            width: 200,
                        }}

                    >
                        {
                            props.regionList.map(value => <Option value={value.value} key={value.id}>{value.value}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="角色" name='roleId' rules={[
                        {
                            required: true,
                            message: 'Please select your role!',
                        },
                    ]}>
                    <Select
                        onChange={(value) => {
                            console.log(ref)
                            if (value === 1) {
                                ref.current.setFieldsValue({region: ''})
                                setDisabled(true)
                            }
                            else {
                                setDisabled(false)
                            }
                        }}
                        allowClear
                        style={{
                            width: 200,
                        }}

                    >
                        {
                            props.roleList.map(value => <Option value={value.id} key={value.id}>{value.roleName}</Option>)
                        }
                    </Select>
                </Form.Item>

            </Form>
        </div>
    )
})


export default UserForm
