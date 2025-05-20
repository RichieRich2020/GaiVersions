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
import React, { useEffect, useState } from "react";
import ChartwithTool from "./ChartwithTool";
import { fetchSavedTokens, getTrendingCoins } from "../utils/twitter";
import { useAuth } from "../config/AuthContext";
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
  // [theme.breakpoints.down("md")]: {
  //   fontSize: "0.7rem"
  // }
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  // [theme.breakpoints.down("sm")]: {
  //   width: "100%",
  //   justifyContent: "space-between"
  // }
}));

const ImageWrapper = styled(Box)({
  width: "99.6%",
  height: "180px",
  display: "inline-block",
  borderRadius: "10px",
  // padding: "0.8px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  overflow: "hidden"
});

const TrendingTitle = styled(Typography)({
  color: "white",
  marginBottom: "12px",
  marginTop: "-2px",
  fontSize: "0.9rem",
  textAlign: "center",
  width: "100%",
  fontFamily: '"Roboto", sans-serif',
  fontWeight: 500
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "10px"
});

const BannerCard = styled(Card)({
  width: "100%",
  height: "100%",
  marginTop: "-1px",
  backgroundColor: "#090909",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  // display:"flex",
  // justifyContent:"center",
  bgcolor: "#090909"
});

const TrendingChipWrapper = styled(Box)({
  display: "inline-flex",
  borderRadius: "5px",
  padding: "0.8px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))"
});

const TrendingChip = styled(Chip)({
  backgroundColor: "#090909",
  color: "white",
  borderRadius: "5px",
  padding: "2px 6px",
  width: "100%",
  height: "24px",
  "& .MuiChip-label": {
    fontSize: "0.75rem"
  },
  "&:hover": {
    backgroundColor: "#2c2d3a"
  }
});

const TokenCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#090909",
  padding: "8px",
  marginBottom: "6px",
  borderRadius: "10px",
  // display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative", // Required for pseudo-element positioning
  overflow: "hidden", // Ensures no unwanted overflow

  // Pseudo-element for the gradient border
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "10px",
    padding: "0.5px", // Thickness of border
    background: "linear-gradient(to right, rgb(63, 28, 109), rgb(97, 97, 97))",
    WebkitMask:
      "linear-gradient(white, white) content-box, linear-gradient(white, white)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude"
  }
}));



const Home = ({ setPage, setSearchedData,isSearchLoading, setSearchedDatabool }: any) => {
  const { user, tokendata, setTokendata } = useAuth();
  const [trendingCoins, setTrendingCoins] :any= useState<TrendingCoin[]>([]);
  const [coinInfos, setCoinInfos] = useState<CoinInfo[]>([]);
  const [activeTab, setActiveTab] = useState("trending");
  const [trendingCoinsLoading, setTrendingCoinsLoading] = useState(false);
  const [savedCoinsLoading, setSavedCoinsLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  console.log(coinInfos, "coinInfos");

  const toggleDropdown = (index: number) => {
    
    setOpenDropdowns((prev) => ({
      [index]: !prev[index] // Closes all other dropdowns by resetting the state
    }));
  };
  // Add loding state in botth 
  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingCoinsLoading(true);
      try {
        const data = await getTrendingCoins();
        console.log(data, "trendingCoins fetched");
        setTrendingCoins(data?.trending_coins_token_pairs || []);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
        setTrendingCoins(null);
      } finally {
        setTrendingCoinsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchSaved = async () => {
      setSavedCoinsLoading(true);
      try {
        const data = await fetchSavedTokens(user?.jwt_token, user?.username); // Replace "your_token"
        console.log(data, "savedCoins fetched");
        setCoinInfos(data?.trending_coins_token_pairs || []);
      } catch (error) {
        console.error("Error fetching saved tokens:", error);
        setCoinInfos([]);
      } finally {
        setSavedCoinsLoading(false);
      }
    };

    fetchSaved();
  }, []);


  console.log(trendingCoins[0]?.coins_info, "trendingCoins");
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
          borderRadius: "10px",
          minHeight: "140px",
          position: "relative",
          width: "100%", // Makes the box take full width of parent
          boxSizing: "border-box",
          backgroundColor: "#2020201f",
          m: "auto",
          alignItems: "center",
          alignContent: "center", // Ensures padding is included in width calculation
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "10px",
            padding: "0.5px",
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
              padding: "0.5px"
            }
          }
        }}
      >
        <TrendingTitle variant="subtitle1">Trending Cashtags</TrendingTitle>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.8,
            width: "100%", // Make sure this container takes full width
            justifyContent: "center",
            marginBottom: "4px"  
          }}
        >
          {trendingCoins.length === 0 && (
   <Box sx={{ 
     display: "flex", 
     flexWrap: "wrap", 
     gap: 0.8, 
     width: "100%",
     justifyContent: "center",
     mt: 1, 
     marginBottom: "4px"
   }}>
     {[...Array(16)].map((_, index) => (
       <Box 
         key={index}
         sx={{
           borderRadius: "5px",
           padding: "0.8px",
           background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
           overflow: "hidden"
         }}
       >
         <Skeleton 
           animation="wave" 
           variant="rectangular" 
           width={70} 
           height={24}
           sx={{
             backgroundColor: "#33333",
             borderRadius: "5px",
           }}
         />
       </Box>
     ))}
   </Box>
 )}
          {trendingCoins[0]?.coins_info.map((coin, index) => (
            <TrendingChipWrapper
              key={index}
              sx={{
                flexGrow: 0, // Prevents chips from stretching
                flexShrink: 0 // Prevents chips from shrinking

              }}
            >
              <TrendingChip
                label={`$${coin?.symbol}🔥`}
                size="small"
                onClick={async () => {
                  isSearchLoading(true);
                  setSearchedDatabool(true);
                  setPage("Tweet");
                
                  try {
                    // Start loading state
                    setSearchedData([]); // Clear previous data while loading
                    const response = await fetch(
                      `https://g-ai-backend-1.onrender.com/tweet_all_cashtags_info?tweet_id=187&cashtags=${coin.symbol}`
                    );
                
                    if (!response.ok) {
                      throw new Error("Failed to fetch cashtag info");
                    }
                
                    const data = await response.json();
                
                    // Check if data is valid and update searched data
                    // if (data && Array.isArray(data)) {
                      setSearchedData(data.cashtags);
                    // } else {
                    //   console.warn("Unexpected data format:", data);
                    //   setSearchedData([]);
                    // }
                  } catch (error) {
                    console.error("Error fetching data:", error);
                    setSearchedData([]);
                    setSearchedDatabool(false)
                  } finally {
                    // Optional: Stop loading state if needed
                    // isSearchLoading(false);
                  }
                }}
              />
            </TrendingChipWrapper>
          ))}
        </Box>
      </Box>

      {/* Insights Section */}
      <Box sx={{ mt: 2, width: "100%" , border:"2px solid red"}}>
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
        <Box  sx={{
          border:"2px solid blue",
          height:"30px",
          display:"flex",
          justifyContent:"end",
          // position:"relative"
        }}>

          {/* give this as backgoundColor 8b5cf6   and color white on Active */}
          <Box
    onClick={() => setActiveTab("trending")}
    sx={{
      width: "140px",
      textAlign: "center",
      color: activeTab === "trending" ? "white" : "gray",
      backgroundColor: activeTab === "trending" ? "#8b5cf6" : "#0000003b",
      cursor: "pointer",
      borderRadius: 1,
   
    }}
  >
    Trending Coins
  </Box>

  <Box
    onClick={() => setActiveTab("saved")}
    sx={{
      width: "140px",
   
      textAlign: "center",
      color: activeTab === "saved" ? "white" : "gray",
      backgroundColor: activeTab === "saved" ? "#8b5cf6" : "#0000003b",
      cursor: "pointer",
      borderRadius: 1,

    }}
  >
    Saved Coins
  </Box>
 </Box>
  {/* show  this when Trending Coins is active  */}
  {activeTab === "trending" && (
        <Box sx={{
          border:"2px solid green"
        }}>
       

        <Stack
          direction="row"
          // spacing={0} // Remove Stack spacing
          sx={{py:1, justifyContent: "right", width: "100%",border:"2px solid red" }}
        >
          <ColumnItem sx={{ marginRight: "4px" }}>
            {" "}
            {/* Adjust margin as needed */}
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

          <ColumnItem sx={{ marginRight: "4px" }}>
            {" "}
            {/* Adjust margin as needed */}
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

          <ColumnItem sx={{ marginRight: "64px" }}>
            {" "}
            {/* Adjust margin as needed */}
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

          {trendingCoinsLoading ?
            [...Array(10)].map((_, index) => (
              <Box
                key={index}
                sx={{ background: "#1e1e1e", borderRadius: 2, mb: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: "100%",
                    justifyContent: "space-between",
                    border:"2px solid red",
                    pl:1,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{
                      background:"#ffffff08"
                    }}
                  />
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={50}
                      height={20}
                      sx={{
                        background:"#ffffff08"
                      }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={10}
                        height={10}
                        sx={{ mr: 1,   background:"#ffffff08" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={80}
                        height={16}
                        sx={{
                          background:"#ffffff08"
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxWidth: "200px",
                         
                      mt: 1
                      //   border: "2px solid red"
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                      sx={{
                        background:"#ffffff08"
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                      sx={{
                        background:"#ffffff08"
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                      sx={{
                        background:"#ffffff08"
                      }}
                    />
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
            )):
          trendingCoins[0]?.coins_info.map((coin, index) => (
            <>
              <TokenCard key={index}>
                <Box
                  style={{
                    display: "flex"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      width: "100%"
                    }}
                  >
                    <Avatar
                      src={coin.logo}
                      alt={coin.name}
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
                        {coin.name}vug
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
                          src={coin?.token_pairs[0]?.token_pairs_info[0]?.network[0]?.image_url}
                          alt="solana"
                          style={{
                            width: 10,
                            height: 10,
                            marginRight: 3,
                            verticalAlign: "middle"
                          }}
                        />
                        {coin?.token_pairs[0]?.chain_id}
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
                          {formatLaunchDate(coin?.token_pairs[0]?.token_pairs_info[0]?.pair_creation_date)}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                  <StatsBox
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2, // Consistent gap between items
                        minWidth: "fit-content" // Don't shrink below content width
                      
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.8rem",
                        minWidth: "40px", // Fixed width for alignment
                        textAlign: "right" // Right align numbers
                      }}>
                      {/* {coin.total_mentions} */} NA
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.8rem",
                        minWidth: "40px", // Same width as others
                        textAlign: "right"
                      }}
                    >
                      1K
                    </Typography>
                    <Typography
                      sx={{
                        color: coin.price_ch_24h >= 0 ? "#22c55e" : "#ef4444",
        fontSize: "0.8rem",
        minWidth: "60px", // Slightly wider for percentages
        textAlign: "right"
                      }}
                    >
                      {formatPercentage(coin.price_chg_per_24hr)}
                    </Typography>

                    <IconButton
                      onClick={() => toggleDropdown(index)}
                      sx={{ color: "white", ml: 1 }}
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
                </Box>
                <Collapse
                  in={openDropdowns[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ p: 1, maxWidth: "480px", mt: 2 }}>
                    <ChartwithTool
      contract_address={
        coin?.token_pairs[0]?.token_address
      }
      
      name={coin?.symbol}
      token_pairs_info={coin?.token_pairs[0]?.token_pairs_info}
      tokendata={tokendata}
      setTokendata={setTokendata}
                    />
                  </Box>
                </Collapse>
              </TokenCard>
            </>
          ))}
        </Box>
        </Box>
        )}
        {/* show  this when Saved coins is active  */}
        {activeTab === "saved" && (
        <Box sx={{
          border:"2px solid white"
        }}>
       

        <Stack
          direction="row"
          spacing={0} // Remove Stack spacing
          sx={{ mb: 1.5, justifyContent: "right", width: "100%" }}
        >
          <ColumnItem sx={{ marginRight: "4px" }}>
            {" "}
            {/* Adjust margin as needed */}
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

          <ColumnItem sx={{ marginRight: "4px" }}>
            {" "}
            {/* Adjust margin as needed */}
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

          <ColumnItem sx={{ marginRight: "64px" }}>
            {" "}
            {/* Adjust margin as needed */}
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
                sx={{ background: "#1e1e1e", borderRadius: 2, mb: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={32}
                    height={32}
                  />
                  <Box>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={50}
                      height={20}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={10}
                        height={10}
                        sx={{ mr: 1 }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={80}
                        height={16}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxWidth: "200px",
                      mt: 1
                      //   border: "2px solid red"
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={40}
                      height={20}
                    />
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
  
        </Box>
        </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
