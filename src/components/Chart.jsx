import React, {useEffect, useState} from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Chart = (props) => {
  const [lineColor, setLineColor] = useState('#8884d8');

  const formattedData = props.sparklineData
    .map((price, idx) => {
      if (idx % 6 === 0) {
        const timeToSubtract = 168 - idx;
        const date = moment()
          .subtract(timeToSubtract, "hours")
          .format("ddd h:mma");
        return { value: price, date };
      } else if (idx === props.sparklineData.length - 1) {
        const date = moment().format("ddd h:mma");
        return { value: price, date };
      }
      return null;
    })
    .filter(data => data);

    const updateCharts = () => {
      if (document.body.classList.contains("dark-mode")) {
        console.log("dark mode");
        setLineColor('#6CFF5F')
        
      } else {
        setLineColor('#8884d8')
      }
    }

    useEffect(()=>{
      updateCharts();
    },[props.darkModeToggle]);

  return (
    <LineChart width={1100} height={300} data={formattedData}>
      <Line type="monotone" dataKey="value" stroke={lineColor}/>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" interval={3} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
