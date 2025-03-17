// components/ConnectWalletNav.tsx
import React from "react";
import { W3mButton } from "@reown/appkit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ConnectWalletNav() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 3,
      }}
    >
      <Typography variant="h6" component="h2">
        Connect Your Wallet
      </Typography>
      <w3m-button />
    </Box>
  );
}

export default ConnectWalletNav;
