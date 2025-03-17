import React, { useState } from 'react';
import { Card, Typography, Avatar, Box, Modal, Button, IconButton, Divider } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import { SiGoogledataproc } from "react-icons/si";
import MonochromePolarChart from './MonochromePolarChart';


const formatMarketCap = (marketCap) => {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
};

const TableHeader = () => (
  <Box display="flex" alignItems="center" justifyContent="space-between" px={1} py={1} sx={{ bgcolor: '#1E1E1E', color: 'gray', borderRadius: 2 }}>
    <Typography variant="body2" sx={{  width: 30 }}>#</Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>Coin</Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>Price</Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>Change</Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>Volume</Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>Market Cap</Typography>
    <Box sx={{ width: 24 }}></Box>
  </Box>
);

const CryptoCard = ({ tag, handleInfoClick }) => (
  <Card sx={{ bgcolor: '#171717', color: 'white', mb: 1, borderRadius: 2, p: 1 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
    <Typography variant="caption" color="gray" sx={{ width: 24, height: 24 }}>{tag?.coin_info?.cmc_rank}</Typography>
      <Box display="flex" alignItems="center" gap={1} sx={{ flex: 1 }}>
        <Avatar src={tag.coin_info.icon} alt={tag.coin_info.name} sx={{ width: 24, height: 24 }} />
        <Typography color="rgb(255, 218, 26)" sx={{fontSize:"12px",fontWeight:"500"}}>{tag.cashtag}</Typography>
        <Typography variant="caption" color="gray">{tag.coin_info.time}</Typography>
      </Box>

      <Typography variant="body1" sx={{ flex: 1 }}>{formatMarketCap(tag.coin_info.price)}</Typography>
      <Typography variant="body2" color="green" sx={{ flex: 1 }}>{tag.coin_info.change}%</Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>{formatMarketCap(tag.coin_info.volume_24hr)}</Typography>
      <Typography variant="body1" sx={{ flex: 1 }}>{formatMarketCap(tag.coin_info.market_cap)}</Typography>

      <IconButton sx={{ color: 'white' }} onClick={() => handleInfoClick(tag)}>
        <SiGoogledataproc style={{ color: "rgb(255, 218, 26)", fontSize: "24px", cursor: "pointer" }} />
      </IconButton>
    </Box>
  </Card>
);

const CryptoDashboard = ({ cashtagss, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleInfoClick = (tag) => {
    setSelectedTag(tag);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTag(null);
  };

  return (
    <Box sx={{ bgcolor: 'rgb(41, 43, 63)', p: 2, borderRadius: 2 }}>
      {user && (
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={user.profile_image_url} alt={user.username} sx={{ width: 40, height: 40, border: '2px solid rgb(255, 218, 26)', mr: 1 }} />
          <Typography sx={{ color: 'rgb(255, 218, 26)', fontWeight: 800 }}>{user.username}</Typography>
        </Box>
      )}

      <TableHeader />
      <Divider sx={{ bgcolor: 'gray', my: 1 }} />

      {cashtagss.map((tag, index) => (
        <CryptoCard key={index} tag={tag} handleInfoClick={handleInfoClick} />
      ))}

      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{ bgcolor: '#fff', p: 4, m: '100px auto', width: '80%', maxWidth: 500, borderRadius: 2 }}>
          <Typography variant="h6">{selectedTag?.cashtag} Chart</Typography>
          {selectedTag && <MonochromePolarChart tag={selectedTag} />}
          <Button onClick={closeModal} variant="contained" sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CryptoDashboard;
