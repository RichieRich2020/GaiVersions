import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Search, TrendingUp, Tag, AttachMoney } from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
interface TabItem {
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

const tabItems: TabItem[] = [
  { label: "Tweet", icon:<ArticleIcon/>, onClick: () => console.log("Tweet clicked") },
  { label: "CashTag", icon: <AttachMoney />, onClick: () => console.log("CashTag clicked") },
  { label: "Hashtag", icon: <Tag />, onClick: () => console.log("Hashtag clicked") },
  { label: "Trade", icon: <TrendingUp />, onClick: () => console.log("Trade clicked") },
  { label: "Search", icon: <Search />, onClick: () => console.log("Search clicked") },
];

const CustomTab: React.FC<{ item: TabItem; index: number; selected: boolean; onClick: () => void }> = ({ item, selected, onClick }) => (
    <Tab
      icon={item.icon}
      iconPosition="start"
      label={item.label}
      onClick={onClick}
      sx={{
        color: "#fff",
        // backgroundImage: selected
        // ? "linear-gradient(to right, #7000FF, #FFFFFF 64%)"
        // : "none",
        background: selected ? "rgb(112,0,255)": "#ffffff0d",
        borderRadius: 2,
        minHeight: "20px", 
        border: "1px solid #FFFFFF0D",
        mx: 1, 
        fontSize: "10px",
        '&.Mui-selected': {
          bgcolor: "rgb(112,0,255)",
        },
        
      }}
    //   style={{
    //     background-image: linear-gradient(to right, #7000FF  , #FFFFFF 64%);
    //   }}
    />
  );
  
  const CustomTabs: React.FC = () => {
    const [value, setValue] = useState<number>(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      tabItems[newValue].onClick?.();
    };
  
    return (
      <Box
        sx={{
          bgcolor: "#121212",
          p: 2,
          display: "flex",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(167.98deg, rgba(255, 255, 255, 0.05) 7.31%, rgba(153, 153, 153, 0.05) 83.64%)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{ sx: { display: "none" } }}
        >
          {tabItems.map((item, index) => (
            <CustomTab 
              key={index} 
              item={item} 
              index={index} 
              selected={value === index} 
              onClick={() => {
                setValue(index);
                item.onClick?.(); // Call the individual tab's onClick handler
              }} 
            />
          ))}
        </Tabs>
      </Box>
    );
  };
  

export default CustomTabs;
