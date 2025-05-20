import React, { useState, useEffect } from "react";
import axios from "axios";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
} from "@mui/material";
import ChartContainer from "./ChartContainer";
import ErrorComponent from "./ErrorComponent";

// Types
interface OHLCVData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TweetData {
  tweet_id: number;
  created_at: string;
  user_id: number;
  username: string;
  screen_name: string | null;
  timestamp: number;
}

const timeFrames = ["1m", "5m", "15m", "1h", "4h", "12h", "1d"];

// Skeleton loader
const ChartSkeleton = () => {
  return (
    <Box sx={{ width: "100%", height: "500px", p: 0, backgroundColor: "#121212", position: "relative" }}>
      <Box display="flex" justifyContent="space-between" p={1}>
        <Skeleton variant="rounded" width={120} height={24} sx={{ bgcolor: "grey.800" }} />
        <Box display="flex" gap={1}>
          <Skeleton variant="rounded" width={80} height={32} sx={{ bgcolor: "grey.800" }} />
          <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: "grey.800" }} />
        </Box>
      </Box>
      <Box sx={{ px: 2, mb: 2 }}>
        <Skeleton variant="rounded" width="60%" height={16} sx={{ mb: 1, bgcolor: "grey.800" }} />
        <Skeleton variant="rounded" width="40%" height={16} sx={{ bgcolor: "grey.800" }} />
      </Box>
      <Box sx={{
        height: "371px",
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
        backgroundColor: "#1a1a1a",
        mx: 2,
        mb: 2,
        borderRadius: 1,
        p: 1,
      }}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rounded"
            width="5%"
            height={`${50 + Math.random() * 40}%`}
            sx={{ bgcolor: "grey.800" }}
          />
        ))}
      </Box>
    </Box>
  );
};

const ChartwithToolCoin: React.FC<any> = ({ selectData }) => {
  console.log(selectData,"lkjhgfdssfgh");  
  const [data, setData] = useState<OHLCVData[]>([]);
  const [tweetData, setTweetData] = useState<TweetData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("1h");


  

  useEffect(() => {
    if (selectData?.ticker) {
      fetchData();
    }
  }, [selectData, timeFrame]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${selectData?.ticker}&interval=${timeFrame}&limit=1000`
      );

      const ohlcvData = response.data;

      const formatted = ohlcvData.map((item: any) => ({
        timestamp: item[0],
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
      }));

      setData(formatted);
    } catch (err: any) {
      setError(err.message || "Failed to fetch OHLCV data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTweetInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.marwalproduction.com/tweets_influencers?cashtag=${selectData?.Symbol}`
      );

      const result: TweetData[] = response.data.map((item: any) => ({
        ...item,
        timestamp: new Date(item.created_at).getTime(),
      }));

      setTweetData(result);
    } catch (err: any) {
      console.error("Tweet fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchTweetInfo();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#0a0a0a", color: "white", maxWidth: "500px", width: "100%" }}>
      <Box maxWidth="xl" mx="auto">
        <Box borderRadius={2} boxShadow={3} pt={1} pb={1}>
          {error ? (
            <Box sx={{ width: "93%", p: 2, backgroundColor: "#0a0a0a", borderRadius: "5px" }}>
              <ErrorComponent
                errorType={
                  error.includes("404")
                    ? "DATA_NOT_FOUND"
                    : error.includes("network")
                      ? "NETWORK_ERROR"
                      : "DEFAULT2"
                }
                onRetry={fetchData}
              />
            </Box>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  p: "4px",
                  backgroundColor: "#121212",
                  border: "1px solid #aaaaaa38",
                  borderBottom: "none",
                  borderRadius: "5px 5px 0 0",
                }}
              >
                <ToggleButtonGroup
                  value={timeFrame}
                  exclusive
                  onChange={(e, newFrame) => newFrame && setTimeFrame(newFrame)}
                  sx={{ display: "flex", gap: 1, borderRadius: 2, p: "4px" }}
                >
                  {timeFrames.map((frame) => (
                    <ToggleButton
                      key={frame}
                      value={frame}
                      sx={{
                        color: "#A0A0A0",
                        fontSize: "14px",
                        textTransform: "none",
                        "&.Mui-selected": {
                          color: "rgb(139, 92, 246)",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                        },
                        p: 1,
                      }}
                    >
                      {frame}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>

                <Typography sx={{ fontSize: "12px", color: "rgb(139, 92, 246)", alignSelf: "center" }}>
                  {selectData?.Symbol?.toUpperCase()} / USD
                </Typography>

                <IconButton onClick={fetchData} disabled={loading} color="primary">
                  {loading ? <CircularProgress size={21} /> : <Refresh />}
                </IconButton>
              </Box>

              <Box
                sx={{
                  pb: "0px",
                  border: "1px solid #aaaaaa38",
                  borderTop: "none",
                  backgroundColor: "#121212",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                {loading ? (
                  <ChartSkeleton />
                ) : data.length ? (
                  <ChartContainer xdata={tweetData ?? []} data={data} />
                ) : null}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChartwithToolCoin;
