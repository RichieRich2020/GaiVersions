
// import { createAppKit } from "@reown/appkit/react";
// import { WagmiProvider } from "wagmi";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { projectId,
//   metadata,
//   networks,
//   wagmiAdapter,
//   solanaWeb3JsAdapter,} from "../config/config";



// const queryClient = new QueryClient();

// const generalConfig = {
//   projectId,
//   metadata,
//   networks,
// };

// // Create modal
// createAppKit({
//   adapters: [wagmiAdapter, solanaWeb3JsAdapter],
//   ...generalConfig,
// });

// export function SidePanel() {
//   return (
//     <div className="sidepanel">
//       <h1>Wallet Connector</h1>
//       <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//         <QueryClientProvider client={queryClient}>
//           <appkit-button />
//         </QueryClientProvider>
//       </WagmiProvider>
//     </div>
//   );
// }