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
