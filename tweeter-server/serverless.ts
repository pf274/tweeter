import type { AWS } from "@serverless/typescript";
import serverlessExecutionRole from "./serverlessConfig/serverlessExecutionRole";
import serverlessResources from "./serverlessConfig/serverlessResources";
import serverlessFunctions from "./serverlessConfig/serverlessFunctions";

const isDeploying = process.argv.includes("deploy");

if (isDeploying) {
  require("dotenv").config({ path: `./.env` });
}
const validRegions = ["us-east-1", "us-west-2"];
const validStages = ["development", "staging", "production"];
if (!process.env.REGION) {
  console.log("Region failed to load.");
  process.exit(1);
} else if (!validRegions.includes(process.env.REGION)) {
  console.log("Region invalid.");
  process.exit(1);
} else if (!process.env.STAGE) {
  console.log("Stage failed to load.");
  process.exit(1);
} else if (!validStages.includes(process.env.STAGE)) {
  console.log("Stage invalid.");
  process.exit(1);
} else {
  console.log("Region and environment loaded successfully.");
  if (isDeploying) {
    console.log("Deploying to", process.env.REGION, process.env.STAGE);
  }
}

const serverlessConfiguration: AWS = {
  service: "tweeter-backend",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dotenv-plugin",
    "serverless-prune-plugin",
    "serverless-dynamodb-local",
  ],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: process.env.STAGE as AWS["provider"]["stage"],
    region: process.env.REGION as AWS["provider"]["region"],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      NODE_ENV: process.env.STAGE,
    },
    iam: {
      deploymentRole: "arn:aws:iam::<your-account-id>:role/<your-role-name>",
      role: serverlessExecutionRole,
    },
    timeout: undefined,
  },
  package: { individually: true, excludeDevDependencies: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    prune: {
      automatic: true,
      number: 3,
    },
  },
  functions: {
    ...serverlessFunctions, // api routes
    tokenValidate: {
      // authorization
      handler: "src/Layers/Handlers/authHandler.validate",
      name: "tokenValidate",
    },
  },
  resources: serverlessResources,
};
console.log("serverlessConfiguration", serverlessConfiguration);
module.exports = serverlessConfiguration;
