import React, { useState } from "react";
import Chart from "react-apexcharts";

const ApexPolarChart = ({ tag }) => {
  const [state] = useState({
    series: [
      tag?.coin_info?.total_mentions || 1,
      tag?.coin_info?.total_mentions_24hr || 1,
      tag?.coin_info?.cmc_rank || 1
    ],
    options: {
      chart: {
        type: "polarArea",
        width: 380
      },
      labels: ["Total Mentions", "24h Mentions", "CMC Rank"],
      fill: {
        opacity: 0.7
      },
      stroke: {
        colors: ["#fff"]
      },
      theme: {
        mode: "dark" // Set to 'light' if needed
      },
      colors: ["#FFD91A", "#292B3F", "#FF6384"], // Yellow, Blue, Red
      legend: {
        position: "bottom"
      }
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Chart options={state.options} series={state.series} type="polarArea" width={500} />
    </div>
  );
};

export default ApexPolarChart;
