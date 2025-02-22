// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Transaction } from "@mysten/sui/transactions";
import type { NextApiRequest, NextApiResponse } from "next";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { fromHex } from "@mysten/sui/utils";

type Body = {
  rawTxBytesHex: string;
  sender: string;
};

type Response = {
  txBytes: string;
  sponsorSignature: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { rawTxBytesHex, sender } = req.body as Body;
  if (!rawTxBytesHex) {
    throw new Error("rawTxBytesHex not found");
  }

  const sponsorKeypair = Ed25519Keypair.fromSecretKey(
    process.env.SPONSOR_PRIVATE_KEY || ""
  );
  const sponsorAddress = sponsorKeypair.getPublicKey().toSuiAddress();

  const suiClient = new SuiClient({
    url: getFullnodeUrl((process.env.NETWORK as any) || "devnet"),
  });

  // get gas object
  // const gasCoinId = process.env.GAS_COIN_ID;
  // if (!gasCoinId) {
  //   throw new Error("Missing GAS_COIN_ID in environment variables");
  // }
  // const gasObj = await suiClient.getObject({ id: gasCoinId });
  // if (!gasObj.data) {
  //   throw new Error(`Gas object ${gasCoinId} not found`);
  // }

  // 取得贊助商的錢包 Coin Data
  const coinData = await suiClient.getCoins({
    owner: sponsorAddress,
  });
  const coins = coinData.data;

  if (!coins) {
    throw new Error("Missing GAS");
  }
  const coin = coins[0];
  // Gas Payment 物件
  const payment = {
    digest: coin.digest,
    objectId: coin.coinObjectId,
    version: coin.version,
  };

  const rawTxBytes = fromHex(rawTxBytesHex);
  const tx = Transaction.fromKind(rawTxBytes); // get this transaction from the client
  tx.setSender(sender);
  tx.setGasBudget(1000000000);
  tx.setGasOwner(sponsorAddress);
  tx.setGasPayment([payment]);
  console.log({ sponsorAddress, sender, payment });

  const { signature: sponsorSignature, bytes: txBytes } = await tx.sign({
    client: suiClient,
    signer: sponsorKeypair,
  });
  res.status(200).json({ txBytes, sponsorSignature });

  // 贊助方補簽

  // const sponsorSignature = await sponsorKeypair.signTransaction(rawTxBytes);
  // res.status(200).json({ txBytes: rawTxBytesHex, sponsorSignature: toHex(sponsorSignature) });
}
