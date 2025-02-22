import * as package_onchain_1 from "../_dependencies/onchain/0x1/init";
import * as package_onchain_2 from "../_dependencies/onchain/0x2/init";
import * as package_onchain_8f5e249bd205043f7c87b2ada71edfca91ff0b25e7f0ebd2b22abe85be1330d4 from "../giveaway/init";
import {StructClassLoader} from "./loader";

function registerClassesOnchain(loader: StructClassLoader) { package_onchain_1.registerClasses(loader);
package_onchain_2.registerClasses(loader);
package_onchain_8f5e249bd205043f7c87b2ada71edfca91ff0b25e7f0ebd2b22abe85be1330d4.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesOnchain(loader); }
