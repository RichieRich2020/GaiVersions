import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Avatar,
  Grid,
  Button,
  IconButton,
  Modal
} from "@mui/material";
import CashtagPopup from "./CashtagPopup"; // Adjust path as needed
import CloseIcon from "@mui/icons-material/Close"; // Add this import if not already present
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
// import { formatCurrencyValue } from "../utils/NumFormatter";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Card, CardContent } from "@mui/material";
import { MdEditSquare } from "react-icons/md";
import { formatCurrencyValue, formatLaunchDate } from "../utils/NumFormatter";
import { useAuth } from "../";
import { Bookmark } from "@mui/icons-material";
import {
  getCoinCurrMarketData,
  getTokenCurrMarketData
} from "../utils/allfunctions";
import CryptoPairStatsCoin from "./CryptoPairStatsCoin";
import ChartwithToolCoin from "./ChartwithToolCoin";
import { FaRegCopy, FaCopy } from "react-icons/fa";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Styled components
const CashtagCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  //   height: "180px",
  maxWidth: "500px",
  backgroundColor: "#0a0a0a",
  borderRadius: "10px",
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
    padding: "0.5px",
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
  height: "0.5px",
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
  padding: "0 24px", // Add padding for arrows
  scrollBehavior: "smooth" // Add smooth scrolling
}));

const CashtagButton = styled(Button)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    backgroundColor: selected ? "#FFC979" : "rgba(55, 55, 55, 0.5)",
    color: selected ? "#000000" : "#ffffff",
    borderRadius: "4px",
    padding: "0.25em 0.75em", // Relative padding based on font size
    margin: "0 0.25em", // Relative margin
    minWidth: "auto", // Let it shrink to content
    minHeight: "1.75em", // Relative height
    fontSize: "clamp(0.5rem, 2.5vw, 0.7rem)", // Responsive font size
    fontWeight: "bold",
    lineHeight: 1.2, // Better text alignment
    whiteSpace: "nowrap", // Prevent text wrapping
    transition: "all 0.2s ease", // Smooth transitions
    display: "inline-flex", // Better for alignment
    alignItems: "center", // Center content vertically
    justifyContent: "center", // Center content horizontally
    "&:hover": {
      backgroundColor: selected ? "#FFC979" : "rgba(75, 75, 75, 0.8)",
      transform: selected ? "none" : "scale(1.05)" // Subtle hover effect
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.65rem", // Slightly larger on bigger screens
      padding: "0.3em 0.8em"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.7rem",
      padding: "0.35em 0.85em"
    }
  })
);
const UserNameText = styled(Typography)(({ theme }) => ({
  color: "#BABABA",
  marginTop: "10px", // Reduced negative margin
  fontSize: "0.7rem", // Smaller font
  display: "flex",
  alignItems: "center",
  marginBottom: "10px"
}));

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
  color: "#BABABA",
  fontSize: "0.8rem",
  width: "200px"
}));
const ColorLabel = styled(Typography)(({ theme }) => ({
  color: "#8b5cf6",
  fontSize: "0.8rem" // Smaller font
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem", // Smaller font
  fontWeight: "bold",
  marginRight: "8px" // Reduced margin
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
  alignContent: "center",
  alignItems: "center",
  marginTop: "2px", // Reduced margin
  // border:"2px solid red",
  width: "150px"
}));

const BookmarkIconContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  display: "inline-flex",
  marginLeft: "5px"
}));
const PulseIcon = styled(Box)<{ pulsing: boolean }>(({ theme, pulsing }) => ({
  position: "relative",
  cursor: "pointer",
  animation: pulsing ? "pulse 0.5s infinite alternate" : "none",
  "@keyframes pulse": {
    "0%": { opacity: 0.6, transform: "scale(1)" },
    "100%": { opacity: 1, transform: "scale(1.1)" }
  }
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  borderRadius: "8px",
  color: "white",
  backgroundColor: "#0a0a0a",
  maxHeight: "600px",
  border: "none",
  overflowY: "auto" // Enable scrolling when content overflows
};

interface CashtagMentionedProps {
  cashinfo: {
    [key: string]: any[];
  };
}

const CashtagMentioned: React.FC<CashtagMentionedProps> = ({ cashinfo }) => {

  const cashtagData = cashinfo || {};
  const cashtagKeys = Object.keys(cashtagData);
  console.log(cashtagData, "sanhello");

  // ✅ Correct initial state to avoid undefined errors
  const [selectedCashtag, setSelectedCashtag] = useState<string>(
    cashtagKeys.length > 0 ? cashtagKeys[0] : ""
  );
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [tempSelectedIndex, setTempSelectedIndex] = useState<number>(0);
  const [coinData, setCoinData] = useState(null);
  const [TokenData, setTokenData] = useState(null);
  const [currentData, setCurrentData] = useState<any[]>(
    cashtagKeys.length > 0 && cashtagData[cashtagKeys[0]]
      ? cashtagData[cashtagKeys[0]]
      : []
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectData, setSelectData] = useState<any>(
    currentData.length > 0 ? currentData[0] : null
  );

  // New state for bookmark status
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // ✅ Update selectData when currentData or selectedIndex changes
  useEffect(() => {
    if (currentData.length > 0) {
      setSelectData(currentData[selectedIndex] || null);
      // Reset bookmark status when selection changes
      setIsBookmarked(false);
    }
  }, [currentData, selectedIndex]);

  // ✅ Set initial data correctly when cashtagData changes
  useEffect(() => {
    if (cashtagKeys.length > 0) {
      setSelectedCashtag(cashtagKeys[0]);
      setCurrentData(cashtagData[cashtagKeys[0]] || []);
      setSelectedIndex(0); // Reset selected index on new cashtag selection
      setIsBookmarked(false); // Reset bookmark status on new cashtag
    }
  }, [cashtagData]);

  // ✅ Handle cashtag selection and prevent undefined data
  const handleCashtagSelect = (cashtag: string) => {
    setSelectedCashtag(cashtag);
    if (cashtagData[cashtag]) {
      setCurrentData(cashtagData[cashtag]);
      setSelectedIndex(0); // Reset selected index for new cashtag
      // setIsBookmarked(false); // Reset bookmark status on new cashtag selection
    } else {
      setCurrentData([]);
    }
  };

  // Handler for bookmark actions
  // Enhanced bookmark toggle handler with detailed logging
  const handleBookmarkToggle = async () => {
    if (!selectData || isBookmarking) {
      console.log(
        "Bookmark toggle prevented - no selectData or already processing"
      );
      return;
    }

    console.group("====== Bookmark Toggle Debug ======");
    console.log("Initial selectData:", selectData);

    // Improved type detection with fallback
    const isToken =
      selectData.token_address && typeof selectData.token_address === "string";
    const isCoin = selectData.id && typeof selectData.id === "string";

    console.log(`Type detection - isToken: ${isToken}, isCoin: ${isCoin}`);

    if (!isToken && !isCoin) {
      console.error(
        "Cannot bookmark - item has neither valid token_address nor id"
      );
      console.groupEnd();
      return;
    }

    const identifier = (isToken ? selectData.token_address : selectData.id)
      .toString()
      .toLowerCase();
    const itemType = isToken ? "token" : "coin";
    console.log(`Processing ${itemType} with identifier: ${identifier}`);

    setIsBookmarking(true);
    const newBookmarkState = !isBookmarked;
    console.log(
      `Requesting new bookmark state: ${newBookmarkState} (current: ${isBookmarked})`
    );

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      console.error("Authentication failed - no JWT token found");
      setIsBookmarking(false);
      console.groupEnd();
      return;
    }

    try {
      // Get current saved items
      const savedAddressesStr =
        localStorage.getItem("savedTokenAddresses") || "[]";
      const savedCoinsStr = localStorage.getItem("savedCoinsId") || "[]";

      const savedAddresses: string[] = JSON.parse(savedAddressesStr);
      const savedCoins: string[] = JSON.parse(savedCoinsStr);

      console.log(
        `Current saved ${itemType}s:`,
        isToken ? savedAddresses : savedCoins
      );

      // Check if already bookmarked
      const isAlreadyBookmarked = isToken
        ? savedAddresses.some((addr) => addr.toLowerCase() === identifier)
        : savedCoins.some((id) => id.toLowerCase() === identifier);

      console.log(`Current bookmark status: ${isAlreadyBookmarked}`);

      // Determine correct API endpoint
      let endpoint;
      if (isToken) {
        endpoint = `https://api.marwalproduction.com/save_tokens_coins/${identifier}`;
      } else {
        endpoint = `https://api.marwalproduction.com/save_tokens_coins/${identifier}`;
      }

      const method = newBookmarkState ? "POST" : "DELETE";
      console.log(`Preparing ${method} request to: ${endpoint}`);

      // Make API call
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Update local storage if API call succeeded
      if (isToken) {
        const updatedAddresses = newBookmarkState
          ? [...savedAddresses, identifier]
          : savedAddresses.filter((addr) => addr.toLowerCase() !== identifier);

        localStorage.setItem(
          "savedTokenAddresses",
          JSON.stringify(updatedAddresses)
        );
        console.log(`Updated token addresses:`, updatedAddresses);
      } else {
        const updatedCoins = newBookmarkState
          ? [...savedCoins, identifier]
          : savedCoins.filter((id) => id.toLowerCase() !== identifier);

        localStorage.setItem("savedCoinsId", JSON.stringify(updatedCoins));
        console.log(`Updated coin IDs:`, updatedCoins);
      }

      // Update UI state
      setIsBookmarked(newBookmarkState);
      console.log(
        `Successfully ${newBookmarkState ? "added" : "removed"} bookmark`
      );
    } catch (error) {
      console.error("Error in bookmark toggle:", error);

      // Revert to previous state if error occurs
      setIsBookmarked(!newBookmarkState);

      // Show error to user (optional)
      // alert(`Failed to ${newBookmarkState ? 'save' : 'remove'} bookmark. Please try again.`);
    } finally {
      setIsBookmarking(false);
      console.groupEnd();
    }
  };

  console.log(selectData); // ✅ Now correctly logs selected data

  // ✅ Open Modal
  const handleOpenModal = () => {
    setTempSelectedIndex(selectedIndex);
    setModalOpen(true);
  };

  const handleSaveModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(false);
  };

  // useEffect(() => {
  //   return () => {
  //     console.log("Cleaning up CashtagMentioned component...");

  // Example: Clear any timers or intervals if added
  // clearInterval(intervalId);

  // Reset selected data and states
  //     setSelectedCashtag("");
  //     setCurrentData([]);
  //     setSelectedIndex(0);
  //     setSelectData(null);
  //     setIsBookmarked(false);
  //   };
  // }, []);

  console.log(currentData, "currentData", tempSelectedIndex);
  console.log(selectData, "selectData", tempSelectedIndex);


  useEffect(() => {
    setTokenData(null);
    setCoinData(null);
    const fetchCoinData = async () => {
      const coinData = await getCoinCurrMarketData(selectData.id);
      console.log(coinData, "coinData");
      setTokenData((prev) => null);
      setCoinData(coinData);
    };

    const fetchtokenData = async () => {
      setCoinData((prev) => null);
      const tokensdata = await getTokenCurrMarketData(
        selectData?.pairs?.geckoterminal_network_id,
        selectData?.token_address
      );
      console.log(tokensdata, "tokensdatadddd");
      setTokenData(tokensdata);
    };

    if (selectData?.id) {
      fetchCoinData();
    } else if (
      selectData?.pairs?.geckoterminal_network_id &&
      selectData?.token_address
    ) {
      fetchtokenData();
    }
  }, [selectData, tempSelectedIndex]);
  // Add this useEffect hook right after your other useEffect hooks
  // In your useEffect for checking bookmark status
  // Enhanced useEffect for checking bookmark status with detailed logging
  // Improved useEffect for checking bookmark status
  useEffect(() => {
    console.group("====== Bookmark Status Check ======");

    if (!selectData) {
      console.log("No selectData available - setting isBookmarked to false");
      setIsBookmarked(false);
      console.groupEnd();
      return;
    }

    try {
      // Improved type detection
      const isToken =
        selectData.token_address &&
        typeof selectData.token_address === "string";
      const isCoin = selectData.id && typeof selectData.id === "string";

      console.log(`Type detection - isToken: ${isToken}, isCoin: ${isCoin}`);

      if (!isToken && !isCoin) {
        console.log(
          "Item is neither token nor coin - setting isBookmarked to false"
        );
        setIsBookmarked(false);
        console.groupEnd();
        return;
      }

      const identifier = (isToken ? selectData.token_address : selectData.id)
        .toString()
        .toLowerCase();
      console.log(`Current ${isToken ? "token" : "coin"} ID: ${identifier}`);

      // Get saved items from localStorage
      const savedItemsStr = isToken
        ? localStorage.getItem("savedTokenAddresses") || "[]"
        : localStorage.getItem("savedCoinsId") || "[]";

      const savedItems: string[] = JSON.parse(savedItemsStr);
      console.log(`Saved ${isToken ? "tokens" : "coins"}:`, savedItems);

      // Check if current item is bookmarked
      const isSaved = savedItems.some(
        (item) => item.toLowerCase() === identifier.toLowerCase()
      );

      console.log(`Is current ${isToken ? "token" : "coin"} saved?`, isSaved);
      setIsBookmarked(isSaved);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
      setIsBookmarked(false);
    } finally {
      console.groupEnd();
    }
  }, [selectData, currentData]);

  const handleCopy = async () => {
    console.log(selectData.token_address, "selectData.token_address");

    if (!selectData.token_address) return; // ✅ Don't proceed if address is missing

    try {
      await navigator.clipboard.writeText(selectData.token_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  const getValidNetworkId = (pairs) => {
    const invalid = ["none", "None", null, undefined];
    const { chain_id, geckoterminal_network_id } = pairs || {};
    if (!invalid.includes(chain_id)) return chain_id;
    if (!invalid.includes(geckoterminal_network_id))
      return geckoterminal_network_id;
    return "-";
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const sortedCashtags = Object.keys(cashtagData).sort((a, b) => {
    // Get market caps (using 0th index of each cashtag's data)
    const marketCapA =
      cashtagData[a][0]?.MarketCap ||
      cashtagData[a][0]?.pairs?.market_cap_in_usd ||
      cashtagData[a][0]?.market_cap ||
      0;
    const marketCapB =
      cashtagData[b][0]?.MarketCap ||
      cashtagData[b][0]?.pairs?.market_cap_in_usd ||
      cashtagData[b][0]?.market_cap ||
      0;

    // Sort in descending order (biggest first)
    return marketCapB - marketCapA;
  });

  return (
    <>
      {coinData && (
        <>
          {/* ✅ Modal for Editing Cashtag Data */}
          <CashtagPopup
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            tokensinfo={currentData}
            selectedIndex={tempSelectedIndex}
            onSelect={(index: any) => {
              setSelectedIndex(index);
              setModalOpen(false);
            }}
          />
          <CashtagCard elevation={0}>
            {/* Header with cashtag mentioned count and selector buttons */}
            <Header>
              <Title sx={{ fontSize: "0.9rem" }}>
                Cashtag Mentioned {Object.keys(cashtagData).length}
              </Title>
              <Box sx={{ position: "relative", width: "50%" }}>
                <ScrollButton
                  onClick={() => handleScroll("left")}
                  sx={{ left: 0 }}
                  size="small"
                >
                  <ArrowLeftIcon fontSize="small" />
                </ScrollButton>

                <ScrollableButtonContainer ref={scrollContainerRef}>
                  {sortedCashtags.map((tag) => (
                    <CashtagButton
                      key={tag}
                      selected={selectedCashtag === tag}
                      onClick={() => {
                        handleCashtagSelect(tag);
                      }}
                    >
                      ${tag.toUpperCase()}
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

            <Box sx={{ display: "flex", p: 1 }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Avatar
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                      src={selectData?.TokenLogo}
                    >
                      {" "}
                      {/* Smaller avatar */}${selectedCashtag.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mr: 0.5, fontSize: "1.0rem" }}
                    >
                      {" "}
                      {/* Smaller font */}
                      {selectedCashtag.toUpperCase()}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {currentData?.length > 1 && (
                        <Box
                          sx={{
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <MdEditSquare
                            onClick={handleOpenModal}
                            style={{
                              cursor: "pointer",
                              margin: "0 5px",
                              width: "0.8rem", // Direct SVG control
                              height: "0.8rem" // These override everything
                            }}
                          />
                        </Box>
                      )}
                      {(selectData?.pairs?.token_address ||
                        selectData?.token_address) && (
                        <button
                          onClick={handleCopy}
                          style={{
                            color: "white",
                            border: "none",
                            backgroundColor: "#0B0B0B"
                          }}
                        >
                          {/* <span>{tokenAddress}</span> */}
                          {copied ? (
                            <CheckCircleIcon
                              style={{
                                color: "#4CAF50",
                                fontSize: "0.8rem"
                              }}
                            />
                          ) : (
                            <FaRegCopy
                              style={{
                                fontSize: "0.8rem"
                              }}
                            />
                          )}
                        </button>
                      )}
                      {/* Bookmark toggle with absolute positioning to overlay icons */}
                      <PulseIcon
                        pulsing={isBookmarking}
                        onClick={handleBookmarkToggle}
                        sx={{ mt: "2px" }}
                      >
                        {!isBookmarked ? (
                          <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />
                        ) : (
                          <BookmarkIcon
                            sx={{ fontSize: "1.2rem", color: "#740AFB" }}
                          />
                        )}
                      </PulseIcon>
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "gray",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexDirection: "row"
                    }}
                  >
                    {selectData?.pairs?.network_img ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={selectData.pairs.network_img}
                          alt={
                            selectData.pairs.chain_id ||
                            selectData.pairs.geckoterminal_network_id ||
                            "network"
                          }
                          style={{
                            width: 14,
                            height: 14,
                            marginRight: 3,
                            verticalAlign: "middle",
                            alignSelf: "center"
                          }}
                        />
                        {getValidNetworkId(selectData?.pairs)}
                      </Box>
                    ) : (
                      <UserNameText>
                        {getValidNetworkId(selectData?.pairs)}
                      </UserNameText>
                    )}

                    <UserNameText>
                      {formatLaunchDate(selectData?.TokenAge)}
                    </UserNameText>
                  </Typography>

                  <Box display={"flex"} sx={{ width: "100%" }}>
                    <Box sx={{ width: "130%" }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        Market Cap
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center" // vertically center
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            mr: 0.7
                          }}
                        >
                          {formatCurrencyValue(coinData[0]?.market_cap) || "-"}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "10px",
                            color:
                              coinData[0]?.market_cap_change_percentage_24h >= 0
                                ? "green"
                                : "red"
                          }}
                        >
                          {coinData[0]?.market_cap_change_percentage_24h >= 0
                            ? "↑ "
                            : "↓ "}
                          {Math.abs(
                            coinData[0]?.market_cap_change_percentage_24h
                          ).toFixed(2)}
                          %
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: "90%", ml: 2 }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        Volume(24h)
                      </Typography>
                      <Typography
                        sx={{
                          color: "White",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {formatCurrencyValue(coinData[0]?.total_volume)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.count_mentions_last_24h !== null &&
                        selectData?.count_mentions_last_24h !== undefined &&
                        selectData?.count_mentions_last_24h !== ""
                          ? selectData.count_mentions_last_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Mentions (24h)</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.mentions_by_influencers_24h !== null &&
                        selectData?.mentions_by_influencers_24h !== undefined &&
                        selectData?.mentions_by_influencers_24h !== ""
                          ? selectData.mentions_by_influencers_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Influencers</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <GroupsIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>{selectData?.Community || "-"}</StatValue>
                      <StatLabel>Community</StatLabel>
                    </StatContainer>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider />
            {selectData.ticker ? (
              <ChartwithToolCoin selectData={selectData} />
            ) : (
              <ChartwithTool selectData={selectData} />
            )}

            <CryptoPairStatsCoin
              currentPrice={coinData[0]?.current_price}
              marketCap={coinData[0]?.market_cap}
              pair={selectData.pairName}
              priceChange24h={coinData[0]?.price_change_percentage_24h}
              keyName={"Circulating Supply"}
              keyName2={"Total Supply"}
              liquidity={coinData[0]?.circulating_supply}
              fdv={coinData[0]?.fully_diluted_valuation}
              total_supply={coinData[0]?.total_supply}
            />
          </CashtagCard>
        </>
      )}

      {TokenData && (
        <>
          {/* ✅ Modal for Editing Cashtag Data */}
          <CashtagPopup
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            tokensinfo={currentData}
            selectedIndex={tempSelectedIndex}
            onSelect={(index: any) => {
              setSelectedIndex(index);
              setModalOpen(false);
            }}
          />
          <CashtagCard elevation={0}>
            {/* Header with cashtag mentioned count and selector buttons */}
            <Header>
              <Title sx={{ fontSize: "0.9rem" }}>
                Cashtag Mentioned {Object.keys(cashtagData).length}
              </Title>
              <Box sx={{ position: "relative", width: "50%" }}>
                <ScrollButton
                  onClick={() => handleScroll("left")}
                  sx={{ left: 0 }}
                  size="small"
                >
                  <ArrowLeftIcon fontSize="small" />
                </ScrollButton>

                <ScrollableButtonContainer ref={scrollContainerRef}>
                  {sortedCashtags.map((tag) => (
                    <CashtagButton
                      key={tag}
                      selected={selectedCashtag === tag}
                      onClick={() => {
                        handleCashtagSelect(tag);
                      }}
                    >
                      ${tag.toUpperCase()}
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
            <Box sx={{ display: "flex", p: 1 }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Avatar
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                      src={selectData?.TokenLogo}
                    >
                      {" "}
                      {/* Smaller avatar */}${selectedCashtag.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mr: 0.5, fontSize: "1.0rem" }}
                    >
                      {" "}
                      {/* Smaller font */}
                      {selectedCashtag.toUpperCase()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {currentData?.length > 1 && (
                        <Box
                          sx={{
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <MdEditSquare
                            onClick={handleOpenModal}
                            style={{
                              cursor: "pointer",
                              margin: "0 5px",
                              width: "0.8rem", // Direct SVG control
                              height: "0.8rem" // These override everything
                            }}
                          />
                        </Box>
                      )}

                      {(selectData?.pairs?.token_address ||
                        selectData?.token_address) && (
                        <button
                          onClick={handleCopy}
                          style={{
                            color: "white",
                            border: "none",
                            backgroundColor: "#0B0B0B"
                          }}
                        >
                          {/* <span>{tokenAddress}</span> */}
                          {copied ? (
                            <CheckCircleIcon
                              style={{
                                color: "#4CAF50",
                                fontSize: "0.8rem"
                              }}
                            />
                          ) : (
                            <FaRegCopy
                              style={{
                                fontSize: "0.8rem"
                              }}
                            />
                          )}
                        </button>
                      )}
                      {/* Bookmark toggle with absolute positioning to overlay icons */}
                      <PulseIcon
                        pulsing={isBookmarking}
                        onClick={handleBookmarkToggle}
                        sx={{ mt: "2px" }}
                      >
                        {!isBookmarked ? (
                          <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />
                        ) : (
                          <BookmarkIcon
                            sx={{ fontSize: "1.2rem", color: "#740AFB" }}
                          />
                        )}
                      </PulseIcon>
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "gray",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexDirection: "row"
                    }}
                  >
                    {selectData?.pairs?.network_img ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={selectData.pairs.network_img}
                          alt={
                            selectData.pairs.chain_id ||
                            selectData.pairs.geckoterminal_network_id ||
                            "network"
                          }
                          style={{
                            width: 14,
                            height: 14,
                            marginRight: 3,
                            verticalAlign: "middle",
                            alignSelf: "center"
                          }}
                        />
                        {getValidNetworkId(selectData?.pairs)}
                      </Box>
                    ) : (
                      <UserNameText>
                        {getValidNetworkId(selectData?.pairs)}
                      </UserNameText>
                    )}

                    <UserNameText>
                      {formatLaunchDate(selectData?.TokenAge)}
                    </UserNameText>
                  </Typography>

                  <Box display={"flex"} sx={{ width: "100%" }}>
                    <Box sx={{ width: "130%" }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        Market Cap
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center" // vertically center
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            mr: 1
                          }}
                        >
                          {formatCurrencyValue(
                            TokenData?.attributes?.market_cap_usd
                          ) || "-"}
                        </Typography>

                        {/* <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px",
                    color:
                    TokenData[0]?.market_cap_change_percentage_24h >= 0
                        ? "green"
                        : "red"
                  }}
                >
                  {coinData[0]?.market_cap_change_percentage_24h>= 0
                    ? "↑ "
                    : "↓ "}
                  {Math.abs(
                   coinData[0]?.market_cap_change_percentage_24h
                  ).toFixed(2)}
                  %
                </Typography> */}
                      </Box>
                    </Box>
                    <Box sx={{ width: "90%", ml: 2 }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        Volume(24h)
                      </Typography>
                      <Typography
                        sx={{
                          color: "White",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {formatCurrencyValue(
                          TokenData?.attributes?.volume_usd?.h24
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.count_mentions_last_24h !== null &&
                        selectData?.count_mentions_last_24h !== undefined &&
                        selectData?.count_mentions_last_24h !== ""
                          ? selectData.count_mentions_last_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Mentions (24h)</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.mentions_by_influencers_24h !== null &&
                        selectData?.mentions_by_influencers_24h !== undefined &&
                        selectData?.mentions_by_influencers_24h !== ""
                          ? selectData.mentions_by_influencers_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Influencers</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <GroupsIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>{selectData?.Community || "-"}</StatValue>
                      <StatLabel>Community</StatLabel>
                    </StatContainer>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <ChartwithTool selectData={selectData} />
            <CryptoPairStatsCoin
              currentPrice={TokenData?.attributes?.price_usd}
              marketCap={TokenData?.attributes?.market_cap_usd}
              pair={selectData?.pairs?.pair_name}
              priceChange24h={selectData?.pairs?.price_ch_per_h24}
              keyName={"Liquidity"}
              keyName2={"Total supply"}
              liquidity={TokenData?.attributes?.total_reserve_in_usd}
              fdv={TokenData?.attributes?.fdv_usd}
              total_supply={TokenData?.attributes?.total_supply}
            />
          </CashtagCard>
        </>
      )}
      {!TokenData && !coinData && (
        <>
          {/* ✅ Modal for Editing Cashtag Data */}
          <CashtagPopup
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            tokensinfo={currentData}
            selectedIndex={tempSelectedIndex}
            onSelect={(index: any) => {
              setSelectedIndex(index);
              setModalOpen(false);
            }}
          />

          <CashtagCard elevation={0}>
            {/* Header with cashtag mentioned count and selector buttons */}
            <Header>
              <Title sx={{ fontSize: "0.9rem" }}>
                Cashtag Mentioned {Object.keys(cashtagData).length}
              </Title>
              <Box sx={{ position: "relative", width: "50%" }}>
                <ScrollButton
                  onClick={() => handleScroll("left")}
                  sx={{ left: 0 }}
                  size="small"
                >
                  <ArrowLeftIcon fontSize="small" />
                </ScrollButton>

                <ScrollableButtonContainer ref={scrollContainerRef}>
                  {sortedCashtags.map((tag) => (
                    <CashtagButton
                      key={tag}
                      selected={selectedCashtag === tag}
                      onClick={() => {
                        handleCashtagSelect(tag);
                      }}
                    >
                      ${tag.toUpperCase()}
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

            <Box sx={{ display: "flex", p: 1 }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Avatar
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                      src={selectData?.TokenLogo}
                    >
                      {" "}
                      {/* Smaller avatar */}${selectedCashtag.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mr: 0.5, fontSize: "1.0rem" }}
                    >
                      {" "}
                      {/* Smaller font */}
                      {selectedCashtag.toUpperCase()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {currentData?.length > 1 && (
                        <Box
                          sx={{
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <MdEditSquare
                            onClick={handleOpenModal}
                            style={{
                              cursor: "pointer",
                              margin: "0 5px",
                              width: "0.8rem", // Direct SVG control
                              height: "0.8rem" // These override everything
                            }}
                          />
                        </Box>
                      )}

                      {(selectData?.pairs?.token_address ||
                        selectData?.token_address) && (
                        <button
                          onClick={handleCopy}
                          style={{
                            color: "white",
                            border: "none",
                            backgroundColor: "#0B0B0B"
                          }}
                        >
                          {/* <span>{tokenAddress}</span> */}
                          {copied ? (
                            <CheckCircleIcon
                              style={{
                                color: "#4CAF50",
                                fontSize: "0.8rem"
                              }}
                            />
                          ) : (
                            <FaRegCopy
                              style={{
                                fontSize: "0.8rem"
                              }}
                            />
                          )}
                        </button>
                      )}
                      {/* Bookmark toggle with absolute positioning to overlay icons */}
                      <PulseIcon
                        pulsing={isBookmarking}
                        onClick={handleBookmarkToggle}
                        sx={{ mt: "2px" }}
                      >
                        {!isBookmarked ? (
                          <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />
                        ) : (
                          <BookmarkIcon
                            sx={{ fontSize: "1.2rem", color: "#740AFB" }}
                          />
                        )}
                      </PulseIcon>
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "gray",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexDirection: "row"
                    }}
                  >
                    {selectData?.pairs?.network_img ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={selectData.pairs.network_img}
                          alt={
                            selectData.pairs.chain_id ||
                            selectData.pairs.geckoterminal_network_id ||
                            "network"
                          }
                          style={{
                            width: 14,
                            height: 14,
                            marginRight: 3,
                            verticalAlign: "middle",
                            alignSelf: "center"
                          }}
                        />
                        {getValidNetworkId(selectData?.pairs)}
                      </Box>
                    ) : (
                      <UserNameText>
                        {getValidNetworkId(selectData?.pairs)}
                      </UserNameText>
                    )}

                    <UserNameText>
                      {formatLaunchDate(selectData?.TokenAge)}
                    </UserNameText>
                  </Typography>

                  <Box display={"flex"} sx={{ width: "100%" }}>
                    <Box sx={{ width: "130%" }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        Market Cap
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center" // vertically center
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            mr: 1
                          }}
                        >
                          {selectData?.asset_platform_id
                            ? formatCurrencyValue(
                                selectData?.pairs?.market_cap_in_usd
                              )
                            : formatCurrencyValue(selectData?.MarketCap) || "-"}
                        </Typography>

                        {/* <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px",
                    color:
                    TokenData[0]?.market_cap_change_percentage_24h >= 0
                        ? "green"
                        : "red"
                  }}
                >
                  {coinData[0]?.market_cap_change_percentage_24h>= 0
                    ? "↑ "
                    : "↓ "}
                  {Math.abs(
                   coinData[0]?.market_cap_change_percentage_24h
                  ).toFixed(2)}
                  %
                </Typography> */}
                      </Box>
                    </Box>
                    <Box sx={{ width: "90%", ml: 2 }}>
                      <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                        {selectData?.category != "coin"
                          ? "Volume(24h)"
                          : "Total Volume"}
                      </Typography>
                      <Typography
                        sx={{
                          color: "White",
                          fontWeight: "bold",
                          fontSize: "18px"
                        }}
                      >
                        {formatCurrencyValue(
                          selectData?.category != "coin"
                            ? selectData?.pairs?.volume_h24_usd
                            : selectData?.total_volume_in_usd
                        )}
                        {/* {formatCurrencyValue(selectData?.total_volume)} */}
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.count_mentions_last_24h !== null &&
                        selectData?.count_mentions_last_24h !== undefined &&
                        selectData?.count_mentions_last_24h !== ""
                          ? selectData.count_mentions_last_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Mentions (24h)</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <AlternateEmailIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>
                        {selectData?.mentions_by_influencers_24h !== null &&
                        selectData?.mentions_by_influencers_24h !== undefined &&
                        selectData?.mentions_by_influencers_24h !== ""
                          ? selectData.mentions_by_influencers_24h
                          : "-"}
                      </StatValue>

                      <StatLabel>Influencers</StatLabel>
                    </StatContainer>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <StatContainer>
                      <IconContainer>
                        <GroupsIcon
                          sx={{ color: "white", fontSize: "0.8rem" }}
                        />
                      </IconContainer>
                      <StatValue>{selectData?.Community || "-"}</StatValue>
                      <StatLabel>Community</StatLabel>
                    </StatContainer>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider />
            {selectData.ticker ? (
              <ChartwithToolCoin selectData={selectData} />
            ) : (
              <ChartwithTool selectData={selectData} />
            )}

            {selectData.category == "coin" ? (
              <CryptoPairStatsCoin
                currentPrice={
                  selectData?.pairs?.price_in_usd ||
                  selectData?.current_price ||
                  "-"
                }
                marketCap={
                  selectData?.pairs?.market_cap_in_usd ||
                  selectData?.MarketCap ||
                  "-"
                }
                pair={selectData.pairName}
                priceChange24h={
                  selectData?.pairs?.price_ch_per_h24 ||
                  selectData?.price_change_percentage_24hr
                }
                keyName={"Circulating Supply"}
                keyName2={"Total Supply"}
                liquidity={selectData?.pairs?.circulating_supply}
                fdv={selectData?.fdv_in_usd}
                total_supply={selectData?.total_supply}
              />
            ) : (
              <CryptoPairStatsCoin
                currentPrice={selectData?.pairs?.price_in_usd}
                marketCap={selectData?.pairs?.market_cap_in_usd}
                pair={selectData?.pairs?.pair_name}
                priceChange24h={selectData?.pairs?.price_ch_per_h24}
                keyName={"Liquidity"}
                keyName2={"volume (24h)"}
                liquidity={selectData?.pairs?.total_liquidity_usd}
                fdv={selectData?.pairs?.fdv_in_usd}
                total_supply={selectData?.pairs?.volume_h24_usd}
              />
            )}
          </CashtagCard>
        </>
      )}
    </>
  );
};

export default CashtagMentioned;
