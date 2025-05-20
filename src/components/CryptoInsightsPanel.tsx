import React, { useState, useEffect } from "react";
import Home from "./Home";
import Tweet from "./Tweet";
import { Box, Typography } from "@mui/material";
import Midnavbar from "./Midnavbar";
import Navbar from "./Navbar";
import Referral from "./Referral";
import CashtagsPage from "./CashtagsPage";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Tooltip } from '@mui/material';

// Replace the ComingSoonPlaceholder component in CryptoInsightsPanel.tsx
const ComingSoonPlaceholder = () => (
  <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      color: '#555',
      gap: 2,
      cursor: 'not-allowed',
      opacity: 0.7,
      border: '1px dashed #555',
      borderRadius: '8px',
      margin: '16px',
      textAlign: 'center',
      padding: '16px'
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Feature Coming Soon</Typography>
    <Typography variant="body2">We're working hard to bring you this functionality</Typography>
  </Box>
);


const CryptoInsightsPanel: React.FC = () => {
  const [page, setPage] = useState("Home");
  const [searchedData, setSearchedData] = useState<any>([]);
  const [searchLoading, isSearchLoading] = useState<any>(false);
   const [searchedDatabool, setSearchedDatabool]: any = useState(false);
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    const handleMessage = (message: any) => {
        if (message.type === "updatePage") {
          console.log(message.page,"message.page");
            setPage(message.page);
            setValue(1)
        }
    };

    // chrome.runtime.onMessage.addListener(handleMessage);

    // return () => {
    //     chrome.runtime.onMessage.removeListener(handleMessage);
    // };
}, []);


useEffect(() => {

if(page!="Tweet"){
  setSearchedData([]);
}

},[page])

useEffect(() => {
  // ✅ Clear searched data when component mounts or page changes
  setSearchedData([]);

  // 🧹 Cleanup function
  return () => {
    setSearchedData([]);
    setPage("Home");
    setValue(0);
    console.log("Cleaned up: State reset.");
  };
}, []);


  return (
    <Box
    sx={{
      minHeight: "100vh",
      bgcolor: "#090909",
      minWidth:"500px",
    }}
  >
    <Box
      sx={{
        bgcolor: "#090909",
        px: 1.5,
        display: "flex",
        flexDirection: "column", // Stack items vertically
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        minHeight: "100vh", // Make sure it takes full viewport height
        width: "100%",
        maxWidth: "500px", // Prevents stretching too wide
        margin: "auto",
        // gap: 2, // Adds spacing between cards
        // border:"1px solid #3b3838"
        // border:"2px solid red"
      }}
    >
      {/* Header */}
      <Navbar setPage={setPage} page={page} />

      {/* Search Bar */}
      <Midnavbar setPage={setPage} page={page}  setSearchedData={setSearchedData} setValue={setValue} value={value} searchLoading={searchLoading} isSearchLoading={isSearchLoading } setSearchedDatabool={setSearchedDatabool}/>

      <Box  sx={{
        minHeight: "90vh",
      }}>
      {page === "Home" && <Home setPage={setPage} setSearchedData={setSearchedData} isSearchLoading={isSearchLoading } setSearchedDatabool={setSearchedDatabool}/>}
      {page === "Tweet" && <Tweet searchedData={searchedData} setSearchedData={setSearchedData} searchLoading={searchLoading} searchedDatabool={searchedDatabool}  setSearchedDatabool={setSearchedDatabool}/>}
      {page === "CashTag" && <CashtagsPage />}
      {page === "Hashtag" && <CashtagsPage />}
        {page === "Account" && <Referral />}
      </Box>
    </Box>
  </Box>
  );
};

export default CryptoInsightsPanel;
