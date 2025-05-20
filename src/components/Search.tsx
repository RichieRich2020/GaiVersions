import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, Box, Typography, Skeleton } from "@mui/material";
import debounce from "lodash/debounce";
import { CTextField } from "./CTextField";
import TokenCard from "./TokenCard";

// OptionType interface
export interface OptionType {
  category: string;
  cashtag: string;
  coin_info: any;
  name: string;
  symbol?: string;
  token_address?: string;
  token_pairs_info?: any[];
}

interface SearchProps {
  setPage: (page: string) => void;
  setSearchedData: (data: any | null) => void;
  searchLoading: boolean;
  isSearchLoading: (value: boolean) => void;
  setSearchedDatabool: (value: boolean) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function Search({
  setPage,
  setSearchedData,
  searchLoading,
  isSearchLoading,
  setSearchedDatabool,
  inputRef
}: SearchProps) {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setValue] = useState<OptionType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiCalled, setApiCalled] = useState<Number>(0);
  const [showPreviousResults, setShowPreviousResults] = useState<boolean>(false);
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [previousResultOptions, setPreviousResultOptions] = useState<any>([]);

  const previousResults = ["xpr", "BTC", "sol", "nitro"];

  const getOptionsAsync = async (query: string): Promise<any[]> => {
    if (!query) return [];
    // setShowPreviousResults(true);
    setIsLoading(true);
    try {
      // Remove $ from the query if it exists
      const cleanQuery = query.startsWith('$') ? query.substring(1) : query;
      
      const response = await fetch(
        `https://api.marwalproduction.com/search?query=${cleanQuery}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      return data || [];
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }finally{
      setIsLoading(false);
      // setShowPreviousResults(false);
    }
  };

  const getOptionsAndFetchPool = useCallback(
    debounce(async (query: string) => {
      // If the query is empty or too short, reset and return
      if (!query || query.length <= 2) {
        setApiCalled(0);
        return;
      }
      setOptions([]);
      setIsLoading(true);
      setApiCalled(2);
      try {
        const newOptions: any = await getOptionsAsync(query);
        console.log(newOptions, "newOptions");
        setOptions(newOptions.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
        
      }
    }, 300),
    []
  );

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        getOptionsAndFetchPool(searchQuery);
        setShowPreviousResults(false);
        setSearchTriggered(true); // Show "no options" only on Enter
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [searchQuery, getOptionsAndFetchPool]);

  // Handle input changes to properly process queries with $ or token addresses
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      getOptionsAndFetchPool(searchQuery);
    }
  }, [searchQuery, getOptionsAndFetchPool]);

 
  
  useEffect(() => {
    const allPrevious = JSON.parse(localStorage.getItem("PreviousSearched") || "[]");
    const filtered = allPrevious
      .reverse() 
      .filter((ele: any) => {
        if (!ele?.symbol) return false;
        
        // Handle $ prefix in searchQuery
        const searchTerm = searchQuery.startsWith('$') 
          ? searchQuery.substring(1).toLowerCase() 
          : searchQuery.toLowerCase();
          
        return ele.symbol.toLowerCase().startsWith(searchTerm);
      })
      .slice(0, 5); // limit to top 5
      
    console.log(filtered, "previousResultOptions");
    // setPreviousResultOptions(filtered);
  }, [searchQuery]);

  console.log(isLoading, "isLoading");
  console.log(apiCalled , options.length==0,"wedw");
  const SkeletonLoader = () => (
    <Box sx={{ p: 1 }}>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            p: 1,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px"
          }}
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
          />
          <Box sx={{ ml: 1, width: "100%" }}>
            <Skeleton
              variant="text"
              width="60%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Autocomplete
      options={showPreviousResults ? previousResultOptions : options}
      value={value}
      onChange={ async (event, newValue) => {
        const allPrevious = JSON.parse(localStorage.getItem("PreviousSearched") || "[]");
        const isDuplicate = allPrevious.some(
          (item:any) => item?.token_address === newValue?.token_address
        );
        
        if (!isDuplicate && newValue) {
          localStorage.setItem("PreviousSearched", JSON.stringify([...allPrevious, newValue]));
        }
        
        if (newValue) {
          console.log(newValue, "newValue");
        
          setPage("Tweet");
          setSearchedDatabool(true);
          isSearchLoading(true);
        
          try {
            setSearchedData([]);
        
            // Check whether to use coin_id or token_address
            const queryParam = newValue.id
              ? `coin_id=${newValue.id}`
              : `token_address=${newValue.token_address}`;
        
            const response = await fetch(
              `${process.env.GAI_VERSION_1}/deep_search?${queryParam}`
            );
        
            if (!response.ok) {
              throw new Error("Failed to fetch cashtag info");
            }
        
            const data = await response.json();
            
            console.log(data, "dataaa")
            let result = data["coin"] ? [{
              cashtag: data.coin[0].symbol,
              count_mentions_last_24h: data.coin[0].count_mentions_last_24h,
              mentions_by_influencers_24h: data.coin[0].mentions_by_influencers_24h,
              coins: data.coin
            }] : [{
              cashtag: data.token[0].token_symbol,
              count_mentions_last_24h: data.token[0].count_mentions_last_24h,
              mentions_by_influencers_24h: data.token[0].mentions_by_influencers_24h,
              tokens_pairs: data.token
            }]
            
            setSearchedData(result);
          } catch (error) {
            console.error("Error fetching data:", error);
            setSearchedData([]);
            setSearchedDatabool(false);
          } finally {
            isSearchLoading(false);
          }
        }
        setShowPreviousResults(false);
      }}
      onInputChange={(event, newValue) => {
        setSearchQuery(newValue);
        // setSearchTriggered(false);
        setApiCalled(3);
        if (newValue=="") {
          setShowPreviousResults(true);
        } else {
          setShowPreviousResults(false);
        }
      }}
      onFocus={() => {
        if (searchQuery.trim() === "") {
          setShowPreviousResults(true);
        }
      }}
      onBlur={() => {
        setShowPreviousResults(false);
      }}
      getOptionLabel={(option: any) => {
        if (typeof option === "string") return option;
        if (!option || typeof option !== "object") return "";
        
        const symbol = option?.symbol || "";
        const name = option?.name || "";
        
        // Add $ prefix for display if it's a token or coin
        const displaySymbol = (option.category === "token" || option.category === "coin") && !symbol.startsWith('$') 
          ? `$${symbol}` 
          : symbol;
          
        return `${displaySymbol}${name ? ` (${name})` : ""}`.trim();
      }}
      renderInput={(params) => (
        <CTextField
          params={params}
          selectedOption={value}
          inputRef={inputRef}
        />
      )}
      renderOption={(props, option) => {
        const tokenName = option?.name || "";
        const isPreviouslySearched = previousResults.includes(
          tokenName.toLowerCase()
        );

        console.log(option, "optionoption");
        
        return (
          <li
            {...props}
            key={option?.token_address || option?.id || tokenName}
            style={{
              color: "black",
              padding: 0,
              backgroundColor: "#0B0B0B"
            }}
          >
            <TokenCard option={option} />
          </li>
        );
      }}
      filterOptions={(x) => x} // Disable built-in filtering to use server-side search
      loading={isLoading}
      loadingText={<SkeletonLoader />}
      
      noOptionsText={
        apiCalled==2 && options.length == 0 && searchQuery!=""&& (
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#1a1b23",
              borderRadius: "0 0 8px 8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderTop: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: 500 }}
            >
            No tokens found for "<strong>{searchQuery}</strong>"
            </Typography>
          </Box>
        ) }

      componentsProps={{
        paper: {
          sx: {
            backgroundColor: "#1a1b23",
            color: "white",
            borderRadius: "0 0 8px 8px",
            marginTop: "-1px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderTop: "none",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            "& .MuiAutocomplete-listbox": {
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none"
              },
              "-ms-overflow-style": "none",
              padding: "0"
            },
            "& .MuiAutocomplete-option": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              },
              padding: "0"
            }
          }
        }
      }}
      sx={{ width: "100%" }}
    />
  );
}