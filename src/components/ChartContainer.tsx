import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  ColorType,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface XData {
  timestamp: number;
  username: string;
}

interface MarkerData {
  timestamp: number;
  xdata: XData[];
}

interface ChartContainerProps {
  xdata: XData[];
  data: CandlestickData[];

}

const ChartContainer: React.FC<ChartContainerProps> = ({ xdata,data  }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [aggregatedMarkers, setAggregatedMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        // backgroundColor: "#1a1b23",
        background: { type: ColorType.Solid, color: "#1a1b23" },
        textColor: "white",
      },
      grid: {
        vertLines: { color: "#334158" },
        horzLines: { color: "#334158" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#485c7b", autoScale: true },
      timeScale: { borderColor: "#485158", timeVisible: true, secondsVisible: false },
    });

    chartRef.current = chart;
    
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderUpColor: "#4bffb5",
      borderDownColor: "#ff4976",
      wickUpColor: "#838ca1",
      wickDownColor: "#838ca1",
    });
    candlestickSeriesRef.current = candleSeries;

    const tooltip = document.createElement("div");
    Object.assign(tooltip.style, {
      position: "absolute",
      display: "none",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      padding: "6px",
      borderRadius: "4px",
      fontSize: "12px",
      pointerEvents: "none",
      zIndex: "1000",
    });

    chartContainerRef.current.appendChild(tooltip);
    tooltipRef.current = tooltip;

    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: 400,
        });
        chart.timeScale().fitContent();
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candlestickSeriesRef.current = null;
      tooltip.remove();
    };
  }, []);

  interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }
  
  interface XData {
    timestamp: number;
    username: string;
  }
  
  interface Marker {
    timestamp: number;
    xdata: XData[];
  }
  
  function restructureData(formattedData: CandleData[], xdata: XData[]): Marker[] {
    let result: Marker[] = formattedData.map(entry => ({
      timestamp: entry.time,
      xdata: [],
    }));
  
    xdata.forEach((user: XData) => {
      let timestamp = Math.floor(user.timestamp / 1000);
      let closestEntry = result.reduce((prev, curr) =>
        Math.abs(curr.timestamp - timestamp) < Math.abs(prev.timestamp - timestamp) ? curr : prev
      );
      closestEntry.xdata.push(user);
    });
  
    return result;
  }
  

  useEffect(() => {
    if (!candlestickSeriesRef.current || !data.length) return;

    const formattedData = data.map(item => ({
      time: Math.floor(item.timestamp / 1000) as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    })).sort((a, b) => a.time - b.time);

    candlestickSeriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();

    setAggregatedMarkers(restructureData(formattedData, xdata));
  }, [data, xdata]);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !aggregatedMarkers.length) return;

    const markers = aggregatedMarkers.filter(item => item.xdata.length > 0).map(item => ({
      time: item.timestamp as UTCTimestamp,
      position: "aboveBar" as const,
      color: "#FFD700",
      shape: "circle" as const,
      text: `${item.xdata.length}`,
    }));

    candlestickSeriesRef.current.setMarkers(markers);
  }, [aggregatedMarkers]);

  return <div ref={chartContainerRef} style={{ width: "100%", position: "relative" , 
    border: "1px solid transparent",
 }} />;
};

export default ChartContainer;