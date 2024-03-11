import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

module.exports.handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  const returnVal: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, World! This is a test!",
    }),
  };
  return returnVal;
};
