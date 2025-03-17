import React from "react";
import { Box, Typography, Paper, styled, Avatar, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Card, CardContent } from "@mui/material";
import { useAuth } from "../config/AuthContext";

const StatCard = ({ title, value, subtitle }:any) => {
  return (
    <Card
      sx={{
        backgroundColor: "#121212",
        color: "white",
        borderRadius: 2,
        border: "1px solid #6a0dad",
        // minWidth: 250,
        // padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", mt: 1 }}>
          <Typography variant="h5" sx={{ color: "#9b51e0", fontWeight: "bold" }}>
            {value}
          </Typography>
          {/* <Typography variant="body2" sx={{ marginLeft: 1, opacity: 0.8 }}>
            {subtitle}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};
 function DashboardStats() {
  return (
    <Box sx={{ display: "flex",    flexWrap: "wrap", gap: 2 , justifyContent:"space-between", px:3 }}>
      <StatCard title="Referrals Points" value="50" subtitle="Referral Numbers" />
      <StatCard title="Usage Points" value="60 Hour 2 min" subtitle="Active time" />
    </Box>
  );
}

const ReferralCard = styled(Paper)({
//   width: "100%",
  backgroundColor: "#0a0a0a",
  borderRadius: "9px",
  color: "white",
  padding: "10px 15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
});

const UserInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const PointsInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
});

const ReferralLinkContainer = styled(Box)({
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#111",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #333",
});

const Referral = () => {
      const { referraltoken,user }:any = useAuth()


      console.log(user,"in refreal");
  return ( 
    <Box sx={{
        // p:2,
        width:"100%",
        pb:2,
        backgroundColor:"#0B0B0B",
        border: "1px solid #333",
        borderRadius:"5px"
    }}>
    <Box sx={{
        p:2,
        backgroundColor:"#0B0B0B"
    }}>
      <ReferralCard>
        {/* User Info */}
        <UserInfo>
          <Avatar
            src={user?.profile_image_url||""}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="body1" fontWeight="bold">
            {user?.username||""}
          </Typography>
        </UserInfo>

        {/* Points Info */}
        <PointsInfo>
          <Typography variant="body1" sx={{ color: "#b388ff", marginRight: 0.5 }}>
            2250
          </Typography>
          <Typography variant="body2">Points earned</Typography>
        </PointsInfo>
      </ReferralCard>

      {/* Referral Link Section */}
      <ReferralLinkContainer>
        <Typography variant="body2" color="white">
       {referraltoken||""}
        </Typography>
        <Button size="small" sx={{ color: "white" }}>
        Copy Your Referral Link <ContentCopyIcon fontSize="small" sx={{ml:1}} />
        </Button>
      </ReferralLinkContainer>
    </Box>
    <DashboardStats/>
    </Box>
    
  );
};

export default Referral;