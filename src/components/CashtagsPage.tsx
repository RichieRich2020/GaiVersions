import { Chip, styled  } from "@mui/material";
import { Box, Typography, Paper, Avatar, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const TweetCard = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "#121212",
        color: "white",
        borderRadius: "10px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: "1px solid #6a0dad",
        width: "100%",
        maxWidth: 600,
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Elon Musk
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            @Elon
          </Typography>
        </Box>
        <IconButton sx={{ color: "white", opacity: 0.7 }}>
          <BookmarkBorderIcon />
        </IconButton>
      </Box>

      {/* Tweet Content */}
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        The truth is out there. I'm leaving this here for everyone to see{" "}
        <Typography component="span" sx={{ color: "#9b51e0", fontWeight: "bold" }}>
          #DOGBitcoin
        </Typography>
      </Typography>

      {/* Footer: Views & Report */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, mt: 1 }}>
        <Typography variant="body2" sx={{ color: "#9b51e0", fontWeight: "bold" }}>
          500
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          View
        </Typography>
        <Typography variant="body2" sx={{ color: "#9b51e0", cursor: "pointer" }}>
          Full Report
        </Typography>
      </Box>
    </Paper>
  );
};



const TrendingChipWrapper = styled(Box)({
    display: "inline-flex",
    borderRadius: "12px",
    padding: "0.8px",
    background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
  });

  const TrendingChip = styled(Chip)({
    backgroundColor: "#1a1b23",
    color: "white",
    borderRadius: "11px",
    padding: "2px 6px",
    width: "100%",
    height: "24px",
    "& .MuiChip-label": {
      fontSize: "0.55rem",
    },
    "&:hover": {
      backgroundColor: "#2c2d3a",
    },
  });

const CashtagsPage=()=>{
    return (
        <>
        <Box
    sx={{
      mt: 2,
      maxWidth:"600px",
      marginTop: "-2px",
      padding: "10px",
      paddingBottom: "6px",
      borderRadius: "12px",
      minHeight: "140px",
      position: "relative",
      width: "100%", // Makes the box take full width of parent
      boxSizing: "border-box",
      m:"auto",
      alignItems:"center",
      alignContent:"center", // Ensures padding is included in width calculation
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "12px",
        padding: "2px",
        background: "linear-gradient(to right, rgb(63 28 109), rgb(97 97 97))",
        WebkitMask: 
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
  
      },
      "@media (max-width: 600px)": {
        minHeight: "120px",
        "&::before": {
          padding: "1px",
        }
      },
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        color: "white",
        mb: 1.5,
        marginTop: "-2px",
        fontSize: "0.9rem",
        textAlign: "center",
        width: "100%", // Ensure text spans full width
      }}
    >
      Trending Cashtags
    </Typography>
    <Box 
      sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 0.8,
        width: "100%", // Make sure this container takes full width
        justifyContent: "center", // Center the chips
      }}
    >
      
        <TrendingChipWrapper 
         
          sx={{
            flexGrow: 0, // Prevents chips from stretching
            flexShrink: 0, // Prevents chips from shrinking
          }}
        >
          <TrendingChip label={`$${"NITRO"}🔥`} size="small" />
        </TrendingChipWrapper>
        <TrendingChipWrapper 
         
          sx={{
            flexGrow: 0, // Prevents chips from stretching
            flexShrink: 0, // Prevents chips from shrinking
          }}
        >
          <TrendingChip label={`$${"SOL"}🔥`} size="small" />
        </TrendingChipWrapper>
        <TrendingChipWrapper 
         
          sx={{
            flexGrow: 0, // Prevents chips from stretching
            flexShrink: 0, // Prevents chips from shrinking
          }}
        >
          <TrendingChip label={`$${"BTC"}🔥`} size="small" />
        </TrendingChipWrapper>
        <TrendingChipWrapper 
         
          sx={{
            flexGrow: 0, // Prevents chips from stretching
            flexShrink: 0, // Prevents chips from shrinking
          }}
        >
          <TrendingChip label={`$${"TRX"}🔥`} size="small" />
        </TrendingChipWrapper>
        <TrendingChipWrapper 
         
          sx={{
            flexGrow: 0, // Prevents chips from stretching
            flexShrink: 0, // Prevents chips from shrinking
          }}
        >
          <TrendingChip label={`$${"NITRO"}🔥`} size="small" />
        </TrendingChipWrapper>
    
    </Box>

  </Box>
  <Typography
            variant="subtitle1"
            sx={{
              color: "white",
            //   mb: 1.5,
              my:1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            Top <span style={{ color: "#8b5cf6", fontWeight: "bold" }}><b>Tweets</b></span> of the day
          </Typography>
          <Box
  sx={{
    display: "flex",
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    // minHeight: "100vh", // Make sure it takes full viewport height
    width: "100%",
    maxWidth: "600px", // Prevents stretching too wide
    margin: "auto",
    // border: "2px solid red", // Just for debugging
    gap: 2, // Adds spacing between cards
    // padding: 2, // Some padding for better spacing
  }}
>
  <TweetCard />
  <TweetCard />
  <TweetCard />
  <TweetCard />
</Box>

        </>
    )
}

export default CashtagsPage;