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
        sx={{ color: "#FFFFFF", fontSize: "0.9rem"}}
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
          sx={{ mt: "45px" }}
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
            <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }} onClick={setting.onclick}>{setting.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
