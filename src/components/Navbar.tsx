import React from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  Tooltip,
  Avatar,
  MenuItem
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import { useAuth } from "../config/AuthContext";
import { IoMdHome } from "react-icons/io";
// Styled Components
const NavbarContainer = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  // marginBottom: "16px",
  backgroundColor: "#040408",
  width:"100%",
  //   borderRadius: '12px',
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    // borderRadius: '12px',
    padding: "1px",
    background:
      "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.2))",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none"
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "363px",
    height: "4px",
    background: "linear-gradient(to right, transparent, #6601E6, transparent)",
    filter: "blur(2px)",
    borderRadius: "2px"
  }
});

const WalletWrapper = styled(Box)({
  display: "inline-flex",
  borderRadius: "5px",
  padding: "0.6px",
  background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))"
});

const WalletBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  backgroundColor: "#1a1b23",
  borderRadius: "5px",
  border: "none",
  boxShadow: "none"
});


interface MidnavbarProps {
  setPage: (page: string) => void;
  page: string;
}
const Navbar: React.FC<MidnavbarProps> = ({setPage, page}) => {
 const {user,logout}:any = useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const settings = [
    {title:"Profile",
    onclick: function (){
      setPage(this.title)
    }
  }, {title:"Account",
    onclick:()=>{}
  }, {title:"Referral",
    onclick:()=>{
      setPage("Referral")
    }
  },{title:"Dashboard",
    onclick:()=>{}
  }, {title:"Logout",
    onclick:()=>{
      logout();
    }
  }];
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <NavbarContainer>
    <Box display={"flex"}   sx={{ color: "#FFFFFF", fontSize: "15px", border:"1px solid #aaa",
     borderRadius:'5px',px:1,
      alignContent:"center",alignItems:"center"
     }}
     
     onClick={()=>{
      setPage("home")
    }} >
    {/* <IoMdHome /> */}
      <Typography
        variant="subtitle1"
        sx={{ color: "#FFFFFF", fontSize: "0.9rem" }}
      >
        GAI
      </Typography>
    </Box>

      {/* <WalletWrapper>
        <WalletBox>
          <AccountBalanceWalletIcon
            sx={{ color: "#d6b4fc", fontSize: "1.1rem" }}
          />
          <Typography
            variant="body2"
            sx={{ color: "white", fontSize: "0.75rem" }}
          >
            {walletAddress}
          </Typography>
        </WalletBox>
      </WalletWrapper> */}

      <Box
        sx={{
          background: "linear-gradient(to bottom, #886cab, #FFFFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* <IconButton size="small">
          <SettingsIcon sx={{ fontSize: "1.1rem", color: "#886cab" }} />
        </IconButton> */}
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp"
            //  src={user.profile_image_url}
              />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px",  "& .MuiPaper-root": {
            backgroundColor: "#090909", // Change background to #090909
          },}}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.title} onClick={handleCloseUserMenu} sx={{
        fontWeight:"bold"      ,
 color:"White"
            }}>
              <Typography sx={{ textAlign: "center" }} onClick={setting.onclick}>{setting.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;


const exampleData: {
  cashtag: string;
  count_mentions_last_24h: number;
  coins: Array<{
    id: string;
    symbol: string;
    name: string;
    image_url: string;

    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;

    high_24h_price: number;
    low_24h_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;

    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;

    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    price_change_percentage_1h: number;

    inserted_at: string;
    updated_at: string;

    if_listed: boolean;

    tickers: Array<{
      base: string;
      target: string;
      market: {
        name: string;
        identifier: string;
        has_trading_incentive: boolean;
      };
      last: number;
      volume: number;
      converted_last: {
        btc: number;
        eth: number;
        usd: number;
      };
      converted_volume: {
        btc: number;
        eth: number;
        usd: number;
      };
      trust_score: string;
      bid_ask_spread_percentage: number;
      timestamp: string;
      last_traded_at: string;
      last_fetch_at: string;
      is_anomaly: boolean;
      is_stale: boolean;
      trade_url: string;
      token_info_url: string | null;
      coin_id: string;
      target_coin_id: string;
    }>;

    token_address?: string;
    chain_id?: string;
    token_pairs_info?: Array<{
      pair_address: string;
      pair_name: string;
      price_in_usd: string;
      volume_h24: number;
      market_cap_in_usd: string;
      fdv_in_usd: string;
      network: {
        name: string;
        image_url: string | null;
      };
      dex: {
        name: string;
        image_url: string | null;
      };
      tokens: Array<{
        name: string;
        symbol: string;
        address: string;
        image_url: string;
      }>;
      pair_creation_date: string | null;
    }>;
  }>;
  tokens: Array<{
    token_address: string;
    name: string;
    symbol: string;
    chain_id: string;
    token_pairs_info: Array<{
      pair_address: string;
      pair_name: string;
      price_in_usd: string;
      volume_h24: number;
      market_cap_in_usd: string;
      fdv_in_usd: string;
      network: {
        name: string;
        image_url: string | null;
      };
      dex: {
        name: string;
        image_url: string | null;
      };
      tokens: Array<{
        name: string;
        symbol: string;
        address: string;
        image_url: string;
      }>;
      pair_creation_date: string | null;
    }>;
  }>;
}[] = [];
