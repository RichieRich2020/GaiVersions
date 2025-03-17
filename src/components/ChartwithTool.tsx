import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CandlestickChart } from 'lucide-react';
import ChartContainer from './ChartContainer';
import { Box, IconButton, Typography, CircularProgress, Alert, MenuItem, Select } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ChartwithToolProps {
  
  network: string;
  contract_address: string;
}

interface OHLCVData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TweetData {
  tweet_id: number;
  created_at: string;
  user_id: number;
  username: string;
  screen_name: string | null;
  timestamp: number;
}

const timeFrameMapping: Record<string, { unit: string; aggregate: number }> = {
  '1m': { unit: 'minute', aggregate: 1 },
  '5m': { unit: 'minute', aggregate: 5 },
  '15m': { unit: 'minute', aggregate: 15 },
  '1h': { unit: 'hour', aggregate: 1 },
  '4h': { unit: 'hour', aggregate: 4 },
  '12h': { unit: 'hour', aggregate: 12 },
  '1d': { unit: 'day', aggregate: 1 },
};

const ChartwithTool: React.FC<ChartwithToolProps> = ({  network, contract_address }) => {
  const [data, setData] = useState<OHLCVData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [poolAddress, setPoolAddress] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>('1m');
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<string | null>(null);
  const [tweetData, setTweetData] = useState<TweetData[] | null>(null);

  useEffect(() => {
    fetchPoolAddress();
  }, [network, contract_address]);

  useEffect(() => {
    if (poolAddress && networkId) {
      fetchData();
    }
  }, [poolAddress, timeFrame, networkId]);

  useEffect(() => {
    if (formattedData) {
      fetchTweetInfo();
    }
  }, [formattedData]);

  const fetchPoolAddress = async () => {
    setLoading(true);
    setError(null);
    try {
      const networksResponse = await axios.get('https://api.geckoterminal.com/api/v2/networks');
      const networks = networksResponse.data?.data || [];
      const networkMatch = networks.find((n: any) => n.attributes.name.toLowerCase().includes(network.toLowerCase()));
      
      if (!networkMatch) throw new Error('Network not found');
      
      const networkId = networkMatch.id;
      setNetworkId(networkId);
      
      const response = await axios.get(`https://api.geckoterminal.com/api/v2/networks/${networkId}/tokens/${contract_address}`);
      const topPool = response.data?.data?.relationships?.top_pools?.data?.[0]?.id;
      
      setFormattedData(response.data?.data?.attributes.symbol);
      if (topPool) {
        const extractedAddress = topPool.split('_')[1];
        setPoolAddress(extractedAddress);
      } else {
        throw new Error('No top pool found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pool address');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!poolAddress || !networkId) return;
    setLoading(true);
    setError(null);
    try {
      const { unit, aggregate } = timeFrameMapping[timeFrame];
      const response = await axios.get(
        `https://api.geckoterminal.com/api/v2/networks/${networkId}/pools/${poolAddress}/ohlcv/${unit}?aggregate=${aggregate}&limit=1000`
      );
      const ohlcvData = response.data?.data?.attributes?.ohlcv_list || [];
      const formattedData = ohlcvData.map((item: number[]) => ({
        timestamp: item[0] * 1000,
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
      }));
      setData(formattedData);
      await fetchTweetInfo();
    } catch (err: any) {
      setError(err.message || 'Failed to fetch OHLCV data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTweetInfo = async () => {
    if (!formattedData) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://g-ai-backend.onrender.com/tweets_influencers?cashtag=${formattedData}`);
      const result: TweetData[] = response.data.map((item: any) => ({
        ...item,
        timestamp: new Date(item.created_at).getTime(),
      }));
      setTweetData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tweets data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box  sx={{
      // backgroundColor: "#1a1b23",
      backgroundColor: "#0a0a0a",
      // border:"2px solid red",
       color:"white"
    }}>
      <Box maxWidth="xl" mx="auto" >
        <Box borderRadius={2} boxShadow={3} pt={2} pb={1}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <CandlestickChart color="primary" />
              {/* <Typography variant="h5" fontWeight="bold">{name} Chart</Typography> */}
            </Box>
            <Box display="flex" alignItems="center" gap={2} >
            <Select
  value={timeFrame}
  onChange={(e) => setTimeFrame(e.target.value)}
  size="small"
  sx={{
    color: 'rgb(139, 92, 246)',
    '& .MuiSelect-icon': {
      color: 'rgb(139, 92, 246)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(139, 92, 246)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(139, 92, 246)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(139, 92, 246)',
    },
  }}
>
  {Object.keys(timeFrameMapping).map((key) => (
    <MenuItem
      key={key}
      value={key}
      sx={{
        color: 'rgb(139, 92, 246)',
        '&:hover': {
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
        },
      }}
    >
      {key.toUpperCase()}
    </MenuItem>
  ))}
</Select>

              <IconButton onClick={fetchData} disabled={loading} color="primary">
                {loading ? <CircularProgress size={20} /> : <Refresh />}
              </IconButton>
            </Box>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {loading ? <Box display="flex" justifyContent="center" ><CircularProgress size={40} /></Box> : data.length ? <ChartContainer xdata={tweetData??[]} data={data} /> : <Typography>No data available.</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default ChartwithTool;
