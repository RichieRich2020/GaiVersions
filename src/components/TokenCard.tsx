import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Box
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
interface TokenCardProps {
  PairIcon: string;
  tokenAdd: string;
  tokenName: string;
  pair: string;
  exchange: string;
  network: string;
  price: number;
  priceChange: number;
  marketCap: number;
  volume: number;
  liquidity: number;
  age: string;
  tokenIcon: string;
  showPreviousResults: boolean;
}

const TokenCard: React.FC<any> = ({ option }) => {
  const {
    asset_platform_id,
    category,
    fdv_in_usd,
    image_url: tokenIcon,
    marketCap: market_cap_in_usd,
    // price:price_in_usd,
    // pair:pairs?.pair_name,
    // priceChange:pairs?.price_ch_per_h24,
    symbol
  }: any = option || {};
  console.log(option.asset_platform_id, "asset_platform_id");
  console.log(option, "optionssss");
  const CoinCheckk =
    option?.category == "coin" && option?.asset_platform_id == null;
  const tokenName = option?.name || option?.token_name;
  const pair = option?.pairs?.chain_id;
  const price = Number(
    option?.category === "coin" && option?.asset_platform_id == null
      ? option?.price_in_usd
      : option?.pairs?.price_in_usd
  );

  const priceChange = Number(
    option?.category === "coin" && option?.asset_platform_id == null
      ? option?.price_ch_per_h24
      : option?.pairs?.price_ch_per_h24
  );
  const pairName = option?.pairs?.pair_name;
  const PairIcon = option?.pairs?.network_img;
    
  return !CoinCheckk ? (
    <>
      {true ? (
        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            // background: "linear-gradient(to bottom, #886cab, #FFFFFF)",

            backgroundColor: "#0B0B0B",
            borderRadius: "20px",
            borderBottom: "2px solid #440d96",
            p: 0.5
          }}
        >
          <Box display={"flex"}  >
            {/* Left Section - Token Icon */}
            <Grid item>
              <Avatar
                src={tokenIcon}
                sx={{ width: 40, height: 40, p: 1, m: 1 }}
              />
            </Grid>

            {/* Token Info */}
            <Box
              sx={{
                color: "white",
                py: 1,
                width: "fit-content", // fixed typo
                fontSize: "0.9rem",
             
                margin:"auto"
              }}
            >
              <Box
                display={"flex"}
                sx={{ alignContent: "center", alignItems: "center" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "11px"
                  }}
                >
                     {tokenName?.length > 35
                    ? `${tokenName.slice(0, 35)?.toUpperCase()}...`
                    : tokenName?.toUpperCase()}
                </Typography>
                <GoDotFill
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    color: "green"
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "11px"
                  }}
                >
                  {" "}
                  {pair=="None"?"-":pair}{" "}
                </Typography>
                <Avatar src={PairIcon} sx={{ width: 15, height: 15, ml: 1 }} />
              </Box>
            </Box>
          </Box>
          {/* <Box
        //   display="flex"
          justifyContent="space-between"
          
          sx={{ fontSize: "0.5rem", color: "#aaa",
           
            alignContent:"center",
            pl:2
           }}
        >
          <Typography  sx={{ fontSize: "0.8rem"}}>MCAP: ${marketCap.toLocaleString()}K</Typography>
          <Typography  sx={{ fontSize: "0.8rem"}}>
            24H VOL: ${volume.toLocaleString()} ↓ {priceChange.toFixed(2)}%
          </Typography>
        </Box> */}
          {/* Price Info */}
          <Grid
            container
            direction="column"
            justifyContent="center"
            // alignItems="center"
            sx={{
              mr: 2,
              width: "fit-content" ,
  
            }}
          >
            <Box>
            <Typography variant="body2" color="white" sx={{
              fontSize:"1.3rem"
            }}>
              ${price && price.toFixed(2)}
              {/* <ArrowDropDownIcon sx={{ color: "red" }} /> */}
            </Typography>
          
            </Box>
            <Box   sx={{
              display:"flex",
              justifyContent:"end",

            }}>
            <Typography
              variant="body2"
              color={priceChange >= 0 ? "success.main" : "error"}
            >
              {priceChange && priceChange >= 0 ? "↑" : "↓"}{" "}
              {priceChange && Math.abs(priceChange).toFixed(2)}%
            </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            // background: "linear-gradient(to bottom, #886cab, #FFFFFF)",

            backgroundColor: "#0B0B0B",
            borderRadius: "20px",
            borderBottom: "2px solid #440d96",
            p: 0.5
          }}
        >
          <Box
            display={"flex"}
            sx={{
              color: "white",
              width: "100%",
              ml: 2,

              alignContent: "center"
            }}
          >
            {/* Left Section - Token Icon */}
            <Box
              sx={{
                mt: 1
              }}
            >
              <FaSearch />
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"space-between"}
              sx={{
                ml: 2
              }}
            >
              <Typography fontWeight="bold">
                {tokenName?.length > 10
                  ? `${tokenName.slice(0, 10)}...`
                  : tokenName}
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  ) : (
    <>
      {true ? (
        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            // background: "linear-gradient(to bottom, #886cab, #FFFFFF)",

            backgroundColor: "#0B0B0B",
            borderRadius: "20px",
            borderBottom: "2px solid #440d96",
            p: 0.5
          }}
        >
          <Box display={"flex"}>
            {/* Left Section - Token Icon */}
            <Grid item>
              <Avatar
                src={tokenIcon}
                sx={{ width: 40, height: 40, p: 1, m: 1 }}
              />
            </Grid>

            {/* Token Info */}
            <Box
              sx={{
                color: "white",
                py: 1,
                width: "fit-content", // fixed typo
                fontSize: "0.85rem"
              }}
            >
              {/* <Box
        display={"flex"}
        sx={{ alignContent: "center", alignItems: "center",}}
      > */}
              {/* <Typography variant="body2" sx={{
          fontSize:"11px"
        }}> {   option?.symbol.toUpperCase()} </Typography> */}
              {/* <GoDotFill  style={{
          marginLeft:"5px",
          marginRight:"5px",
          color:"green"
        }}/>
        <Typography variant="body2" sx={{
          fontSize:"11px"
        }}> {pair} </Typography>
        <Avatar src={PairIcon} sx={{ width: 15, height: 15, ml: 1 }} /> */}
              {/* </Box> */}
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"space-between"}
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%"
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontSize: "12px"
                  }}
                >
                  {tokenName?.length > 35
                    ? `${tokenName.slice(0, 35)?.toUpperCase()}...`
                    : tokenName?.toUpperCase()}
                </Typography>
                {/* <Typography variant="body2">
      TOKEN :   {`     ${(tokenAdd || "").slice(0, 6)}...${(tokenAdd || "").slice(-4)}`} 
</Typography> */}
              </Box>
            </Box>
          </Box>
          {/* <Box
    //   display="flex"
      justifyContent="space-between"
      
      sx={{ fontSize: "0.5rem", color: "#aaa",
       
        alignContent:"center",
        pl:2
       }}
    >
      <Typography  sx={{ fontSize: "0.8rem"}}>MCAP: ${marketCap.toLocaleString()}K</Typography>
      <Typography  sx={{ fontSize: "0.8rem"}}>
        24H VOL: ${volume.toLocaleString()} ↓ {priceChange.toFixed(2)}%
      </Typography>
    </Box> */}
          {/* Price Info */}
          <Grid
            container
            direction="column"
            justifyContent="center"
            // alignItems="center"
            sx={{
              mr: 2,
              width: "fit-content" ,
  
            }}
          >
            <Box>
            <Typography variant="body2" color="white" sx={{
              fontSize:"1.3rem"
            }}>
              ${price && price.toFixed(2)}
              {/* <ArrowDropDownIcon sx={{ color: "red" }} /> */}
            </Typography>
          
            </Box>
            <Box   sx={{
              display:"flex",
              justifyContent:"end",

            }}>
            <Typography
              variant="body2"
              color={priceChange >= 0 ? "success.main" : "error"}
            >
              {priceChange && priceChange >= 0 ? "↑" : "↓"}{" "}
              {priceChange && Math.abs(priceChange).toFixed(2)}%
            </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            // background: "linear-gradient(to bottom, #886cab, #FFFFFF)",

            backgroundColor: "#0B0B0B",
            borderRadius: "20px",
            borderBottom: "2px solid #440d96",
            p: 0.5
          }}
        >
          <Box
            display={"flex"}
            sx={{
              color: "white",
              width: "100%",
              ml: 2,

              alignContent: "center"
            }}
          >
            {/* Left Section - Token Icon */}
            <Box
              sx={{
                mt: 1
              }}
            >
              <FaSearch />
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"space-between"}
              sx={{
                ml: 2
              }}
            >
              <Typography fontWeight="bold">
              {tokenName?.length > 35
                    ? `${tokenName.slice(0, 35)?.toUpperCase()}...`
                    : tokenName?.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default TokenCard;
