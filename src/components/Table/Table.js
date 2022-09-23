import React from 'react'
import {Table} from 'antd'
export default function ZTable(props) {
  const onSelect = (record, selected, selectedRows, nativeEvent) => {
    props.onSelectChange(selectedRows)
  }
  const onSelectAll = (selected, selectedRows, changeRows) => {
    props.onSelectChange(selectedRows)
  }
  const rowSelection = {
    onSelect: onSelect,
    onSelectAll: onSelectAll
  };
  return (
    <div><Table style={{width: `${props.TableWidth}px`}} bordered={props.bordered} rowSelection={props.isSelect === true ? rowSelection : null}  dataSource={props.dataSource} rowKey={(row) => row.id} columns={props.columns} pagination={props.isPagination === true ? ({ pageSize: props.pageSize ? props.pageSize : 5 }) : false} scroll={props.scroll} /></div>
  )
}
