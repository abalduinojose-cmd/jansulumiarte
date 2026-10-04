import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

/* eslint-config-next 15 ainda é configuração "legada": entra pelo FlatCompat. */
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", ".next-pages/**", "out/**", "docs/**", "material/**", "next-env.d.ts"] },
];

export default eslintConfig;
