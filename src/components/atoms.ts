// 為了在不同component去管理 避免重複讀取

import { atom, useAtom } from "jotai";
export const nameMapAtom = atom<Record<string, string>>({});
