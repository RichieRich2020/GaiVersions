import  { useState, useEffect } from 'react';
import { Twitter, LogOut, Loader2 } from 'lucide-react';
import {
  getLoginUrl,
  generateState,
  generateCodeVerifier,
  generateCodeChallenge,
  getAccessTokenFromBackend,
  getUserProfile
} from '../utils/twitter';
import { useAuth } from "../config/AuthContext";

import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Paper,
    Avatar,
    Alert,
  } from "@mui/material";
// Use environment variables for security
const CLIENT_ID = "Szdtd2h3aU1mTlNqRUthaDQwenY6MTpjaQ"; 
const REDIRECT_URI = 'http://localhost:3000/';
export interface TwitterUser {
    id: string;
    name: string;
    username: string;
    profile_image_url: string;
    description: string;
  }
function Login() {
    const { login } = useAuth();
   
  const [user, setUser] = useState<TwitterUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [reff, setReff] = useState("");
  const [error, setError] = useState<string | null>(null);


 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const storedState = sessionStorage.getItem('twitter_state');
    const storedVerifier = sessionStorage.getItem('code_verifier');

    if (code && state && storedState && storedVerifier && state === storedState) {
      handleCallback(code, storedVerifier);
    }
  }, []);

  const handleCallback = async (code: string, verifier: string) => {
    setLoading(true);
    setError(null);
  
    try {
      window.history.replaceState({}, document.title, window.location.pathname);
  
      const auth = await getAccessTokenFromBackend(code, verifier);
      sessionStorage.setItem('twitter_token', auth.access_token);
  
      const userProfile = await getUserProfile(auth.access_token,reff); // Call backend API
      console.log();
      setUser(userProfile.user_data);
      // setReferraltoken(userProfile.referral_code)
      login(userProfile.user_data,userProfile.user_data.jwt_token,userProfile.user_data.token_expiry,userProfile.referral_code,);
    } catch (err) {
      console.error('OAuth Callback Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete login');
    } finally {
      setLoading(false);
      sessionStorage.removeItem('twitter_state');
      sessionStorage.removeItem('code_verifier');
    }
  };

  const handleLogin = async () => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
   console.log(state,codeVerifier,"dfcdfcd");
    try {
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      console.log(codeChallenge,"codeChallenge");
      sessionStorage.setItem('twitter_state', state);
      sessionStorage.setItem('code_verifier', codeVerifier);

      const loginUrl = getLoginUrl(CLIENT_ID, REDIRECT_URI, state, codeChallenge);
      window.location.href = loginUrl;
 
    } catch (err) {
      console.error('Login Error:', err);
      setError('Failed to generate authentication request');
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('twitter_token');
  };
  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="grey.100" sx={{
        backgroundColor:"#000000",
        border:"2px solid red"
      }}>
        <CircularProgress color="primary" />
        <Typography ml={2} color="textSecondary">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" width={"100%"} bgcolor="background.default"  sx={{
        backgroundColor:" #000000 ",
       
    }}>
      <Paper sx={{ maxWidth: 500, width: "100%", p: 4, textAlign: "center" , borderRadius:"50%" ,background: "radial-gradient(circle, #6601E6 0%, #000000 40%)",}} elevation={3}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3} color="secondary">
          <Twitter size={32} color="#1DA1F2" />
          <Typography  fontWeight="bold" ml={1} sx={{
            color:"white"
          }} >X Social Login</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {user ? (
          <>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Avatar src={user.profile_image_url} alt={user.name} sx={{ width: 64, height: 64, mb: 2 }} />
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="textSecondary">@{user.username}</Typography>
              <Typography mt={2} color="textPrimary">{user.description}</Typography>
            </Box>
            <Button fullWidth variant="outlined" color="secondary" startIcon={<LogOut size={20} />} sx={{ mt: 3 }} onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <>
            <Typography color="textSecondary" mb={2}  sx={{
            color:"white"
          }}>Sign in with your X account to continue</Typography>
          {/* <Typography color="textSecondary" mb={2}  sx={{
            color:"white"
          }}>Add your Referral Code</Typography> */}
           <Box sx={{
            width:"200px",
            margin:"auto",
            // border:"2px solid red"
           }}>
           <input type="text"  placeholder='Add your Referral Code'  onChange={(e)=>{
            // console.log(e.target.value);
            setReff(e.target.value)
           }} style={ {
            background:"none",
            border:"1px solid #6601E6",
            color:"white",
            height:"30px",
            borderRadius:"5px",
            padding:"5px"
          }} />
            <Button fullWidth variant="contained" color="primary" startIcon={<Twitter size={20} />} onClick={handleLogin}  sx={{
           width:"200px",
           backgroundColor:"#6601E6",
           mt:2
          }}>Sign in with X</Button>
           </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default Login;