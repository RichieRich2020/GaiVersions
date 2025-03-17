

export function interpolate4HourTo1Hour(data) {
  const oneHourData = [];
  
  for (let i = 0; i < data.length - 1; i++) {
    const currentCandle = data[i];
    const nextCandle = data[i + 1];
    
    // First hour is the opening hour
    oneHourData.push({
      timestamp: currentCandle.timestamp,
      open: currentCandle.open,
      high: currentCandle.high,
      low: currentCandle.low,
      close: currentCandle.close,
    });
    
    // Interpolate middle hours
    for (let hour = 1; hour < 4; hour++) {
      const progress = hour / 4;
      const interpolatedPrice = currentCandle.close + (nextCandle.open - currentCandle.close) * progress;
      
      oneHourData.push({
        timestamp: currentCandle.timestamp + hour * 3600000, // Add hours in milliseconds
        open: interpolatedPrice,
        high: interpolatedPrice * 1.0005, // Slight variation for visual purposes
        low: interpolatedPrice * 0.9995,
        close: interpolatedPrice,
      });
    }
  }
  
  // Add the last candle
  if (data.length > 0) {
    const lastCandle = data[data.length - 1];
    oneHourData.push({
      timestamp: lastCandle.timestamp,
      open: lastCandle.open,
      high: lastCandle.high,
      low: lastCandle.low,
      close: lastCandle.close,
    });
  }
  
  return oneHourData;
}

export function combine4HourTo6Hour(data) {
  const sixHourData = [];
  
  for (let i = 0; i < data.length - 1; i += 2) {
    if (i + 1 >= data.length) break;
    
    const combinedCandle = {
      timestamp: data[i].timestamp,
      open: data[i].open,
      high: Math.max(data[i].high, data[i + 1].high),
      low: Math.min(data[i].low, data[i + 1].low),
      close: data[i + 1].close
    };
    
    sixHourData.push(combinedCandle);
  }
  
  return sixHourData;
}

export function combine4HourToDaily(data)  {
  const dailyData = [];
  
  for (let i = 0; i < data.length - 5; i += 6) {
    const dayCandles = data.slice(i, i + 6);
    
    const combinedCandle = {
      timestamp: dayCandles[0].timestamp,
      open: dayCandles[0].open,
      high: Math.max(...dayCandles.map(c => c.high)),
      low: Math.min(...dayCandles.map(c => c.low)),
      close: dayCandles[dayCandles.length - 1].close
    };
    
    dailyData.push(combinedCandle);
  }
  
  return dailyData;
}