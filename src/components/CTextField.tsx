import React, { useEffect, useState, useRef } from "react";
import { TextField, TextFieldProps, Box } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material";
import omit from "lodash/omit";

import { OptionType } from "./Search";

export const CTextField: React.FC<
  TextFieldProps & {
    params: AutocompleteRenderInputParams;
    selectedOption: OptionType | null;
    inputRef?: React.RefObject<HTMLInputElement>;
  }
> = ({ params, inputRef, selectedOption, ...other }) => {
  const [value, setValue] = useState(params.inputProps.value as string);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  
  const hasMountedRef = useRef<boolean>(false);

  useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  // Handle the input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the current value from the event
    const currentValue = event.target.value;
    
    // Update the state with the current value
    setValue(currentValue);
    
    // Call the original onChange handler with the event
    params.inputProps.onChange?.(event);
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    params.inputProps.onFocus?.(event);
    setIsFocus(true);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    params.inputProps.onBlur?.(event);
    setIsFocus(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        {...omit(params, "inputProps")}
        {...other}
        inputRef={inputRef}
        sx={{
          width: "100%",
          color: "white",
          border: "none",
          "& fieldset": {
            border: "none !important", // Remove border
          },
          "&:hover fieldset": {
            border: "none !important", // Prevent border on hover
          },
          "&.Mui-focused fieldset": {
            border: "none !important", // Prevent border on focus
          },
          "& input": {
            color: "white", // Set text color to white
          },
          "&::placeholder": {
            color: "rgba(255, 255, 255, 0.7)", // Placeholder color
          }
        }}
        inputProps={{
          ...omit(params.inputProps, ["value", "onChange", "placeholder"]),
          value,
          onChange: handleInputChange,
          onBlur: handleInputBlur,
          onFocus: handleInputFocus,
          placeholder: "Search for tokens (e.g. BTC, $SOL, token address)",
          style: { color: "white" }, // Text color for input
          'aria-label': 'Search input',
        }}
        InputLabelProps={{
          shrink: isFocus || !!selectedOption,
          style: {
            color: "white",
            backgroundColor: "transparent",
          },
        }}
      />

      {!isFocus && selectedOption && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            textAlign: "left",
            color: "white",
            transition: 'all 0.3s ease',
            borderRadius: "4px",
            boxShadow: 1,
            backgroundColor: "#0B0B0B"
          }}
        >
          {/* Selected option display */}
        </Box>
      )}
    </Box>
  );
};