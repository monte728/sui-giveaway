import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl("devnet") },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider autoConnect={true}>
          <Component {...pageProps} />;
        </WalletProvider>
      </SuiClientProvider>
      {/* <ToastContainer aria-label="Notification messages" /> */}
    </QueryClientProvider>
  );
}
