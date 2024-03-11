import { awsPermissionStatement } from "src/Types/awsResource";

const usersTablePermissionStatement: awsPermissionStatement = {
  Effect: "Allow",
  Action: [
    "dynamodb:BatchGetItem",
    "dynamodb:BatchWriteItem",
    "dynamodb:DeleteItem",
    "dynamodb:GetItem",
    "dynamodb:PutItem",
    "dynamodb:Query",
    "dynamodb:Scan",
    "dynamodb:UpdateItem",
  ],
  Resource: `arn:aws:dynamodb:${process.env.REGION}:*:table/UsersTable-${process.env.ENVIRONMENT}`,
};

const serverlessExecutionRole: { statements: awsPermissionStatement[] } = {
  statements: [usersTablePermissionStatement],
};

export default serverlessExecutionRole;
