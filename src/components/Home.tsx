import {
  Box,
  Typography,
  InputBase,
  Card,
  Chip,
  IconButton,
  Paper,
  styled,
  Avatar,
  Grid,
  Collapse,
  Stack,
  Skeleton
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useEffect, useState } from "react";
import ChartwithTool from "./ChartwithTool";
interface TrendingCoin {
  symbol: string;
}

interface CoinInfo {
  platform_name: string;
  contract_address: string;
  name: string;
  symbol: string;
  thumb: string;
  inserted_at: string;
  total_mentions: number;
  price_ch_24h: number;
}

const ColumnItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem"
  }
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between"
  }
}));

const ImageWrapper = styled(Box)({
  width: "99.6%",
  height: "180px",
  display: "inline-block",
  borderRadius: "9px",
  // padding: "0.8px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  overflow: "hidden"
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "9px"
});

const BannerCard = styled(Card)({
  width: "100%",
  height: "100%",
  marginTop: "-1px",
  backgroundColor: "#090909",
  borderRadius: "9px",
  overflow: "hidden",
  position: "relative",
  // display:"flex",
  // justifyContent:"center",
  bgcolor: "#090909"
});

const TrendingChipWrapper = styled(Box)({
  display: "inline-flex",
  borderRadius: "12px",
  padding: "0.8px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))"
});

const TrendingChip = styled(Chip)({
  backgroundColor: "#1a1b23",
  color: "white",
  borderRadius: "11px",
  padding: "2px 6px",
  width: "100%",
  height: "24px",
  "& .MuiChip-label": {
    fontSize: "0.55rem"
  },
  "&:hover": {
    backgroundColor: "#2c2d3a"
  }
});

const TokenCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1a1b23",
  padding: "8px",
  marginTop: "6px",
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  // border:"2px solid pink",

  justifyContent: "space-between"
  // [theme.breakpoints.down("sm")]: {
  //   flexDirection: "column",
  //   alignItems: "flex-start",
  //   gap: "8px",
  // },
}));
const formatPercentage = (num: number) => {
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(1) + "B%";
  } else if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(1) + "M%";
  } else if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(1) + "K%";
  }
  return num.toFixed(1) + "%";
};

const Home = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [coinInfos, setCoinInfos] = useState<CoinInfo[]>([]);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  console.log(coinInfos, "coinInfos");
  console.log(trendingCoins, "trendingCoins");
  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      [index]: !prev[index] // Closes all other dropdowns by resetting the state
    }));
  };
  // Existing useEffect and helper functions remain the same
  useEffect(() => {
    fetch("https://g-ai-backend.onrender.com/trending_coins")
      .then((res) => res.json())
      .then((data) => {
        // Extract the `trending_coins` array from the response
        setTrendingCoins(data.trending_coins || []);
        setCoinInfos(data.trending_coins || []);
      })
      .catch((err) => console.error("Error fetching trending coins:", err));
  }, []);

  const formatPercentage = (num: number) => {
    if (Math.abs(num) >= 1.0e9) {
      return (num / 1.0e9).toFixed(1) + "B%";
    } else if (Math.abs(num) >= 1.0e6) {
      return (num / 1.0e6).toFixed(1) + "M%";
    } else if (Math.abs(num) >= 1.0e3) {
      return (num / 1.0e3).toFixed(1) + "K%";
    }
    return num.toFixed(1) + "%";
  };

  const formatLaunchDate = (dateString: string) => {
    const launchDate = new Date(dateString);
    const today = new Date();

    let years = today.getFullYear() - launchDate.getFullYear();
    let months = today.getMonth() - launchDate.getMonth();
    let days = today.getDate() - launchDate.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return `${years}Y, ${months}M, ${days}D ago`;
  };

  return (
    <>
      {/* Banner */}
      <BannerCard>
        <Box
          sx={{
            p: 2,
            padding: 0,
            maxWidth: "600px",
            bgcolor: "#090909",
            m: "auto"
          }}
        >
          <ImageWrapper>
            <StyledImage src="Cointrend.png" alt="Cointrend" />
          </ImageWrapper>
        </Box>
      </BannerCard>

      {/* Trending Section */}
      <Box
        sx={{
          mt: 2,
          maxWidth: "600px",
          marginTop: "-2px",
          padding: "10px",
          paddingBottom: "6px",
          borderRadius: "12px",
          minHeight: "140px",
          position: "relative",
          width: "100%", // Makes the box take full width of parent
          boxSizing: "border-box",
          m: "auto",
          alignItems: "center",
          alignContent: "center", // Ensures padding is included in width calculation
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            padding: "2px",
            background:
              "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none"
          },
          "@media (max-width: 600px)": {
            minHeight: "120px",
            "&::before": {
              padding: "1px"
            }
          }
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            mb: 1.5,
            marginTop: "-2px",
            fontSize: "0.9rem",
            textAlign: "center",
            width: "100%" // Ensure text spans full width
          }}
        >
          Trending Cashtags
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.8,
            width: "100%", // Make sure this container takes full width
            justifyContent: "center" // Center the chips
          }}
        >
            {trendingCoins.length==0&&
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                {[...Array(6)].map((_, index) => (
                  <TrendingChipWrapper key={index}>
                    <Skeleton variant="rectangular" width={50} height={24} />
                  </TrendingChipWrapper>
                ))}
              </Box>
            }
          {trendingCoins.map((coin, index) => (
            <TrendingChipWrapper
              key={index}
              sx={{
                flexGrow: 0, // Prevents chips from stretching
                flexShrink: 0 // Prevents chips from shrinking
              }}
            >
              <TrendingChip label={`$${coin.symbol}🔥`} size="small" />
            </TrendingChipWrapper>
          ))}
        </Box>
      </Box>

      {/* Insights Section */}
      <Box sx={{ mt: 2, width: "100%" }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            mb: 1.5,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}
        >
          Top{" "}
          <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>
            <b>X insights</b>
          </span>{" "}
          about your coins
        </Typography>

        <Stack
          direction="row"
          spacing={0.8}
          sx={{ mb: 1.5, justifyContent: "right", width: "100%" }}
        >
          <ColumnItem>
            <FormatListBulletedIcon
              sx={{ fontSize: "0.8rem", color: "gray" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
              }}
            >
              Tweets
            </Typography>
          </ColumnItem>

          <ColumnItem>
            <FormatListBulletedIcon
              sx={{ fontSize: "0.8rem", color: "gray" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
              }}
            >
              Influencer
            </Typography>
          </ColumnItem>

          <ColumnItem>
            <FormatListBulletedIcon
              sx={{ fontSize: "0.8rem", color: "gray" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
              }}
            >
              Market
            </Typography>
          </ColumnItem>
        </Stack>

        {/* Token Cards */}
        <Box
          sx={{
            width: "100%"
          }}
        >
          {coinInfos.length == 0 &&
            [...Array(10)].map((_, index) => (
              <Box
                key={index}
                sx={{  background: "#1e1e1e", borderRadius: 2, mb: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: "100%",
                    justifyContent:"space-between"
                  }}
                >
                  <Skeleton animation="wave" variant="circular" width={32} height={32} />
                  <Box>
                    <Skeleton animation="wave" variant="text" width={50} height={20} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton
                      animation="wave"
                        variant="rectangular"
                        width={10}
                        height={10}
                        sx={{ mr: 1 }}
                      />
                      <Skeleton  animation="wave" variant="text" width={80} height={16} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxWidth: "200px",
                      mt: 1,
                    //   border: "2px solid red"
                    }}
                  >
                    <Skeleton  animation="wave" variant="text" width={40} height={20} />
                    <Skeleton animation="wave" variant="text" width={40} height={20} />
                    <Skeleton animation="wave" variant="text" width={40} height={20} />
                    <IconButton disabled>
                      <KeyboardArrowDownIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Dropdown Skeleton */}
                <Collapse in={false} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 1 }}>
                    <Skeleton variant="rectangular" width="100%" height={80} />
                  </Box>
                </Collapse>
              </Box>
            ))}
          {coinInfos.map((coin, index) => (
            <>
              <TokenCard key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: "100%"
                  }}
                >
                  <Avatar
                    src={coin.thumb}
                    alt={coin.symbol}
                    sx={
                      {
                        // width: { xs: 24, sm: 28, md: 32 },
                        // height: { xs: 24, sm: 28, md: 32 },
                      }
                    }
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "white"
                        //   fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      }}
                    >
                      {coin.symbol}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "gray",
                        display: "flex",
                        alignItems: "center"
                        //   fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                      }}
                    >
                      <img
                        src="https://cryptologos.cc/logos/solana-sol-logo.png?v=014"
                        alt="solana"
                        style={{
                          width: 10,
                          height: 10,
                          marginRight: 3,
                          verticalAlign: "middle"
                        }}
                      />
                      Solana
                      <Typography
                        variant="caption"
                        sx={{
                          color: "gray",
                          display: "flex",
                          alignItems: "center",
                          // fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                          marginLeft: 1
                        }}
                      >
                        {formatLaunchDate(coin.inserted_at)}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
                <StatsBox
                  sx={{
                    // border:"2px solid red",
                    maxWidth: "200px"
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
                    }}
                  >
                    {coin.total_mentions}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
                    }}
                  >
                    1K
                  </Typography>
                  <Typography
                    sx={{
                      color: coin.price_ch_24h >= 0 ? "#22c55e" : "#ef4444",
                      fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }
                    }}
                  >
                    {formatPercentage(coin.price_ch_24h)}
                  </Typography>

                  <IconButton
                    onClick={() => toggleDropdown(index)}
                    sx={{ color: "white" }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: openDropdowns[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s"
                      }}
                    />
                  </IconButton>
                  {/* Dropdown Chart */}
                </StatsBox>
              </TokenCard>

              <Collapse in={openDropdowns[index]} timeout="auto" unmountOnExit>
                <Box sx={{ p: 1 ,borderBottom:"1px solid  #333",borderLeft:"1px solid  #333",borderRight:"1px solid  #333"}}>
                  <ChartwithTool
 
                    network={coinInfos[index]?.platform_name}
                    contract_address={coinInfos[index]?.contract_address}
                  />
                </Box>
              </Collapse>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
