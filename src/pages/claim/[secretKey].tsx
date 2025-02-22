// import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromHex, toHex } from "@mysten/sui/utils";
import {
  ConnectButton,
  useCurrentWallet,
  useSuiClient,
  useDisconnectWallet,
  // useSignAndExecuteTransaction,
  useSignTransaction,
} from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { Transaction } from "@mysten/sui/transactions";
import { withdrawGift } from "@/giveaway/giveaway/functions";
import { useRouter } from "next/router";
import axios from "axios";

export default function ClaimGift() {
  const currentWallet = useCurrentWallet();
  let address = currentWallet?.currentWallet?.accounts?.[0]?.address ?? "";
  const suiClient = useSuiClient();
  const { mutate: disconnnectWallet } = useDisconnectWallet();
  // const { mutateAsync: signAndExeTransaction } = useSignAndExecuteTransaction();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const router = useRouter();
  const { secretKey } = router.query; // 要與路由中的參數名稱一致

  const [isLoading, setIsLoading] = useState(true);
  const [isExist, setIsExist] = useState(false);

  //   public struct Gift<phantom T> has key, store {
  //     id: UID,
  //     public_key:vector<u8>,
  //     value: Balance<T>,
  // }
  // 紀錄Gift有的資訊
  // const [publicKey, setPublicKey] = useState<number[]>([]);
  const [giftValue, setGiftValue] = useState<number>(0);

  // get gift info, set public key and gift value
  useEffect(() => {
    if (!secretKey) return;
    const keypair = Ed25519Keypair.fromSecretKey(secretKey as string);
    const publicKey = keypair.getPublicKey();
    // setPublicKey(Array.from(publicKey.toRawBytes()));

    const getManager = async () => {
      try {
        const giftManager = await suiClient.getObject({
          id: process.env.NEXT_PUBLIC_GIFTMANAGER_ID || "",
          options: { showContent: true },
        });

        if (!giftManager) {
          donotExist();
          return;
        }
        const objectBagID = (giftManager.data as any).content?.fields?.gifts
          .fields.id.id;

        const objectBag = await suiClient.getDynamicFieldObject({
          parentId: objectBagID,
          name: {
            type: "vector<u8>",
            value: Array.from(publicKey.toRawBytes()),
          },
        });
        console.log({ objectBag });

        if (!objectBag) {
          donotExist();
          return;
        }
        const value = (objectBag.data as any).content?.fields?.value;
        setGiftValue(value / 10 ** 9);
        console.log({ giftManager, objectBagID, objectBag, value });
        setIsLoading(false);
        setIsExist(true);
      } catch (error) {
        console.log(error);
        donotExist();
        return;
      }
    }; // getManager()
    getManager();
  }, [secretKey, address, suiClient]);

  // claim button, withdrawGift
  const handleClaim = async () => {
    if (!address || !secretKey) return;

    const tx = new Transaction();

    const keypair = Ed25519Keypair.fromSecretKey(secretKey as string);
    const publicKey = keypair.getPublicKey();
    const messageBytes = fromHex(address);
    const userSignature = await keypair.sign(messageBytes);

    // const isValid = await publicKey.verify(messageBytes, userSignature);

    withdrawGift(tx, "0x2::sui::SUI", {
      giftManager: process.env.NEXT_PUBLIC_GIFTMANAGER_ID || "",
      address: address, // recipient
      vecU81: Array.from(publicKey.toRawBytes()), // public key
      vecU82: Array.from(userSignature), // signature
    });

    // 要送到後端的資料
    const txRawBytes = await tx.build({
      onlyTransactionKind: true,
      client: suiClient,
    });
    console.log({ rawTxBytesHex: toHex(txRawBytes) });

    // sponsor signature
    const { data } = await axios.post("/api/sponsor", {
      rawTxBytesHex: toHex(txRawBytes),
      sender: address,
    });
    console.log("Transaction data:", data);
    const { txBytes, sponsorSignature } = data;

    try {
      const resultSign = await signTransaction({
        transaction: txBytes,
      });

      let resultExcute = null;
      if (resultSign.signature != sponsorSignature) {
        resultExcute = suiClient.executeTransactionBlock({
          transactionBlock: txBytes,
          signature: [sponsorSignature, resultSign.signature],
          options: {
            showEffects: true,
            showEvents: true,
          },
        });
      } else {
        resultExcute = suiClient.executeTransactionBlock({
          transactionBlock: txBytes,
          signature: resultSign.signature,
          options: {
            showEffects: true,
            showEvents: true,
          },
        });
      }

      console.log({ resultExcute });
      alert("Gift claimed successful!");
    } catch (error: any) {
      alert("Transaction failed: " + error);
    }
    // signAndExeTransaction({
    //   transaction: tx,
    // })
    //   .then((result) => {
    //     console.log("Transaction result:", result);
    //     alert("Gift claimed successful!");
    //   })
    //   .catch((error) => {
    //     alert("Transaction failed: " + error.message);
    //   });

    donotExist();
    router.push("/"); // push back to Home
  }; // handleClaim()

  // disconnect button
  const handleDisconnect = () => {
    disconnnectWallet();
    address = "";
    setIsLoading(true);
  }; // handleDisconnect()

  const donotExist = () => {
    setIsExist(false);
    setIsLoading(false);
  }; // donotExist()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  } else if (!isExist) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="text-white text-xl">No gift available</div>
        </div>
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
        <div className="flex flex-col gap-4">
          <div className="text-white text-xl">GFT: {giftValue} SUI</div>
          <button
            onClick={handleClaim}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Claim Gift
          </button>
          <button
            onClick={() => handleDisconnect()}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
