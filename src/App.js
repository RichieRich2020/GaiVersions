import React, { useState } from 'react';
import './App.css';
import AccentButton from './components/AccentButton';
import { Box, Grid } from '@mui/material';
import StatCard from './components/StatCard';
import DisplayCard from './components/DisplayCard';
import HashCard from './components/HashCard';
import AtCard from './components/AtCard';
import Cashtags from './components/Cashtags';
import AllTrades from './components/Alltrades';
import CustomTabs from './components/CustomTabs';
import Navbar from './components/Navbar';
import ChartwithTool from './components/ChartwithTool';
import ChartContainer from './components/ChartContainer';
import CryptoInsightsPanel from './components/CryptoInsightsPanel';
import Login from './components/Login';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Import the theme
import {AuthProvider} from "./config/AuthContext"
import PrivateRoute from "./config/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  TweetOwner from "./components/TweetOwner"
import  CryptoPairStats from "./components/CryptoPairStats"
import CashtagMentioned from "./components/CashtagMentioned"
import Referral from "./components/Referral"
import Search from "./components/Search"
import TokenCard from './components/TokenCard';
function App() {
  const mockData = {
    user: {
      user_id: 44629,
      username: "@ChristineA73398",
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1860540261564317697/sa_F0nri_normal.jpg",
    },
    cashtags: [
      {
        cashtag: "DOG",
        coin_info: {
          name: "Dog (Bitcoin)",
          price: 0.105449732201988098,
          volume_24hr: 38353968.2995797,
          market_cap: 544973220.1988097,
          tags: ["memes", "bitcoin-ecosystem", "runes"],
          cmc_rank: 1
        },
      },
      {
        cashtag: "SKI",
        coin_info: {
          name: "Ski Mask Dog",
          price: 0.1984906539000565,
          volume_24hr: 18468035.84733124,
          market_cap: 196386066.82581493,
          tags: ["memes", "doggone-doggerel", "base-ecosystem"],
          cmc_rank: 23
        },
      },
      {
        cashtag: "DOG",
        coin_info: {
          name: "Dog (Bitcoin)",
          price: 98591.60,
          volume_24hr: 38353968.2995797,
          market_cap: 544973220.1988097,
          tags: ["memes", "bitcoin-ecosystem", "runes"],
          cmc_rank: 34
        },
      },
      {
        cashtag: "SKI",
        coin_info: {
          name: "Ski Mask Dog",
          price: 1.1984906539000565,
          volume_24hr: 18468035.84733124,
          market_cap: 1950688945612 ,
          tags: ["memes", "doggone-doggerel", "base-ecosystem","memes", "doggone-doggerel", "base-ecosystem","memes", "doggone-doggerel", "base-ecosystem"],
          cmc_rank: 233
        },
      },
    ],
  };

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
 

<CryptoInsightsPanel/>
<TokenCard tokenName={"xrp"}
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
/>    
   <Search/>
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