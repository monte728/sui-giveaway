import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // 'react/no-unescaped-entities': 'off',
      // '@next/next/no-page-custom-font': 'off',

      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }),

  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  // // ✅ 忽略 Sui SDK 產生的檔案
  // {
  //   ignores: [
  //     "src/_dependencies/**/*.ts",
  //     "src/_framework/**/*.ts",
  //     "src/giveaway/**/*.ts",
  //   ], // 根據你的 SDK 檔案路徑調整
  //   rules: {
  //     "@typescript-eslint/no-unused-vars": "warn",
  //     "@typescript-eslint/no-explicit-any": "off",
  //   },
  // },
];

export default eslintConfig;
