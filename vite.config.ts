import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // Importe o plugin do Nitro

export default defineConfig({
  tanstackStart: {
    // Mantém o seu wrapper de erros SSR
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // Força o Nitro a buildar no formato da Vercel
      }),
    ],
  },
});