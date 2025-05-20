import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  InputBase,
  Paper,
  styled,
  Tabs,
  Tab,
  Typography
} from "@mui/material";
import { TrendingUp, Tag, AttachMoney } from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import Search from "./Search";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
const StyledSearchBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  display: "flex",
  alignItems: "center",
  padding: "6px 12px",
  backgroundColor: "#1a1b23",
  borderRadius: "8px",
  border: "none",
  transition: "width 0.5s ease-out", // Add transition for width
  minWidth: "100px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
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
  bgcolor: "#090909"
  // border:"2px solid red"
}));

interface TabItem {
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}
const iconsize = { fontSize: "20px" };
const tabItems: TabItem[] = [
  {
    label: "Home",
    icon: <IoMdHome style={iconsize} />,
    onClick: () => console.log("Tweet clicked")
  },
  {
    label: "Tweet",
    icon: <ArticleIcon style={iconsize} />,
    onClick: () => console.log("Tweet clicked")
  },
  {
    label: "CashTag",
    icon: <AttachMoney style={iconsize} />,
    onClick: () => console.log("CashTag clicked")
  },
  {
    label: "Hashtag",
    icon: <Tag style={iconsize} />,
    onClick: () => console.log("Hashtag clicked")
  },
  {
    label: "Trade",
    icon: <TrendingUp style={iconsize} />,
    onClick: () => console.log("Trade clicked")
  }
  //   { label: "Search", icon: <Search />, onClick: () => console.log("Search clicked") },
];

// Update the CustomTab component in Midnavbar.tsx
const CustomTab: React.FC<{
  item: TabItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => {
  const isDisabled = item.label === "CashTag" || item.label === "Hashtag" || item.label === "Trade";
  
  return (
    <Box
      onClick={isDisabled ? undefined : onClick}
      sx={{
        width: "100%",
        maxWidth: "100px",
        display: "flex",
        alignItems: "center",
        p: 1,
        backgroundColor: isDisabled ? '#1a1b23' : (selected ? "#7000FF" : "#1a1b23"),
        borderRadius: "4px",
        border: isDisabled ? '1px dashed #555' : 'none',
        transition: "width 1.5s ease-out",
        color: isDisabled ? "#555" : (selected ? "white" : "gray"),
        mx: 0.5,
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        position: "relative",
        '&:hover': {
          backgroundColor: isDisabled ? '#1a1b23' : (selected ? "#7000FF" : "#2a2b33"),
          '& .coming-soon-tooltip': isDisabled ? {
            visibility: 'visible',
            opacity: 1,
          } : {}
        }
      }}
    >
      {item.icon}
      <Typography
        sx={{
          fontSize: "0.75rem",
          pl: 0.2,
          // textDecoration: isDisabled ? 'line-through' : 'none'
        }}
      >
        {item.label}
      </Typography>
      
      {isDisabled && (
        <Box 
          className="coming-soon-tooltip"
          sx={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#333',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            visibility: 'hidden',
            opacity: 0,
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            '&:before': {
              content: '""',
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '5px 5px 0',
              borderStyle: 'solid',
              borderColor: '#333 transparent transparent',
            }
          }}
        >
          Coming soon!
        </Box>
      )}
    </Box>
  );
};

interface MidnavbarProps {
  setPage: (page: string) => void;
  page: string;
  setSearchedData: (data: any | null) => void;
  setValue: (value: number) => void; // Accepting setValue as a function prop
  value: number; // Accepting value as a number prop
  searchLoading:boolean,
  isSearchLoading:(value:boolean)=>void,
  setSearchedDatabool:(value:boolean)=>void,
}


const Midnavbar: React.FC<MidnavbarProps> = ({
  setPage,
  page,
  setSearchedData,
  setValue,
  value,
  searchLoading,
  isSearchLoading,
  setSearchedDatabool
}) => {

  // Add this to your main side panel component
useEffect(() => {
  console.log("[SidePanel] Setting up message listener");
  
  // const messageListener = (message) => {
  //   console.log("[SidePanel] Received message:", message);
    
  //   if (message.type === "updatePage") {
  //     console.log("[SidePanel] Updating page to:", message.page);
  //     setPage(message.page);
  //   }
  // };
  
  // // Add message listener
  // chrome.runtime.onMessage.addListener(messageListener);
  
  // // Clean up
  // return () => {
  //   chrome.runtime.onMessage.removeListener(messageListener);
  // };
}, []);
  
    // Add this useEffect to sync page with value
    useEffect(() => {
      const pageToValueMap: Record<string, number> = {
        "Home": 0,
        "Tweet": 1,
        "CashTag": 2,
        "Hashtag": 3,
        "Trade": 4
      };
      
      if (page in pageToValueMap && value !== pageToValueMap[page]) {
        setValue(pageToValueMap[page]);
      }
    }, [page, value, setValue]);
  
  const [showTabs, setShowTabs] = useState<boolean>(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
    // Focus the input when search becomes visible
    useEffect(() => {
      if (!showTabs && searchInputRef.current) {
        // Small timeout ensures the input is rendered before focusing
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    }, [showTabs]);
  // const [searchedData, setSearchedData] = useState<any>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tabItems[newValue].onClick?.();
  };

  const toggleTabs = () => {
    setShowTabs(!showTabs);
  };
  

  return (
    <Box sx={{ bgcolor: "#090909", my: 2, width: "96%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          bgcolor: "#0B0B0B",
          alignContent: "center",
          width: "100%",
          // border: "2px  solid red"
        }}
      >
        {/* {showTabs && ( <DehazeIcon 
          sx={{ 
            color: "white", 
           
            cursor: "pointer",
          }} 
          // onClick={toggleTabs}
        />)} */}

        <SearchBoxWrapper>
        {showTabs ? (
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
                display: "flex",
                width: "97%",
                justifyContent: "center"
              }}
            >
              {/* // Update the tab rendering in Midnavbar.tsx */}
{tabItems.map((item, index) => (
  <CustomTab
    key={index}
    item={item}
    selected={value === index}
    onClick={() => {
      // Skip disabled tabs
      if (item.label === "CashTag" || item.label === "Hashtag") {
        return;
      }
      setValue(index);
      setPage(item.label);
    }}
  />
))}
</Box>
) : null}

{showTabs ? (
  <Box
    sx={{
      width: "100%",
      maxWidth: "100px",
      display: "flex",
      alignItems: "center",
      p: 1,
      backgroundColor: "#1a1b23",
      borderRadius: "4px",
      border: "none",
      transition: "width 1.5s ease-out",
      color: "gray",
      mx: 0.5,
      cursor: "pointer"
    }}
    onClick={toggleTabs}
  >
    <FaSearch />
    <Typography
      sx={{
        fontSize: "0.75rem",
        pl: 1
      }}
    >
      Search
    </Typography>
  </Box>
) : (
  <StyledSearchBox
    sx={{
      width: showTabs ? "calc(100% - 90%)" : "100%",
      height: "30px"
    }}
  >
    <Box sx={{ width: "100%" }}>
      <Search 
        setPage={setPage} 
        setSearchedData={setSearchedData}  
        // searchLoading={searchLoading} 
        // isSearchLoading={isSearchLoading} 
        // setSearchedDatabool={setSearchedDatabool}
        // inputRef={searchInputRef} // Pass the ref to Search component
      />
    </Box>
    <IoCloseCircle
      style={{
        color: "#8b5cf6",
        position: "relative",
        fontSize: "30px",
        cursor: "pointer"
      }}
      onClick={toggleTabs}
    />
  </StyledSearchBox>
)}
        </SearchBoxWrapper>
      </Box>
    </Box>
  );
};

export default Midnavbar;
