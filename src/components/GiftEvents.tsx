import { phantom } from "@/_framework/reified";
import { WithdrawGiftEvent } from "@/giveaway/giveaway/structs";
import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { fromBase64 } from "@mysten/sui/utils";
import { useEffect, useState } from "react";
import { DisplayAddress } from "./DisplayAddress";

export function GiftEvents() {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const [events, setEvents] = useState<any[]>([]);
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const result = await suiClient.queryEvents({
        query: {
          MoveEventType: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::giveaway::WithdrawGiftEvent<0x2::sui::SUI>`,
        },
      });
      const events = result.data.map((event) => {
        return WithdrawGiftEvent.fromBcs(
          phantom(event.type.split("<")[1].split(">")[0]),
          fromBase64(event.bcs)
        );
      });

      setEvents(events);
    };
    getEvents().catch(console.error);
  }, [suiClient]);

  const filteredEvents =
    showOnlyMine && currentAccount
      ? events.filter((event) => event.recipient === currentAccount.address)
      : events;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium">
          Recent Transactions
        </h3>
        <label className="flex items-center space-x-2 text-gray-300 text-sm">
          <input
            type="checkbox"
            checked={showOnlyMine}
            onChange={(e) => setShowOnlyMine(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span>Only show gifts I received</span>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Receiver</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Coin Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((giftEvent, index) => {
              return (
                <tr
                  key={index}
                  className="bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2 font-mono text-xs truncate">
                    <DisplayAddress address={giftEvent.creator} />
                  </td>
                  <td className="px-4 py-2 font-mono text-xs truncate">
                    <DisplayAddress address={giftEvent.recipient} />
                  </td>
                  <td className="px-4 py-2">
                    {Number(giftEvent.value) / 10 ** 9}
                  </td>
                  <td className="px-4 py-2">
                    {giftEvent.$typeArgs[0].split("::")[2]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
