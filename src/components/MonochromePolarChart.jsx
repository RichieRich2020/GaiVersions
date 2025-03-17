import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const MonochromePolarChart = ({ tag }) => {
  
  const series = [23, 20, 23, 10, 35]; // Data series
  const totalValue = series.reduce((a, b) => a + b, 0); // Calculate total sum

  const [state, setState] = useState({
    series,
    options: {
      chart: {
        type: "polarArea",
      },
      labels: ["Rose A", "Total Mentions", "Total Mentions 24hr", "Rose D", "Rose E"],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "top",
        labels: {
          colors: "#ffda1b",
        },
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      {/* Polar Area Chart */}
      <Chart options={state.options} series={state.series} type="polarArea" width={500} />

      {/* Centered Number (Custom HTML) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#ffda1b",
          backgroundColor: "rgb(0 0 0 / 38%)",
          padding: "5px",
          borderRadius: "50%",
          
          textAlign: "center",
        }}
      >
        {totalValue}
      </div>
    </div>
  );
};

export default MonochromePolarChart;
