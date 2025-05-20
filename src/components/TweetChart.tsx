import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
Charts(FusionCharts);
FusionTheme(FusionCharts);

const TweetTrendChart = () => {
  const chartData = [
    { label: "13 May", meme: "0", ai: "0", nft: "0", metaverse: "0", gaming: "0" },
    { label: "14 May", meme: "80", ai: "50", nft: "120", metaverse: "110", gaming: "140" },
    { label: "15 May", meme: "150", ai: "130", nft: "180", metaverse: "170", gaming: "250" },
    { label: "16 May", meme: "100", ai: "160", nft: "200", metaverse: "180", gaming: "280" },
    { label: "17 May", meme: "60", ai: "80", nft: "100", metaverse: "90", gaming: "120" },
  ];

  const categories = [
    {
      category: chartData.map((item) => ({ label: item.label })),
    },
  ];

  const dataset = [
    {
      seriesname: "Meme Coin",
      data: chartData.map((item) => ({ value: item.meme })),
    },
    {
      seriesname: "AI & Big Data",
      data: chartData.map((item) => ({ value: item.ai })),
    },
    {
      seriesname: "NFT & Digital Art",
      data: chartData.map((item) => ({ value: item.nft })),
    },
    {
      seriesname: "Metaverse",
      data: chartData.map((item) => ({ value: item.metaverse })),
    },
    {
      seriesname: "Web3 Gaming",
      data: chartData.map((item) => ({ value: item.gaming })),
    },
  ];

  const chartConfigs = {
    type: "stackedarea2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Web3 Tweet Activity by Category",
        yAxisName: "Tweets",
        xAxisName: "Date",
        theme: "fusion",
        drawcrossline: "1",
        paletteColors: "#8B5CF6,#06B6D4,#9333EA,#EF4444,#F97316",
        bgColor: "#1f1b2e",
        canvasBgColor: "#1f1b2e",
        showlegend: "1",
        legendPosition: "top",
        legendCaption: "Categories",
        legendItemFontColor: "#FFFFFF",
        baseFontColor: "#FFFFFF",
        captionFontColor: "#FFFFFF",
        axisLineAlpha: "50",
        divLineAlpha: "20",
      },
      categories,
      dataset,
    },
  };

  return <ReactFusioncharts {...chartConfigs} />;
};

export default TweetTrendChart;
