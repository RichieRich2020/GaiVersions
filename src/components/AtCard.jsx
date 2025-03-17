import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react"
import AccentButton from "./AccentButton";
import StatCard from "./StatCard";
import DynaCard from "./DynaCard";

const AtCard =()=>{
    const cashtagData = {
        DogeDesigner: {
            Name:"DogeDesigner",
            X_handle:'@cb_doge',
            accountDate:'May 2021',
            follores:"1.1M",
            tweets:'100',
            Avg_view:'50K',
            tag:"20"
          },
        elonmusk: {
          Name:"Elon Musk",
          X_handle:'@elonmusk',
          accountDate:'June 2009',
            follores:"5.1M",
            tweets:'1330',
             Avg_view:'20K',
              tag:"50"
        },
        
      };

      // State to track the currently selected cashtag
  const [selectedButton, setSelectedButton] = useState('DogeDesigner');

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
<h2 style={{fontSize:"20px", color:"#00B2FF" ,minWidth:"45%"}}>Account Mentioned ({Object.keys(cashtagData).length})</h2>
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
      label={`@${cashtag}`}
      selected={selectedButton === cashtag}
      onClick={() => handleButtonClick(cashtag)}
    />
  ))}
</div>
    </Box >
   <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:'center',
    width:"507px",
    py:2

    }}>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
   <Typography variant="subtitle1" color="white">{selectedData.Name}</Typography>
   <Typography variant="subtitle1" color="white">{selectedData.X_handle}</Typography>
   <Typography variant="subtitle1" color="white">{selectedData.accountDate}</Typography>
   <Button sx={{
    backgroundColor:"#8B6400",
    color:"white",
    p:1,
    borderRadius:"5px"
   }}>
    PROJECT
   </Button>
   </Box>
   <Box sx={{
        display:"flex",
        // justifyContent:"space-between",
        alignItems:'center',
        // width:"507px"
       alignContent:"center",
       margin:"auto",
       width: 'fit-content',
       gap:"10px"
    }}>
 
   <StatCard value={selectedData.follores} label="Followers" bgColor="#002c5c" />
   <StatCard value={selectedData.tweets} label="Tweets" bgColor="#002c5c" />
   <StatCard value={selectedData.Avg_view} label="Avg. View" bgColor="#002c5c" />
   <StatCard value={selectedData.tag} label="$tag 24h" bgColor="#F40000" />

   </Box>
</Box>
</>
}

export default  AtCard;