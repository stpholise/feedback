import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import "@testing-library/jest-dom/vitest";
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals:true,
    environment: "jsdom",
    setupFiles: './test/setup.ts'
  },
});
