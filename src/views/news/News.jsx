import React, { useState } from 'react'
import { Card, Col, Row, PageHeader, List } from 'antd'
import './news.css'
import { useEffect } from 'react';
import axios from '../../util/http';
import _ from 'loadsh'
export default function News() {
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            setNewsList(Object.entries(_.groupBy(res.data, item => item.category.title)))
        })
    }, [])
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="全球大新闻"
                subTitle="查看新闻"
            />
            <div className="site-card-wrapper">
                <Row gutter={[16, 16]}>
                    {newsList.map(item => {
                        return (<Col span={8} key={item[0]}>
                            <Card title={item[0]} bordered={true} hoverable>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page);
                                        },
                                        pageSize: 1,
                                    }}
                                    dataSource={item[1]}
                                    renderItem={(item) => <List.Item><a href={`#/detail/${item.id}`}>{item.title}</a></List.Item>}
                                />
                            </Card>
                        </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}
