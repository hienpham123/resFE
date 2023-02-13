// chart dasboard admin

import { TextField, Typography } from '@mui/material'
import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = ({sumBuy = [], sumOrder = []}) => {
  return (
    <div>
      <Typography>Biểu đồ thống kê doanh thu</Typography>
      <Bar
        data={{
          labels: ['Tháng trước', 'Hiện tại'],
          datasets: [
            {
              label: 'Tổng doanh thu',
              data: sumBuy,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            }
          ],
        }}
        height={"50px"}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
          plugins: {
            datalabels: {
              display: true,
              color: "black",
              formatter: Math.round,
              anchor: "end",
              offset: -20,
              align: "start"
            }
          },
        }}
      />
      
      <Typography>Biểu đồ thống kê đơn đặt bàn</Typography>
      <Bar
        data={{
          labels: ['Tháng trước', 'Hiện tại'],
          datasets: [
            {
              label: 'Tổng đơn hàng',
              data: sumOrder,
              backgroundColor: 'orange',
              borderColor: 'red',
            },
          ],
        }}
        height={"100px"}
        // width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default BarChart
