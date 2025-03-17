import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, styled, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Types
interface InfluencerData {
  id: string;
  name: string;
  avgViews: number | null;
  followers: number | null;
  tweets: number;
  lastPost: string;
  avatar: string;
}

interface InfluencerListProps {
  data: InfluencerData[];
}

// Props for styled components
interface StatColumnProps {
  width?: string;
}

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#0a0a0a',
  color: 'white',
  width: '100%', // Ensure 100% width
  maxWidth: '100%', // Add max-width to prevent overflow
  boxSizing: 'border-box', // Include padding in width calculation
  borderRadius: '8px',
  padding: '12px', // Reduced padding
  marginBottom: '16px',
    position: 'relative',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      padding: '2px',
      borderRadius: '8px',
      background: 'linear-gradient(to right, rgb(63, 28, 109), rgb(97, 97, 97))',
      '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      '-webkit-mask-composite': 'destination-out',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
  }));
  

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
}));

const FilterLabel = styled(Typography)(({ theme }) => ({
  color: '#6b7280',
  fontSize: '10px',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: '#1e293b',
  borderRadius: '20px',
  
  '& .MuiToggleButton-root': {
    color: '#6b7280',
    borderRadius: '20px',
    fontSize: '0.6rem',
    padding: '6px 16px',
    border: 'none',
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: '#3b82f6',
    },
  },
}));

const TableHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '8px 7px',
  borderRadius: '8px',
  backgroundColor: '#1e293b',
  marginBottom: '8px',
}));

const ColumnHeader = styled(Box)<{ width?: string }>(({ theme, width }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  flex: width || '1', // Use flex instead of fixed width
  minWidth: 0, // Allow shrinking
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  color: '#6b7280',
  fontSize: '8px',
  fontWeight: 500,
  marginRight: '4px',
}));

const InfluencerRow = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#1e293b',
  padding: '12px 8px',
  borderRadius: '8px',
  marginBottom: '8px',
  color: 'white',
}));

const InfluencerName = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '29%',
}));

// Fixed the StatColumn styled component
const StatColumn = styled(Typography)<StatColumnProps>(({ theme, width }) => ({
  flex: width || '1', // Use flex
  fontSize: '10px',
  fontWeight: 500,
  minWidth: 0, // Allow shrinking
  overflow: 'hidden', // Hide overflow
  textOverflow: 'ellipsis', // Add ellipsis for long text
  whiteSpace: 'nowrap', // Prevent wrapping
}));

// Main Component
const InfluencerList: React.FC<InfluencerListProps> = ({ data }) => {
  const [followerFilter, setFollowerFilter] = useState<string>('all');
  const [sortedData, setSortedData] = useState<InfluencerData[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InfluencerData | null;
    direction: 'asc' | 'desc';
  }>({ key: 'tweets', direction: 'desc' });

  // Handle filter change
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string,
  ) => {
    if (newFilter !== null) {
      setFollowerFilter(newFilter);
    }
  };

  // Handle sorting
  const requestSort = (key: keyof InfluencerData) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting
  useEffect(() => {
    let filteredData = [...data];

    // Apply follower filter
    if (followerFilter !== 'all') {
      const minFollowers = followerFilter === '5k' ? 5000 : 20000;
      filteredData = filteredData.filter(
        item => item.followers !== null && item.followers >= minFollowers
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof InfluencerData];
        const bValue = b[sortConfig.key as keyof InfluencerData];

        // Handle null values
        if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;

        // Special case for lastPost which is a string but represents time
        if (sortConfig.key === 'lastPost') {
          return sortConfig.direction === 'asc' 
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }

        // Regular comparison
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setSortedData(filteredData);
  }, [data, followerFilter, sortConfig]);

  // Helper to get sort icon
  const getSortIcon = (key: keyof InfluencerData) => {
    if (sortConfig.key !== key) {
      return <KeyboardArrowUpIcon  sx={{ opacity: 0.5, fontSize: "0.8rem" }} />;
    }
    return sortConfig.direction === 'asc' ? (
      <KeyboardArrowUpIcon sx={{fontSize: "0.8rem"}} />
    ) : (
      <KeyboardArrowDownIcon sx={{fontSize: "0.8rem"}} />
    );
  };

  return (
    <Container>
      <Header>
        <FilterLabel>Followers (greater than)</FilterLabel>
        <StyledToggleButtonGroup
          value={followerFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label="followers filter"
        >
          <ToggleButton value="5k">5k</ToggleButton>
          <ToggleButton value="20k">20k</ToggleButton>
          <ToggleButton value="all">All</ToggleButton>
        </StyledToggleButtonGroup>
      </Header>

      <TableHeader>
        <ColumnHeader width="20%" sx={{justifyContent: "center"}}>
          <HeaderText>Influencers</HeaderText>
        </ColumnHeader>
        <ColumnHeader width="20%" onClick={() => requestSort('avgViews')}>
          <HeaderText>Avg. views</HeaderText>
          {getSortIcon('avgViews')}
        </ColumnHeader>
        <ColumnHeader width="20%" onClick={() => requestSort('followers')}>
          <HeaderText>Followers</HeaderText>
          {getSortIcon('followers')}
        </ColumnHeader>
        <ColumnHeader width="20%" onClick={() => requestSort('tweets')}>
          <HeaderText>Tweets</HeaderText>
          {getSortIcon('tweets')}
        </ColumnHeader>
        <ColumnHeader width="20%"  onClick={() => requestSort('lastPost')}>
          <HeaderText>Last Post</HeaderText>
          {getSortIcon('lastPost')}
        </ColumnHeader>
      </TableHeader>

      {sortedData.map((influencer) => (
        <InfluencerRow key={influencer.id} elevation={0}>
        <InfluencerName>
  <Avatar 
    src={influencer.avatar} 
    alt={influencer.name}
    sx={{ width: 24, height: 24, marginRight: 1 }}
  />
  <Typography sx={{ fontSize: '0.56rem', fontWeight: 'bold' }}>
    {influencer.name}
  </Typography>
</InfluencerName>

          <StatColumn width="20%">
            {influencer.avgViews !== null ? influencer.avgViews.toLocaleString() : '-'}
          </StatColumn>
          <StatColumn width="20%">
            {influencer.followers !== null ? influencer.followers.toLocaleString() : '-'}
          </StatColumn>
          <StatColumn width="15%">{influencer.tweets}</StatColumn>
          <StatColumn width="20%">{influencer.lastPost}</StatColumn>
        </InfluencerRow>
      ))}
    </Container>
  );
};

// Demo data
const demoData: InfluencerData[] = [
  {
    id: '1',
    name: 'Jack_Dav',
    avgViews: 560,
    followers: 579,
    tweets: 62,
    lastPost: '4m 22s',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '2',
    name: 'dur8sol',
    avgViews: 1800,
    followers: 32300,
    tweets: 60,
    lastPost: '12h 32m',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '3',
    name: '18952051',
    avgViews: null,
    followers: null,
    tweets: 58,
    lastPost: '2h 21m',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '4',
    name: 'shahedsh',
    avgViews: 108,
    followers: 116,
    tweets: 49,
    lastPost: '3h 7m',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '5',
    name: 'MemeCoin',
    avgViews: null,
    followers: 11900,
    tweets: 47,
    lastPost: '14h 43m',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '6',
    name: 'safewill',
    avgViews: null,
    followers: 33700,
    tweets: 47,
    lastPost: '15h 44m',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    id: '7',
    name: 'BTCUSAFT',
    avgViews: 387,
    followers: 1500,
    tweets: 46,
    lastPost: '3d 13h',
    avatar: 'https://via.placeholder.com/32',
  },
];

// Example usage
const InfluencerListExample: React.FC = () => {
  return <InfluencerList data={demoData} />;
};

export default InfluencerListExample;