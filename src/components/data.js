
"cashtags": [
    {
        "cashtag": "trump",
        "count_mentions_last_24h": 0,
        "coins": [
            {
                "id": "official-trump",
                "symbol": "trump",
                "name": "Official Trump",
                "image_url": "https://coin-images.coingecko.com/coins/images/53746/large/trump.png?1737171561",
                "current_price": 8.56,
                "market_cap": 1712180490,
                "market_cap_rank": 61,
                "fully_diluted_valuation": 8560903459,
                "total_volume": 755307588,
                "high_24h_price": 8.64,
                "low_24h_price": 7.77,
                "price_change_24h": 0.790462,
                "price_change_percentage_24h": 10.17033,
                "market_cap_change_24h": 156887630.0,
                "market_cap_change_percentage_24h": 10.08734,
                "circulating_supply": 199999976.436,
                "total_supply": 1000000000.0,
                "max_supply": 1000000000.0,
                "price_change_percentage_1h": 0.8242601871317222,
                "inserted_at": "2025-04-18T13:08:34.058859+00:00",
                "updated_at": "2025-04-20T01:30:26.132298+00:00"
            }
        ]
    

"tokens": [
    {
        "token_address": "trumpwgcuwiz8boxajs5fjkycj89e9bxnbnwafvppma",
        "name": "CA starts with TRUMP",
        "symbol": "TRUMP",
        "chain_id": "solana",
        "token_pairs_info": [
            {
                "pair_address": "ASbyuNeYNFC4siTUcpiDxTCX7BdRVJCNHcPTzcZg7gLT",
                "pair_name": "CA starts with TRUMP / Solana",
                "price_in_usd": "7.636e-05",
                "volume_h24": 233663.11,
                "market_cap_in_usd": "76366.2",
                "fdv_in_usd": "76366.2",
                "network": {
                    "name": "solana",
                    "image_url": null
                },
                "dex": {
                    "name": "pumpfun",
                    "image_url": null
                },
                "tokens": [
                    {
                        "name": "CA starts with TRUMP",
                        "symbol": "TRUMP",
                        "address": "trumpwgcuwiz8boxajs5fjkycj89e9bxnbnwafvppma",
                        "image_url": "https://assets.geckoterminal.com/zu2d70nj9esl3oop6haeoystjaia"
                    },
                    {
                        "name": "Solana",
                        "symbol": "SOL",
                        "address": "So11111111111111111111111111111111111111112",
                        "image_url": "https://coin-images.coingecko.com/coins/images/21629/large/solana.jpg?1696520989"
                    }
                ],
                "pair_creation_date": null
            }
        ]
    },
    {
        "token_address": "crdfj5fjcjmgzhvbz6nbrmswmedvsgmrsfis1wxspump",
        "name": "UK Fartcoin",
        "symbol": "TRUMP",
        "chain_id": "solana",
        "token_pairs_info": [
            {
                "pair_address": "GubKxMvMjMEKSx6HDBNUa4gDxTRUdcBPyeGSXtDSzU5W",
                "pair_name": "UK Fartcoin / Solana",
                "price_in_usd": "0.0001085",
                "volume_h24": 224328.79,
                "market_cap_in_usd": "108599.74",
                "fdv_in_usd": "108599.74",
                "network": {
                    "name": "solana",
                    "image_url": null
                },
                "dex": {
                    "name": "pumpfun",
                    "image_url": null
                },
                "tokens": [
                    {
                        "name": "UK Fartcoin",
                        "symbol": "TRUMP",
                        "address": "crdfj5fjcjmgzhvbz6nbrmswmedvsgmrsfis1wxspump",
                        "image_url": "https://assets.geckoterminal.com/0nylqgiwv3cka7cszc4lnkgmk0r2"
                    },
                    {
                        "name": "Solana",
                        "symbol": "SOL",
                        "address": "So11111111111111111111111111111111111111112",
                        "image_url": "https://coin-images.coingecko.com/coins/images/21629/large/solana.jpg?1696520989"
                    }
                ],
                "pair_creation_date": "2025-01-19T20:30:38"
            }
        ]
    },
    {
        "token_address": "cvkakwsmdeuquwe4e1rfrjlaucr8iymszzesdugzpump",
        "name": "Unofficial Trump Coin",
        "symbol": "Trump",
        "chain_id": "solana",
        "token_pairs_info": [
            {
                "pair_address": "54jw1MGvoQtFtsbE1R7afXgmHmNosihp6YmPxug9wfqv",
                "pair_name": "Unofficial Trump Coin / Solana",
                "price_in_usd": "0.0001123",
                "volume_h24": 212926.81,
                "market_cap_in_usd": "112396.27",
                "fdv_in_usd": "112396.27",
                "network": {
                    "name": "solana",
                    "image_url": null
                },
                "dex": {
                    "name": "pumpfun",
                    "image_url": null
                },
                "tokens": [
                    {
                        "name": "Unofficial Trump Coin",
                        "symbol": "Trump",
                        "address": "cvkakwsmdeuquwe4e1rfrjlaucr8iymszzesdugzpump",
                        "image_url": "https://assets.geckoterminal.com/yi87a2hba1a8mbojf91k7mi0qhdf"
                    },
                    {
                        "name": "Solana",
                        "symbol": "SOL",
                        "address": "So11111111111111111111111111111111111111112",
                        "image_url": "https://coin-images.coingecko.com/coins/images/21629/large/solana.jpg?1696520989"
                    }
                ],
                "pair_creation_date": null
            }
        ]
    }
]
    }]




        {tokendata&&
        <> <CashtagPopup
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            tokensinfo={currentData}
            selectedIndex={tempSelectedIndex}
            onSelect={(index: any) => {
              setSelectedIndex(index);
              setModalOpen(false);
            }}
          /> 
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
            pair_address={selectedpairAddress}
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
              // tokendata[0]?.priceChange.h24 ||
              // selectData?.token_pairs_info[0].price_ch_h24
              "e"
            }
    
            liquidity={tokendata[0]?.liquidity.usd}
            fdv={tokendata[0]?.fdv}
            tvl={
              tokendata[0]?.marketCap ||
              selectData?.token_pairs_info[0].market_cap_in_usd
            }
          />
        </>}
            
          

            import { useEffect, useState } from 'react';
import CaregiverScheduleTab from '../../pages/caregiver/CaregiverScheduleTab';
import GoogleDriveClone from '../../pages/Upload file/UploadFile';
import CustomTabComponent, { Tab } from '../custom/TabComponent';
import CaregiverAppointment from './CaregiverAppointment';
import CaregiverBenefitsTab from './CaregiverBenefitsTab';
import CaregiverInformationTab from './CaregiverInformationTab';
import CaregiverNotesTab from './CaregiverNotesTab';
import CaregiverPay from './CaregiverPay';
import { useSearchParams } from 'react-router-dom';
import { getCareById } from '../../services/apiService';
// import ClientSchedule2 from './ClientSchedule2'; // Rename if needed
// import ClientInformationTab from './particularClient/tabs/ClientInformationTab'; // Replace with CaregiverInformationTab if it's different
// import ClientNotesTab from './particularClient/tabs/ClientNotesTab'; // Replace with CaregiverNotesTab if needed

const Caregiverdetails = ({caregiverDetails}) => {


  const isApplicant = caregiverDetails.general_information?.stage === 'Applicant';
  const isHiredOrInterviewed = caregiverDetails.general_information?.stage === 'Hired' ;
  console.log(caregiverDetails);
  const caregiverId = caregiverDetails.general_information?.caregiver_id || '';
  const caregiverName = caregiverDetails.general_information?.caregiver_name || '';
  const drivePath = `caregivers/${caregiverName
    .toLowerCase()
    .replaceAll(' ', '_')}_${caregiverId}`;
  console.log(isApplicant,"isApplicant");

  const tabs: Tab[] =[
    {
      id: 'caregiver-info',
      name: 'Caregiver Information',
      children: (
        <CaregiverInformationTab
        />
      ),
    },
    {
      id: 'files',
      name: 'Files',
      children: <GoogleDriveClone defaultPath={drivePath} />,
    },
    {
      id: 'notes',
      name: 'Notes',
      children: (
        <CaregiverNotesTab
          notes={caregiverDetails.caregiver_notes}
          caregiverId={caregiverId}
          setUpdateFlag={()=>{}}
        />
      ),
    },
  ]
  const tabs2: Tab[] = [
    {
      id: 'availability',
      name: 'Availability',
      children: (
        <CaregiverScheduleTab
          caregiver_id={caregiverDetails?.general_information?.caregiver_id}
        />
      ),
    },
    {
      id: 'caregiver-info',
      name: 'Caregiver Information',
      children: (
        <CaregiverInformationTab
        />
      ),
    },
    {
      id: 'files',
      name: 'Files',
      children: <GoogleDriveClone defaultPath={drivePath} />,
    },
    {
      id: 'pay',
      name: 'Pay',
      children: (
        <CaregiverPay
          caregiverDetails={caregiverDetails.pay_information}
          setUpdateFlag={()=>{}}
          caregiver_id={caregiverId}
        />
      ),
    },
    {
      id: 'notes',
      name: 'Notes',
      children: (
        <CaregiverNotesTab
          notes={caregiverDetails.caregiver_notes}
          caregiverId={caregiverId}
          setUpdateFlag={()=>{}}
        />
      ),
    },
    {
      id: 'caregiver-benefits',
      name: 'Caregiver Benefits',
      children: (
        <CaregiverBenefitsTab
          benefits={caregiverDetails.caregiver_benefits}
          caregiverId={caregiverId}
          setUpdateFlag={()=>{}}
        />
      ),
    },
    {
      id: 'appointments',
      name: 'Appointments',
      children: (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <CaregiverAppointment caregiverId={caregiverId} />
        </div>
      ),
    },
  ]
  const tabs3: Tab[] = [
    {
      id: 'caregiver-info',
      name: 'Caregiver Information',
      children: (
        <CaregiverInformationTab

        />
      ),
    },
    {
      id: 'files',
      name: 'Files',
      children: <GoogleDriveClone defaultPath={drivePath} />,
    },
    {
      id: 'pay',
      name: 'Pay',
      children: (
        <CaregiverPay
          caregiverDetails={caregiverDetails.pay_information}
          setUpdateFlag={()=>{}}
          caregiver_id={caregiverId}
        />
      ),
    },
    {
      id: 'notes',
      name: 'Notes',
      children: (
        <CaregiverNotesTab
          notes={caregiverDetails.caregiver_notes}
          caregiverId={caregiverId}
          setUpdateFlag={()=>{}}
        />
      ),
    },
    {
      id: 'caregiver-benefits',
      name: 'Caregiver Benefits',
      children: (
        <CaregiverBenefitsTab
          benefits={caregiverDetails.caregiver_benefits}
          caregiverId={caregiverId}
          setUpdateFlag={()=>{}}
        />
      ),
    },
    {
      id: 'appointments',
      name: 'Appointments',
      children: (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <CaregiverAppointment caregiverId={caregiverId} />
        </div>
      ),
    },
  ]
 
      console.log(     isApplicant
        ? 'caregiver-info'
        : isHiredOrInterviewed
        ? 'availability'
        : 'caregiver-info',"isHiredOrInterviewed");
  return (
    <>
      <CustomTabComponent
        tabs={isApplicant?tabs:isHiredOrInterviewed?tabs2:tabs3}
        // defaultTabId={
            
        //   isApplicant
        //     ? 'caregiver-info'
        //     : isHiredOrInterviewed
        //     ? 'availability'
        //     : 'caregiver-info'
        // }
        className='w-full text-black'
      />
    </>
  );
};

export default Caregiverdetails;
import { useState } from "react";
import {
  MdBadge,
  MdOutlineCancel,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  RiUser3Line,
  RiPhoneLine,
  RiMailLine,
  RiCheckboxCircleLine,
  RiUserHeartLine,
} from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_RAPID_RAG_URL;

const fieldIcons = {
  caregiver_name: <RiUser3Line size={18} />,
  role: <FaUserTie size={18} />,
  phone_number: <RiPhoneLine size={18} />,
  email_address: <RiMailLine size={18} />,
  stage: <RiUserHeartLine size={18} />,
  display_id: <MdBadge size={18} />,
  type: <RiCheckboxCircleLine size={18} />,
};

const filterFields = {
  caregiver_name: "string",
  role: "string",
  phone_number: "string",
  email_address: "string",
  stage: "string",
};

const roleOptions = ["RN", "LVN", "HHA", "CNA", "Nannies", "Caregivers"];
const stageOptions = ["Applicant", "INTERVIEWING", "INTERVIEWED", "Hired"];

const CaregiverFilterModal = ({ setFilterModal, setUsers, setIsFilterApplied }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [filters, setFilters] = useState({});
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (selectedField === "phone_number") {
      value = value.replace(/\D/g, "");
      if (value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError(null);
      }
    }

    if (selectedField === "email_address") {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(null);
      }
    }

    if (selectedField === "caregiver_name") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFilters({ ...filters, [selectedField]: value });
  };

  const handleSelectChange = (e) => {
    setFilters({ ...filters, [selectedField]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/caregiver/filter?limit=10&page_number=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );
      const filteredClient = await response.json();
      setUsers(filteredClient.data);
      setIsFilterApplied(true);
      setFilterModal(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setPhoneError(null);
    setEmailError(null);
  };

  const formatPhoneNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    let formatted = "";

    if (digitsOnly.length > 0) {
      formatted += "(" + digitsOnly.substring(0, 3);
      if (digitsOnly.length > 3) {
        formatted += ") " + digitsOnly.substring(3, 6);
        if (digitsOnly.length > 6) {
          formatted += "-" + digitsOnly.substring(6, 10);
        }
      }
    }

    return formatted;
  };

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-5 rounded-xl shadow-xl w-1/2">
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="text-xl font-bold">Filter for Clients</h2>
          <button onClick={() => setFilterModal(false)}>
            <MdOutlineCancel className="hover:text-red-600" size={30} />
          </button>
        </div>
        <p className="text-gray-600 mt-2">Select filters to refine your search.</p>

        <div className="flex mt-4">
          {/* Field List */}
          <div className="w-1/2 h-[300px] overflow-auto border-r pr-4">
            {Object.keys(filterFields).map((field) => (
              <div
                key={field}
                className={`p-3 cursor-pointer capitalize border flex justify-between items-center gap-2 rounded-lg mb-2 transition-all ${
                  selectedField === field
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleFieldClick(field)}
              >
                <div className="flex gap-3 items-center">
                  <div>{fieldIcons[field]}</div>
                  {field.replace(/_/g, " ")}
                </div>
                <MdOutlineKeyboardArrowRight size={20} />
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="w-1/2 pl-4">
            {selectedField && (
              <div>
                <label className="block mb-2 font-semibold capitalize">
                  {selectedField.replace(/_/g, " ")}
                </label>

                {selectedField === "role" ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={filters[selectedField] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Role</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : selectedField === "stage" ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={filters[selectedField] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Stage</option>
                    {stageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={
                      selectedField === "phone_number"
                        ? formatPhoneNumber(filters[selectedField] || "")
                        : filters[selectedField] || ""
                    }
                    onChange={handleInputChange}
                    placeholder={`Enter ${selectedField.replace(/_/g, " ")}`}
                  />
                )}

                {selectedField === "phone_number" && phoneError && (
                  <p className="text-red-600 mt-1">{phoneError}</p>
                )}
                {selectedField === "email_address" && emailError && (
                  <p className="text-red-600 mt-1">{emailError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={clearFilters}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={applyFilters}
            disabled={phoneError || emailError}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverFilterModal;
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import { getCareById, updateCaregiver } from "../../services/apiService";
import CustomSelect from "./CustomSelect";
import GooglePlaces from "../GooglePlaces";
import { useParams, useSearchParams } from "react-router-dom";

const CaregiverInformationTab = (  ) => {
  const { id = "" } = useParams();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "";
    console.log(id , role,searchParams.get("id"),"role");
  const [caregiverDetails, setCaregiverDetails] = useState<any>({});
  const [caregiverType, setCaregiverType] = useState('');
  const [rootFilePathName, setRootFilePathName] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [editGeneralIndex, setEditGeneralIndex] = useState<number | null>(null);
  const [editOnboardingIndex, setEditOnboardingIndex] = useState<number | null>(
    null
  );
  const [editData, setEditData] = useState<any>({});
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [placesError, setPlacesError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const handleGeneralInformationEdit = (index: number) => {
    setEditOnboardingIndex(null);
    setEditGeneralIndex(index);
  };

  const handleOnboardingEdit = (index: number) => {
    setEditGeneralIndex(null);
    setEditOnboardingIndex(index);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    key: string
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setEditData((prev) => ({
      ...prev,
      [key]: value
    }));
  };


  const fetchCaregiverById = async () => {

      // if (caregiverType && caregiverType.length > 0 && caregiverType[0] === ' ') {
      //   caregiverType = caregiverType.substr(1, caregiverType.length - 1);
      // }
  
      try {
        setLoadingg(true);
        const response = await getCareById(id);
        const caregiverData = response;
        if (!caregiverData) {
          return;
        }
  
  
        setCaregiverDetails(caregiverData);
  
        if (caregiverData.caregiver_availability) {
          setScheduleData(caregiverData.caregiver_availability.availability);
        }
  
        setCaregiverType(caregiverData.general_information?.role || '');
        setRootFilePathName(
          caregiverData.general_information?.caregiver_name
            ?.split(" ")
            .join("_")
            .toLowerCase() +
            "_" +
          caregiverData.general_information?.caregiver_id
        );
        fetchCaregiverById();
      } catch (error) {
        console.error('Error fetching caregiver details:', error);
      }finally{
        setLoadingg(false);
      }
    };
    useEffect(()=>{
      fetchCaregiverById();
    },[])
  const handleSave = async () => {
    try {
      let formattedData = {
        ...editData,
        contract_documents_signed:
          editData.contract_documents_signed === "true"
            ? true
            : editData.contract_documents_signed === "false"
              ? false
              : caregiverDetails.general_information.contract_documents_signed
      };
      console.log(formattedData, "formattedData");

      if (formattedData["gusto_enrollment_status"])
        formattedData = {
          ...formattedData,
          gusto_status: formattedData["gusto_enrollment_status"]
        };

      if (formattedData["ncna_enrollment_status"])
        formattedData = {
          ...formattedData,
          ncna_status: formattedData["ncna_enrollment_status"]
        };

      const res = await updateCaregiver(
        caregiverDetails.general_information?.caregiver_id,
        formattedData
      );
      const resData = await res?.json();

      if (resData.message === "Update successful") {
        toast.success("Caregiver updated successfully!");

        // if (editGeneralIndex !== null) {
        //   Object.keys(editData).forEach((key) => {
        //     caregiverDetails.general_information[key] = formattedData[key];
        //   });
        // } else if (editOnboardingIndex !== null) {
        //   Object.keys(editData).forEach((key) => {
        //     caregiverDetails.onboarding_status[key] = formattedData[key];
        //   });
        // }
        // console.log("setUpdateFlag function:", setUpdateFlag);
        
        setEditGeneralIndex(null);
        setEditOnboardingIndex(null);
        setEditData({});
      }
    } catch (error) {
      console.error("Error updating caregiver details:", error);
      toast.error("Something went wrong.");
    }
  };
  const formatPhoneNumber = (value) => {
    if (!value) return "";

    const digitsOnly = value.replace(/\D/g, "");
    let formatted = "";

    if (digitsOnly.length > 0) {
      formatted += "(" + digitsOnly.substring(0, 3);
      if (digitsOnly.length > 3) {
        formatted += ") " + digitsOnly.substring(3, 6);
        if (digitsOnly.length > 6) {
          formatted += "-" + digitsOnly.substring(6, 10);
        }
      }
    }

    return formatted;
  };

  console.log(
    caregiverDetails,"caregiverDetails"
  );
  if (loadingg) {
    return (
      <div className='flex justify-center items-center h-full text-black'>
        Loading...
      </div>
    );
  }


  const  newinput= Object.keys(caregiverDetails).length!=0 ?{ ...caregiverDetails?.general_information,"email_address": ""}:{}
  console.log(Object.keys(caregiverDetails).length!=0&&  caregiverDetails?.other_information.email_address,caregiverDetails,"caregiverDetails.oth");
  return (
  
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* General Information Section */}
      {Object.keys(newinput || {})
        .filter((key) => key !== "caregiver_id")
        .filter((key) => key !== "type")
        .map((key, index) => (
          <div
            key={`general-${index}`}
            className="bg-white flex justify-between p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div>
              <h1 className="capitalize text-sm font-medium">
                {key.replace(/_/g, " ")}
              </h1>
              {editGeneralIndex === index ? (
                key === "contract_documents_signed" ? (
                  <CustomSelect
                    name={key}
                    value={
                      key in editData
                        ? String(editData[key])
                        : String(caregiverDetails.general_information[key])
                    }
                    onChange={(val) => handleChange(val, key)}
                    options={[
                      { label: "Yes", value: "true", color: "#77B254" },
                      { label: "No", value: "false", color: "#D98324" }
                    ]}
                    width="w-[200px]"
                  />
                ) : key === "role" ? (
                  <CustomSelect
                    name={key}
                    value={
                      editData[key] ?? caregiverDetails.general_information[key]
                    }
                    onChange={(val) => handleChange(val, key)}
                    options={[
                      { label: "RN", value: "RN", color: "#007bff" }, // Blue
                      { label: "LVN", value: "LVN", color: "#6610f2" }, // Indigo
                      { label: "HHA", value: "HHA", color: "#6f42c1" }, // Purple
                      { label: "CNA", value: "CNA", color: "#e83e8c" }, // Pink
                      { label: "Nannies", value: "Nannies", color: "#fd7e14" }, // Orange
                      {
                        label: "Caregivers",
                        value: "Caregivers",
                        color: "#20c997"
                      } // Teal
                    ]}
                    width="w-[200px]"
                  />
                ) : key === "address" ? (
                  <GooglePlaces
                    name="location"
                    placeholder="Enter address"
                    value={
                      editData[key] ?? caregiverDetails.general_information[key]
                    }
                    onChange={(e) => handleChange(e, key)}
                    setPlacesError={setPlacesError}
                    placesError={placesError}
                  />
                ) : (
                  <div>
                    <input
                      type="text"
                      name={key}
                      id={key}
                      value={
                        key === "phone_number"
                          ? formatPhoneNumber(
                              editData[key] ?? caregiverDetails.general_information[key]
                            )
                          : key === "email_address"
                          ? editData[key] ?? caregiverDetails?.other_information.email_address
                          : editData[key] ?? caregiverDetails.general_information[key]
                      }
                      onChange={(e) => handleChange(e, key)} // You should be updating state via handleChange
                      onInput={(e) => {
                        if (key === "phone_number") {
                          // Clean phone number input and validate it
                          e.target.value = e.target.value.replace(/\D/g, "");
                          const digits = e.target.value;
                          if (digits.length < 10) {
                            setPhoneError(
                              "Phone number must be exactly 10 digits"
                            );
                          } else {
                            setPhoneError(null);
                          }
                        }

                        if (key === "email_address") {
                          // Make sure the key here matches the one used in the error condition
                          // Email validation using a regex pattern
                          const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                          const emailValue = e.target.value;

                          if (!emailRegex.test(emailValue)) {
                            setEmailError(
                              "Please enter a valid email address."
                            );
                          } else {
                            setEmailError(null);
                          }
                        }

                        if (key === "caregiver_name") {
                          // Restrict non-alphabet characters in caregiver name
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                        }
                      }}
                      className="py-2 px-2 w-[200px] mr-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {key === "phone_number" && phoneError && (
                      <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                    )}
                    {key === "email_address" &&
                      emailError && ( // Ensure this matches the key you're using
                        <p className="text-red-500 text-xs mt-1">
                          {emailError}
                        </p>
                      )}
                  </div>
                )
              ) : key === "role" ? (
                <div style={{ pointerEvents: "none", opacity: 0.7 }}>
                  <CustomSelect
                    name={key}
                    value={caregiverDetails.general_information[key]}
                    onChange={(val) => handleChange(val, key)}
                    options={[
                      { label: "RN", value: "RN", color: "#007bff" }, // Blue
                      { label: "LVN", value: "LVN", color: "#6610f2" }, // Indigo
                      { label: "HHA", value: "HHA", color: "#6f42c1" }, // Purple
                      { label: "CNA", value: "CNA", color: "#e83e8c" }, // Pink
                      { label: "Nannies", value: "Nannies", color: "#fd7e14" }, // Orange
                      {
                        label: "Caregivers",
                        value: "Caregivers",
                        color: "#20c997"
                      } // Teal
                    ]}
                    width="w-[200px]"
                  />
                </div>
              ) : key === "contract_documents_signed" ? (
                <div style={{ pointerEvents: "none", opacity: 0.7 }}>
                  <CustomSelect
                    name={key}
                    value={
                      
                        String(caregiverDetails.general_information[key])
                    }
                    onChange={(val) => handleChange(val, key)}
                    options={[
                      { label: "Yes", value: "true", color: "#77B254" },
                      { label: "No", value: "false", color: "#D98324" }
                    ]}
                    width="w-[200px]"
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {
  key === "contract_documents_signed"
    ? caregiverDetails.general_information[key] === false
      ? "NO"
      : "YES"
    : key === "phone_number"
    ? formatPhoneNumber(
        editData[key] ?? caregiverDetails.general_information[key]
      )
    : key === "email_address"
    ? editData[key] ?? caregiverDetails?.other_information?.email_address
    : editData[key] ?? caregiverDetails.general_information[key]
}

                </p>
              )}
            </div>
            <div className="flex items-center">
              {editGeneralIndex === index ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditGeneralIndex(null)}
                    className="py-2 px-4 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={`py-2 px-4 text-white rounded-lg transition ${
                      phoneError
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={!!phoneError}
                  >
                    Save
                  </button>
                </div>
              ) : key !== "stage" && key !== "display_id" ? (
                <CiEdit
                  onClick={() => handleGeneralInformationEdit(index)}
                  size={20}
                  className={`${
                    key === "caregiver_id" && "hidden"
                  } cursor-pointer hover:text-red-500 transition`}
                />
              ) : null}
            </div>
          </div>
        ))}

      {/* Onboarding Status Section */}
      {Object.keys(caregiverDetails.onboarding_status || {}).filter((key) => key !== "gusto_enrollment_status").map(
        (key, index) => (
          <div
            key={`onboarding-${index}`}
            className="bg-white flex justify-between p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div>
              <h1 className="capitalize text-sm font-medium">
                {key.replace(/_/g, " ")}
              </h1>
              {editOnboardingIndex === index ? (
                <CustomSelect
                  name={key}
                  value={
                    editData[key] ?? caregiverDetails.onboarding_status[key]
                  }
                  onChange={(val) => handleChange(val, key)}
                  options={[
                    {
                      label: "Ongoing/Pending",
                      value: "Pending",
                      color: "#D98324"
                    },
                    { label: "Completed", value: "Completed", color: "#77B254" }
                  ]}
                />
              ) : (
                <div style={{ pointerEvents: "none", opacity: 0.7 }}>
                  <CustomSelect
                    name={key}
                    value={caregiverDetails.onboarding_status[key]}
                    onChange={() => {}}
                    options={[
                      {
                        label: "Ongoing/Pending",
                        value: "Pending",
                        color: "#D98324"
                      },
                      {
                        label: "Completed",
                        value: "Completed",
                        color: "#77B254"
                      }
                    ]}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              {editOnboardingIndex === index ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditData({});
                      setEditOnboardingIndex(null);
                    }}
                    className="py-2 px-4 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
                  >
                    Save
                  </button>
                </div>
              ) : key !== "stage" ? (
                <CiEdit
                  onClick={() => handleOnboardingEdit(index)}
                  size={20}
                  className="cursor-pointer hover:text-red-500 transition"
                />
              ) : null}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CaregiverInformationTab;
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  FiChevronDown as ChevronDown,
  FiArrowLeft as ArrowLeft,
  FiArrowRight as ArrowRight,
} from "react-icons/fi";
import { GoFilter } from "react-icons/go";
import CaregiverFilterModal from "./CaregiverFilterModal";

const formatValue = (value) => (value == null ? "N/A" : value);

const CareTable2 = ({
  tableCaregivers,
  onRowClick,
  loading,
  setCaregiverModalOpen,
  rowsPerPage,
  setRowsPerPage,
  onNextPageClick,
  onPrevPageClick,
  currentPage,
}) => {
  const [filterModal, setFilterModal] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [users, setUsers] = useState([]);

  const dataToRender = isFilterApplied ? users : tableCaregivers;

  const formatPhoneNumber = (value) => {
    if (!value) return "";
    const digitsOnly = value.replace(/\D/g, "");
    let formatted = "";

    if (digitsOnly.length > 0) {
      formatted += "(" + digitsOnly.substring(0, 3);
      if (digitsOnly.length > 3) {
        formatted += ") " + digitsOnly.substring(3, 6);
        if (digitsOnly.length > 6) {
          formatted += "-" + digitsOnly.substring(6, 10);
        }
      }
    }

    return formatted;
  };

  return (
    <div className="flex flex-col mt-3 px-4">
      {filterModal && (
        <CaregiverFilterModal
          setIsFilterApplied={setIsFilterApplied}
          setUsers={setUsers}
          setFilterModal={setFilterModal}
        />
      )}

      {/* Action Buttons */}
      <div className="mr-3 flex self-end mb-4 gap-2">
        {isFilterApplied && (
          <button
            onClick={() => {
              setIsFilterApplied(false);
              setFilterModal(false);
            }}
            className="rounded-lg flex gap-2 items-center justify-center p-2 text-white border bg-black"
          >
            Clear Filter
          </button>
        )}
        <button
          onClick={() => setFilterModal(true)}
          className="rounded-lg flex gap-2 items-center justify-center hover:bg-red-500 p-2 border bg-red-600"
        >
          <GoFilter size={20} />
          Filter
        </button>
        <button
          onClick={() => setCaregiverModalOpen(true)}
          className="rounded-lg flex gap-2 items-center justify-center hover:bg-red-500 p-2 border bg-red-600"
        >
          <FaPlus />
          Caregiver
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-y-auto h-[65vh] border text-black">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr className="border-b text-lg">
              <th className="p-4 text-left font-medium">Caregiver Name</th>
              <th className="p-4 text-left font-medium">Phone Number</th>
              <th className="p-4 text-left font-medium">Role</th>
              <th className="p-4 text-left font-medium">Email Address</th>
              <th className="p-4 text-left font-medium">Stage</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : dataToRender.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No caregivers found
                </td>
              </tr>
            ) : (
              dataToRender.map((data, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick(data)}
                  className="border-b !text-gray-700 font-light text-lg hover:bg-muted/20 cursor-pointer hover:bg-gray-200"
                >
                  <td className="p-4 capitalize">{formatValue(data.caregiver_name)}</td>
                  <td className="p-4">{formatPhoneNumber(data.phone_number)}</td>
                  <td className="px-6 py-3 border-b capitalize">{formatValue(data.role)}</td>
                  <td className="p-4">{formatValue(data.email_address)}</td>
                  <td className="p-4">{formatValue(data.stage)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareTable2;
import { useState } from "react";
import {
  MdBadge,
  MdOutlineCancel,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  RiUser3Line,
  RiPhoneLine,
  RiMailLine,
  RiCheckboxCircleLine,
  RiUserHeartLine,
  RiHome2Line,
  RiProfileLine,
  RiHashtag,
  RiCalendarLine,
} from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_RAPID_RAG_URL;

const fieldIcons = {
  client_name: <RiUser3Line size={18} />,
  phone_number: <RiPhoneLine size={18} />,
  address: <RiHome2Line size={18} />,
  uci: <RiProfileLine size={18} />,
  type: <RiCheckboxCircleLine size={18} />,
  type_id: <RiHashtag size={18} />,
  case_manager: <FaUserTie size={18} />,
  last_assigned_caregiver_id: <RiUserHeartLine size={18} />,
  start_date: <RiCalendarLine size={18} />,
  end_date: <RiCalendarLine size={18} />,
  client_id: <RiUser3Line size={18} />,
};

const filterFields = {
  client_name: "string",
  phone_number: "string",
  // address: "string",
  uci: "string",
  type: "string",
  type_id: "string",
  case_manager: "string",
  last_assigned_caregiver_id: "string",
  start_date: "2025-04-02",
  end_date: "2025-04-02",
  client_id: "string",
};

const typeOptions = ["Type A", "Type B", "Type C"];
const caseManagerOptions = ["Manager 1", "Manager 2", "Manager 3"];
const caregiverOptions = ["Caregiver 1", "Caregiver 2", "Caregiver 3"];

const FilterModal = ({ setFilterModal, setUsers, setIsFilterApplied }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [filters, setFilters] = useState({});
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;


    if (selectedField === "client_name") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (selectedField === "phone_number") {
      value = value.replace(/\D/g, "");
      if (value.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError(null);
      }
    }

    if (selectedField === "email_address") {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(null);
      }
    }

    setFilters({ ...filters, [selectedField]: value });
  };

  const handleSelectChange = (e) => {
    setFilters({ ...filters, [selectedField]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/client/filter?limit=10&page_number=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );
      const filteredClient = await response.json();
      setUsers(filteredClient.data);
      setIsFilterApplied(true);
      setFilterModal(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setPhoneError(null);
    setEmailError(null);
  };

  const formatPhoneNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    let formatted = "";

    if (digitsOnly.length > 0) {
      formatted += "(" + digitsOnly.substring(0, 3);
      if (digitsOnly.length > 3) {
        formatted += ") " + digitsOnly.substring(3, 6);
        if (digitsOnly.length > 6) {
          formatted += "-" + digitsOnly.substring(6, 10);
        }
      }
    }

    return formatted;
  };

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-5 rounded-xl shadow-xl w-1/2">
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="text-xl font-bold">Filter for Clients</h2>
          <button onClick={() => setFilterModal(false)}>
            <MdOutlineCancel className="hover:text-red-600" size={30} />
          </button>
        </div>
        <p className="text-gray-600 mt-2">Select filters to refine your search.</p>

        <div className="flex mt-4">
          {/* Field List */}
          <div className="w-1/2 h-[300px] overflow-auto border-r pr-4">
            {Object.keys(filterFields).map((field) => (
              <div
                key={field}
                className={`p-3 cursor-pointer capitalize border flex justify-between items-center gap-2 rounded-lg mb-2 transition-all ${
                  selectedField === field
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleFieldClick(field)}
              >
                <div className="flex gap-3 items-center">
                  <div>{fieldIcons[field]}</div>
                  {field.replace(/_/g, " ")}
                </div>
                <MdOutlineKeyboardArrowRight size={20} />
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="w-1/2 pl-4">
            {selectedField && (
              <div>
                <label className="block mb-2 font-semibold capitalize">
                  {selectedField.replace(/_/g, " ")}
                </label>

                {selectedField === "type" ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={filters[selectedField] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Type</option>
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : selectedField === "case_manager" ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={filters[selectedField] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Case Manager</option>
                    {caseManagerOptions.map((manager) => (
                      <option key={manager} value={manager}>
                        {manager}
                      </option>
                    ))}
                  </select>
                ) : selectedField === "last_assigned_caregiver_id" ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={filters[selectedField] || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Caregiver</option>
                    {caregiverOptions.map((caregiver) => (
                      <option key={caregiver} value={caregiver}>
                        {caregiver}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={  selectedField === "phone_number"
                      ? formatPhoneNumber(filters[selectedField] || "")
                      : filters[selectedField] || ""}
                    onChange={handleInputChange}
                    placeholder={`Enter ${selectedField.replace(/_/g, " ")}`}
                  />
                )}
                 {selectedField === "phone_number" && phoneError && (
                  <p className="text-red-600 mt-1">{phoneError}</p>
                )}
                {selectedField === "email_address" && emailError && (
                  <p className="text-red-600 mt-1">{emailError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={clearFilters}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={applyFilters}
            disabled={phoneError || emailError}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

const exampleData: {
    cashtag: string;
    count_mentions_last_24h: number;
    coins: Array<{
      id: string;
      symbol: string;
      name: string;
      image_url: string;
  
      current_price: number;
      market_cap: number;
      market_cap_rank: number;
      fully_diluted_valuation: number;
      total_volume: number;
  
      high_24h_price: number;
      low_24h_price: number;
      price_change_24h: number;
      price_change_percentage_24h: number;
  
      market_cap_change_24h: number;
      market_cap_change_percentage_24h: number;
  
      circulating_supply: number;
      total_supply: number;
      max_supply: number;
      price_change_percentage_1h: number;
  
      inserted_at: string;
      updated_at: string;
  
      if_listed: boolean;
  
      tickers: Array<{
        base: string;
        target: string;
        market: {
          name: string;
          identifier: string;
          has_trading_incentive: boolean;
        };
        last: number;
        volume: number;
        converted_last: {
          btc: number;
          eth: number;
          usd: number;
        };
        converted_volume: {
          btc: number;
          eth: number;
          usd: number;
        };
        trust_score: string;
        bid_ask_spread_percentage: number;
        timestamp: string;
        last_traded_at: string;
        last_fetch_at: string;
        is_anomaly: boolean;
        is_stale: boolean;
        trade_url: string;
        token_info_url: string | null;
        coin_id: string;
        target_coin_id: string;
      }>;
  
      token_address?: string;
      chain_id?: string;
      token_pairs_info?: Array<{
        pair_address: string;
        pair_name: string;
        price_in_usd: string;
        volume_h24: number;
        market_cap_in_usd: string;
        fdv_in_usd: string;
        network: {
          name: string;
          image_url: string | null;
        };
        dex: {
          name: string;
          image_url: string | null;
        };
        tokens: Array<{
          name: string;
          symbol: string;
          address: string;
          image_url: string;
        }>;
        pair_creation_date: string | null;
      }>;
    }>;
    tokens: Array<{
      token_address: string;
      name: string;
      symbol: string;
      chain_id: string;
      token_pairs_info: Array<{
        pair_address: string;
        pair_name: string;
        price_in_usd: string;
        volume_h24: number;
        market_cap_in_usd: string;
        fdv_in_usd: string;
        network: {
          name: string;
          image_url: string | null;
        };
        dex: {
          name: string;
          image_url: string | null;
        };
        tokens: Array<{
          name: string;
          symbol: string;
          address: string;
          image_url: string;
        }>;
        pair_creation_date: string | null;
      }>;
    }>;
  }[] = [];
  