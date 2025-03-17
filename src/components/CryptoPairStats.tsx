import React from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Grid,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Styled components
const StatsCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.94)",
  borderRadius: "4px", // Further reduced radius
  color: "white",
  padding: "4px 4px", // Reduced padding more
  position: "relative",
  marginBottom: "0", // Removed margin bottom
  boxSizing: "border-box",
  height: "135px", // Set fixed height
  border: "1px solid transparent",
  backgroundClip: "padding-box",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    padding: "1px",
    background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
    pointerEvents: "none",
  }
}));

// Reduced size of glow overlay
const GlowOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "73%", // Further reduced
  height: "85px", // Further reduced
  background: "radial-gradient(circle, rgba(255, 255, 255, 0.61) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0) 70%)",
  zIndex: 0,
  top: "50px", // Adjusted for smaller size
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  borderRadius: "50%",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const PairHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2px", // Further reduced
  paddingTop: "2px", // Added padding top
}));

const PairLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem", // Further reduced
  fontWeight: "bold",
  color: "#ffffff",
}));

const BlueishLine = styled(Box)(({ theme }) => ({
  height: "1px",
  width: "85%",
  margin: "1px auto 5px auto", // Further reduced margins
  background: "linear-gradient(to right, transparent,rgb(120 44 138), transparent)",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "8%",
    right: "8%",
    height: "3px", // Reduced height
    background: "radial-gradient(ellipse at center, rgba(137, 49, 215, 0.8), transparent 70%)",
    filter: "blur(1px)",
  }
}));

const StatsGridContainer = styled(Grid)(({ theme }) => ({
  flex: "1", // Take remaining space
  marginTop: "0", // Remove margin
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50px", // Further reduced
  borderRadius: "3px", // Further reduced
  position: "relative",
  border: "1px solid transparent",
  backgroundClip: "padding-box",
  boxSizing: "border-box",
  padding: "2px", // Added minimal padding
  background: "rgba(0, 0, 0, 0.94)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    padding: "1px",
    background: "black",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
    pointerEvents: "none",
  }
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.5rem", // Further reduced
  color: "#9e9e9e",
  marginBottom: "1px", // Further reduced
  lineHeight: 1, // Tighten line height
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "0.55rem", // Further reduced
  fontWeight: "bold",
  color: "#ffffff",
  lineHeight: 1, // Tighten line height
}));

const PositiveChange = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#4caf50",
  fontWeight: "bold",
  fontSize: "0.55rem", // Matched to StatValue
  lineHeight: 1, // Tighten line height
}));

// Main component
const CryptoPairStats = ({
  pair = "XAU/USDT",
  currentPrice = "$0.1234",
  marketCap = "$629.97K",
  priceChange24h = "+5.67%",
  liquidity = "$500,000",
  fdv = "$0.1234",
  tvl = "$0.1234"
}) => {
  return (
    <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", height: "130px" }}>
      <StatsCard elevation={0}>
        {/* Adjusted glow overlays for the smaller component */}
        <GlowOverlay sx={{ top: "82px", left: "33%" }} />
        <GlowOverlay sx={{ top: "82px", left: "67%" }} />
        
        <ContentContainer>
          {/* Pair Header */}
          <PairHeader>
            <PairLabel>Pair: {pair}</PairLabel>
          </PairHeader>
          
          {/* Bluish Line Effect */}
          <BlueishLine />
          
          {/* Stats Grid - using smaller spacing */}
          <StatsGridContainer container spacing={0.2}>


            {/* Current Price */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>Current Price:</StatLabel>
                <StatValue>{currentPrice}</StatValue>
              </StatBox>
            </Grid>
            
            {/* Market Cap */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>MKT Cap</StatLabel>
                <StatValue>{marketCap}</StatValue>
              </StatBox>
            </Grid>
            
            {/* 24h Price Change */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>24h Price Change</StatLabel>
                <PositiveChange>
                  {priceChange24h}
                  <TrendingUpIcon sx={{ ml: 0.2, fontSize: "0.55rem" }} />
                </PositiveChange>
              </StatBox>
            </Grid>
            
            {/* Liquidity */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>Liquidity</StatLabel>
                <StatValue>{liquidity}</StatValue>
              </StatBox>
            </Grid>
            
            {/* FDV */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>FDV</StatLabel>
                <StatValue>{fdv}</StatValue>
              </StatBox>
            </Grid>
            
            {/* TVL */}
            <Grid item xs={4}>
              <StatBox>
                <StatLabel>TVL</StatLabel>
                <StatValue>{tvl}</StatValue>
              </StatBox>
            </Grid>
          </StatsGridContainer>
        </ContentContainer>
      </StatsCard>
    </Box>
  );
};

export default CryptoPairStats;