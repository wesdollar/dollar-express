import express from "express";
import cors from "cors";
import { staticFilesDirectory } from "./constants/static-files-directory";
import * as Routes from "./routes";
import path from "path";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import { redactedKeys } from "./constants/redacted-keys";
import * as dotenvFlow from "dotenv-flow";

const app = express();

dotenvFlow.config({
  silent: true,
});

app.disable("x-powered-by");

Bugsnag.start({
  apiKey: "3b87d7bfefd2537cf520427bbdd4e271",
  plugins: [BugsnagPluginExpress],
  enabledReleaseStages: ["prod", "staging"],
  releaseStage: process.env.ENV,
  appVersion: "1.0.0",
  logger: null,
  redactedKeys,
});

const bugsnagMiddleware = Bugsnag.getPlugin("express");

// This must be the first piece of middleware in the stack.
// It can only capture errors in downstream middleware
// @ts-ignore ts is stupid sometimes
app.use(bugsnagMiddleware.requestHandler);

const router = express.Router();
const port = process.env.PORT || "34567";
const urlBase = process.env.APP_URL_BASE || "";

/** middleware */
app.use(express.json({ limit: "10mb" }));

/**
 * allow cors for all routes
 * http://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors());

/** routes */
app.use(`/${urlBase}`, Routes.routes());

/** instantiate router */
app.use("/", router);
app.use(
  `/${urlBase}/public`,
  express.static(path.join(__dirname, `/${staticFilesDirectory}`))
);

// @ts-ignore quit being dumb, ts
app.use(bugsnagMiddleware.errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`service listening at http://localhost:${port}/${urlBase}/`);
});
