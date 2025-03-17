import { SELECTORS } from "../constants/jsPaths";
import ReactDOM from "react-dom";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";
const {
    USERNAME,
    PROFILE_BANNER_URL,
    PROFILE_URL,
    FOLLOWER_COUNT,
    FOLLOWING_COUNT,
    SCREEN_NAME,
    BIOELEMENT,
    JOINED
    
  } = SELECTORS;



  export const UTILS = {
    getElementData: (element, transformer = (val) => val) => {
      if (!element) return null;
      const value = element.textContent?.trim() || element.src || null;
      return transformer(value);
    },
    
    extractCount: (val) => parseInt(val.replace(",", ""), 10) || 0,
    
    extractTweetMetrics: (tweetActionsElement) => {
      let likes = "0", bookmarks = "0", views = "0", comments = "0";
      if (tweetActionsElement) {
        const ariaLabel = tweetActionsElement.getAttribute("aria-label");
        const actions = ariaLabel.match(/(\d+)\s(replies|likes|bookmarks|views)/g);
        comments = actions?.find((action) => action.includes("replies"))?.split(" ")[0] || "0";
        likes = actions?.find((action) => action.includes("likes"))?.split(" ")[0] || "0";
        bookmarks = actions?.find((action) => action.includes("bookmarks"))?.split(" ")[0] || "0";
        views = actions?.find((action) => action.includes("views"))?.split(" ")[0] || "0";
      }
      return { likes, bookmarks, views, comments };
    },
    
    createButton: (callback,outputData) => {
      const button = document.createElement("button");
      button.className = "custom-button";
      Object.assign(button.style, {
        marginLeft: "10px",
        backgroundColor: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "1px 12px",
        color: "#0065ff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
      });
      button.textContent = "GAI";
  
      button.onmouseover = () => (button.style.backgroundColor = "#f0f0f0");
      button.onmouseout = () => (button.style.backgroundColor = "#ffffff");
  
      button.onclick = () => {
        console.log("ON Button");
        callback({ ...outputData });
      };
  
      ReactDOM.render(
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#0065ff",
              transform: "rotate(-90deg)",
            }}
          />
          <div>GAI</div>
        </div>,
        button
      );
      return button;
    },
  };
  
  // Main functions
  export const findUserProfile = () => {
    const userNameContainer = document.querySelector(SELECTORS.USERNAME);
    let username = "Anonymous";
    let screenName = "";
  
    if (userNameContainer) {
      const spans = userNameContainer.querySelectorAll("span");
      if (spans.length >= 2) {
        username = spans[0]?.textContent.trim() || "Anonymous";
        screenName = spans[1]?.textContent.trim() || "";
      } else {
        console.log("Not enough span elements to extract both names.");
      }
    } else {
      console.log("UserName container not found.");
    }
  
    const profileBannerUrl = UTILS.getElementData(document.querySelector(SELECTORS.PROFILE_BANNER_URL));
    const profileImageUrl = UTILS.getElementData(document.querySelector(SELECTORS.PROFILE_URL));
    const bio = UTILS.getElementData(document.querySelector(SELECTORS.BIOELEMENT));
    const followingCount = UTILS.getElementData(document.querySelector(SELECTORS.FOLLOWING_COUNT), UTILS.extractCount);
    const followersCount = UTILS.getElementData(document.querySelector(SELECTORS.FOLLOWER_COUNT), UTILS.extractCount);
    const joined = UTILS.getElementData(document.querySelector(SELECTORS.JOINED));
  
    const userProfile = { username, screenName, profileBannerUrl, profileImageUrl, bio, followingCount, followersCount, joined };
    console.log(userProfile);
  
    chrome.runtime.sendMessage({ type: "USER_PROFILE_FOUND", payload: userProfile });
  
    return userProfile;
  };
  
  export const injectButtonsInTweets = (callback) => {
    const tweetContainers = document.querySelectorAll(SELECTORS.TWEET_CONTAINERS);
    const outputData = []; // Use an array to collect all transformed tweet data
  
    tweetContainers.forEach((tweetContainer) => {
      // Select elements related to the tweet
      const tweetTextElement = tweetContainer.querySelector(SELECTORS.TWEET_TEXT);
      const userNameElement = tweetContainer.querySelector(SELECTORS.USER_NAME);
      const tweetDateElement = tweetContainer.querySelector(SELECTORS.TWEET_DATE);
      const tweetActionsElement = tweetContainer.querySelector(SELECTORS.TWEET_ACTIONS);
      const avatarElement:any = tweetContainer.querySelector(SELECTORS.AVATAR);
      const tweetLinkElement:any = tweetContainer.querySelector('a[href*="/status/"]');
  
      // Extract the tweet content and metadata
      const tweetContent = tweetTextElement ? tweetTextElement.textContent.trim() : null;
      const username = userNameElement ? userNameElement.textContent.trim() : "Unknown";
      const tweetDate = tweetDateElement ? tweetDateElement.getAttribute("datetime") : "Unknown";
      const avatarUrl = avatarElement ? avatarElement.src : "No avatar";
      const metrics = UTILS.extractTweetMetrics(tweetActionsElement);
  
      // Extract tweet ID from the link
      const tweetUrl = tweetLinkElement?.href;
      const tweetIdMatch = tweetUrl ? tweetUrl.match(/\/status\/(\d+)/) : null;
      const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;
  
      // Transform the tweet data for further processing
      const transformedData = transformTweetData({
        tweetContent,
        tweetDate,
        username,
        metrics,
        avatarUrl,
        tweetId,
      });
  
      // Process tweets with hashtags or mentions
      if (tweetContent && (tweetContent.includes("#") || tweetContent.includes("$"))) {
        if (userNameElement && !userNameElement.querySelector(".custom-button")) {
          const button = UTILS.createButton(callback, transformedData);
  
          userNameElement.appendChild(button);
          console.log("Button with AdbIcon injected inside User-Name container.");
        }
      }
  
      // Add the transformed data to the output array
      if (transformedData) {
        outputData.push(transformedData);
      }
  
      // Log the transformed tweet data
      console.log(transformedData, "Transformed Tweet Data");
    });
  
    return outputData; // Return an array of all transformed data
  };
  
  export const transformTweetData = (data) => {
    console.log(data, "data.metrics");
    console.log(data.metrics);
    if(!data.tweetId || data.tweetDate=="Unknown"){

      return undefined;

    }
    return {
      username: cleanUsername(data.username), // Clean the username
      screen_name: extractHandle(data.username), // Clean the screen_name
      tweet_id: data.tweetId ,
      content: data.tweetContent || "",
      retweet_count: data.retweet_count || 0,
      like_count: Number(data.metrics?.likes) ,   // Convert to integer, default to 0
      reply_count: Number(data.metrics?.comments) ,
      view_count: Number(data.metrics?.views) ,
      retweeted_tweet: data.retweeted_tweet || 1,
      // media_url: null,
      created_at: data.tweetDate ,
      // retweet_user_id: data.retweet_user_id || null,
      // profile_image_url: data.profile_image_url || "",
      // profile_banner_url: data.profile_banner_url || "",
      // users_url: data.users_url || "",
      // bio: data.bio || "",
      // is_blue_verified: data.is_blue_verified !== undefined ? data.is_blue_verified : false,
      // location: data.location || "New York, NY",
      // following_count: data.following_count || "",
      // followers_count: data.followers_count || "",
      // tweets_count: data.tweets_count || "",
      // joined: data.tweetDate || "",
    };
  };
  
  // Helper functions to clean username and screen name
  const cleanUsername = (username) => {
    return username?.split("@")[0] || ""; // Extract clean part before '@'
  };
  
  const extractHandle = (inputString) => {
    const match = inputString.match(/@[\w]+/);
    return match ? match[0] : ""; // Return matched @handle or empty string
  };
  

 export function extractXProfileData() {
    // Robust helper functions
    function safeGetText(selector, parentElement = document, defaultValue = '') {
        const element = parentElement.querySelector(selector);
        return element ? element.textContent.trim() : defaultValue;
    }

    function safeGetAttribute(selector, attribute, parentElement = document, defaultValue = '') {
        const element = parentElement.querySelector(selector);
        return element ? element.getAttribute(attribute) : defaultValue;
    }

    function parseEngagementNumber(text:any) {
        if (!text) return '0';
        try {
            const cleanText = text.replace(/[^0-9.KMB]/g, '').toUpperCase();
            
            if (cleanText.includes('K')) {
                return (parseFloat(cleanText) * 1000).toString();
            }
            if (cleanText.includes('M')) {
                return (parseFloat(cleanText) * 1000000).toString();
            }
            if (cleanText.includes('B')) {
                return (parseFloat(cleanText) * 1000000000).toString();
            }
            
            return cleanText || '0';
        } catch (error) {
            console.error('Error parsing engagement number:', error);
            return '0';
        }
    }

    function extractMediaUrls(tweet:any) {
        const mediaUrls:any = [];
        // Extract images
        try {
            const imageElements = tweet.querySelectorAll('[data-testid="tweetPhoto"] img');
            imageElements.forEach(img => {
                if (img && img.src && !img.src.includes('emoji')) {
                    // Extract highest quality image URL
                    const originalUrl = img.src.replace(/&name=.+$/, '&name=orig');
                    mediaUrls.push(originalUrl);
                }
            });
        } catch (error) {
            console.error('Error extracting images:', error);
        }
        // Extract videos
        try {
            const videoElements:any = tweet.querySelectorAll('video source');
            videoElements.forEach(source => {
                if (source && source.src) {
                    mediaUrls.push(source.src);
                }
            });
        } catch (error) {
            console.error('Error extracting videos:', error);
        }
        return mediaUrls;
    }

    // Extract robust profile data
    const name = document.querySelector('div[data-testid="UserName"] span')?.textContent || '';
    const username = document.querySelector('div[data-testid="UserName"] div[tabindex="-1"] div[dir="ltr"] span')?.textContent || '';
    
    // Profile picture URL using exact selector
    const profilePicUrl = (document.querySelector('a[href*="/photo"] img') as HTMLImageElement)?.src || '';
const bannerImageUrl = (document.querySelector('a[href*="/header_photo"] img') as HTMLImageElement)?.src || '';

    const bio = safeGetText('div[data-testid="UserDescription"]');
    const websiteUrl = safeGetAttribute('a[data-testid="UserUrl"]', 'href');
    const joinedDate = safeGetText('span[data-testid="UserJoinDate"]');
    const location = safeGetText('span[data-testid="UserLocation"]');
    const profession = safeGetText('span[data-testid="UserProfessionalCategory"] span');

    // Following count using exact selector
    const following = document.querySelector('a[href*="/following"] span')?.textContent || '';
    
    // Followers count using exact selector
    const followers = document.querySelector('a[href*="/verified_followers"] span')?.textContent || '';

    // Total tweets
    let totalTweets = '0';
    const containers = document.querySelectorAll('div');
    for (let container of containers) {
        const text = container.textContent.trim();
        const match = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?[kMB]?)\s+posts/i);
        if (match) {
            totalTweets = parseEngagementNumber(match[1]);
            break;
        }
    }

    // User ID extraction
    let userId = '';
    const placementDiv = document.querySelector('div[data-testid="placementTracking"]');
    if (placementDiv) {
        const button = placementDiv.querySelector('button[data-testid]');
        
        if (button) {
            const dataTestId = button.getAttribute('data-testid');
            userId = dataTestId.match(/\d+/)?.[0] || '';
        }
    }

    // Fallback to previous method if no user ID found
    if (!userId) {
        const anchorTag = document.querySelector('a[href*="/header_photo"]');
        userId = anchorTag && anchorTag.querySelector('img') 
            ? anchorTag.querySelector('img').getAttribute('src').match(/\/(\d+)\//)?.[1] || '' 
            : '';
    }

    // Verified status for profile
    const userNameDiv = document.querySelector('div[data-testid="UserName"]');
    const isVerified = !!userNameDiv?.querySelector('svg[data-testid="icon-verified"]');

    // Create user URL using username (removed @ symbol)
    const userUrl = `https://x.com/${username.replace(/^@/, '')}`;

    // Extract tweets
    function extractTweetMetrics(tweet) {
        const metrics = {
            comments: '0',
            retweets: '0',
            likes: '0',
            views: '0'
        };

        try {
            const replyElement = tweet.querySelector('[data-testid="reply"]');
            const retweetElement = tweet.querySelector('[data-testid="retweet"]');
            const likeElement = tweet.querySelector('[data-testid="like"]');
            const viewsElement = tweet.querySelector('a[href*="/analytics"]');

            if (replyElement) metrics.comments = parseEngagementNumber(replyElement.innerText);
            if (retweetElement) metrics.retweets = parseEngagementNumber(retweetElement.innerText);
            if (likeElement) metrics.likes = parseEngagementNumber(likeElement.innerText);
            if (viewsElement) {
                const viewsText = viewsElement.getAttribute('aria-label');
                metrics.views = parseEngagementNumber(viewsText?.replace(/\.? View post analytics/, '') || '0');
            }

            return metrics;
        } catch (error) {
            console.error('Error extracting metrics:', error);
            return metrics;
        }
    }

    // Extract tweets
    const extractedTweets = [];
    const tweetArticles = document.querySelectorAll('article');
    
    // Separate check for tweet-level verification
    let isTweetVerified = false;
    tweetArticles.forEach((tweet:any) => {
        const tweetUserNameDiv = tweet.querySelector('div[data-testid="User-Name"]');
        const tweetVerifiedIcon = tweetUserNameDiv?.querySelector('[data-testid="icon-verified"]');
        if (tweetVerifiedIcon) {
            isTweetVerified = true;
        }

        // Extract tweet-specific user details
        const tweetName = tweet.querySelector('div[data-testid="User-Name"] span')?.textContent || '';
        const tweetUsername = tweet.querySelector('div[data-testid="User-Name"] a')?.getAttribute('href')?.replace('/', '') || '';
        const tweetProfilePicUrl = tweet.querySelector('div[data-testid="Tweet-User-Avatar"] img')?.src || '';

        // Extract tweet ID
        const tweetLink = tweet.querySelector('a[href*="/status/"]');
        console.log(tweetLink,"tweetLinktweetLink");
        
        
        const tweetId = tweetLink ? tweetLink.href.match(/status\/(\d+)/)?.[1] || '' : '';
        console.log(tweetId,"tweetLinktweetLink");
        // Extract full tweet text (including spans and links)
        const tweetTextContainer = tweet.querySelector('div[data-testid="tweetText"]');
        const tweetText = tweetTextContainer 
            ? Array.from(tweetTextContainer.querySelectorAll('span, a'))
                .map((el:any) => el.textContent)
                .join(' ')
                .trim() 
            : '';
        
        // Extract media URLs
        const mediaUrls = extractMediaUrls(tweet);
        
        const tweetData = {
            username: tweetUsername,
            screen_name: tweetName,
            profilePicUrl: tweetProfilePicUrl,
            created_at: ""==safeGetAttribute('time', 'datetime', tweet)?null:safeGetAttribute('time', 'datetime', tweet),
            content: tweetText,
            tweet_id: tweetId,
            media_url: mediaUrls[0]?mediaUrls[0]:"https://example.com/image.jpg",
            like_count: Number(extractTweetMetrics(tweet).likes),
            reply_count:Number(extractTweetMetrics(tweet).retweets),
            view_count:Number(extractTweetMetrics(tweet).views),
            retweet_count: 10,
            user_id:Number(userId),
            isVerified: true,
            // "tweet_id": 1111,
            // "content": "Check out $eth and $TSLA stocks #Investing @friend1",
            // "retweet_count": 10,
            // "like_count": 50,
            // "reply_count": 5,
            // "view_count": 1000,
            // "retweeted_tweet": false,
            // "media_url": "https://example.com/image.jpg",
            // "created_at": "2024-12-10T10:00:00Z",
            // "retweet_user_id": null
            profile_image_url:profilePicUrl,
        profile_banner_url:bannerImageUrl,
        bio,
        // websiteUrl,
        joined:"2024-12-10T10:00:00Z",
        location,
        // profession,
        following_count:Number(following),
        followers_count:Number(followers),
        tweets_count:Number(totalTweets),
        
        is_blue_verified:isVerified,
        users_url:userUrl,
        };

        extractedTweets.push(tweetData);
    });

    // Compile and return all extracted data
    return extractedTweets;
}

// Function to run and display the extracted data
function displayXProfileData() {
    const profileData = extractXProfileData();
    console.log('X Profile Data:', profileData);
    return profileData;
}

// Run the function and display results
displayXProfileData();
