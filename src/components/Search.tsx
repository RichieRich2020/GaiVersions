import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { Autocomplete, AutocompleteRenderInputParams } from "@mui/material";
import debounce from "lodash/debounce";
import { CTextField } from "./CTextField";
// import "./styles.css";

export interface OptionType {
  name: string;
//   year: number;
}

const getOptionsAsync = async (query: string): Promise<OptionType[]> => {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.marwalproduction.com/search?keyword=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.coin_info    || [];
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export default function Search() {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setValue] = useState<OptionType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOptionsDelayed = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true);
      const newOptions = await getOptionsAsync(query);
      setOptions(newOptions);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    getOptionsDelayed(searchQuery);
  }, [searchQuery, getOptionsDelayed]);

  return (
    
     <>
      <Autocomplete
        options={options}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        onInputChange={(event, newValue) => setSearchQuery(newValue)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <CTextField params={params} label="" selectedOption={value} />}
        renderOption={(props, option) => (
          <li {...props} key={option.name}  style={{
             backgroundColor:"#0B0B0B",
             color:"white",
          }}>
            <Grid container alignItems="center"  >
              <Grid item xs={12}>{option.name}</Grid>
              {/* <Grid item xs={12}>{option.year}</Grid> */}
            </Grid>
          </li>
        )}
        loading={isLoading}
        sx={{
            // border:"none",
            width:"100%",
        //    backgroundColor:"#0B0B0B"
        }}
      />
      </>
    
  );
}
