// context/config.ts
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
} from "@reown/appkit/networks";

// Get projectId from .env file
export const projectId = "58e4962d6d464e2b7021d6f526b2a83f";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
] as [AppKitNetwork, ...AppKitNetwork[]];

// Set up metadata
export const metadata = {
  name: "Chrome Extension",
  description: "Chrome Extension with WalletConnect",
  url: "chrome-extension://", // This will be your extension's URL
  icons: ["icon.png"], // Use your extension's icon
};

// Set up the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: false, // Set to false for Chrome extension
  projectId,
  networks,
});



// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

export const config = wagmiAdapter.wagmiConfig;