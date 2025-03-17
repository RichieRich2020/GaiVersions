// import React, { useEffect, useState } from "react";
// import "./sidePanel.css";

// interface UserInfo {
//   username: string;
//   profile_image_url: string;
// }

// interface CoinInfo {
//   name: string;
//   price: number;
//   volume_24hr: number;
//   market_cap: number;
//   tags: string[];
// }

// interface Cashtag {
//   cashtag: string;
//   coin_info: CoinInfo;
// }

// const Cashtags: React.FC = () => {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [cashtags, setCashtags] = useState<Cashtag[]>([]);

//   useEffect(() => {
//     // Message listener to handle new incoming messages
//     const handleMessage = (message: any) => {
//       console.log("New message received:", message); // Debugging incoming message
//       if (message.type === "updateUserdata") {
//         const { userInfo, cashtagData } = message;
//         console.log(userInfo, "User Info");
//         console.log(cashtagData, "Cashtag Data");
//         updateUserInfo(userInfo.user);
//         updateCashtags(cashtagData);
//       }
//     };

//     chrome.runtime.onMessage.addListener(handleMessage);

//     // Initial fetch for cached data
//     chrome.runtime.sendMessage({ type: "GET_CURRENT_USER_INFO" }, (response) => {
//       console.log("Initial fetch response:", response); // Debugging initial fetch
//       if (response) {
//         const { userInfo, cashtagData } = response;
//         if (userInfo) updateUserInfo(userInfo);
//         if (cashtagData) updateCashtags(cashtagData);
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       chrome.runtime.onMessage.removeListener(handleMessage);
//     };
//   }, []);

//   // Function to update user information
//   const updateUserInfo = (userInfo: UserInfo) => {
//     console.log("Updating user info:", userInfo); // Debugging state update
//     setUser({ ...userInfo }); // Ensuring a new object to trigger re-render
//   };

//   // Function to update cashtag data
//   const updateCashtags = (cashtagData: Cashtag[]) => {
//     console.log("Updating cashtags:", cashtagData); // Debugging state update
//     setCashtags([...cashtagData]); // Ensuring a new array to trigger re-render
//   };

//   return (
//     <div className="side-panel">
//       {/* User Info Section */}
//       <div className="profile-section">
//         {user && (
//           <>
//             <img
//               className="profile-pic"
//               src={user.profile_image_url}
//               alt={user.username || "User Avatar"}
//             />
//             <p className="username">{user.username}</p>
//           </>
//         )}
//       </div>

//       {/* Cashtags Section */}
//       <div className="cashtags-section">
//         <h3>Cashtags</h3>
//         <ul>
//           {cashtags.map((tag, index) => (
//             <li key={index} className="cashtag-item">
//               <h4>{tag.cashtag}</h4>
//               <p>
//                 <strong>Name:</strong> {tag.coin_info.name}
//               </p>
//               <p>
//                 <strong>Price:</strong> ${tag.coin_info.price.toFixed(6)}
//               </p>
//               <p>
//                 <strong>24h Volume:</strong>{" "}
//                 ${tag.coin_info.volume_24hr.toLocaleString()}
//               </p>
//               <p>
//                 <strong>Market Cap:</strong>{" "}
//                 {tag.coin_info.market_cap > 0
//                   ? `$${tag.coin_info.market_cap.toLocaleString()}`
//                   : "N/A"}
//               </p>
//               <p>
//                 <strong>Tags:</strong> {tag.coin_info.tags.join(", ")}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Cashtags;
