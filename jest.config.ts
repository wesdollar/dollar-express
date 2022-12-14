import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  roots: ["src"],
  setupFiles: ["dotenv-flow/config"],
  testResultsProcessor: "jest-sonar-reporter",
};

export default config;
