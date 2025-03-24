import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Avatar,
  Grid,
  Button,
  IconButton
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CampaignIcon from "@mui/icons-material/Campaign";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LinkIcon from "@mui/icons-material/Link";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChartwithTool from "./ChartwithTool";
import CryptoPairStats from "./CryptoPairStats";

// Props interface
const CashtagMentionedProps = {
  CashtagMentioned: "7" // Updated to 7 for the total number of cashtags
};

export interface CashtagProps {
  price: string | undefined;
  total_supply: string | undefined;
  contracts: any;
  TokenName: string;
  TokenAge: string;
  Chain: string;
  TokenLogo: string;
  ChainLogo: string;
  MarketCap: string;
  MarketCapChange: string;
  Volume24h: string;
  VolumeChange: string;
  Mentions24h: string;
  Influencers: string;
  Community: number;
  TokenBlockchainLink: string;
}

// Styled components
const CashtagCard = styled(Paper)(({ theme }) => ({
  width: "100%",
//   height: "180px",
  backgroundColor: "#0a0a0a",
  borderRadius: "9px",
  color: "white",
  padding: "12px",
  position: "relative",
  boxSizing: "border-box",
  border: "1px solid transparent",
  backgroundClip: "padding-box",
  overflow: "hidden",
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
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
    pointerEvents: "none"
  }
}));

// Updated GradientLine component to match TweetOwner component
const GradientLine = styled(Box)(({ theme }) => ({
  height: "1px",
  width: "70%",
  margin: "3px auto",
  background:
    "linear-gradient(to right, transparent, rgba(192, 192, 192, 0.8), transparent)",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "30%",
    right: "30%",
    height: "2px",
    background:
      "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8), transparent 70%)",
    filter: "blur(1px)"
  }
}));

const Divider = styled(Box)(({ theme }) => ({
  height: "1px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  margin: "4px -12px"
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px"
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: "bold",
  color: "#ffffff"
}));

const ScrollableButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  whiteSpace: "nowrap",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none"
  },
  position: "relative",
  padding: "0 24px"
}));

const CashtagButton = styled(Button)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected ? "#f8bd49" : "rgba(55, 55, 55, 0.5)",
    color: selected ? "#000000" : "#ffffff",
    borderRadius: "8px",
    padding: "4px 10px",
    margin: "0 4px",
    minWidth: "32px",
    height: "17px",
    fontSize: "0.6rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: selected ? "#f8bd49" : "rgba(75, 75, 75, 0.8)"
    }
  })
);

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(20, 20, 20, 0.7)",
  color: "#ffffff",
  padding: "2px",
  zIndex: 10,
  "&:hover": {
    backgroundColor: "rgba(40, 40, 40, 0.9)"
  }
}));

const TokenHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));

const TokenName = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: "bold",
  marginLeft: "8px"
}));

const TokenInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "0.7rem",
  color: "#9ca3af"
}));

const TokenChainLogo = styled(Avatar)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: "6px"
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: "#6b7280",
  fontSize: "0.80rem"
}));

const StatValue = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "0.9rem",
  fontWeight: "bold",
  marginRight: "4px"
}));

const PercentChange = styled(Typography)<{ negative?: boolean }>(
  ({ theme, negative }) => ({
    color: negative ? "#ff4d4d" : "#00cc66",
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginLeft: "4px"
  })
);

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "4px"
}));

const StatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));

// Main component
const CashtagMentioned: React.FC<any> = ({cashinfo}) => {

  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cashtagData: Record<string, CashtagProps> = cashinfo;

  const [selectedCashtag, setSelectedCashtag] = useState<string>(Object.keys(cashtagData)[0]||"");
 


  const currentData = cashtagData[selectedCashtag];

  const handleCashtagSelect = (cashtag: string) => {
    setSelectedCashtag(cashtag);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100;
      scrollContainerRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleExplorerClick = () => {
    window.open(currentData.TokenBlockchainLink, "_blank");
  };

  

  return (
    <CashtagCard elevation={0}>
      {/* Header with cashtag mentioned count and selector buttons */}
      <Header>
        <Title sx={{ fontSize: "0.7rem" }}>
          Cashtag Mentioned {CashtagMentionedProps.CashtagMentioned}
        </Title>
        <Box sx={{ position: "relative", width: "55%" }}>
          <ScrollButton
            onClick={() => handleScroll("left")}
            sx={{ left: 0 }}
            size="small"
          >
            <ArrowLeftIcon fontSize="small" />
          </ScrollButton>

          <ScrollableButtonContainer ref={scrollContainerRef}>
            {Object.keys(cashtagData).map((tag) => (
              <CashtagButton
                key={tag}
                selected={selectedCashtag === tag}
                onClick={() => handleCashtagSelect(tag)}
              >
                ${tag}
              </CashtagButton>
            ))}
          </ScrollableButtonContainer>

          <ScrollButton
            onClick={() => handleScroll("right")}
            sx={{ right: 0 }}
            size="small"
          >
            <ArrowRightIcon fontSize="small" />
          </ScrollButton>
        </Box>
      </Header>
      <Divider />

      {/* Grid Layout for the content */}
      <Grid container spacing={1} sx={{ py:2,mt: 0.5 ,borderBottom :"1px solid #333"}}>
        {/* 1. Top Left - Token Header */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <TokenHeader>
            <Avatar src={currentData.TokenLogo} sx={{ width: 24, height: 24 }}>
              ${selectedCashtag.charAt(0)}
            </Avatar>
            <TokenName>{selectedCashtag}</TokenName>
            <IconButton
              size="small"
              sx={{ padding: "2px", ml: 1, marginLeft: "3px" }}
              onClick={handleExplorerClick}
            >
              <LinkIcon
                fontSize="small"
                sx={{ color: "white", fontSize: "0.8rem" }}
              />
            </IconButton>
            <IconButton
              sx={{ padding: "2px", marginLeft: "1px" }}
              onClick={()=>{}}
            >
              {false ? (
                <BookmarkAddedIcon
                  sx={{ fontSize: "0.8rem", color: "#f8bd49" }}
                />
              ) : (
                <BookmarkAddIcon sx={{ fontSize: "0.8rem", color: "white" }} />
              )}
            </IconButton>
          </TokenHeader>
          <GradientLine />
        </Grid>

        {/* 2. Top Right - Mentions */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <StatContainer>
            <IconContainer>
              <AlternateEmailIcon sx={{ color: "white", fontSize: "0.8rem" }} />
            </IconContainer>
            <StatValue>{currentData.Mentions24h}</StatValue>
            <StatLabel>Mentions (24h)</StatLabel>
          </StatContainer>
          <GradientLine />
        </Grid>

        {/* 3. Middle Left - Token Info */}
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <TokenInfo>
            <TokenChainLogo src={currentData.ChainLogo} />
            {currentData.Chain} {currentData.TokenAge}
          </TokenInfo>
        </Grid>

        {/* 4. Middle Right - Influencers */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        
          }}
        >
          <StatContainer>
            <IconContainer>
              <CampaignIcon sx={{ color: "white", fontSize: "0.8rem" }} />
            </IconContainer>
            <StatValue>{currentData.Influencers}</StatValue>
            <StatLabel>Influencers</StatLabel>
          </StatContainer>
          <GradientLine />
        </Grid>

        {/* 5. Bottom Left - Market Cap and Volume */}
        {/* 5. Bottom Left - Market Cap and Volume */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            justifyContent: "center"
          }}
        >
          <Box>
            <StatLabel>Market Cap</StatLabel>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StatValue>{currentData.MarketCap}</StatValue>
              <PercentChange
                // negative={currentData.MarketCapChange.includes("-")}
              >
                {currentData.MarketCapChange}
              </PercentChange>
            </Box>
          </Box>

          <Box>
            <StatLabel>Volume (24h)</StatLabel>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StatValue>{currentData.Volume24h}</StatValue>
              <PercentChange>{currentData.VolumeChange}</PercentChange>
            </Box>
          </Box>
        </Grid>

        {/* 6. Bottom Right - Community */}
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <StatContainer>
            <IconContainer>
              <GroupsIcon sx={{ color: "white", fontSize: "0.8rem" }} />
            </IconContainer>
            <StatValue>{currentData.Community}</StatValue>
            <StatLabel>Community</StatLabel>
          </StatContainer>
        </Grid>
      </Grid>
      <ChartwithTool network={currentData.contracts[0].platform_coin_name} contract_address={currentData.contracts[0].contract_address} />
      <CryptoPairStats 
        pair = "XAU/USDT"
        currentPrice = {currentData.price}
        marketCap = {currentData.MarketCap}
        priceChange24h = "+5.67%"
        liquidity = {currentData.total_supply}
        fdv = "$0.1234"
        tvl = "$0.1234"
      />
    </CashtagCard>
  );
};

export default CashtagMentioned;
