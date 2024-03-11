import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

module.exports.handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  const returnVal: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, World!",
    }),
  };
  return returnVal;
};
