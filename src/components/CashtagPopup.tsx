import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  styled,
  Paper,
  Avatar,
  AvatarGroup
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrencyValue } from "../utils/NumFormatter";
import axios from "axios";


const StatLabel = styled(Typography)(({ theme }) => ({
    color: "#BABABA",
    fontSize: "0.7rem" // Smaller font
  }));

const PopupContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  maxWidth: "90%",
  backgroundColor: "#0a0a0a",
  borderRadius: "10px",
  padding: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
  border: "1px solid #2d2d2d",
  maxHeight: "80vh",
  overflowY: "auto",
  // Hide scrollbar but keep functionality
  scrollbarWidth: "none", // For Firefox
  "&::-webkit-scrollbar": {
    display: "none" // For Chrome, Safari, and Opera
  }
}));

const PopupHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px"
}));

const PopupTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ffffff"
}));

const TokenItem = styled(Paper)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    padding: "0.1px",
    marginBottom: "8px",
    backgroundColor: selected ? "rgba(116, 10, 251, 0.1)" : "#121212",
    borderRadius: "8px",
    border: selected
      ? "1px solid #5d008a"
      : "1px solid rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: selected ? "rgba(116, 10, 251, 0.2)" : "#1a1a1a"
    }
  })
);

const TokenName = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#ffffff"
}));

const TokenAddress = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#8b5cf6",
  //   marginTop: "4px",
  textAlign: "center",
  py: 2,
  wordBreak: "break-all",
  display: "inline"
}));

const TokenInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "9px",
  alignItems: "center",
//   marginBottom: "4px"
}));

const MarketCapText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: "#BABABA",
  marginLeft: "auto"
}));

interface CashtagPopupProps {
  open: boolean;
  onClose: () => void;
  tokensinfo: any[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const Tokencard = ({
  index,
  selectedIndex,
  onSelect,
  onClose,
  token,

}: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");



  console.log(token, "tokenfffff");



  
  console.log( error?.includes("404"));
  return (
    <>
      {!loading ? (
       error?.includes("404")? (
            <TokenItem
            key={index}
            selected={index === selectedIndex}
            onClick={() => {
              onSelect(index);
              onClose();
            }}
          >
            <TokenInfo>
              <AvatarGroup spacing={14} sx={{ mr: 2 }}>
                <Avatar
                  sx={{
                    width: "30px",
                    height: "30px",
                    border: "none !important"
                  }}
                  // alt="Travis Howard"
                  src={token?.TokenLogo}
                />
              </AvatarGroup>
              <TokenName>{token?.Symbol}</TokenName>
              <MarketCapText>
                {formatCurrencyValue(token?.MarketCap)}
              </MarketCapText>
            </TokenInfo>
          </TokenItem>
        ) : (
          <>
            <TokenItem
              key={index}
              selected={index === selectedIndex}
              onClick={() => {
                onSelect(index);
                onClose();
              }}
            >
              <TokenInfo>
                {token.category!="coin"?
                              <AvatarGroup spacing={14} sx={{ width:"55px",mr: 2 , display: "flex",
                                justifyContent: "center",
                                alignItems: "center"     }}>
                  <Avatar
                    sx={{
                      width: "30px",
                      height: "30px",
                      border: "none !important"
                    }}
                    // alt="Travis Howard"
                    src={token?.TokenLogo
                    }
                  />

                  <Avatar
                    sx={{
                      width: "30px",
                      height: "30px",
                      border: "none !important"
                    }}
                    // alt="Cindy Baker"
                    src={token?.pir
                    }
                  />
                </AvatarGroup>:
                <AvatarGroup spacing={14} sx={{ width:"55px",mr: 2 , display: "flex",
                  justifyContent: "center",
                  alignItems: "center"     }}>
                <Avatar
                  sx={{
                    width: "30px",
                    height: "30px",
                    border: "none !important",
                   
                  }}
                  src={token?.TokenLogo}
                />

              </AvatarGroup>
                }
               <Box>
               <TokenName>{token?.TokenName}</TokenName>
               <StatLabel>{token?.Symbol}</StatLabel>
               </Box>
               
                <MarketCapText>
                {formatCurrencyValue(token?.MarketCap)}
                </MarketCapText>
              </TokenInfo>

              {/* <span
                style={{
                  color: "white",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  marginBottom: "10px"
                }}
              >
                Token:
                <TokenAddress>
                  {token?.contracts?.[0]?.contract_address || "N/A"}
                </TokenAddress>
              </span> */}
            </TokenItem>
          </>
        )
      ) : (
        <>loading... </>
      )}
    </>
  );
};

const CashtagPopup: React.FC<any> = ({
  open,
  onClose,
  tokensinfo,
  selectedIndex,
  onSelect
}) => {
  console.log(tokensinfo,"tokensinfo");
  return (
    <Modal open={open} onClose={onClose}>
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>Select Token</PopupTitle>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        </PopupHeader>

        {tokensinfo.map((token: any, index: number) => (
          <Tokencard
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            onClose={onClose}
            token={token}
            // network={token?.contracts[0]?.platform_coin_name}
            // contract_address={token?.contracts[0]?.contract_address}
            //   chainprofile={poolInfo.data[1].attributes.image_url}
          />
        ))}
      </PopupContainer>
    </Modal>
  );
};

export default CashtagPopup;
