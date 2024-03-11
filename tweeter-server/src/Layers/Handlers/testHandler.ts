import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";

export const handler = middyfy(
  async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Running handler 'testHandler'`);
    console.log("Request:", event);
    console.log("Context:", context);

    const returnVal: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
    console.log("Response:", returnVal);
    return returnVal;
  }
);

export default handler;
