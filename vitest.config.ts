import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "miniflare",
    environmentOptions: {
      modules: true,
      bindings: [
        {
          CHANNELS: "ChannelsDO",
          CHANNEL: "ChannelDO",
        },
      ],
      scriptPath: "./dist/index.mjs",
    },
  },
});
