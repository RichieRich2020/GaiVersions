import React from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Avatar,
  Grid,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import CampaignIcon from '@mui/icons-material/Campaign';

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
    backgroundColor: "#0a0a0a",
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "inherit",
      padding: "2px", // Border thickness
      background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "destination-out",
      maskComposite: "exclude",
      pointerEvents: "none",
    }
  }));

const Navbar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "4px", // Reduced margin
  height: "24px", // Fixed height
}));

const Divider = styled(Box)(({ theme }) => ({
  height: "1px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  margin: "4px -7px", // Reduced margin
}));

// Thinner gradient line
const GradientLine = styled(Box)(({ theme }) => ({
  height: "1px",
  width: "70%",
  margin: "3px auto", // Reduced margin
  background: "linear-gradient(to right, transparent, rgba(192, 192, 192, 0.8), transparent)",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "30%",
    right: "30%",
    height: "2px", // Thinner glow
    background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8), transparent 70%)",
    filter: "blur(1px)",
  }
}));

const TweetOwnerLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem", // Smaller font
  fontWeight: "bold",
  color: "#ffffff",
}));

const AccountTypeLabel = styled(Typography)(({ theme }) => ({
  color: "#8b5cf6",
  fontWeight: "bold",
  fontSize: "0.75rem", // Smaller font
}));

const UserNameText = styled(Typography)(({ theme }) => ({
  color: "#6b7280",
  marginTop: "-20px", // Reduced negative margin
  fontSize: "0.7rem", // Smaller font
  display: "flex",
  alignItems: "center",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem", // Smaller font
  fontWeight: "bold",
  marginRight: "4px", // Reduced margin
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: "#6b7280",
  fontSize: "0.65rem", // Smaller font
}));

const PurpleStatValue = styled(StatValue)(({ theme }) => ({
  color: "#8b5cf6",
}));

const StatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "2px", // Reduced margin
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "4px", // Reduced margin
}));

// Main component
const TweetOwner: React.FC<TweetOwnerProps> = ({
  name = "Elon Musk",
  username = "Elon",
  accountAge = "2 Year 5 Day",
  avgViews = 500,
  followers = "300K",
  totalTweets = "30K",
  tagMentions = 50,
  profilePicture = "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg",
  accountType = "Influencer",
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

      {/* User Info Section */}
      <Grid container spacing={1} sx={{ mt: 0.5 }}> {/* Reduced spacing and margin top */}
        {/* Avatar and Name - Top Left */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 1, sm: 1 }, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 24, height: 24, mr: 0.5 }} src={profilePicture}> {/* Smaller avatar */}
              {!profilePicture && name.charAt(0)}
            </Avatar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mr: 0.5, fontSize: "0.8rem" }}> {/* Smaller font */}
                {name}
              </Typography>
              <BookmarkBorderIcon sx={{ fontSize: "0.8rem" }} /> {/* Smaller icon */}
            </Box>
          </Box>
          
          {/* Gradient Line #1 - Under Avatar and Name */}
          <GradientLine />
        </Grid>

        {/* Followers - Top Right */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 2, sm: 2 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <StatContainer>
            <IconContainer>
              <AlternateEmailIcon sx={{ color: "white", fontSize: "0.8rem" }} /> {/* Smaller icon */}
            </IconContainer>
            <StatValue>{followers}</StatValue>
            <StatLabel>Followers</StatLabel>
          </StatContainer>
          
          {/* Gradient Line #2 - Under Followers */}
          <GradientLine />
        </Grid>

        {/* Username and Account Age - Middle Left */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 3, sm: 3 }, display: "flex", justifyContent: "center" }}>
          <UserNameText>
            @{username} {accountAge}
          </UserNameText>
        </Grid>

        {/* Tweets - Middle Right */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 4, sm: 4 }, display: "flex", flexDirection: "column", alignItems: "center"}}>
          <StatContainer>
            <IconContainer>
              <CampaignIcon sx={{ color: "white", fontSize: "0.8rem" }} /> {/* Smaller icon */}
            </IconContainer>
            <StatValue>{totalTweets}</StatValue>
            <StatLabel>Tweets</StatLabel>
          </StatContainer>
          
          {/* Gradient Line #3 - Under Tweets */}
          <GradientLine />
        </Grid>

        {/* Avg. View - Bottom Left */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 5, sm: 5 }, display: "flex", justifyContent: "center" }}>
          <StatContainer>
            <PurpleStatValue>{avgViews}</PurpleStatValue>
            <StatLabel>Avg. View</StatLabel>
          </StatContainer>
        </Grid>

        {/* $tag Mentions - Bottom Right */}
        <Grid item xs={6} sm={6} sx={{ order: { xs: 6, sm: 6 }, display: "flex", justifyContent: "center" }}>
          <StatContainer>
            <IconContainer>
              <GroupsIcon sx={{ color: "white", fontSize: "0.8rem" }} /> {/* Smaller icon */}
            </IconContainer>
            <StatValue>{tagMentions}</StatValue>
            <StatLabel>$tag (24hrs)</StatLabel>
          </StatContainer>
        </Grid>
      </Grid>
    </TweetOwnerCard>
  );
};

export default TweetOwner;