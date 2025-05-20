import React from "react"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: TwitterUser | null;
  login: (data: TwitterUser, token: string, expiry: string, referral?: string) => void;
  logout: () => void;
  setUser: (user: TwitterUser | null) => void;
  setTokendata: (data: any | null) => void;
  tokendata:any
  // referralToken: string | null;
  // setReferralToken: (token: string | null) => void;
}

export interface TwitterUser {
  jwt_token(jwt_token: any, username: string): unknown;
  referral_code: ReactNode;
  referral_points: unknown;
  referralToken: ReactNode;
  usageTime: string;
  // referralToken: ReactNode;
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  description: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<TwitterUser | null>(null);
  // const [referralToken, setReferralToken] = useState<string | null>(null);
 const [tokendata, setTokendata] = useState<any>();
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser:any = localStorage.getItem("user_data");
    // const storedReferral = localStorage.getItem("referral_token");

  
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
  
    // chrome.runtime.sendMessage({
    //   action: "storeUserData",
    //   payload: {
    //     token: storedToken,
    //   },
    // });

    // if (storedReferral) {
    //   setReferralToken(storedReferral);
    // }
  }, []);

  const login = (data: TwitterUser, token: string, expiry: string, referral?: string) => {
    console.log("User Data:", data);

    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_data", JSON.stringify(data));
    // chrome.storage.local.set({ 
    //   isAuthenticated: true,
    //   user_data: JSON.stringify(data),
    //   jwt_token: token
    // });
  

    // if (referral) {
    //   setReferralToken(referral);
    //   localStorage.setItem("referral_token", referral);
    // }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // setReferralToken(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("isFirstVisit")
    // chrome.storage.local.set({ isAuthenticated: false });
    // chrome.storage.local.remove(['jwt_token', 'user_data']);
    // localStorage.removeItem("referral_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout,setUser,setTokendata ,tokendata}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
