import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartContainer from "./ChartContainer";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  useTheme
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import ErrorComponent from "./ErrorComponent";
import { networks } from "./networks";


interface ChartwithToolProps {
  selectData: any;
}

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

const timeFrameMapping: Record<string, { unit: string; aggregate: number }> = {
  "1m": { unit: "minute", aggregate: 1 },
  "5m": { unit: "minute", aggregate: 5 },
  "15m": { unit: "minute", aggregate: 15 },
  "1h": { unit: "hour", aggregate: 1 },
  "4h": { unit: "hour", aggregate: 4 },
  "12h": { unit: "hour", aggregate: 12 },
  "1d": { unit: "day", aggregate: 1 }
};

const ChartSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
        p: 0,
        backgroundColor: "#121212",
        position: "relative",
      }}
    >
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
      <Box
        sx={{
          height: "371px",
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          backgroundColor: "#1a1a1a",
          mx: 2,
          mb: 2,
          borderRadius: 1,
          p: 1,
        }}
      >
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

const ChartwithTool: React.FC<ChartwithToolProps> = ({ selectData }) => {
  console.log(selectData,"selectData");

  const [data, setData] = useState<OHLCVData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("1h");
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<string | null>(null);
  const [tweetData, setTweetData] = useState<TweetData[] | null>(null);

  useEffect(() => {
    if (selectData) {
      fetchChartData();
    }
  }, [selectData, timeFrame]);

  useEffect(()=>{
    fetchTweetInfo();
  },[])
  
  const fetchChartData = async () => {
    setLoading(true);
    setError(null);
    console.log(selectData,"lkjhgfdssfgh");
    // const normalize = (str: string | null | undefined) => {
    //   if (!str) return ""; // or return undefined/null depending on how you handle it
    //   return str.toLowerCase().replace(/[-_]/g, "");
    // };
    // console.log("networks:", networks);
    try {
   
      // const networkMatch = networks.find(
    
      //   (n: any) =>{
     
      //    return  normalize(n?.attributes?.coingecko_asset_platform_id) === normalize(selectData?.pairs?.chain_id)
      //   }
        
      // );
  
     
  
      // let networkId = networkMatch.id;
      //  if (!networkMatch){ networkId = selectData?.pairs?.chain_id}
      // console.log(networkId,"networkId");
      const { unit, aggregate } = timeFrameMapping[timeFrame];
  
      // Step 2: Fetch OHLCV
      const ohlcvRes = await axios.get(
        `https://api.geckoterminal.com/api/v2/networks/${selectData?.pairs?.geckoterminal_network_id}/pools/${selectData?.pairs?.pair_address}/ohlcv/${unit}?aggregate=${aggregate}&limit=1000`
      );
      console.log(ohlcvRes,"networkId");
      const ohlcvList = ohlcvRes.data?.data?.attributes?.ohlcv_list || [];
  
      const formatted = ohlcvList.map((item: number[]) => ({
        timestamp: item[0] * 1000,
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        volume: item[5]
      }));
  
      // setFormattedData(selectData?.Symbol);
      setData(formatted);
  
      // Step 3: Fetch tweet data
      // await fetchTweetInfo(selectData?.Symbol);
    } catch (err: any) {
      console.error("Error in fetchChartData:", err);
      setError(err.message || "Failed to fetch chart data");
      setData([]);
      // setFormattedData(null);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchTweetInfo = async () => {
    // if (!formattedData) return;
    try {
      const res = await axios.get(
        `https://api.marwalproduction.com/tweets_influencers?cashtag=${selectData?.Symbol}`
      );
      const tweets: TweetData[] = res.data.map((tweet: any) => ({
        ...tweet,
        timestamp: new Date(tweet.created_at).getTime()
      }));
      setTweetData(tweets);
    } catch (err: any) {
      console.error("Error fetching tweets:", err);
      // setError(err.message || "Failed to fetch tweet data") ;
    }
  };

  return (
    <Box sx={{ backgroundColor: "#0a0a0a", color: "white", maxWidth: "500px", width: "100%" }}>
      <Box maxWidth="xl" mx="auto">
        <Box borderRadius={2} boxShadow={3} pt={1} pb={1}>
          {error ? (
            <Box sx={{ width: "93%", p: 2, backgroundColor: "#0a0a0a", borderRadius: 1 }}>
              <ErrorComponent
                errorType={
                  error.includes("404")
                    ? "DATA_NOT_FOUND"
                    : error.includes("network")
                      ? "NETWORK_ERROR"
                      : "DEFAULT2"
                }
                onRetry={fetchChartData}
              />
            </Box>
          ) : (
            <>
              <Box sx={{
                borderRadius: 1,
                width: "100%",
                overflow: "hidden"
              }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    width: "96.4%",
                    p: 1,
                    backgroundColor: "#121212",
                    border: "1px solid #aaaaaa38",
                    borderBottom: "none"
                  }}
                >
                  <ToggleButtonGroup
                    value={timeFrame}
                    exclusive
                    onChange={(e, newFrame) => newFrame && setTimeFrame(newFrame)}
                    sx={{ gap: 1, borderRadius: 2, p: 0.5 }}
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
                            color: "rgb(139, 92, 246)"
                          },
                          "&:hover": {
                            backgroundColor: "rgba(139, 92, 246, 0.2)"
                          },
                          p: 1
                        }}
                      >
                        {frame}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>

                  <Typography sx={{ fontSize: "12px", color: "rgb(139, 92, 246)" , alignSelf: "center" }}>
                    {selectData?.pairs?.pair_name?.toUpperCase()}
                  </Typography>

                  <IconButton onClick={fetchChartData} disabled={loading} color="primary">
                    {loading ? <CircularProgress size={21} /> : <Refresh />}
                  </IconButton>
                </Box>

                <Box sx={{
                  width: "100%",
                  p: 0,
                  backgroundColor: "#121212",
                  border: "1px solid #aaaaaa38",
                  borderTop: "none",
                  borderBottomLeftRadius: 1,
                  borderBottomRightRadius: 1
                }}>
                  {loading ? (
                    <ChartSkeleton />
                  ) : data.length ? (
                    <ChartContainer xdata={tweetData ?? []} data={data} />
                  ) : null}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChartwithTool;
