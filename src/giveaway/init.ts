import * as giveaway from "./giveaway/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(giveaway.Gift);
loader.register(giveaway.CreateGiftEvent);
loader.register(giveaway.WithdrawGiftEvent);
loader.register(giveaway.GiftManager);
 }
