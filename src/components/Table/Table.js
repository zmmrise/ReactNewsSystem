import React from 'react'

export default function Table(props) {
  return (
    <div><Table dataSource={props.dataSource} rowKey={(row) => row.id} columns={props.columns} pagination={{ pageSize: props.pageSize ? props.pageSize : 5 }} scroll={{
        y: 540,
      }} /></div>
  )
}
