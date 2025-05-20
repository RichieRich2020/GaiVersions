 import axios from 'axios';
// import { TwitterAuth, TwitterUser, TwitterError } from '../types';
import CryptoJS from 'crypto-js';

// Generate a random string for the state parameter
export function generateState(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}
export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  description: string;
}

export interface TwitterAuth {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface TwitterError {
  error: string;
  error_description: string;
}
// Generate a random verifier string
export function generateCodeVerifier(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}

// Generate code challenge from verifier
export function generateCodeChallenge(verifier: string): string {
  const hash = CryptoJS.SHA256(verifier);
  return base64URLEncode(hash.toString(CryptoJS.enc.Base64));
}

// Base64URL encode a string
function base64URLEncode(str: string): string {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Get the login URL
export function getLoginUrl(clientId: string, redirectUri: string, state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'tweet.read tweet.write users.read offline.access',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
}

// 🔴 Call Your Backend to Exchange Code for Tokens
export async function getAccessTokenFromBackend(code: string, codeVerifier: string) {
  try {
    const response = await fetch("https://api.marwalproduction.com/get-twitter-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, codeVerifier }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token from backend");
    }

    return await response.json();
  } catch (error) {
    console.error("Backend Token Fetch Error:", error);
    throw error;
  }
}



export async function getUserProfile(accessToken: string,reff:string): Promise<any> {
  try {
    console.log("Requesting Twitter user profile...");
    console.log("Access Token:", accessToken);

    const response = await axios.get('https://api.marwalproduction.com/get-twitter-user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("User Profile Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error fetching Twitter user profile:", error.response?.data || error.message);
    throw new Error("Failed to fetch Twitter user profile");
  }
}

export  const getTrendingCoins = async ()=> {
  try {
    const response = await fetch("https://g-ai-backend-1.onrender.com/trending_coins_with_pairs");
    const data = await response.json();
    console.log(data, "trendingCoins");
    return data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching trending coins:", err);
    throw err; // Re-throw the error to be handled by the caller if needed
  }
}
export const fetchSavedTokens = async (token: string, username: string ) => {
  try {
    const response = await fetch(
      `https://g-ai-backend-1.onrender.com/save_tokens?username=${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      const errorMessage = errorBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(data, "Savedcoins");
    return data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching saved tokens:", err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

export const  getCoinCurrMarketData = async (id)=> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching market data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getCoinCurrMarketData:', error);
    return null;
  }
}

export const getTokenCurrMarketData = async (chain_id, token_address) => {
  const url = `https://api.dexscreener.com/tokens/v1/${chain_id}/${token_address}`;
  console.log("datadata");
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching token market data: ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error in getTokenCurrMarketData:', error);
    return null;
  }
};

export const convertDataToFormattedObject = async (data) => {
  if (data.length === 0) return [];
  const formattedData = {};

  data?.forEach((item) => {
    const cashtag = item?.cashtag || "Unknown";
    const count_mentions_last_24h = item?.count_mentions_last_24h || 0;

    const coins = item.coins || [];
    const tokens_pairs = item.tokens_pairs||[]

    coins?.forEach((ele) => {
      // Find ticker from Binance market
      let ticker = "";
      let pairName   = ""
      if (ele.tickers && Array.isArray(ele.tickers)) {
        const binanceTicker = ele.tickers.find(t => t.market_name === "Binance");
        if (binanceTicker) {
          ticker = `${binanceTicker.base}${binanceTicker.target}`;
          pairName =`${binanceTicker.base}/${binanceTicker.target}`;
        }
      }
      // If ticker is N/A, pull pairs data
      let pairs = null;
      if (ticker === "" && ele.pairs) {
        pairs = {
          pair_name: ele.pairs?.pair_name || null,
          pair_address: ele.pairs?.pair_address || null,
          price_in_usd: ele.pairs?.price_in_usd || null,
          volume_h24_usd: ele.pairs?.volume_h24_usd || null,
          market_cap_in_usd: ele.pairs?.market_cap_in_usd || null,
          fdv_in_usd: ele.pairs?.fdv_in_usd || null,
          chain_id: ele.pairs?.chain_id || null,
          dex: ele.pairs?.dex || null,
          pair_creation_date: ele.pairs?.pair_creation_date || null,
        };
      }

      const formattedItem = {
        id:ele?.id||"",
        category: ele?.category || "N/A",
        TokenName: ele?.name || "Unknown",
        Symbol: ele?.symbol || "N/A",
        TokenAge: "AGE", // Placeholder
        TokenLogo: ele?.image_url || "",
        MarketCap: ele?.market_cap || 0,
        Mentions24h: count_mentions_last_24h,
        current_price:ele?.current_price ,
        total_volume: ele?.total_volume || 0,
        price_change_percentage_1hr: ele?.price_change_percentage_1hr || 0,
        price_change_percentage_24hr: ele?.price_change_percentage_24hr || 0,
        price_change_percentage_30day: ele?.price_change_percentage_30day || 0,
        circulating_supply: ele?.circulating_supply || "N/A",
        total_supply: ele?.total_supply || "N/A",
        max_supply: ele?.max_supply || "N/A",
        cmc_rank: ele?.market_cap_rank || "N/A",
        contract_address: ele?.contract_address || [],
        chain_id: ele?.chain_id || "N/A",
        ticker: ticker,
        pairs: pairs, // ✅ Add pairs if ticker is N/A, otherwise will be null
        pairName:pairName||pairs?.pair_name,
      };

      // Add to formattedData
      if (!formattedData[cashtag]) {
        formattedData[cashtag] = [];
      }
      formattedData[cashtag].push(formattedItem);
    });

    tokens_pairs?.forEach((ele) => {
      let pairs = null;

        pairs = {
          
          pair_name:  ele?.pair_name|| null,
          pair_address: ele?.pair_address|| null,
          price_in_usd: ele?.price_in_usd || null,
          volume_h24_usd: ele?.volume_h24_usd || null,
          market_cap_in_usd:  ele?.market_cap_in_usd || null,
          fdv_in_usd: ele?.fdv_in_usd || null,
          chain_id:ele?.chain_id  || null,
          dex: ele?.dex || null,
          pair_creation_date: ele?.pair_creation_date || null,
        };
      
      const formattedItem = {
        Symbol:cashtag,
        is_cg_listed:ele?.is_cg_listed,
        id:null,
        category: "token",
        TokenName: ele?.token_name || "Unknown",
        Symbol: ele?.symbol || "N/A",
        TokenAge: "AGE", // Placeholder
        TokenLogo: ele?.token_image || "",
        MarketCap: ele?.market_cap_in_usd || 0,
        token_address:ele?.token_address,
        pair_address:ele?.pair_address,
        volume_h24_usd:ele?.volume_h24_usd,
        Mentions24h: count_mentions_last_24h,
        current_price:ele?.price_in_usd ,
        price_change_percentage_1hr: ele?.price_ch_per_h1 || 0,
        price_change_percentage_6hr: ele?.price_ch_per_h6 || 0,
        price_change_percentage_24hr: ele?.price_ch_per_h24 || 0,
        chain_id: ele?.chain_id || "N/A",
        pairName: ele?.pair_name,
        pair_image:ele?.pair_image,
        total_liquidity_usd:ele?.total_liquidity_usd,
        fdv_in_usd:ele?.fdv_in_usd,
        dex:ele?.dex,
        pairs:pairs
      };

      // Add to formattedData
      if (!formattedData[cashtag]) {
        formattedData[cashtag] = [];
      }
      formattedData[cashtag].push(formattedItem);
    });
  });

  return formattedData;
}