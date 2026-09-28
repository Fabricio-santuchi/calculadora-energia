import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // e2e/ é do Playwright, não do Jest — frameworks diferentes, não misturam.
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/e2e/"],
};

export default createJestConfig(config);
