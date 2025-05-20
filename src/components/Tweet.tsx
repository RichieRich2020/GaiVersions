import React, { useEffect, useState } from "react";
import CashtagMentioned from "./CashtagMentioned";
import TweetOwner from "./TweetOwner";
import { formatCurrencyValue, formatnum } from "../utils/NumFormatter";
import TweetOwnerSkeleton from "./TweetOwnerSkeleton";
import CashtagMentionedSkeleton from "./CashtagMentionedSkeleton";
import { Typography } from "@mui/material";
import { FaLessThanEqual } from "react-icons/fa";
import { Box } from "@mui/material";
import ErrorComponent from "./ErrorComponent";
import { convertDataToFormattedObject } from "../utils/allfunctions";

interface UserInfo {
  joined(joined: any): string;
  following_count: string;
  screen_name: string;
  username: string;
  profile_image_url: string;
}

interface CoinInfo {
  name: string;
  price: number;
  volume_24hr: number;
  market_cap: number;
  tags: string[];
  cmc_rank: number;
  total_mentions_24hr: number;
  TbClock24: number;
  total_mentions: number;
}

interface Cashtag {
  cashtag: string;
  coin_info: CoinInfo;
}

const Tweet = ({ searchedData, setSearchedData, searchLoading, searchedDatabool, setSearchedDatabool,cashtagsbool ,setCashtagsbool,userbool,setUserbool}) => {
    // save at  localstorage  with lastdata key
  console.log(searchedData, "klklklkkkl");

  const [userData, setUserData]: any = useState("");
  
  const [passData, setPassData]: any = useState([]);
  const [cashtagsData, setCashtagsData] = useState([...searchedData]);
  const [cashtagsinfo, setCashtagsinfo] = useState([]);
  const [firstVisit, setFirstVisit] :any= useState(false);

  console.log(userData, cashtagsData, "cashtagsData");

  useEffect(() => {
    const hasVisited = localStorage.getItem("isFirstVisit");
  console.log(localStorage.getItem("isFirstVisit"),hasVisited,"hasVisited");
    if (!hasVisited) {
      setFirstVisit(true);
      localStorage.setItem("isFirstVisit", "true"); 
    }
  }, []);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message?.type === "updateUserdata") {
        setUserbool(false)
        setUserbool(false);
        setCashtagsbool(false);
        setFirstVisit(false);
        const { userInfo, cashtags } = message || {};

        console.log(userInfo, "userInfo");
        console.log(cashtags, "cashtaginfofo");

        if (Array.isArray(userInfo)) {
          console.log(userInfo, "userInfouserInfo");
        } else {
          if (Object.keys(userInfo?.user_info).length != 0) {
    // save at  localstorage  with lastdata key
         localStorage.setItem("lastDataUser", JSON.stringify(userInfo?.user_info));
            setUserData(userInfo?.user_info);
            setSearchedData([]);
          }
    // save at  localstorage  with lastdata key
        //  localStorage.setItem("lastDataCash", JSON.stringify(userInfo?.cashtags));
          setCashtagsinfo(userInfo?.cashtags);
          setSearchedData([]);
        }
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    chrome.runtime.sendMessage(
      { type: "GET_CURRENT_USER_INFO" },
      (response) => {
        console.log(response,"response");
        if (response) {
          setUserbool(false);
          setCashtagsbool(false);
         
        }
      }
    );

    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //   if (message.type === "buttonClick" ) {
    //     console.log("Click detected:", message);
    //     setSearchedDatabool(false);
    //     setUserbool(true);
    //     setCashtagsbool(true);
    //     setFirstVisit(false);
    //   }
    // });
    
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  function getTokenAge(dateString) {
    if (!dateString) return "N/A";

    const dateAdded: any = new Date(dateString);
    if (isNaN(dateAdded)) return "Invalid Date";

    const currentDate: any = new Date();
    const diffInMs = currentDate - dateAdded;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffInDays / 365);
    const days = diffInDays % 365;

    return `${years} Year${years !== 1 ? "s" : ""} ${days} Day${
      days !== 1 ? "s" : ""
    }`;
  }

 

  useEffect(() => {
    if (searchedData && searchedData.length > 0) {
      setCashtagsData([...searchedData]);
    } else {
      if (cashtagsinfo && cashtagsinfo.length > 0) {
        setCashtagsData([...cashtagsinfo]);
      } else {
        setCashtagsData([]);
      }
    }

    return () => {
      console.log("Cleaning up cashtagsData...");
      setCashtagsData([]);
      // // setSearchedDatabool(false);
      setPassData([]);
    };
  }, [searchedData, cashtagsinfo]);

  useEffect(() => {
    const formatAndSetData = async () => {
      const formatted :any= await convertDataToFormattedObject(cashtagsData);
      console.log(Object.keys(formatted),"Object.keys(formatted)");
     if(Object.keys(formatted).length > 0){
      console.log(formatted,"Object.keys(formatted)");
      localStorage.setItem("passdata", JSON.stringify(formatted));
      setPassData(formatted);
     }else{
      console.log(Object.keys(formatted),"Object.keys(formatted)");
      if (Object.keys(formatted).length) {
        console.log("in");
        const lastCash = localStorage.getItem("passdata");
        const parsed = JSON.parse(lastCash);
        if (parsed.length>0) {
          try {
            setPassData(parsed);
            
          } catch (e) {
            console.error("Error parsing lastDataCash", e);
          }
        }
      }
     }
     
      // console.log(formatted,"formatted");
      // setPassData(formatted);
    };
  
    // if (cashtagsData) {
      formatAndSetData();
    // }
  }, [cashtagsData]);

  const redirectToX = () => {
    chrome.tabs.create({ url: "https://twitter.com" });
  };

 
 
  useEffect(() => {


    if (!Object.keys(userData).length) {
      const lastUser = localStorage.getItem("lastDataUser");
      console.log(lastUser,"lastUser");
      const parsed = JSON.parse(lastUser);
      if (Object.keys(parsed).length) {
        try {

            setUserData(parsed); 
        } catch (e) {
          console.error("Error parsing lastDataUser", e);
        }
      }
    }
  }, []);

  console.log(passData,"passData");
  console.log(searchedDatabool,"searchedDatabool");
  console.log(searchLoading,"searchLoading");
  console.log(userbool,"userbool");
  console.log(cashtagsbool,"cashtagsbool");
  return (
    <Box sx={{ 
      width: "500px", 
      display: "flex", // Changed from "contents" to "flex"
      flexDirection: "column", // Stack children vertically
      justifyContent: "center", 
      alignItems: "center", 
      height: "100%",
      gap: "10px",
      padding: "16px" // Add some padding
    }}>
      {/* {firstVisit ? (
        <ErrorComponent 
        errorType="DEFAULT"
        message="To analyze crypto data from Twitter, visit X (Twitter) and click our extension button on any tweet or profile."
        actionText="Go to X (Twitter)"
        onAction={redirectToX}
        />
      ) : */}
      {
      searchedDatabool ? 
      (
        <>
          {searchLoading ? (
            <CashtagMentionedSkeleton />
          ) : Object.keys(passData).length ? (
            <CashtagMentioned cashinfo={passData} />
          ) : (
            <ErrorComponent
              errorType="NO_CASHTAG"
              message="No cryptocurrency cashtags found in this tweet. Try another tweet with cashtags like $BTC or $ETH."
            />
          )}
        </>
      ) : (
        <>
          {userbool ? (
            <TweetOwnerSkeleton />
          ) : Object.keys(userData).length ? (
            <TweetOwner
              name={userData?.screen_name || "Unknown User"}
              username={userData?.username || "unknown"}
              accountAge={getTokenAge(userData?.joined) || "N/A"}
              avgViews={
                userData?.avg_views ? Math.floor(userData.avg_views) : 0
              }
              followers={userData?.followers_count}
              totalTweets={userData?.tweets_count}

              tagMentions={userData?.cashtag_mentions_last_24h}
              profilePicture={userData?.profile_image_url || ""}
              accountType="Influencer"
            />
          ) : (
            <ErrorComponent
              errorType="USER_NOT_FOUND"
              message="User data not available. Click the extension button on an X (Twitter) profile or tweet to analyze data."
            />
          )}

          {cashtagsbool ? (
            <CashtagMentionedSkeleton />
          ) : Object.keys(passData).length ? (
            <CashtagMentioned cashinfo={passData} />
          ) : (
            <ErrorComponent
              errorType="NO_CASHTAG"
              message="No cryptocurrency cashtags found. Try analyzing a tweet that mentions tokens like $BTC or $ETH."
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Tweet;