import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react"
import StatCard from "./StatCard";
import DynaCard from "./DynaCard";
import AccentButton from "./AccentButton";

const HashCard = ()=>{
    const cashtagData = {
        BTC: {
          coinName:"Bitcoin",
          Blockchain:"Blockchain",
          mentions: 30,
          influencers: 50,
          community: 255,
          volume: "$20k",
          marketCap: "$50.5K",
          marketCapChange: "20%",
          lp: "$100",
          coinAge:"14 year"
        },
        XRP: {
          coinName:"Ripple",
          Blockchain:"Ripple",
          mentions: 40,
          influencers: 60,
          community: 300,
          volume: "$30k",
          marketCap: "$100K",
          marketCapChange: "15%",
          lp: "$150",
          coinAge:"8 year"
        },
        BTl: {
            coinName:"Bitcoin",
            Blockchain:"Blockchain",
            mentions: 30,
            influencers: 50,
            community: 255,
            volume: "$20k",
            marketCap: "$50.5K",
            marketCapChange: "20%",
            lp: "$100",
            coinAge:"14 year"
          },
          TRX: {
            coinName:"Ripple",
            Blockchain:"Ripple",
            mentions: 40,
            influencers: 60,
            community: 300,
            volume: "$30k",
            marketCap: "$100K",
            marketCapChange: "15%",
            lp: "$150",
            coinAge:"8 year"
          },
          PEP: {
            coinName:"Ripple",
            Blockchain:"Ripple",
            mentions: 40,
            influencers: 60,
            community: 300,
            volume: "$30k",
            marketCap: "$100K",
            marketCapChange: "15%",
            lp: "$150",
            coinAge:"8 year"
          },
          ETH: {
            coinName:"Ripple",
            Blockchain:"Ripple",
            mentions: 40,
            influencers: 60,
            community: 300,
            volume: "$30k",
            marketCap: "$100K",
            marketCapChange: "15%",
            lp: "$150",
            coinAge:"8 year"
          },
      };

      // State to track the currently selected cashtag
  const [selectedButton, setSelectedButton] = useState('BTC');

  // Function to handle cashtag button clicks
  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const selectedData = cashtagData[selectedButton];
return <>
<Box sx={{
    backgroundColor:"#171717",
    width:"507px",
    p:1,
    borderRadius:2,
    border:"1px solid #FFF500",
    my:1
}}>
    <Box sx={{
        display:"flex",
        gap:"15px",
        alignItems:'center',
    width:"507px"

    }}>
<h2 style={{fontSize:"20px", color:"#00B2FF" ,minWidth:"45%"}}>Hashtag Mentioned ({Object.keys(cashtagData).length})</h2>
<div className="cashtag-buttons" style={{
  display:"flex",
  gap:"6px",
//   width: "80%",
  overflow: "hidden",
  overflowX: "scroll"
}}>
  {Object.keys(cashtagData).map((cashtag) => (
    <AccentButton
      key={cashtag}
      label={`#${cashtag}`}
      selected={selectedButton === cashtag}
      onClick={() => handleButtonClick(cashtag)}
    />
  ))}
</div>
    </Box >
   {/* <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:'center',
    width:"507px",
    py:2

    }}>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
   <Typography variant="subtitle1" color="white">{selectedData.coinName}</Typography>
   <Typography variant="subtitle1" color="white">{selectedData.Blockchain}</Typography>
   <Typography variant="subtitle1" color="white">{selectedData.coinAge}</Typography>
   <DynaCard/>
   </Box> */}
   <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:'center',
        width:"60%"

    }}>
 
 <Typography variant="subtitle1" color="white">{"#"+selectedButton}</Typography>
   <Box style={{
    display:"flex",
    gap:'10px'
   }}>
   <StatCard value="100" label="Tweets" bgColor="#002c5c" />
   <StatCard value="100" label="Tweets" bgColor="#002c5c" />
   </Box>
   
   </Box>
</Box>
</>
}

export default HashCard;