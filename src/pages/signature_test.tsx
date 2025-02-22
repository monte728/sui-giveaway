import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromHex, toHex } from "@mysten/sui/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  useEffect(() => {
    console.log("hi");

    const run = async () => {
      const keypair = Ed25519Keypair.generate();
      const publicKey = keypair.getPublicKey();
      // const suiAddress = publicKey.toSuiAddress();
      const reciverAddress =
        "0x63d6a492864d84a1b8bc8391b3041041093cccc67434aaf0aecb32250c80630a";
      const messageBytes = fromHex(reciverAddress);
      const signature = await keypair.sign(messageBytes);

      const isValid = await publicKey.verify(messageBytes, signature);
      console.log({
        keypair,
        publicKey: toHex(publicKey.toRawBytes()),
        isValid,
        signature: toHex(signature),
      });
    };
    run();
  }, []);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      Hello
    </div>
  );
}
