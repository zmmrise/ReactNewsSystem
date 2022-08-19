import React from 'react'
import { Card, Col, Row, List, Avatar, Space, Drawer } from 'antd'
import {
  BarChartOutlined,
  PieChartOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import axios from '../../../util/http';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Echarts from 'echarts'
export default function Home() {
  const [visible, setVisible] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  const [dataSource, setDataSource] = useState([])
  const [dataSourceStar, setDataSourceStar] = useState([])
  const { username, role: { roleName }, region } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then(res => {
      setDataSource(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`).then(res => {
      setDataSourceStar(res.data)
    })
  }, [])

  useEffect(() => {
    var myEcharts = Echarts.init(document.getElementById('main'))
    myEcharts.setOption(option)
  }, [])
  return (
    <div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="用户最常浏览" bordered={true} avatar={<BarChartOutlined />}>

              <List
                dataSource={dataSource}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`news-manage/preview/${item.id}`}>{item.title}</Link>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="用户点赞最多" bordered={true}>
              <List
                dataSource={dataSourceStar}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`news-manage/preview/${item.id}`}>{item.title}</Link>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8} >
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <PieChartOutlined key="piechart" onClick={showDrawer} />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={username}
                description={region ? <Space><b>{region}{roleName}</b></Space> : <Space><b>'全球'{roleName}</b></Space>}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div id="main" style={{ width: '600px', height: '400px', marginTop: '-80px' }}></div>        
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        <div>
          zmm
        </div>
      </Drawer>
    </div>
  )
}
