import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: TwitterUser | null;
  referralToken: string | null;
  login: (data: TwitterUser, token: string, expiry: string, referral?: string) => void;
  logout: () => void;
}

export interface TwitterUser {
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
  const [referralToken, setReferralToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user_data");
    const storedReferral = localStorage.getItem("referral_token");

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    console.log(storedReferral,"storedReferral");
    if (storedReferral) {
      setReferralToken(storedReferral);
    }
  }, []);

  const login = (data: TwitterUser, token: string, expiry: string, referral?: string) => {
    console.log("User Data:", data);

    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_data", JSON.stringify(data));

    if (referral) {
        localStorage.setItem("referral_token", referral);
    }
};

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setReferralToken(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("referral_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, referralToken, login, logout }}>
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
