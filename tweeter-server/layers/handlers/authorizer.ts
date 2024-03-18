import nJwt from "njwt";

type AuthResponseType = {
  principalId: string;
  policyDocument?: {
    Version: string;
    Statement: [
      {
        Action: string;
        Effect: string;
        Resource: string;
      }
    ];
  };
};

function generatePolicy(principalId: string, effect: "Allow" | "Deny") {
  const authResponse: AuthResponseType = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: "*",
        },
      ],
    },
  };
  return authResponse;
}

async function verifyToken(jwtToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    nJwt.verify(jwtToken, "mynameismikes", "HS256", (err, verifiedJwt) => {
      if (err) {
        console.error(`Error verifying token: ${err}`);
        reject(err);
      }
      console.log("Token verified");
      resolve(verifiedJwt);
      return undefined;
    });
  });
}

module.exports.verifyToken = async (event: any): Promise<any> => {
  console.log("Validating token");
  console.log(`Bearer Token: ${event.headers.Authorization}`);
  const jwtToken = event.headers.Authorization.split(" ")[1];
  console.log(`JWT Token: ${jwtToken}`);
  try {
    const verifiedToken = await verifyToken(jwtToken);
    return generatePolicy(verifiedToken.body.sub, "Allow");
  } catch (err) {
    console.error(`Error validating token: ${err}`);
    return generatePolicy("Jack Sparrow", "Deny");
  }
};
