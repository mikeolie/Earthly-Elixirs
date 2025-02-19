import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
dotenv.config();

// vite.config.ts

// https://vitejs.dev/config/
export default defineConfig({
  ...(process.env.NODE_ENV === "development"
    ? {
        define: {
          global: {},
        },
      }
    : {}),
  plugins: [react()],
});
