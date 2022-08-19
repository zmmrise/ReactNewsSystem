import React from 'react'
import Particles from 'react-particles-js'
import {Form, Input, Button, message} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './login.css'
import axios from '../../util/http'
export default function Login(props) {
  const onFinish = (FormInfo) => {
    console.log(FormInfo)
    const {username, password} = FormInfo
    axios.get(`users?username=${username}&password=${password}&roleState=true&_expand=role`).then(res => {
      console.log(res)
      if (res.status === 200) {
        if (res.data.length > 0) {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          message.success('登录成功')
          props.history.push('/home')
        }else {
          message.error('用户名或密码不正确')
        }
      }
    })
  }
  return (
    <div style={{background: 'rgb(35, 39, 65)', height: '100%', overflow: 'hidden'}}>
      <Particles params={
        {
          "background": {
            "color": {
              "value": "#000000"
            },
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
          },
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "push"
              },
              "onHover": {
                "mode": "repulse"
              }
            },
            "modes": {
              "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 40,
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "mix": false,
                  "selectors": []
                }
              },
              "grab": {
                "distance": 400
              },
              "push": {
                "groups": [
                  "z5000",
                  "z7500",
                  "z2500",
                  "z1000"
                ]
              },
              "repulse": {
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad",
                  "selectors": []
                }
              }
            }
          },
          "particles": {
            "color": {
              "animation": {
                "h": {
                  "speed": 20
                }
              }
            },
            "groups": {
              "z5000": {
                "number": {
                  "value": 70
                },
                "zIndex": {
                  "value": 50
                }
              },
              "z7500": {
                "number": {
                  "value": 30
                },
                "zIndex": {
                  "value": 75
                }
              },
              "z2500": {
                "number": {
                  "value": 50
                },
                "zIndex": {
                  "value": 25
                }
              },
              "z1000": {
                "number": {
                  "value": 40
                },
                "zIndex": {
                  "value": 10
                }
              }
            },
            "links": {
              "color": {
                "value": "#ffffff"
              },
              "opacity": 0.4
            },
            "move": {
              "angle": {
                "value": 10
              },
              "attract": {
                "rotate": {
                  "x": 600,
                  "y": 1200
                }
              },
              "direction": "right",
              "enable": true,
              "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
              },
              "speed": 5
            },
            "number": {
              "value": 200
            },
            "opacity": {
              "animation": {
                "speed": 3,
                "minimumValue": 0.1
              }
            },
            "zIndex": {
              "value": 5,
              "opacityRate": 0.5
            }
          },
          "emitters": {
            "autoPlay": true,
            "fill": true,
            "life": {
              "wait": false
            },
            "rate": {
              "quantity": 1,
              "delay": 7
            },
            "shape": "square",
            "startCount": 0,
            "size": {
              "mode": "percent",
              "height": 0,
              "width": 0
            },
            "particles": {
              "shape": {
                "type": "images",
                "options": {
                  "images": {
                    "src": "https://particles.js.org/images/cyan_amongus.png",
                    "width": 500,
                    "height": 634
                  }
                }
              },
              "size": {
                "value": 40
              },
              "move": {
                "speed": 10,
                "outModes": {
                  "default": "none",
                  "right": "destroy"
                },
                "straight": true
              },
              "zIndex": {
                "value": 0
              },
              "rotate": {
                "value": {
                  "min": 0,
                  "max": 360
                },
                "animation": {
                  "enable": true,
                  "speed": 10,
                  "sync": true
                }
              }
            },
            "position": {
              "x": -5,
              "y": 55
            }
          }
        }
      }/> 
      <Form
      name="basic"
      autoComplete="off"
      className='FormContainer'
      onFinish={onFinish}
    >
      <div className='login-title'>全球新闻发布管理系统</div>
      <Form.Item
      wrapperCol={{
        offset: 2,
        span: 20,
      }}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" allowClear/>
      </Form.Item>

      <Form.Item
      wrapperCol={{
        offset: 2,
        span: 20,
      }}
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" allowClear/>
      </Form.Item>
      <Form.Item wrapperCol={{
        offset: 10,
      }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
