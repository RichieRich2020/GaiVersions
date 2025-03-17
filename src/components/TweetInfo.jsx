import React from 'react';
import { Box, Typography, Avatar, Grid, Chip, Stack } from '@mui/material';

const TweetInfo = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#1A1A1A',
                color: 'white',
                padding: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '500px',
            }}
        >
            
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                    src="/path-to-avatar.jpg" // Replace with the actual avatar URL
                    alt="Crypto King"
                    sx={{ width: 48, height: 48 }}
                />
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        Crypto King
                    </Typography>
                    <Typography variant="body2" color="gray">
                        @crypto_king34 | Sep 2021
                    </Typography>
                </Box>
       

            </Box>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                    <Typography variant="body2" color="gray">
                        Tweets
                    </Typography>
                    <Typography variant="h6">147</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color="gray">
                        $tags 24h
                    </Typography>
                    <Typography variant="h6">-</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2" color="gray">
                        New $tags 24h
                    </Typography>
                    <Typography variant="h6">-</Typography>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="body2" color="gray">
                    Followers 109.4K
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                <Chip label="Influencer" size="small" sx={{ backgroundColor: '#333', color: 'white' }} />
                <Chip label="Avg. views 5.9K" size="small" sx={{ backgroundColor: '#333', color: 'white' }} />
            </Stack>
            </Box>


        </Box>
    );
};

export default TweetInfo;
