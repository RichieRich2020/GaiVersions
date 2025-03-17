import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const PolarChartComponent = ({ tag }) => {
    const data = {
      labels: ["Total Mentions", "24h Mentions", "CMC Rank"],
      datasets: [
        {
          label: "Metrics",
          data: [
            tag?.coin_info?.total_mentions || 1,
            tag?.coin_info?.total_mentions_24hr || 2,
            tag?.coin_info?.cmc_rank || 3,
          ],
          backgroundColor: [
            "rgba(255, 218, 26, 0.7)", // Yellow
            "rgba(41, 43, 63, 0.7)",   // Dark Blue
            "rgba(255, 99, 132, 0.7)", // Red
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        r: {
          min: 0,
          suggestedMax: Math.max(
            tag?.coin_info?.total_mentions || 1,
            tag?.coin_info?.total_mentions_24hr || 1,
            tag?.coin_info?.cmc_rank || 1
          ),
          ticks: {
            color: "white",
            backdropColor: "transparent",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
    };
  
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" ,height:"100%", border:"2px solid red" }}>
        <PolarArea data={data} options={options} />
      </div>
    );
  };
  export default PolarChartComponent;