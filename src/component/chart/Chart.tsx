import React from 'react'
import ReactEcharts from "echarts-for-react"; 

interface chartProps {
    data: Record<string, Object>;
}

const Chart = ({data}: chartProps) => {
  return (
    <ReactEcharts option={data} />
  )
}

export default Chart