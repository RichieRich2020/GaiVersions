import React, { useEffect } from "react";


// interface UserInfo {
//   name: string;
//   username: string;
//   profilePicUrl: string;
//   bannerImageUrl: string;
//   bio: string;
// }

const Accounts = () => {
  // useEffect(() => {
  //   const handleMessage = (message) => {
  //     if (message.type === "updateUserInfo") {
  //       const userInfo = message.userInfo ;
  //       updateUserInfo(userInfo);
  //     }
  //   };

  //   chrome.runtime.onMessage.addListener(handleMessage);

  //   // Initial listener to fetch user info if already cached
  //   chrome.runtime.sendMessage(
  //     { type: "GET_CURRENT_USER_INFO" },
  //     (response) => {
  //       if (response && response.userInfo) {
  //         updateUserInfo(response.userInfo);
  //       }
  //     }
  //   );

  //   return () => {
  //     chrome.runtime.onMessage.removeListener(handleMessage);
  //   };
  // }, []);

  // const updateUserInfo = (userInfo) => {
  //   const updateElementText = (
  //     id,
  //     text,
  //     defaultText
  //   ) => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.textContent = text || defaultText;
  //     }
  //   };

  //   const updateElementImage = (id, url) => {
  //     const imgElement = document.getElementById(id) ;
  //     if (imgElement) {
  //       if (url) {
  //         imgElement.src = url;
  //         imgElement.style.display = "block";
  //       } else {
  //         imgElement.src = "";
  //         imgElement.style.display = "none";
  //       }
  //     }
  //   };

  //   // Update text elements
  //   updateElementText("name", userInfo.name);
  //   updateElementText("username", userInfo.username);
  //   updateElementText("bio", userInfo.bio);

  //   // Update images
  //   updateElementImage("profilePic", userInfo.profilePicUrl);
  //   updateElementImage("bannerImage", userInfo.bannerImageUrl);
  // };

  // const clearUserInfo = () => {
  //   ["name", "username", "bio"].forEach((id) => {
  //     const element = document.getElementById(id);
  //     if (element) element.textContent = "";
  //   });

  //   ["profilePic", "bannerImage"].forEach((id) => {
  //     const imgElement = document.getElementById(id) ;
  //     if (imgElement) {
  //       imgElement.src = "";
  //       imgElement.style.display = "none";
  //     }
  //   });
  // };

  return (
    <div>
      {/* <div id="profile" className="profile-section">
        <img
          id="profilePic"
          className="profile-pic"
          src=""
          alt="Profile Picture"
          style={{ display: "none" }}
        />
        <h2 id="name" className="name"></h2>
        <p id="username" className="username"></p>
      </div>
      <div className="banner-image-container">
        <img
          id="bannerImage"
          className="banner-image"
          src=""
          alt="Banner Image"
          style={{ display: "none" }}
        />
      </div>
      <div id="user-info" className="user-info">
        <h3>Bio</h3>
        <p id="bio" className="bio"></p>
      </div> */}

      wdx
    </div>
  );
};

export default Accounts;
