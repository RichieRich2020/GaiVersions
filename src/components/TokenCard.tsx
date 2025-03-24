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

interface TokenCardProps {
    PairIcon:string,
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
  

}

const TokenCard: React.FC<TokenCardProps> = ({
    PairIcon,
    tokenAdd,
  tokenName,
  pair,
  exchange,
  network,
  price,
  priceChange,
  marketCap,
  volume,
  liquidity,
  age,
  tokenIcon,
  
}) => {
  return (
    
      <Grid
        container
        
        justifyContent={"space-between"}
        sx={{
            // background: "linear-gradient(to bottom, #886cab, #FFFFFF)",
          backgroundColor: "#0B0B0B",
          borderRadius: "20px",
          borderBottom: "2px solid #440d96",
          p: 0.5,
          mt:0.5
        }}
        
      >
        <Box display={"flex"}>
            {/* Left Section - Token Icon */}
        <Grid item>
          <Avatar src={tokenIcon} sx={{ width: 45, height: 45,
            p:1,
            m:1
           }} />
        </Grid>

        {/* Token Info */}
        <Box
         
          sx={{
            color: "white",
            py: 1,
            // border: "2px solid red",
            width: "300px",
            fontSize:"0.85rem"
          }}
        >
         <Box display={"flex"} sx={{alignContent:"center",
            alignItems:"center"
         }}>
         <Typography variant="body2"> {pair} </Typography><Avatar src={PairIcon} sx={{ width: 15, height: 15,
          ml:1 }} />
         </Box>
          <Box display={"flex"} alignItems="center" justifyContent={"space-between"} >
          <Typography fontWeight="bold">
  {tokenName?.length > 10 ? `${tokenName.slice(0, 10)}...` : tokenName}
</Typography>
          <Typography variant="body2">
          TOKEN :   {`     ${(tokenAdd || "").slice(0, 6)}...${(tokenAdd || "").slice(-4)}`} 
</Typography>
          </Box>
        </Box>
        </Box>
        <Box
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
        </Box>
        {/* Price Info */}
        <Grid item>
          <Typography variant="body2" color="white">
            ${price.toFixed(6)}
            <ArrowDropDownIcon sx={{ color: "red" }} />
          </Typography>
          <Typography variant="body2" color="error">
            ↓ {priceChange.toFixed(2)}%
          </Typography>
        </Grid>
      </Grid>
    
  );
};

export default TokenCard;
