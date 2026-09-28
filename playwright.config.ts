import { defineConfig, devices } from "@playwright/test";

// Roda contra o site BUILDADO (out/), não o next dev — é isso que a task 16
// pede: garantir que o export estático de verdade funciona, não só o modo
// de desenvolvimento (que tem coisas o export não tem, tipo hot-reload).
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run build && npx serve out -p 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
