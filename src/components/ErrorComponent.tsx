import React from "react";
import {
  Box,
  Typography,
  Paper,
  styled,
  Button,
  useTheme,
  IconButton
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  ErrorOutline as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
// Define error types and their corresponding properties
const errorTypes = {
  NETWORK_ERROR: {
    title: "Connection Issue",
    icon: <ErrorIcon fontSize="large" />,
    color: "error"
  },
  DATA_NOT_FOUND: {
    title: "Data Not Available",
    icon: <WarningIcon fontSize="large" />,
    color: "warning"
  },
  NO_CASHTAG: {
    title: "No Cashtag Found",
    icon: <InfoIcon fontSize="large" />,
    color: "info"
  },
  USER_NOT_FOUND: {
    title: "User Data Missing",
    icon: <InfoIcon fontSize="large" />,
    color: "info"
  },
  DEFAULT: {
    title: "Get Started with Crypto Analysis",
    icon: <XIcon fontSize="large" />,
    color: "primary"
  },
  DEFAULT2: {
    title: "Something Went Wrong",
    icon: <ErrorIcon fontSize="large" />,
    color: "error"
  }
};

// Props interface
interface ErrorComponentProps {
  errorType?: keyof typeof errorTypes;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  onRetry?: () => void;
  fullHeight?: boolean;
}

// Styled components with enhanced dark theme and gradient border
const ErrorCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  minHeight: "160px",
  // backgroundColor: "#0a0a0a",
  borderRadius: "10px",
  color: theme.palette.common.white,
  padding: "10px",
  display: "flex",
  // mb: "16px",
  flexDirection: "column",
  marginBottom: "9px",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  boxShadow: theme.shadows[5],
  border: "1px solid transparent",
  backgroundImage: `linear-gradient(#0a0a0a, #0a0a0a), 
                   linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))`,
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  margin: "16px 0 8px",
  color: theme.palette.common.white
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  marginBottom: "24px",
  color: theme.palette.grey[400],
  maxWidth: "320px"
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: "8px",
  marginBottom: "16px",
  textTransform: "none",
  fontWeight: "bold",
  padding: "8px 16px",
  borderRadius: "6px",
  "& .MuiButton-endIcon": {
    marginLeft: "4px"
  },
  "&:hover": {
    boxShadow: `0 0 8px ${theme.palette.primary.main}`
  }
}));

const RetryButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  color: theme.palette.grey[400],
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[800]
  }
}));

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorType = "DEFAULT",
  message,
  actionText,
  onAction,
  onRetry,
  fullHeight = false
}) => {
  const theme = useTheme();
  const { title, icon, color } = errorTypes[errorType] || errorTypes.DEFAULT;

  // Default messages for different error types
  const defaultMessages = {
    NETWORK_ERROR:
      "We couldn't connect to our servers. Please check your internet connection and try again.",
    DATA_NOT_FOUND: "The requested data could not be found in our system.",
    NO_CASHTAG: "This tweet doesn't contain any cryptocurrency cashtags.",
    USER_NOT_FOUND: "User data is not available for this tweet.",
    DEFAULT: "To analyze crypto data from Twitter, visit X (Twitter) and click our extension button on any tweet or profile.",
    DEFAULT2: "An unexpected error occurred. Please try again later."
  };

  const displayMessage = message || defaultMessages[errorType] || defaultMessages.DEFAULT;

  // Default action texts
  const defaultActionTexts = {
    USER_NOT_FOUND: "Go to Twitter and click the button",
    NO_CASHTAG: "View other tweets with cashtags",
    DEFAULT: "Go to X (Twitter)",
    DEFAULT2: "Try again"

  };

  const displayActionText =
    actionText || defaultActionTexts[errorType] || defaultActionTexts.DEFAULT;

  return (
    
    <ErrorCard
      sx={{
        // height: fullHeight ? "80%" : "auto",
        // minHeight: fullHeight ? "80%" : "160px",
        
        width: "fit-Content",
        
        // maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      
      {onRetry && (
        <RetryButton onClick={onRetry} aria-label="retry">
          <RefreshIcon />
        </RetryButton>
      )}

      <Box
        sx={{
          color: theme.palette[color].main,
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
          px:1,
          "& svg": { 
            fontSize: "38.4px",
            filter: `drop-shadow(0 0 8px ${theme.palette[color].main}33)`
          }
        }}
      >
        {icon}
      </Box>

      <ErrorTitle variant="h5">{title}</ErrorTitle>
      <ErrorMessage variant="body1">{displayMessage}</ErrorMessage>

      {onAction && (
        <ActionButton 
          variant="contained" 
          color={color as "error" | "warning" | "info" | "inherit" | "primary" | "secondary" | "success"} 
          onClick={onAction} 
          endIcon={<ArrowForwardIcon />}
        >
          {displayActionText}
        </ActionButton>
      )}
    </ErrorCard>
  );
};

export default ErrorComponent;