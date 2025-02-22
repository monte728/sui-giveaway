// import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// import { fromHex, toHex } from "@mysten/sui/utils";
import {
  ConnectButton,
  useCurrentWallet,
  useSuiClient,
  useDisconnectWallet,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { Transaction } from "@mysten/sui/transactions";
import { createGift } from "@/giveaway/giveaway/functions";
import { useRouter } from "next/router";
import { GiftEvents } from "../components/GiftEvents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const currentWallet = useCurrentWallet();
  let address = currentWallet?.currentWallet?.accounts?.[0].address;
  const suiClient = useSuiClient();
  const { mutate: disconnnectWallet } = useDisconnectWallet();
  const { mutateAsync: signAndExeTransaction } = useSignAndExecuteTransaction();
  const router = useRouter();

  const [suiBalance, setSuiBalance] = useState("0.00"); // show on the UI
  const [requiredSui, setRequiredSui] = useState(""); // user input
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // init user balance on display
    const fetchBalance = async () => {
      if (typeof address !== "string") {
        return;
      }
      const balance = await suiClient.getBalance({
        owner: address,
        coinType: "0x2::sui::SUI",
      });
      let blanceInSui = (Number(balance.totalBalance) / 1e9).toFixed(9);
      setSuiBalance(blanceInSui);
      setIsLoading(false);
    };
    fetchBalance();
  }, [address]);

  // submit button: send sui to create a gift, and redirect to the next page
  const handleSubmit = async () => {
    try {
      if (!address) {
        alert("Please connect your wallet");
        return;
      }

      // if user input is not a number or is less than 0, alert user
      if (!requiredSui || isNaN(Number(requiredSui))) {
        alert("Please enter a valid SUI amount");
        return;
      } else if (Number(requiredSui) <= 0) {
        alert("invalid SUI balance");
        return;
      } else if (Number(requiredSui) > Number(suiBalance)) {
        alert("Insufficient SUI balance");
        return;
      }

      const inputCoinMIST = Number(requiredSui) * 1e9;
      console.log("Processing transaction with amount:", inputCoinMIST, "MIST");

      const tx = new Transaction();
      const inputCoin = tx.splitCoins(tx.gas, [Number(requiredSui) * 1e9]);
      const keypair = Ed25519Keypair.generate(); // randomly generate a keypair for the gift
      const publicKey = keypair.getPublicKey();
      const secretKey = keypair.getSecretKey();

      // createGift( tx: Transaction, typeArg: string, args: CreateGiftArgs )
      // export interface CreateGiftArgs {
      //   giftManager: TransactionObjectInput;
      //   coin: TransactionObjectInput;
      //   vecU8: Array<number | TransactionArgument> | TransactionArgument;
      // }
      createGift(tx, "0x2::sui::SUI", {
        giftManager: process.env.NEXT_PUBLIC_GIFTMANAGER_ID || "", // get giftManger id from move building time
        coin: inputCoin,
        vecU8: Array.from(publicKey.toRawBytes()),
      });

      const result = await signAndExeTransaction({
        transaction: tx,
      });
      alert("Gift created successful!");
      console.log("Transaction result:", result);
      await suiClient.waitForTransaction({ digest: result.digest });

      router.push(`/claim/${secretKey}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed");
    }
  };

  // disconnect button
  const handleDisconnect = () => {
    disconnnectWallet();
    address = "";
    setSuiBalance("0.00");
    // setIsLoading(true);
  };

  //
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  } else if (
    // if not connected wallet, let user connect wallet
    !currentWallet.isConnected ||
    currentWallet.connectionStatus !== "connected"
  ) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 text-white text-2xl font-bold">
        On Devnet
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 flex items-center justify-between bg-gray-700 px-4 py-2 rounded-md">
          <button
            onClick={() => handleDisconnect()}
            className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500 focus:outline-none"
          >
            Disconnect
          </button>
          <span className="text-gray-300 text-sm font-medium truncate">
            {address}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(address || "");
              }}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            SUI Balance
          </label>
          <input
            type="text"
            value={`${suiBalance} SUI`}
            readOnly
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Required SUI Amount
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={requiredSui}
              onChange={(e) => setRequiredSui(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 text-gray-400">SUI</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

        <GiftEvents />
      </div>
    </div>
  );
}
