import React, { useState, useEffect } from "react";

import Home from "./Home";

import Tweet from "./Tweet";
import { Box } from "@mui/material";
import Midnavbar from "./Midnavbar";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Referral from "./Referral";
import CashtagsPage from "./CashtagsPage";
import Login from "./Login";

const CryptoInsightsPanel: React.FC = () => {
  const [page, setPage] = useState("home");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#090909",
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
          // minHeight: "100vh", // Make sure it takes full viewport height
          width: "100%",
          maxWidth: "500px", // Prevents stretching too wide
          margin: "auto",
          // gap: 2, // Adds spacing between cards
          
          // border:"2px solid red"
        }}
      >
        {/* Header */}
        <Navbar setPage={setPage} page={page} />

        {/* Search Bar */}
        <Midnavbar setPage={setPage} page={page} />

        {page === "home" && <Home />}
        {page === "Profile" && <Profile />}
        {page === "Tweet" && <Tweet />}
        {page === "CashTag" && <CashtagsPage />}
        {page === "Referral" && <Referral />}

        <Login/>
      </Box>
    </Box>
  );
};

export default CryptoInsightsPanel;
