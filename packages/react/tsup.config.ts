import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  bundle: true,
  noExternal: ["@tiptap-block-kit/core"],
  external: ["react", "react-dom", "@tiptap/core", "@tiptap/react"],
});
