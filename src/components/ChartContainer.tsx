import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  ColorType,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  MouseEventParams,
  PriceFormatterFn
} from "lightweight-charts";

interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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
  onDataUpdate?: (data: {
    ohlc: { open: string; high: string; low: string; close: string };
    volume: string;
    time: string;
  }) => void;
}

export const formatCryptoPrice = (value: number): string => {
  if (isNaN(value)) return "0";

  // For regular numbers (not extremely small), use normal formatting
  if (value >= 0.01) {
    return value.toFixed(2);
  }

  // Convert to string for analysis
  const priceStr = value.toString();

  // Count zeros after decimal point
  const match = priceStr.match(/^0\.0+/);
  if (!match) {
    // No leading zeros pattern found, use regular formatting
    return value.toFixed(6);
  }

  // Count zeros after the decimal point (excluding the first zero after decimal)
  const zerosAfterDecimal = match[0].length - 2; // -2 for "0."

  // If there are 3 or fewer zeros after decimal, show normally
  if (zerosAfterDecimal <= 3) {
    return value.toFixed(6);
  }

  // For numbers with more than 3 zeros after decimal, use subscript notation
  // Find position of first non-zero digit
  const nonZeroMatch = priceStr.match(/^0\.0+([1-9])/);
  if (nonZeroMatch) {
    // Get the non-zero part after the leading zeros
    const nonZeroPart = priceStr.substring(priceStr.indexOf(nonZeroMatch[1]));

    // Limit to 4 digits after the significant digit
    const limitedNonZeroPart = nonZeroPart.substring(
      0,
      Math.min(4, nonZeroPart.length)
    );

    // Get the subscript character for number of zeros (excluding the first zero after decimal)
    const subscriptDigit = getSubscriptDigit(zerosAfterDecimal);

    // Format as 0.0ₙXXXX where n is the number of zeros
    return `0.0${subscriptDigit}${limitedNonZeroPart}`;
  }

  // Fallback for other cases
  return value.toFixed(6);
};

const getSubscriptDigit = (num: number): string => {
  const subscriptDigits = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

  if (num < 10) {
    return subscriptDigits[num];
  } else {
    // For numbers with multiple digits, convert each digit to subscript
    return num
      .toString()
      .split("")
      .map((digit) => subscriptDigits[parseInt(digit)])
      .join("");
  }
};

const ChartContainer: React.FC<ChartContainerProps> = ({ xdata, data, onDataUpdate }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [aggregatedMarkers, setAggregatedMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const wrapperDiv = document.createElement("div");
    Object.assign(wrapperDiv.style, {
      width: "99.5%",
      height: "499.7px",
      padding: "0.6px",
      background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
      // borderRadius: "10px"
    });

    const innerDiv = document.createElement("div");
    Object.assign(innerDiv.style, {
      width: "100%",
      height: "100%",
      backgroundColor: "#0a0a0a"
    });

    wrapperDiv.appendChild(innerDiv);
    chartContainerRef.current.appendChild(wrapperDiv);
    const computedWidth = wrapperDiv.clientWidth;
    const customPriceFormatter: PriceFormatterFn = (price: number) => {
      return formatCryptoPrice(price);
    };

    const chart = createChart(innerDiv, {
      // width: innerDiv.clientWidth,
      width: computedWidth,
      height: innerDiv.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "white"
      },
      grid: {
        vertLines: { color: "#334158" },
        horzLines: { color: "#334158" }
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: {
        borderColor: "#485c7b",
        autoScale: true,
        visible: true,
        entireTextOnly: false,
        mode: 0,
        scaleMargins: {
          top: 0.1,
          bottom: 0.2
        }
      },
      leftPriceScale: {
        visible: false
      },
      
      timeScale: {
        borderColor: "#485158",
        timeVisible: true,
        secondsVisible: false,
        barSpacing: 8
      }
    });
    

    chartRef.current = chart;

    chart.applyOptions({
      localization: {
        priceFormatter: (price: number) => {
          return formatCryptoPrice(price);
        }
      }
    });

    chart.timeScale().applyOptions({

      minBarSpacing:7
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      priceFormat: {
        type: "custom",
        formatter: (price: number) => formatCryptoPrice(price),
        minMove: 0.00000001
      }
    });

    candlestickSeriesRef.current = candleSeries;

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume"
      },
      priceScaleId: "",
      color: "rgba(38, 166, 154, 0.5)",
      priceLineVisible: false,
      lastValueVisible: false,
      base: 0
    });

    volumeSeries.applyOptions({
      priceScaleId: 'left',
    });

    chart.priceScale('left').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0.05,
      },
      visible: false
    });

    volumeSeriesRef.current = volumeSeries;

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
      zIndex: "1000"
    });

    chartContainerRef.current.appendChild(tooltip);
    tooltipRef.current = tooltip;

    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.y < 0 ||
        !tooltipRef.current
      ) {
        tooltipRef.current.style.display = "none";
        return;
      }

      const candleData = param.seriesPrices.get(candleSeries);
      const volumeData = param.seriesPrices.get(volumeSeries);
      if (!candleData) {
        tooltipRef.current.style.display = "none";
        return;
      }

      const date = new Date((param.time as number) * 1000);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString();

      const newCurrentData = {
        ohlc: {
          open: (candleData as any).open.toString(),
          high: (candleData as any).high.toString(),
          low: (candleData as any).low.toString(),
          close: (candleData as any).close.toString()
        },
        volume: volumeData && (volumeData as any).value !== undefined
          ? (volumeData as any).value.toString()
          : "0",
        time: `${dateStr} ${timeStr}`
      };

      if (onDataUpdate) {
        onDataUpdate(newCurrentData);
      }

      tooltipRef.current.style.display = "block";
      tooltipRef.current.style.left = `${param.point.x}px`;
      tooltipRef.current.style.top = `${param.point.y}px`;

      tooltipRef.current.innerHTML = `
        <div>Date: ${dateStr} ${timeStr}</div>
        <div>Open: ${formatCryptoPrice((candleData as any).open)}</div>
        <div>High: ${formatCryptoPrice((candleData as any).high)}</div>
        <div>Low: ${formatCryptoPrice((candleData as any).low)}</div>
        <div>Close: ${formatCryptoPrice((candleData as any).close)}</div>
        <div>Volume: ${volumeData && (volumeData as any).value !== undefined
          ? (volumeData as any).value.toLocaleString()
          : "0"}</div>
      `;
    });

    // const resizeObserver = new ResizeObserver(() => {
    //   if (chartRef.current && chartContainerRef.current) {
    //     chartRef.current.applyOptions({
    //       width: chartContainerRef.current.clientWidth,
    //       height: 500
    //     });
    //     chart.timeScale().fitContent();
    //   }
    // });

    // resizeObserver.observe(chartContainerRef.current);

    return () => {
      
      // resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candlestickSeriesRef.current = null;
      volumeSeriesRef.current = null;
      tooltip.remove();
    };
  }, []);

    // Add this useEffect to handle window resizing if needed
//  useEffect(() => {
//   const handleResize = () => {
//     if (chartRef.current && chartContainerRef.current) {
//       chartRef.current.applyOptions({
//         width: chartContainerRef.current.clientWidth
//       });
//     }
//   };

//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

  interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }

  interface VolumeData {
    time: number;
    value: number;
    color: string;
  }

  interface Marker {
    timestamp: number;
    xdata: XData[];
  }

  function restructureData(
    formattedData: CandleData[],
    xdata: XData[]
  ): Marker[] {
    let result: Marker[] = formattedData.map((entry) => ({
      timestamp: entry.time,
      xdata: []
    }));

    xdata.forEach((user: XData) => {
      let timestamp = Math.floor(user.timestamp / 1000);
      let closestEntry = result.reduce((prev, curr) =>
        Math.abs(curr.timestamp - timestamp) <
        Math.abs(prev.timestamp - timestamp)
          ? curr
          : prev
      );
      closestEntry.xdata.push(user);
    });

    return result;
  }

  useEffect(() => {
    if (
      !candlestickSeriesRef.current ||
      !volumeSeriesRef.current ||
      !data.length
    )
      return;

    const formattedData = data
      .map((item) => ({
        time: Math.floor(item.timestamp / 1000) as UTCTimestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close
      }))
      .sort((a, b) => a.time - b.time);

    const formattedVolumeData = data
      .map((item) => ({
        time: Math.floor(item.timestamp / 1000) as UTCTimestamp,
        value: item.volume,
        color: item.close >= item.open 
          ? "rgba(38, 166, 154, 0.5)"
          : "rgba(239, 83, 80, 0.5)"
      }))
      .sort((a, b) => a.time - b.time);

    candlestickSeriesRef.current.setData(formattedData);
    volumeSeriesRef.current.setData(formattedVolumeData);
    chartRef.current?.timeScale().fitContent();

    const lastCandle = formattedData[formattedData.length - 1];
    const lastVolume = formattedVolumeData[formattedVolumeData.length - 1];
    const lastTime = new Date(lastCandle.time * 1000);
    
    const newCurrentData = {
      ohlc: {
        open: lastCandle.open.toString(),
        high: lastCandle.high.toString(),
        low: lastCandle.low.toString(),
        close: lastCandle.close.toString()
      },
      volume: lastVolume.value,
      time: `${lastTime.toLocaleDateString()} ${lastTime.toLocaleTimeString()}`
    };

    if (onDataUpdate) {
      onDataUpdate(newCurrentData);
    }

    setAggregatedMarkers(restructureData(formattedData, xdata));
  }, [data, xdata]);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !aggregatedMarkers.length) return;

    const markers = aggregatedMarkers
      .filter((item) => item.xdata.length > 0)
      .map((item) => ({
        time: item.timestamp as UTCTimestamp,
        position: "aboveBar" as const,
        color: "#FFD700",
        shape: "circle" as const,
        text: `${item.xdata.length}`
      }));

    candlestickSeriesRef.current.setMarkers(markers);
  }, [aggregatedMarkers]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
    <div
      ref={chartContainerRef}
      style={{ 
        width: "100%", 
        height: "500px", 
        position: "relative",
      }}
    />
  </div>
  );
};

export default ChartContainer;