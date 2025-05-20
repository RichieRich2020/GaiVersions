import React from "react";
import { Box, Typography, Paper, styled, Avatar, Grid } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";

// Props interface
export interface TweetOwnerProps {
  name: string;
  username: string;
  accountAge: string;
  avgViews: number;
  followers: string;
  totalTweets: string;
  tagMentions: number;
  profilePicture?: string;
  accountType?: "Regular" | "Influencer";
}

// Styled components
const TweetOwnerCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "155px",
  backgroundColor: "#2020201f",
  borderRadius: "9px",
  color: "white",
  padding: "6px 10px",
  position: "relative",
  marginBottom: "12px",
  boxSizing: "border-box",
  border: "1px solid transparent", // Transparent border to create space for the pseudo-element
  backgroundClip: "padding-box",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "5px",
    padding: "0.5px",
    background:
      "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none"
  },
}));

const Navbar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "4px", // Reduced margin
  height: "24px" // Fixed height
}));

const Divider = styled(Box)(({ theme }) => ({
  height: "1px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  margin: "4px -7px" // Reduced margin
}));

// Thinner gradient line
const GradientLine = styled(Box)(({ theme }) => ({
  height: "1px",
  width: "70%",
  margin: "3px auto", // Reduced margin
  background:
    "linear-gradient(to right, transparent, rgba(192, 192, 192, 0.8), transparent)",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "30%",
    right: "30%",
    height: "2px", // Thinner glow
    background:
      "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8), transparent 70%)",
    filter: "blur(1px)"
  }
}));

const TweetOwnerLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem", // Smaller font
  fontWeight: "bold",
  color: "#ffffff"
}));

const AccountTypeLabel = styled(Typography)(({ theme }) => ({
  color: "#8b5cf6",
  fontWeight: "bold",
  fontSize: "0.75rem" // Smaller font
}));

const UserNameText = styled(Typography)(({ theme }) => ({
  color: "#BABABA",
  marginTop: "10px", // Reduced negative margin
  fontSize: "0.7rem", // Smaller font
  display: "flex",
  alignItems: "center",
  marginBottom: "10px"
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem", // Smaller font
  fontWeight: "bold",
  marginRight: "8px" // Reduced margin
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: "#BABABA",
  fontSize: "0.8rem" // Smaller font
}));

const PurpleStatValue = styled(StatValue)(({ theme }) => ({
  color: "#8b5cf6"
}));

const StatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  marginTop: "2px", // Reduced margin
  // border:"2px solid red",
  width: "150px"
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "4px" // Reduced margin
}));

// Main component
const TweetOwner: React.FC<TweetOwnerProps> = ({
  name,
  username = "Elon",
  accountAge = "2 Year 5 Day",
  avgViews = 500,
  followers = "300000K",
  totalTweets = "30K",
  tagMentions = 50,
  profilePicture = "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
  accountType = "Influencer"
}) => {
  return (
    <TweetOwnerCard elevation={0}>
      {/* Navbar section */}
      <Navbar>
        <TweetOwnerLabel>Tweet Owner</TweetOwnerLabel>
        <AccountTypeLabel>{accountType.toUpperCase()}</AccountTypeLabel>
      </Navbar>

      {/* Divider */}
      <Divider />

      <Box sx={{ display: "flex", height: "110px", p: 1.5 }}>
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
                src={profilePicture}
              >
                {" "}
                {/* Smaller avatar */}
                {!profilePicture && name.charAt(0)}
              </Avatar>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mr: 0.5, fontSize: "1.0rem" }}
              >
                {" "}
                {/* Smaller font */}
                {name}
              </Typography>
              <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />{" "}
              {/* Smaller icon */}
            </Box>
            <Box>
              <UserNameText>
                @{username} {accountAge}
              </UserNameText>
              <StatContainer>
                <PurpleStatValue>{avgViews}</PurpleStatValue>
                <StatLabel>Avg. View</StatLabel>
              </StatContainer>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",

                  // width: "100%",
                  justifyContent: "flex-end"
                }}
              >
                <StatContainer>
                  <IconContainer>
                    <AlternateEmailIcon
                      sx={{ color: "white", fontSize: "0.8rem" }}
                    />{" "}
                    {/* Smaller icon */}
                  </IconContainer>
                  <StatValue>{followers}</StatValue>
                  <StatLabel>Followers</StatLabel>
                </StatContainer>

                {/* Smaller icon */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",

                  // width: "100%",
                  justifyContent: "flex-end"
                }}
              >
                <StatContainer>
                  <IconContainer>
                    <AlternateEmailIcon
                      sx={{ color: "white", fontSize: "0.8rem" }}
                    />{" "}
                    {/* Smaller icon */}
                  </IconContainer>
                  <StatValue>{totalTweets}</StatValue>
                  <StatLabel>Tweets</StatLabel>
                </StatContainer>

                {/* Smaller icon */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",

                  // width: "100%",
                  justifyContent: "flex-end"
                }}
              >
                <StatContainer>
                  <IconContainer>
                    <GroupsIcon sx={{ color: "white", fontSize: "0.8rem" }} />{" "}
                    {/* Smaller icon */}
                  </IconContainer>
                  <StatValue>{tagMentions}</StatValue>
                  <StatLabel>$tag (24hrs)</StatLabel>
                </StatContainer>

                {/* Smaller icon */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </TweetOwnerCard>
  );
};

export default TweetOwner;
