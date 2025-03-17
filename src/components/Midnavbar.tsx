import React, { useState } from 'react';
import {
    Box,
    InputBase,
    Paper,
    styled,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from '@mui/icons-material/Dehaze';
import {  TrendingUp, Tag, AttachMoney } from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import Search from "./Search";

const StyledSearchBox = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    backgroundColor: "#1a1b23",
    borderRadius: "8px",
    border: "none",
    transition: 'width 0.5s ease-out', // Add transition for width
    minWidth:"100px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
}));

const SearchBoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // marginTop: "-6px",
    // marginBottom: "12px",
    borderRadius: "8px",
    padding: "0.33px 0.5px",
    // background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
    bgcolor: "#090909",
    // border:"2px solid red"
}));

interface TabItem {
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

const tabItems: TabItem[] = [
  { label: "Tweet", icon: <ArticleIcon />, onClick: () => console.log("Tweet clicked") },
  { label: "CashTag", icon: <AttachMoney />, onClick: () => console.log("CashTag clicked") },
  { label: "Hashtag", icon: <Tag />, onClick: () => console.log("Hashtag clicked") },
  { label: "Trade", icon: <TrendingUp />, onClick: () => console.log("Trade clicked") },
//   { label: "Search", icon: <Search />, onClick: () => console.log("Search clicked") },
];

const CustomTab: React.FC<{ item: TabItem; selected: boolean; onClick: () => void }> = ({ item, selected, onClick }) => (
    <Box
    onClick={onClick}
    sx={{
        width: "100%",
        maxWidth: "100px",
        display: "flex",
        alignItems: "center",
        p: "2px",
        px:1,
        backgroundColor: selected?"#7000FF":"#1a1b23",
        borderRadius: "8px",
        border: "none",
        transition: 'width 1.5s ease-out', // Add transition for width
       color: selected?"white":"gray",
       mx:0.5
    }}
  >
    {item.icon}
    <Typography sx={{
       fontSize: "0.75rem",
       pl:1
    }}>{item.label}</Typography>
  </Box>
);

interface MidnavbarProps {
  setPage: (page: string) => void;
  page: string;
}

const Midnavbar:React.FC<MidnavbarProps> = ({setPage, page }) => {

  const [value, setValue] = useState<number>(-1);
  const [showTabs, setShowTabs] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tabItems[newValue].onClick?.();
  };

  const toggleTabs = () => {
    setShowTabs(!showTabs);
  };

  return (
    <Box sx={{ bgcolor: "#090909", my:2,width:"100%"}}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px",bgcolor:"#0B0B0B",alignContent:"center",width:"100%"}}>
      {!showTabs && ( <DehazeIcon 
          sx={{ 
            color: "white", 
           
            cursor: "pointer",
          }} 
          onClick={toggleTabs}
        />)}
        <SearchBoxWrapper >
        {showTabs && (
        // <Box
        //   sx={{
        //     mt: 2,
        //     display: "flex",
        //     border: "1px solid",
        //     borderImageSource: "linear-gradient(167.98deg, rgba(255, 255, 255, 0.05) 7.31%, rgba(153, 153, 153, 0.05) 83.64%)",
        //   }}
        // >
          <Box
            // value={value}
            // onChange={handleChange}
            // textColor="inherit"
            // TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
                display:"flex",
                // width: "100%",
                justifyContent:"center",

            }}
          >
            {tabItems.map((item, index) => (
              <CustomTab 
                key={index} 
                item={item} 
                selected={value === index} 
                onClick={() => {
                  setValue(index);
                  console.log(item,value,index,"item");
                  setPage(item.label);
                  // item.onClick?.();
                }} 
              />
            ))}
          </Box>
        // </Box>
      )}
          <StyledSearchBox sx={{ width: showTabs ? "calc(100% - 90%)" : "100%", height:"30px",
               }} onClick={!showTabs?()=>{}:toggleTabs}>
                 {/* <SearchIcon sx={{ color: "gray" , alignItems:"center"}} /> */}
            {/* <InputBase
              placeholder="Search your favorite $ Cashtag"
              sx={{ ml: 1, flex: 1, color: "white", fontSize: "0.75rem" ,
               
              }}

            /> */}
            <Search/>
           
          </StyledSearchBox>
        </SearchBoxWrapper>
      </Box>
      
    </Box>
  );
};

export default Midnavbar;