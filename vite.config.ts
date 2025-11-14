import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:4000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ""),
      },
      "/api/notes": {
        target: "http://localhost:3002/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/notes/, ""),
      },
    },
  },
});
