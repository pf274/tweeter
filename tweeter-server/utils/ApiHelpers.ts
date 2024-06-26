import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ApiRequestInfo, ApiRoute, methodType } from "../types/ApiRoutes";
import { ServiceError } from "./ServiceError";

export function getRequestInfo(event: APIGatewayProxyEvent): ApiRequestInfo {
  const queryParameters = event.queryStringParameters || {};
  const pathParameters = event.pathParameters || {};
  const body = event.body || "{}";
  return {
    queryParameters,
    pathParameters,
    body,
  };
}

export function basicApiHandler(
  handlerName: string,
  routes: ApiRoute[]
): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult> {
  return async (event: any, context: Context): Promise<APIGatewayProxyResult> => {
    // console.log(`Handler: ${handlerName}`);
    // console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    // console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const path = event.path;
    const method = event.httpMethod.toLowerCase() as methodType;
    const matchingRoute = routes.find((route) => route.matches(path, method));
    if (!matchingRoute) {
      console.log("Route not found");
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Route not found" }),
      };
    }
    try {
      const response = await matchingRoute.handle(event);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: response,
      };
    } catch (error) {
      if (error instanceof ServiceError) {
        console.log("Service error:", error);
        return {
          statusCode: error.statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ message: error.message }),
        };
      } else {
        console.error("Internal server error:", error);
        return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            message: `Internal server error: ${(error as Error).message}`,
          }),
        };
      }
    }
  };
}
