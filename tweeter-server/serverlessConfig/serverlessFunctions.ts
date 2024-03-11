import type { AWS } from "@serverless/typescript";

const withAuthorization = {
  authorizer: {
    name: "tokenValidate",
    resultTtlInSeconds: 2,
    identitySource: "method.request.header.Authorization",
    type: "token",
  },
};

const serverlessFunctions: AWS["functions"] = {
  testHandler: {
    handler: "src/Layers/Handlers/testHandler.handler",
    name: "testHandler",
    events: [
      {
        http: {
          method: "get",
          path: "test",
          ...withAuthorization,
        },
      },
    ],
  },
};

export default serverlessFunctions;
