import React from "react";

// Format number to display with K, M, B, T suffixes and 2 decimal places
export const formatCurrencyValue = (
  value: number | string | null | undefined,
  isPercentage = false
): string => {
  if (!value && value !== 0) return isPercentage ? "0%" : "$0";

  // Convert to number if it's a string
  const num = typeof value === "string" ? parseFloat(value) : (value as number);

  // Handle invalid numbers
  if (isNaN(num)) return isPercentage ? "0%" : "$0";

  // Special handling for current price with very small values
  if (!isPercentage && num < 0.01) {
    return formatCryptoPrice(num);
  }

  const prefix = isPercentage ? "" : "$";
  const suffix = isPercentage ? "%" : "";

  // Format with suffixes
  if (num >= 1000000000000000) {
    // Quadrillion
    return `${prefix}${(num / 1000000000000000).toFixed(2)}Q${suffix}`;
  } else if (num >= 1000000000000) {
    // Trillion
    return `${prefix}${(num / 1000000000000).toFixed(2)}T${suffix}`;
  } else if (num >= 1000000000) {
    // Billion
    return `${prefix}${(num / 1000000000).toFixed(2)}B${suffix}`;
  } else if (num >= 1000000) {
    // Million
    return `${prefix}${(num / 1000000).toFixed(2)}M${suffix}`;
  } else if (num >= 1000) {
    // Thousand
    return `${prefix}${(num / 1000).toFixed(2)}K${suffix}`;
  } else {
    return `${prefix}${num.toFixed(2)}${suffix}`;
  }
};

export const formatnum = (
  value: number | string | null | undefined,
  isPercentage = false
): string => {
  if (!value && value !== 0) return isPercentage ? "0%" : "-"; // Changed "$0" to "-"

  // Convert to number if it's a string
  const num = typeof value === "string" ? parseFloat(value) : (value as number);

  // Handle invalid numbers
  if (isNaN(num)) return isPercentage ? "0%" : "-"; // Changed "$0" to "-"

  // Special handling for current price with very small values
  if (!isPercentage && num < 0.01) {
    return formatCryptoPrice(num).replace("$", ""); // Remove $ from crypto prices
  }

  const prefix = ""; // Empty prefix since we don't want $
  const suffix = "";

  // Format with suffixes
  if (num >= 1000000000000) {
    // Trillion
    return `${prefix}${(num / 1000000000000).toFixed(2)}T${suffix}`;
  } else if (num >= 1000000000) {
    // Billion
    return `${prefix}${(num / 1000000000).toFixed(2)}B${suffix}`;
  } else if (num >= 1000000) {
    // Million
    return `${prefix}${(num / 1000000).toFixed(2)}M${suffix}`;
  } else if (num >= 1000) {
    // Thousand
    return `${prefix}${(num / 1000).toFixed(2)}K${suffix}`;
  } else {
    return `${prefix}${num.toFixed(2)}${suffix}`;
  }
};

// Format small cryptocurrency prices with subscript notation for leading zeros
export const formatCryptoPrice = (
  value: number | string | null | undefined
): string => {
  if (!value && value !== 0) return "$0";

  // Convert to number if it's a string
  const num = typeof value === "string" ? parseFloat(value) : (value as number);

  // Handle invalid numbers
  if (isNaN(num)) return "$0";

  // For regular numbers (not extremely small), use normal formatting
  if (num >= 0.01) {
    return `$${num.toFixed(2)}`;
  }

  // Convert to string for analysis
  const priceStr = num.toString();

  // Count zeros after decimal point
  const match = priceStr.match(/^0\.0+/);
  if (!match) {
    // No leading zeros pattern found, use regular formatting
    return `$${num.toFixed(4)}`;
  }

  // Count zeros after the decimal point (excluding the first zero after decimal)
  const zerosAfterDecimal = match[0].length - 2; // -2 for "0."

  // If there are 3 or fewer zeros after decimal, show normally
  if (zerosAfterDecimal <= 3) {
    return `$${num.toFixed(6)}`;
  }

  // For numbers with more than 3 zeros after decimal, use subscript notation
  // Find position of first non-zero digit
  const nonZeroMatch = priceStr.match(/^0\.0+([1-9])/);
  if (nonZeroMatch) {
    // Get the non-zero part after the leading zeros
    const nonZeroPart = priceStr.substring(priceStr.indexOf(nonZeroMatch[1]));

    // Limit to 4 digits after the significant digit
    const limitedNonZeroPart = nonZeroPart.substring(
      0,
      Math.min(4, nonZeroPart.length)
    );

    // Get the subscript character for number of zeros (excluding the first zero after decimal)
    const subscriptDigit = getSubscriptDigit(zerosAfterDecimal);

    // Format as $0.0ₙXXXX where n is the number of zeros
    return `$0.0${subscriptDigit}${limitedNonZeroPart}`;
  }

  // Fallback for other cases
  return `$${num.toFixed(4)}`;
};

// Helper function to convert a number to its subscript representation
const getSubscriptDigit = (num: number): string => {
  const subscriptDigits = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

  if (num < 10) {
    return subscriptDigits[num];
  } else {
    // For numbers with multiple digits, convert each digit to subscript
    return num
      .toString()
      .split("")
      .map((digit) => subscriptDigits[parseInt(digit)])
      .join("");
  }
};

// Updated NewBadge component with width and height props
interface NewBadgeProps {
  hours?: number;
}

export const NewBadge: React.FC<NewBadgeProps> = ({ hours }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        backgroundColor: "transparent",
        // padding: '4px 8px',
        borderRadius: "4px",
        // border: '1px solid #bfdbfe',
        fontSize: "0.75rem",
        lineHeight: 1,
      }}
    >
      <img
        src="new.png"
        alt="New"
        style={{
          width: "20px",
          height: "20px",
          objectFit: "contain",
        }}
      />
      {hours ? `${hours}h` : "New"}
    </span>
  );
};

export const formatLaunchDate = (
  dateString: string | null | undefined
): string | React.ReactElement => {
  if (!dateString) return "N/A";

  try {
    let normalizedDateString = dateString.trim();

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(normalizedDateString)) {
      normalizedDateString = normalizedDateString.replace(" ", "T");
    } else if (!normalizedDateString.includes("T")) {
      normalizedDateString += "T00:00:00";
    }

    const date = new Date(normalizedDateString);

    if (isNaN(date.getTime())) {
      console.warn("Invalid date string:", dateString);
      return "N/A";
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.abs(diffMs) / (1000 * 60 * 60);

    if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return <NewBadge hours={hours} />;
    }

    const totalDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));

    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    const timeParts = [];
    if (years > 0) timeParts.push(`${years}Y`);
    if (months > 0) timeParts.push(`${months}M`);
    if (days > 0) timeParts.push(`${days}D`);

    if (timeParts.length === 0) {
      return <NewBadge hours={0} />;
    }

    const timeString = timeParts.join(" ");

    if (diffMs < 0) {
      return `In ${timeString}`;
    }

    return `${timeString} ago`;
  } catch (e) {
    console.error("Date formatting error:", e);
    return "N/A";
  }
};