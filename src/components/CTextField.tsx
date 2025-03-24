import React, { useEffect, useState, useRef } from "react";
import { TextField, TextFieldProps, Box } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material";
import omit from "lodash/omit";

import { OptionType } from "./Search";

export const CTextField: React.FC<
  TextFieldProps & {
    params: AutocompleteRenderInputParams;
    selectedOption: OptionType | null;
  }
> = ({ params, selectedOption, ...other }) => {
  const [value, setValue] = useState(params.inputProps.value as string);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    params.inputProps.onChange?.(event);
    setValue(event.target.value);
  };

  const hasMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (hasMountedRef.current) {
      setValue("");
    } else {
      hasMountedRef.current = true;
    }
  }, [selectedOption]);

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
  sx={{
    width: "110%",
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
    placeholder: "Search", // ✅ Add placeholder here
    style: { color: "white" }, // Text color for input
  }}
  InputLabelProps={{
    shrink: isFocus || !!selectedOption,
    style: {
      color: "white",
      backgroundColor: "red",
    }, // Text color for label
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
            // padding: "4px",
            borderRadius: "4px",
            boxShadow: 1,
            // border: "2px solid red",
            backgroundColor:"#0B0B0B"
           
          }}
        >
          {/* <div></div> */}
          {/* <div>{selectedOption.year}</div> */}
        </Box>
      )}
    </Box>
  );
};