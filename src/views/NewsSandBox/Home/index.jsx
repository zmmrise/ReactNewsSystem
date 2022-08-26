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
import _ from 'loadsh'
import { useRef } from 'react';
export default function Home() {
  const pieRef = useRef()
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
    setTimeout(() => {
      renderPieView("zmm")
    }, 0);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  const [dataSource, setDataSource] = useState([])
  const [dataSourceStar, setDataSourceStar] = useState([])
  const [pieChart, setpieChart] = useState(null)
  const [pieData, setpieData] = useState([])

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
    axios.get(`/news?publishState=2&_expand=category`).then(res => {
      renderBarView(_.groupBy(res.data, item => item.category.title))
      setpieData(res.data)
    })
    return () => {
      window.onresize = null
    }
  }, [])
  const renderBarView = (obj) => {
    let option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45"
        }
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };
    var myEcharts = Echarts.init(document.getElementById('main'))
    myEcharts.setOption(option)
    window.onresize = () => {
      myEcharts.resize()
    }
  }

  const renderPieView = () => {
    var currentList = pieData.filter(item => item.author === username)
    var groupObj = _.groupBy(currentList, item => item.category.title)
    var List = []
    for (const key in groupObj) {
      var itemObj = {name: key, value: groupObj[key].length}
      List.push(itemObj)
    }
    let option = {
      title: {
        text: '当前用户新闻分类展示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: List,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    var myChart;
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current)
      setpieChart(myChart)
    }else {
      myChart = pieChart
    }
    option && myChart.setOption(option);

    window.onresize = () => {
      myChart.resize()
    }
  }
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
                description={region ? <Space><b>{region}{roleName}</b></Space> : <Space><b>全球 {roleName}</b></Space>}
              />
            </Card>
          </Col>
        </Row>
        <Drawer width="500px" title="个人新闻分类" placement="right" onClose={onClose} visible={visible}>
        <div ref={pieRef} style={{width: '100%', height: '400px', marginTop: '30px'}}>
        </div>
      </Drawer>
        <div id="main" style={{ width: '100%', height: '360px', marginTop: '-13px' }}></div> 
      </div>
    </div>
  )
}
