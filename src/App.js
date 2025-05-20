import React, { useState } from "react";
import "./App.css";
import AccentButton from "./components/AccentButton";
import { Box, Grid, Paper, Skeleton } from "@mui/material";
import StatCard from "./components/StatCard";
import DisplayCard from "./components/DisplayCard";
import HashCard from "./components/HashCard";
import AtCard from "./components/AtCard";
import Cashtags from "./components/Cashtags";
import AllTrades from "./components/Alltrades";
import CustomTabs from "./components/CustomTabs";
import Navbar from "./components/Navbar";
import ChartwithTool from "./components/ChartwithTool";
import ChartContainer from "./components/ChartContainer";
import CryptoInsightsPanel from "./components/CryptoInsightsPanel";
import Login from "./components/Login";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Import the theme
import { AuthProvider } from "./config/AuthContext";
import PrivateRoute from "./config/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TweetOwner from "./components/TweetOwner";
import CryptoPairStats from "./components/CryptoPairStats";
import CashtagMentioned from "./components/CashtagMentioned";
import Referral from "./components/Referral";
import Search from "./components/Search";
import TokenCard from "./components/TokenCard";
import CashtagMentionedSkeleton from "./components/CashtagMentionedSkeleton";
import ErrorComponent from "./components/ErrorComponent";
import Home from "./components/Home";
import TweetChart from "./components/TweetChart"

function App() {


  const data= [
    {
        "cashtag": "trump",
        "count_mentions_last_24h": 21,
        "coins": [
            {
                "category": "coin",
                "id": "official-trump",
                "symbol": "trump",
                "name": "Official Trump",
                "token_address": "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
                "asset_platform_id": "solana",
                "image_url": "https://coin-images.coingecko.com/coins/images/53746/large/trump.png?1737171561",
                "price_in_usd": 13.78,
                "market_cap_in_usd": 2755790269,
                "market_cap_rank": 45,
                "fdv_in_usd": 13778953009,
                "total_volume_in_usd": 1292238580,
                "total_supply": 1000000000,
                "circulating_supply": 199999975.836,
                "max_supply": 1000000000,
                "price_ch_per_h24": -8.11007,
                "launch_date": null,
                "tickers": [
                    {
                        "base": "TRUMP",
                        "target": "USDT",
                        "market_name": "Binance",
                        "market_identifier": "binance",
                        "has_trading_incentive": null
                    }
                ],
                "pairs": {
                    "token_address": "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
                    "pair_name": "TRUMP / USDC",
                    "pair_address": "9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2",
                    "price": 0.0757706351944652,
                    "price_in_usd": 10.971034720045017,
                    "volume_h24_usd": 74651249.980773,
                    "market_cap_in_usd": 2194206678.89592,
                    "fdv_in_usd": 10971028340.7499,
                    "chain_id": "solana",
                    "total_liquidity_usd": 370381054.9714,
                    "price_ch_per_h24": -2.23,
                    "dex": "meteora",
                    "geckoterminal_network_id": "solana",
                    "pair_creation_date": "2025-01-18T10:39:31"
                }
            },
            {
                "category": "coin",
                "id": "maga",
                "symbol": "trump",
                "name": "MAGA",
                "token_address": "0x57f5fbd3de65dfc0bd3630f732969e5fb97e6d37",
                "asset_platform_id": "ethereum",
                "image_url": "https://coin-images.coingecko.com/coins/images/31498/large/Maga-Trump-Logo-200px.png?1696530309",
                "price_in_usd": 0.219075,
                "market_cap_in_usd": 9834455,
                "market_cap_rank": 1525,
                "fdv_in_usd": 9834455,
                "total_volume_in_usd": 288946,
                "total_supply": 45019550.127976805,
                "circulating_supply": 45019550.127976805,
                "max_supply": 47000000,
                "price_ch_per_h24": 5.76589,
                "launch_date": null,
                "tickers": [
                    {
                        "base": null,
                        "target": null,
                        "market_name": null,
                        "market_identifier": null,
                        "has_trading_incentive": null
                    }
                ],
                "pairs": {
                    "token_address": "0x57f5fbd3de65dfc0bd3630f732969e5fb97e6d37",
                    "pair_name": "TRUMP / WETH",
                    "pair_address": "0xAA4bdf13c4ca0594Daebb38Ae7D772B7e975B284",
                    "price": 0.000103228957673127,
                    "price_in_usd": 0.18599505973105,
                    "volume_h24_usd": 2735.1355879893,
                    "market_cap_in_usd": 8373413.91372019,
                    "fdv_in_usd": 657341.585186612,
                    "chain_id": "base",
                    "total_liquidity_usd": 22361.4397,
                    "price_ch_per_h24": -1.48,
                    "dex": "uniswap",
                    "geckoterminal_network_id": "base",
                    "pair_creation_date": "2024-03-21T07:48:57"
                }
            },
            {
                "category": "coin",
                "id": "meme-trumpcoin",
                "symbol": "trump",
                "name": "Meme TrumpCoin",
                "token_address": "0xd28b3fd350a14f0b1d14633e3d14db7b80406391",
                "asset_platform_id": "polygon-pos",
                "image_url": "https://coin-images.coingecko.com/coins/images/52523/large/MEME_TRUMPCOIN_LOGO.png?1733874512",
                "price_in_usd": 9.4124e-07,
                "market_cap_in_usd": 63298,
                "market_cap_rank": 6813,
                "fdv_in_usd": 67525,
                "total_volume_in_usd": 3674,
                "total_supply": 71747159836.33446,
                "circulating_supply": 67256397340.37093,
                "max_supply": 100000000000,
                "price_ch_per_h24": -0.45295,
                "launch_date": null,
                "tickers": [
                    {
                        "base": null,
                        "target": null,
                        "market_name": null,
                        "market_identifier": null,
                        "has_trading_incentive": null
                    }
                ],
                "pairs": {
                    "token_address": "0xd28b3fd350a14f0b1d14633e3d14db7b80406391",
                    "pair_name": "TRUMP / USDT",
                    "pair_address": "0xee5e97b7c60c3a0874bf9e9a9893977254d3b21f",
                    "price": 2.142119987351939e-09,
                    "price_in_usd": 3.81064653634229e-06,
                    "volume_h24_usd": 115148.926156812,
                    "market_cap_in_usd": 255861.044832011,
                    "fdv_in_usd": 267612.675332629,
                    "chain_id": "polygon_pos",
                    "total_liquidity_usd": 133884.4195,
                    "price_ch_per_h24": -3.31,
                    "dex": "uniswap_v3_polygon_pos",
                    "geckoterminal_network_id": "polygon_pos",
                    "pair_creation_date": "2024-12-01T05:02:16"
                }
            },
            {
                "category": "coin",
                "id": "moontrump",
                "symbol": "trump",
                "name": "MoonTrump",
                "token_address": "BqhNdGtS1Nqtzi2MvZ7G8NN1vRuHZ12UpHGJKe71e1JT",
                "asset_platform_id": "solana",
                "image_url": "https://coin-images.coingecko.com/coins/images/37344/large/trump.jpg?1714059656",
                "price_in_usd": 1.712e-05,
                "market_cap_in_usd": 17103,
                "market_cap_rank": 8360,
                "fdv_in_usd": 17103,
                "total_volume_in_usd": 16,
                "total_supply": 998787937,
                "circulating_supply": 998787937.0,
                "max_supply": 1000000000,
                "price_ch_per_h24": -1.24912,
                "launch_date": null,
                "tickers": [
                    {
                        "base": null,
                        "target": null,
                        "market_name": null,
                        "market_identifier": null,
                        "has_trading_incentive": null
                    }
                ],
                "pairs": {
                    "token_address": "BqhNdGtS1Nqtzi2MvZ7G8NN1vRuHZ12UpHGJKe71e1JT",
                    "pair_name": "TRUMP / SOL",
                    "pair_address": "2FgT8tbzYNbanXWA8t8rndGVMEhW6kCnKsST2A7uNEGo",
                    "price": 1.15577474250011e-07,
                    "price_in_usd": 1.71932212585835e-05,
                    "volume_h24_usd": 15.4080961282,
                    "market_cap_in_usd": 17172.3819926599,
                    "fdv_in_usd": 17081.381033001,
                    "chain_id": "solana",
                    "total_liquidity_usd": 17400.5017,
                    "price_ch_per_h24": -2.02,
                    "dex": "raydium",
                    "geckoterminal_network_id": "solana",
                    "pair_creation_date": "2024-04-08T23:24:23"
                }
            },
            {
                "category": "coin",
                "id": "trumpeffect69420",
                "symbol": "trump",
                "name": "TrumpEffect69420",
                "token_address": "0x69420cb71f5fa439a84545e79557977c0600c46e",
                "asset_platform_id": "ethereum",
                "image_url": "https://coin-images.coingecko.com/coins/images/51562/large/JuDaQ7ec_400x400.jpg?1731519740",
                "price_in_usd": 0.00030918,
                "market_cap_in_usd": 14541,
                "market_cap_rank": 8543,
                "fdv_in_usd": 14541,
                "total_volume_in_usd": 37,
                "total_supply": 47000000,
                "circulating_supply": 47000000.0,
                "max_supply": 47000000,
                "price_ch_per_h24": 0.59586,
                "launch_date": null,
                "tickers": [
                    {
                        "base": null,
                        "target": null,
                        "market_name": null,
                        "market_identifier": null,
                        "has_trading_incentive": null
                    }
                ],
                "pairs": {
                    "token_address": "0x69420cb71f5fa439a84545e79557977c0600c46e",
                    "pair_name": "TRUMP / WETH",
                    "pair_address": "0xf7Cbe7CB3a3BF14e836d855Bbcd4aa76cf104Ca8",
                    "price": 2.031e-07,
                    "price_in_usd": 0.0003693,
                    "volume_h24_usd": 382.46,
                    "market_cap_in_usd": 17361,
                    "fdv_in_usd": 17361,
                    "chain_id": "ethereum",
                    "total_liquidity_usd": 16663.67,
                    "price_ch_per_h24": 5.65,
                    "dex": "uniswap",
                    "geckoterminal_network_id": "eth",
                    "pair_creation_date": "2024-11-11T10:26:23"
                }
            }
        ],
        "tokens_pairs": [
            {
                "token_address": "0x0738a4d015e75d08b7f2395877a9404d2841a5d1",
                "token_image": "https://assets.geckoterminal.com/b3r1fecq4kmfd8zjnrf46p1wa296",
                "token_name": "PEPE TRUMP (pepetrump.cc)",
                "token_symbol": "TRUMP",
                "chain_id": "base",
                "pairs": {
                    "pair_name": "TRUMP / WETH",
                    "pair_address": "0xc046d17b0f00e416e842ad710071cac36c631898",
                    "price": 1.46610807886192e-11,
                    "price_in_usd": 2.24345442675362e-08,
                    "total_liquidity_usd": 89951.8413,
                    "volume_h24_usd": 1338647.70051756,
                    "market_cap_in_usd": null,
                    "fdv_in_usd": 382577.433365561,
                    "price_ch_per_h24": -94.24,
                    "geckoterminal_network_id": "base",
                    "network": "base",
                    "dex": "uniswap-v2-base",
                    "is_cg_listed": false,
                    "pair_creation_date": "2025-04-28T08:39:45"
                }
            }
        ]
    }
]

  // ✅ Now data is a JS object
console.log(data,"dfvrv");
const convertDataToFormattedObject =  (data) => {
    if (data.length === 0) return [];
    const formattedData = {};
  
    data?.forEach((item) => {
      const cashtag = item?.cashtag || "Unknown";
      const count_mentions_last_24h = item?.count_mentions_last_24h || 0;
  
      const coins = item.coins || [];
      const tokens_pairs = item.tokens_pairs||[]


      coins?.forEach((ele) => {
        // Find ticker from Binance market
        let ticker = "";
        let pairName   = ""
        if (ele.tickers && Array.isArray(ele.tickers)) {
          const binanceTicker = ele.tickers.find(t => t.market_name === "Binance");
          if (binanceTicker) {
            ticker = `${binanceTicker.base}${binanceTicker.target}`;
            pairName =`${binanceTicker.base}/${binanceTicker.target}`;
          }
        }
        // If ticker is N/A, pull pairs data
        let pairs = null;
        if (ele.pairs) {
          pairs = {
            pair_name: ele.pairs?.pair_name || null,
            pair_address: ele.pairs?.pair_address || null,
            price_in_usd: ele.pairs?.price_in_usd || null,
            volume_h24_usd: ele.pairs?.volume_h24_usd || null,
            market_cap_in_usd: ele.pairs?.market_cap_in_usd || null,
            fdv_in_usd: ele.pairs?.fdv_in_usd || null,
            chain_id: ele.pairs?.chain_id || null,
            dex: ele.pairs?.dex || null,
            pair_creation_date: ele.pairs?.pair_creation_date || null,
            geckoterminal_network_id:ele.pairs?.geckoterminal_network_id
          };
        }
  
        const formattedItem = {
          id:ele?.id||"",
          category: ele?.category || "N/A",
          TokenName: ele?.name || "Unknown",
          Symbol: ele?.symbol || "N/A",
          TokenAge: "AGE", // Placeholder
          TokenLogo: ele?.image_url || "",
          MarketCap: ele?.market_cap_in_usd || 0,
          Mentions24h: count_mentions_last_24h,
          current_price:ele?.price_in_usd ,
          total_volume: ele?.total_volume || 0,
          price_change_percentage_1hr: ele?.price_change_percentage_1hr || 0,
          price_change_percentage_24hr: ele?.price_change_percentage_24hr || 0,
          price_change_percentage_30day: ele?.price_change_percentage_30day || 0,
          circulating_supply: ele?.circulating_supply || "N/A",
          total_supply: ele?.total_supply || "N/A",
          max_supply: ele?.max_supply || "N/A",
          cmc_rank: ele?.market_cap_rank || "N/A",
          token_address: ele?.token_address || [],
          //   chain_id: ele?.chain_id || "N/A",
          ticker: ticker,
          pairs: ele?.pairs, // ✅ Add pairs if ticker is N/A, otherwise will be null
          pairName:pairName||pairs?.pair_name,
        };
  
        // Add to formattedData
        if (!formattedData[cashtag]) {
          formattedData[cashtag] = [];
        }
        formattedData[cashtag].push(formattedItem);
      });
  
      tokens_pairs?.forEach((ele) => {

      //   [
      //     {
      //         "cashtag": "gork",
      //         "count_mentions_last_24h": 58,
      //         "coins": [],
      //         "tokens_pairs": [
      //             {
      //                 "token_address": "A1KysWJzqMV1ui1jbzpHvX9ufebn13PZoUicngPtpump",
      //                 "token_image": "https://assets.geckoterminal.com/s1bi6e5guikqx3y08dl4r88y5gxq",
      //                 "token_name": "Body Of Gorilla, Head Of Shark",
      //                 "token_symbol": "GORK",
      //                 "chain_id": "solana",
      //                 "pairs": {
      //                     "pair_name": "Gork / SOL",
      //                     "pair_address": "6KAf2WJZEcxjpmvuWbxbJi4KQP2m5A9h6azxW9vozeM1",
      //                     "price": 9.937e-8,
      //                     "price_in_usd": 0.0000143,
      //                     "total_liquidity_usd": 13831.12,
      //                     "volume_h24_usd": 2264791.91,
      //                     "market_cap_in_usd": 14306,
      //                     "fdv_in_usd": 14306,
      //                     "price_ch_per_h24": -75.77,
      //                     "network": "solana",
      //                     "dex": "pumpswap",
      //                     "is_cg_listed": false,
      //                     "pair_creation_date": "2025-05-05T01:55:13"
      //                 }
      //             }
      //         ]
      //     }
      // ]
      //   let pairs = null;
  
      //     pairs = {
      //       chain_id:ele?.network,
      //       pair_name:  ele?.pair_name|| null,
      //       pair_address: ele?.pair_address|| null,
      //       price_in_usd: ele?.price_in_usd || null,
      //       volume_h24_usd: ele?.volume_h24_usd || null,
      //       market_cap_in_usd:  ele?.market_cap_in_usd || null,
      //       fdv_in_usd: ele?.fdv_in_usd || null,
      //       chain_id:ele?.chain_id  || null,
      //       dex: ele?.dex || null,
      //       pair_creation_date: ele?.pair_creation_date || null,
      //     };
        
        const formattedItem = {
          is_cg_listed:ele?.is_cg_listed,
          id:ele?.id||"",
          category: "token",
          TokenName: ele?.token_name || "Unknown",
          Symbol: ele?.token_symbol || "N/A",
          TokenAge: "AGE", // Placeholder
          TokenLogo: ele?.token_image || "",
          MarketCap: ele?.pairs?.market_cap_in_usd || 0,
          token_address:ele?.token_address,
          pair_address:ele?.pairs?.pair_address,
          volume_h24_usd:ele?.pairs?.volume_h24_usd,
          Mentions24h: count_mentions_last_24h,
          current_price:ele?.pairs?.price_in_usd ,
          price_change_percentage_1hr: ele?.price_ch_per_h1 || 0,
          price_change_percentage_6hr: ele?.price_ch_per_h6 || 0,
          price_change_percentage_24hr: ele?.price_ch_per_h24 || 0,
          //   chain_id: ele?.?chain_id || "N/A",
          pairName: ele?.pairs?.pair_name,
          pair_image:ele?.pair_image,
          total_liquidity_usd:ele?.pairs?.total_liquidity_usd,
          fdv_in_usd:ele?.pairs?.fdv_in_usd,
          dex:ele?.dex,
          pairs:ele?.pairs
        };
  
        // Add to formattedData
        if (!formattedData[cashtag]) {
          formattedData[cashtag] = [];
        }
        formattedData[cashtag].push(formattedItem);
      });
    });
  
    return  formattedData;
  }
const result= convertDataToFormattedObject(data);
console.log(result,"abhiprops");

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Normalizes styles */}
          {/* <Navbar/> */}
          {/* <DisplayCard />
    <HashCard />
    <AtCard />
    <Cashtags user={mockData.user} cashtagss={mockData.cashtags} />
    <CustomTabs/> */}
          {/* <CryptoInsightsPanel/>
    <CustomTabs/>
    <Login/> */}
          {/* <Router>
        <Routes>
          <Route path="/" element={<CryptoInsightsPanel />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<CryptoInsightsPanel />} />} />
        </Routes>
      </Router> */}
          {/* <CryptoInsightsPanel /> */}
          {/* <TokenCard
            tokenName={"xrp"}
            pair={""}
            exchange={""}
            network={""}
            price={0}
            priceChange={0}
            marketCap={0}
            volume={0}
            liquidity={0}
            age={""}
            tokenIcon={""}
          />*/}
        {/* <Tweet /> */}
         <CashtagMentioned
            cashinfo={result}
          /> 
           {/* <Search />  */}
          {/* <ErrorComponent/>
          <CashtagMentionedSkeleton />
          <CryptoPairStats />
          <Paper
            sx={{
              width: "100%",
              height: "500px",
              backgroundColor: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              border: "1px solid #333"
            }}
          >
            <Skeleton
              variant="rectangular"
              width="90%"
              height="400px"
              sx={{ bgcolor: "#1f1f1f" }}
            />
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#1f1f1f" }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{ bgcolor: "#1f1f1f", mt: 1 }}
              />
            </Box>
          </Paper> */}
          <Search/>

          <TweetChart />
          {/* <ErrorComponent
              errorType="NO_CASHTAG"
              message="No cryptocurrency cashtags found. Try analyzing a tweet that mentions tokens like $BTC or $ETH."
            /> */}
            
          {/* <Home/> */}
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;

// <Grid container spacing={2} sx={{ marginTop: 4, justifyContent: 'center' }}>
// <Grid item>
//   <StatCard value="500.6K" label="Followers" bgColor="#002c5c" />
// </Grid>
// <Grid item>
//   <StatCard value="100" label="Tweets" bgColor="#002c5c" />
// </Grid>
// <Grid item>
//   <StatCard value="50K" label="Avg. View"  bgColor="#F40000"/>
// </Grid>
// </Grid>
