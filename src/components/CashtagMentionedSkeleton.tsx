import React from 'react';
import { Box, Skeleton, styled, useTheme } from '@mui/material';

const CashtagCard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#121212",
  borderRadius: "10px",
  color: "white",
  padding: "12px",
  position: "relative",
  boxSizing: "border-box",
  overflow: "hidden",
  border: '1px solid #333',
}));
const ChartSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: "450px",
        height: "500px",
        p: 2,
        border: '1px solid',
        borderColor: '#333',
        borderRadius: 1,
        backgroundColor: '#121212',
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Skeleton 
          variant="rounded"
          width={120}
          height={24}
          sx={{ bgcolor: 'grey.800' }}
        />
        <Box display="flex" gap={1}>
          <Skeleton 
            variant="rounded"
            width={80}
            height={32}
            sx={{ bgcolor: 'grey.800' }}
          />
          <Skeleton 
            variant="circular"
            width={32}
            height={32}
            sx={{ bgcolor: 'grey.800' }}
          />
        </Box>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Skeleton 
          variant="rounded"
          width="60%"
          height={16}
          sx={{ mb: 1, bgcolor: 'grey.800' }}
        />
        <Skeleton 
          variant="rounded"
          width="40%"
          height={16}
          sx={{ bgcolor: 'grey.800' }}
        />
      </Box>
      
      <Box sx={{ 
        height: "371px",
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
        position: "relative",
        backgroundColor: '#1a1a1a',
        borderRadius: 1,
        p: 1
      }}>
        <Skeleton variant="rounded" width="5%" height="80%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="60%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="70%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="50%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="90%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="75%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="85%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="65%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="55%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="95%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="45%" sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rounded" width="5%" height="75%" sx={{ bgcolor: 'grey.800' }} />
        
        {/* X-axis */}
        <Box sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          backgroundColor: '#1a1a1a',
        }}>
          <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'grey.800' }} />
          <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'grey.800' }} />
          <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'grey.800' }} />
          <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'grey.800' }} />
          <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'grey.800' }} />
        </Box>
      </Box>
    </Box>
  );
};

const CashtagMentionedSkeleton = () => {
  return (
    <CashtagCard>
      {/* Header skeleton */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Skeleton 
          variant="rounded" 
          width="140px" 
          height={24} 
          sx={{ bgcolor: 'grey.800' }} 
        />
        <Box sx={{ width: "55%", position: "relative" }}>
          <Box sx={{ display: "flex", overflow: "hidden" }}>
            {[...Array(3)].map((_, i) => (
              <Skeleton 
                key={i} 
                variant="rounded" 
                width="60px" 
                height="24px" 
                sx={{ 
                  mx: 0.5,
                  bgcolor: 'grey.800'
                }} 
              />
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* Divider skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={1} 
        sx={{ 
          mb: 1.5,
          bgcolor: 'grey.800'
        }} 
      />
      
      <Box sx={{ display: "flex", p: 1 }}>
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
              width="60px" 
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
          <Box sx={{ display: "flex", width: "100%", mb: 1.5 }}>
            <Box sx={{ width: "100%" }}>
              <Skeleton 
                variant="text" 
                width="70px" 
                height={16} 
                sx={{ bgcolor: 'grey.800' }}
              />
              <Skeleton 
                variant="text" 
                width="100px" 
                height={24} 
                sx={{ bgcolor: 'grey.800' }}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton 
                variant="text" 
                width="90px" 
                height={16} 
                sx={{ bgcolor: 'grey.800' }}
              />
              <Skeleton 
                variant="text" 
                width="100px" 
                height={24} 
                sx={{ bgcolor: 'grey.800' }}
              />
            </Box>
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
              width="80px" 
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
              width="60px" 
              height={16} 
              sx={{ bgcolor: 'grey.800' }}
            />
          </Box>
        </Box>
      </Box>
      
      {/* Divider skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={1} 
        sx={{ 
          my: 1.5,
          bgcolor: 'grey.800',
     
        }} 
      />
      
     

      <Box sx={{ display: "flex", p: 1 }}>
        {/* Left side */}
        
        
        {/* Right side */}
        <Box sx={{ width: "100%", display: "flex", justifyContent:"cenyter" ,m:"auto"}}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent:"cenyter", mb: 1 }}>
          <ChartSkeleton />
          </Box>
            {/* Divider skeleton */}
   
       
          
        </Box>
      </Box>
    </CashtagCard>
  );
};

export default CashtagMentionedSkeleton;