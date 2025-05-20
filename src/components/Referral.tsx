import React, { useEffect } from "react";
import { Box, Typography, Paper, styled, Avatar, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Card, CardContent } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const StatCard = ({ title, value, subtitle }: any) => {
  return (
    <Card
      sx={{
        backgroundColor: "#090909",
        color: "white",
        borderRadius: "10px",
        border: "none",
        position: "relative",
        height: "80%",
        flex: 1,
        py: 1,
        minWidth: {
          xs: "100px", // Smaller minimum width on mobile
          sm: "230px"
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "10px",
          padding: "0.5px",
          background:
            "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none"
        }
      }}
    >
      <CardContent
        sx={{
          padding: "8px",
          "&:last-child": { paddingBottom: "8px" }
        }}
      >
        <Typography
          variant="subtitle2" // Smaller variant
          sx={{
            opacity: 0.7,
            textAlign: "center",
            fontSize: {
              xs: "0.7rem", // Smaller font on mobile
              sm: "0.8rem"
            }
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            mt: 0.5,
            justifyContent: "center"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "0.8rem", // Smaller font on mobile
                sm: "1rem"
              },
              backgroundImage:
                "linear-gradient(to bottom,rgb(89, 4, 200), rgb(136, 44, 255))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginLeft: 0.5,
              opacity: 0.8,
              fontSize: {
                xs: "0.6rem", // Smaller font on mobile
                sm: "0.8rem"
              }
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

function DashboardStats({ referral_points }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row", // Keep as row even on small screens
          sm: "row"
        },
        flexWrap: "nowrap",
        gap: 1, // Reduced gap
        justifyContent: "space-between",
        px: 1.5 // Reduced padding
      }}
    >
      <StatCard
        title="Referrals Points"
        value={referral_points}
        subtitle="Referral Numbers"
      />
      <StatCard
        title="Usage Points"
        value="60 Hour 2 min"
        subtitle="Active time"
      />
    </Box>
  );
}

const ReferralCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#0a0a0a",
  borderRadius: "10px",
  width: "100%",
  color: "white",
  padding: "18px 10px 12px", // Reduced padding
  display: "inline-block",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
  position: "relative",
  border: "none",
  height: "auto", // Changed to auto

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "10px",
    padding: "0.5px",
    background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none"
  }
}));
const ImageWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "inline-block",
  borderRadius: "10px",
  // padding: "0.8px",
  // background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  overflow: "hidden"
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
  borderRadius: "10px"
});

const UserInfoSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%"
});

const UserInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%"
});

const PointsInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  fontWeight: "bold"
}));

const LogoutLinkContainer = styled(Box)(({ theme }) => ({
  marginTop: "12px",
  padding: "6px 8px",
  marginLeft: "10px",
  marginRight: "10px",
  backgroundColor: "#141414",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  // border: "none",
  border: "2px solid red",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "10px",
    padding: "0.5px",
    background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none"
  }
}));

const ReferralLinkContainer = styled(Box)(({ theme }) => ({
  marginTop: "12px",
  padding: "6px 8px",
  backgroundColor: "#141414",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  border: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "10px",
    padding: "0.5px",
    background: "linear-gradient(to right, rgb(32 13 58), rgb(53 52 53))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row", // Keep as row
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "space-between"
  }
}));

const Referral = () => {
  // const { user,logout ,setUser}: any = useAuth();

  // useEffect(() => {
  //   console.log(user,"user.usernameuser.username");
  //   if (user?.username) {
  //     fetch(`https://api.marwalproduction.com/user_info?username=${user.username}`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch user data.");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setUser(data.user_data);
  //         localStorage.setItem("user_data", JSON.stringify(data));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user info:", error);
  //       });
  //   }
  // }, []);

  // const handleCopyReferralCode = () => {
  //   if (user?.referral_code) {
  //     navigator.clipboard
  //       .writeText(user.referral_code as string)
  //       .then(() => {
  //         console.log("Referral code copied to clipboard!");
  //       })
  //       .catch((err) => {
  //         console.error("Failed to copy referral code:", err);
  //         alert("Failed to copy referral code.");
  //       });
  //   }
  // };

  return (
    <Box
      sx={{
        width: "100%",
        pb: 1.5, // Reduced padding
        backgroundColor: "#0B0B0B",
        position: "relative",
        // border: "none",
        borderRadius: "10px",
        border: "2px solid red",
        height: "80vh",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   inset: 0,
        //   borderRadius: "5px",
        //   padding: "1px",
        //   background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
        //   WebkitMask:
        //     "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        //   WebkitMaskComposite: "xor",
        //   maskComposite: "exclude",
        //   pointerEvents: "none"
        // }
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
      }}
    >
      <Box
        sx={{
          border: "2px solid red"
        }}
      >
        <Box
          sx={{
            p: 1.5, // Reduced padding
            backgroundColor: "#0B0B0B"
          }}
        >
          <ReferralCard>
            <UserInfoSection>
              {/* User Info */}
              <UserInfo>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    // src={user.profile_image_url}
                    sx={{ width: 24, height: 24, marginRight: 1 }} // Smaller avatar
                  />
                  <Typography variant="body2" fontWeight="bold">
                    {/* {user.username}  */}
                    Abhijeet
                  </Typography>
                </Box>

                {/* Points Info */}
                <PointsInfo>
                  <Typography variant="caption" sx={{ marginRight: 0.5 }}>
                    Points earned -
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to bottom,rgb(89, 4, 200), rgb(136, 44, 255))",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontWeight: "bold"
                    }}
                  >
                    {/* {user.total_user_points} */}
                    233
                  </Typography>
                  <Box
                    component="img"
                    src="Vector.png"
                    alt="Points icon"
                    sx={{ height: 10, width: 14, marginLeft: 0.5 }}
                  />
                </PointsInfo>
              </UserInfo>

              {/* Referral Link Section */}
              <ReferralLinkContainer>
                <Typography
                  variant="caption"
                  color="white"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {/* {user.referral_code} */}
                  3421`23`
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: "white",
                    padding: "2px 8px",
                    fontSize: "0.7rem", // Smaller font
                    minWidth: "auto"
                  }}
                  // onClick={handleCopyReferralCode}
                >
                  Copy your referral Code{" "}
                  <ContentCopyIcon
                    fontSize="inherit"
                    sx={{ ml: 0.5, fontSize: "0.9rem" }}
                  />
                </Button>
              </ReferralLinkContainer>
            </UserInfoSection>
          </ReferralCard>
        </Box>
        <DashboardStats referral_points={21322} />
        {/* Add the image container after DashboardStats */}
        <Box
          sx={{
            px: 1.5,
            pt: 1,
            pb: 1.5,
            display: "flex",
            justifyContent: "center",
            mb: 35
          }}
        >
          <ImageWrapper>
            <StyledImage src="cointrendimage.png" alt="Coin trend image" />
          </ImageWrapper>
        </Box>
      </Box>
      <LogoutLinkContainer>
        <Button
          size="small"
          sx={{
            color: "white",
            padding: "2px 8px",
            fontSize: "0.7rem", // Smaller font
            minWidth: "auto"
          }}
          onClick={() => {
            // logout();
          }}
        >
          <IoIosLogOut
            fontSize="inherit"
            style={{ marginRight: "5px", fontSize: "0.9rem" }}
          />{" "}
          Logout
        </Button>
      </LogoutLinkContainer>
    </Box>
  );
};

export default Referral;
