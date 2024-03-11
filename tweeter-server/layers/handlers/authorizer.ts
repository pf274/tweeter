import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";

export const authorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {
    // TODO: Implement your authorization logic here

    // Example: Check if the request has a valid token
    const token = event.authorizationToken;
    if (!token) {
      throw new Error("Unauthorized");
    }

    // Example: Verify the token and extract user information
    const user = await verifyToken(token);

    // Example: Generate an IAM policy for the user
    const policy = generatePolicy(user.id, "Allow", event.methodArn);

    return policy;
  } catch (error) {
    console.error("Authorization error:", error);
    throw new Error("Unauthorized");
  }
};

const verifyToken = async (token: string): Promise<User> => {
  // TODO: Implement your token verification logic here

  // Example: Verify the token using a JWT library
  //   const decodedToken = jwt.verify(token, "your-secret-key");
  //   const userId = decodedToken.userId;

  //   // Example: Fetch user information from a database
  //   const user = await User.findById(userId);

  //   if (!user) {
  //     throw new Error("Invalid token");
  //   }

  //   return user;
  return {
    id: "test",
  };
};

const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
): APIGatewayAuthorizerResult => {
  // Example: Generate an IAM policy with the specified effect and resource
  const policy: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return policy;
};

interface User {
  id: string;
  // Add other user properties here
}
