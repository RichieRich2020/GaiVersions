import React, { useEffect } from "react";


// interface UserInfo {
//   name: string;
//   username: string;
//   profilePicUrl: string;
//   bannerImageUrl: string;
//   bio: string;
// }

const Accounts = () => {
  // useEffect(() => {
  //   const handleMessage = (message) => {
  //     if (message.type === "updateUserInfo") {
  //       const userInfo = message.userInfo ;
  //       updateUserInfo(userInfo);
  //     }
  //   };

  //   chrome.runtime.onMessage.addListener(handleMessage);

  //   // Initial listener to fetch user info if already cached
  //   chrome.runtime.sendMessage(
  //     { type: "GET_CURRENT_USER_INFO" },
  //     (response) => {
  //       if (response && response.userInfo) {
  //         updateUserInfo(response.userInfo);
  //       }
  //     }
  //   );

  //   return () => {
  //     chrome.runtime.onMessage.removeListener(handleMessage);
  //   };
  // }, []);

  // const updateUserInfo = (userInfo) => {
  //   const updateElementText = (
  //     id,
  //     text,
  //     defaultText
  //   ) => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.textContent = text || defaultText;
  //     }
  //   };

  //   const updateElementImage = (id, url) => {
  //     const imgElement = document.getElementById(id) ;
  //     if (imgElement) {
  //       if (url) {
  //         imgElement.src = url;
  //         imgElement.style.display = "block";
  //       } else {
  //         imgElement.src = "";
  //         imgElement.style.display = "none";
  //       }
  //     }
  //   };

  //   // Update text elements
  //   updateElementText("name", userInfo.name);
  //   updateElementText("username", userInfo.username);
  //   updateElementText("bio", userInfo.bio);

  //   // Update images
  //   updateElementImage("profilePic", userInfo.profilePicUrl);
  //   updateElementImage("bannerImage", userInfo.bannerImageUrl);
  // };

  // const clearUserInfo = () => {
  //   ["name", "username", "bio"].forEach((id) => {
  //     const element = document.getElementById(id);
  //     if (element) element.textContent = "";
  //   });

  //   ["profilePic", "bannerImage"].forEach((id) => {
  //     const imgElement = document.getElementById(id) ;
  //     if (imgElement) {
  //       imgElement.src = "";
  //       imgElement.style.display = "none";
  //     }
  //   });
  // };

  return (
    <div>
      {/* <div id="profile" className="profile-section">
        <img
          id="profilePic"
          className="profile-pic"
          src=""
          alt="Profile Picture"
          style={{ display: "none" }}
        />
        <h2 id="name" className="name"></h2>
        <p id="username" className="username"></p>
      </div>
      <div className="banner-image-container">
        <img
          id="bannerImage"
          className="banner-image"
          src=""
          alt="Banner Image"
          style={{ display: "none" }}
        />
      </div>
      <div id="user-info" className="user-info">
        <h3>Bio</h3>
        <p id="bio" className="bio"></p>
      </div> */}

      wdx
    </div>
  );
};

export default Accounts;



<>
{/* ✅ Modal for Editing Cashtag Data */}
{/* <CashtagPopup
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  tokensinfo={currentData}
  selectedIndex={tempSelectedIndex}
  onSelect={(index: any) => {
    setSelectedIndex(index);
    setModalOpen(false);
  }}
/> */}

<CashtagCard elevation={0}>
  {/* Header with cashtag mentioned count and selector buttons */}
  <Header>
    <Title sx={{ fontSize: "0.9rem" }}>
      Cashtag Mentioned {Object.keys(cashtagData).length}
    </Title>
    <Box sx={{ position: "relative", width: "55%" }}>
      <ScrollableButtonContainer>
        {Object.keys(cashtagData).map((tag) => (
          <CashtagButton
            key={tag}
            selected={selectedCashtag === tag}
            onClick={() => {
              handleCashtagSelect(tag);
            }}
          >
            ${tag}
          </CashtagButton>
        ))}
      </ScrollableButtonContainer>
    </Box>
  </Header>
  <Divider />

  <Box sx={{ display: "flex", p: 1 }}>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Avatar
            sx={{ width: 24, height: 24, mr: 0.5 }}
            src={selectData?.TokenLogo}
          >
            {" "}
            ${selectedCashtag?.charAt(0)}
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mr: 0.5, fontSize: "1.0rem" }}
          >
            {" "}
            {selectedCashtag}
          </Typography>
          {currentData?.length > 1 && (
            <MdEditSquare
              onClick={() => {
                handleOpenModal();
              }}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                cursor: "pointer" // Add this for better UX
              }}
            />
          )}
          <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />{" "}
          <BookmarkIcon sx={{ fontSize: "1.2rem" }} />{" "}
        </Box>
        <UserNameText>{selectData?.TokenAge}</UserNameText>
        <Box display={"flex"} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
              Market Cap
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center" // vertically center
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  mr: 1
                }}
              >
                {formatCurrencyValue(
                  tokendata[0].active
                    ? tokendata[0]?.marketCap
                    : selectData?.token_pairs_info[0]?.market_cap_in_usd
                )}
              </Typography>

              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "10px",
                  color: tokendata[0].active
                    ? tokendata[0]?.priceChange.h24 >= 0
                      ? "green"
                      : "red"
                    : selectData?.token_pairs_info[0]?.price_ch_h24 >= 0
                    ? "green"
                    : "red"
                }}
              >
                {tokendata[0].active
                  ? tokendata[0]?.priceChange.h24 >= 0
                    ? "↑ "
                    : "↓ "
                  : selectData?.token_pairs_info[0]?.price_ch_h24 >= 0
                  ? "↑ "
                  : "↓ "}
                {Math.abs(
                  tokendata[0].active
                    ? tokendata[0]?.priceChange.h24
                    : selectData?.token_pairs_info[0]?.price_ch_h24
                ).toFixed(2)}
                %
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
              Volume (24h)
            </Typography>
            <Typography
              sx={{
                color: "White",
                fontWeight: "bold",
                fontSize: "18px"
              }}
            >
              {formatCurrencyValue(selectData?.VolumeChange, true)}
            </Typography>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Box>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <StatContainer>
            <IconContainer>
              <AlternateEmailIcon
                sx={{ color: "white", fontSize: "0.8rem" }}
              />
            </IconContainer>
            <StatValue>{selectData?.Mentions24h}</StatValue>
            <StatLabel>Mentions (24h)</StatLabel>
          </StatContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <StatContainer>
            <IconContainer>
              <AlternateEmailIcon
                sx={{ color: "white", fontSize: "0.8rem" }}
              />
            </IconContainer>
            <StatValue>{selectData?.Influencers || "NA"}</StatValue>
            <StatLabel>Influencers</StatLabel>
          </StatContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <StatContainer>
            <IconContainer>
              <GroupsIcon sx={{ color: "white", fontSize: "0.8rem" }} />
            </IconContainer>
            <StatValue>{selectData?.Community || "NA"}</StatValue>
            <StatLabel>Community</StatLabel>
          </StatContainer>
        </Box>
      </Box>
    </Box>
  </Box>

  <Divider />
  <ChartwithTool
    contract_address={selectData?.contracts[0]?.address}
    name={selectedCashtag}
    token_pairs_info={selectData?.token_pairs_info}
    tokendata={tokendata}
    setTokendata={setTokendata}
  />
</CashtagCard>
<CryptoPairStats
  currentPrice={
    tokendata[0]?.priceUsd || selectData?.token_pairs_info[0].price_in_usd
  }
  marketCap={
    tokendata[0]?.marketCap ||
    selectData?.token_pairs_info[0].market_cap_in_usd
  }
  pair={selectData?.token_pairs_info[0].pair_name}
  priceChange24h={
    tokendata[0]?.priceChange.h24 ||
    selectData?.token_pairs_info[0].price_ch_h24
  }
  liquidity={tokendata[0]?.liquidity.usd}
  fdv={tokendata[0]?.fdv}
  tvl={
    tokendata[0]?.marketCap ||
    selectData?.token_pairs_info[0].market_cap_in_usd
  }
/>
</>