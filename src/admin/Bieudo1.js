import React from 'react';

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import "../doan/style.css";

export default function Bieudo1() {
  const data = [
    { name: 'Tháng 1', uv: 0 },
    { name: 'Tháng 2', uv: 200 },
    { name: 'Tháng 3', uv: 0 },
    { name: 'Tháng 4', uv: 0 },
    { name: 'Tháng 5', uv: 0 },
    { name: 'Tháng 6', uv: 0 },
    { name: 'Tháng 7', uv: 0 },
    { name: 'Tháng 8', uv: 0 },
    { name: 'Tháng 9', uv: 0 },
    { name: 'Tháng 10', uv: 0 },
    { name: 'Tháng 11', uv: 0 },
    { name: 'Tháng 12', uv: 0 },
    // ...Thêm các điểm dữ liệu khác ở đây
  ];
  return (
    <>  <AreaChart width={1400} height={250} data={data}
    margin={{ top: 10, right: 0, bottom: 0 }} >
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FB9C4C" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#FB9C4C" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
  </AreaChart></>
  );
}