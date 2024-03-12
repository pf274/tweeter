import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from "aws-lambda";

module.exports.handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log("Validating token");
  console.log(event.authorizationToken);
  // TODO: validate token
  const result: APIGatewayAuthorizerResult = {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: event.methodArn,
        },
      ],
    },
    context: {
      test: "test",
    },
    usageIdentifierKey: "usageIdentifierKey",
  };
  return result;
};
