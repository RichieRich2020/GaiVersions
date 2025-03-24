import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete } from "@mui/material";
import debounce from "lodash/debounce";
import { CTextField } from "./CTextField";
import TokenCard from "./TokenCard";
import axios from "axios";

// OptionType interface
export interface OptionType {
  cashtag: string;
  coin_info: any;
  name: string;
}

// Fetch search options
const getOptionsAsync = async (query: string): Promise<OptionType[]> => {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://api.marwalproduction.com/search?keyword=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

interface SearchProps {
  setPage: (page: string) => void;
  setSearchedData: (data: any | null) => void;
}
export default function Search({setPage,setSearchedData}: SearchProps) {
  // State definitions
  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setValue] = useState<OptionType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [poolAddress, setPoolAddress] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<string | null>(null);
  const [poolInfo, setPoolInfo] = useState<any>(null); // New state for pool info

  // Define default network (e.g., Ethereum)
  const [network, setNetwork] = useState<string>("Ethereum");

  // Merged and optimized function
  const getOptionsAndFetchPool = useCallback(
    debounce(async (query: string, network: string) => {
      setIsLoading(true);
      try {
        // Fetch options asynchronously
        const newOptions = await getOptionsAsync(query);

        // Filter options based on platform name matching the network
        const filteredOptions = newOptions.filter((option: any) =>
          option.coin_info.contracts[0]?.platform_coin_name
            ?.toLowerCase()
            .includes(network.toLowerCase())
        );
        setOptions(newOptions);
        setIsLoading(false);

        // If valid options are found, attempt to fetch pool address
        if (filteredOptions.length > 0) {
          const contractAddress =
            filteredOptions[0]?.coin_info.contracts[0]?.contract_address;

          if (contractAddress) {
            setLoading(true);
            setError(null);

            // Fetch network details
            const networksResponse = await axios.get(
              "https://api.geckoterminal.com/api/v2/networks"
            );
            const networks = networksResponse.data?.data || [];

            // Find the matching network by name
            const networkMatch = networks.find((n: any) =>
              n.attributes.name.toLowerCase().includes(network.toLowerCase())
            );

            if (!networkMatch) throw new Error("Network not found");

            const networkId = networkMatch.id;
            setNetworkId(networkId);

            // Fetch token info and pool address
            const response = await axios.get(
              `https://api.geckoterminal.com/api/v2/networks/${networkId}/tokens/${contractAddress}`
            );
            const topPool =
              response.data?.data?.relationships?.top_pools?.data?.[0]?.id;

            setFormattedData(response.data?.data?.attributes.symbol);

            // Extract pool address if available
            if (topPool) {
              const extractedAddress = topPool.split("_")[1];
              setPoolAddress(extractedAddress);

              // ✅ Fetch pool info after getting pool address
              const poolInfoResponse = await axios.get(
                `https://api.geckoterminal.com/api/v2/networks/${networkId}/pools/${extractedAddress}/info`
              );
              setPoolInfo(poolInfoResponse.data);
              console.log("Pool Info:", poolInfoResponse.data);
            } else {
              throw new Error("No top pool found");
            }
          }
        } else {
          throw new Error("No matching options found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }, 300),
    [network]
  );

  // Trigger search and pool fetch when query changes
  useEffect(() => {
    if (searchQuery) {
      getOptionsAndFetchPool(searchQuery, network);
    }
  }, [searchQuery, network, getOptionsAndFetchPool]);

  return (
    <>
      <Autocomplete
        options={options}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        onInputChange={(event, newValue) => setSearchQuery(newValue)}
        getOptionLabel={(option) => option.cashtag || ""}
        renderInput={(params) => (
          <CTextField params={params} selectedOption={value} />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={`${option.coin_info.contracts[0]?.contract_address}-${option.coin_info.name}`}
            style={{
              backgroundColor: "#0B0B0B",
              color: "white",
              padding: 0,
             
            }}
            onClick={
              ()=>{
                setPage("Tweet");
                setSearchedData(()=>{
                  return [option]
                });
              }
            }
          >
            {loading ? (
             ""
            ) : (
              poolInfo && (
                <TokenCard
                  PairIcon={poolInfo?.data[1]?.attributes?.image_url}
                  tokenAdd={option.coin_info.contracts[0]?.contract_address}
                  tokenName={option.coin_info.name}
                  pair={`${poolInfo?.data[0]?.attributes?.symbol} / ${poolInfo?.data[1]?.attributes?.symbol}`}
                  exchange={""}
                  network={option.coin_info.contracts[0]?.platform_name || ""}
                  price={option.coin_info.price}
                  priceChange={option.coin_info.per_chg_24hr}
                  marketCap={option.coin_info.market_cap}
                  volume={option.coin_info.volume || 0}
                  liquidity={0}
                  age={option.coin_info.date_added}
                  tokenIcon={option.coin_info.logo}
                  
                />
              )
            )}
          </li>
        )}
        loading={isLoading}
        componentsProps={{
          paper: {
            sx: {
              backgroundColor: "#0B0B0B",
              color: "white", // Optional: Text color inside the dropdown
            },
          },
        }}
        sx={{
          width: "100%",
        }}
      />
    </>
  );
}