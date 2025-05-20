import React from 'react';
import { Box, Skeleton, styled } from '@mui/material';

const TweetOwnerCard = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "155px",
  backgroundColor: "#121212",
  borderRadius: "10px",
  color: "white",
  padding: "6px 10px",
  position: "relative",
  marginBottom: "12px",
  boxSizing: "border-box",
  border: '1px solid #333',
}));

const TweetOwnerSkeleton = () => {
  return (
    <TweetOwnerCard>
      {/* Navbar section skeleton */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Skeleton 
          variant="text" 
          width="100px" 
          height={24} 
          sx={{ bgcolor: 'grey.800' }}
        />
        <Skeleton 
          variant="text" 
          width="70px" 
          height={24} 
          sx={{ bgcolor: 'grey.800' }}
        />
      </Box>
      
      {/* Divider skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={1} 
        sx={{ 
          mb: 1,
          bgcolor: 'grey.800'
        }} 
      />
      
      <Box sx={{ display: "flex", height: "110px", p: 1.5 }}>
        {/* Left side */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Skeleton 
              variant="circular" 
              width={24} 
              height={24} 
              sx={{ 
                mr: 0.5,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="80px" 
              height={24} 
              sx={{ 
                mr: 0.5,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="circular" 
              width={20} 
              height={20} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
          <Skeleton 
            variant="text" 
            width="120px" 
            height={16} 
            sx={{ 
              mb: 1.5,
              bgcolor: 'grey.800'
            }} 
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton 
              variant="text" 
              width="40px" 
              height={24} 
              sx={{ 
                mr: 1,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="60px" 
              height={16} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
        </Box>
        
        {/* Right side */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Skeleton 
              variant="circular" 
              width={16} 
              height={16} 
              sx={{ 
                mr: 0.5,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="40px" 
              height={24} 
              sx={{ 
                mr: 1,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="60px" 
              height={16} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Skeleton 
              variant="circular" 
              width={16} 
              height={16} 
              sx={{ 
                mr: 0.5,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="40px" 
              height={24} 
              sx={{ 
                mr: 1,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="60px" 
              height={16} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton 
              variant="circular" 
              width={16} 
              height={16} 
              sx={{ 
                mr: 0.5,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="40px" 
              height={24} 
              sx={{ 
                mr: 1,
                bgcolor: 'grey.800'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="80px" 
              height={16} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
        </Box>
      </Box>
    </TweetOwnerCard>
  );
};

export default TweetOwnerSkeleton;