import { defineConfig } from "tsup";

export const createConfig = () => {
  return defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
  });
};
