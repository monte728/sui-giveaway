import { useSuiClient } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { nameMapAtom } from "./atoms";

// display short and linkable
export function DisplayAddress({ address }: { address: string }) {
  const suiClient = useSuiClient();

  // const [displayAddressmap, setDisplayAddressmap] = useState<
  //   Record<string, string>
  // >({});
  // 為了避免重複讀取 改用nameMapAtom
  const [nameMap, setNameMap] = useAtom(nameMapAtom);

  useEffect(() => {
    if (nameMap[address]) return; // 如果這個地址已經查詢過，就不再重複查詢

    suiClient
      .resolveNameServiceNames({ address, format: "dot" })
      .then((names) => {
        console.log({ names });

        // 在nameMap上更新此address資訊
        if (names.data.length > 0) {
          setNameMap((prev) => ({
            ...prev,
            [address]: names.data[0],
          }));
        } else {
          setNameMap((prev) => ({
            ...prev,
            [address]: "None", // 提供 fallback 值 "None"，防止無限查詢
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address, nameMap, suiClient]);

  let display = nameMap[address] || "None";
  if (display == "None")
    display = address.slice(0, 5) + "..." + address.slice(-5);

  return (
    <a
      href={`https://devnet.suivision.xyz/account/${address}`}
      target="_blank"
      className="text-blue-500 hover:text-blue-300  hover:underline"
    >
      {display}
    </a>
  );
}
