import { awsTableResourceType } from "../../src/Types/awsResource";
const UsersTable: awsTableResourceType = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: `users-${process.env.STAGE}`,
    AttributeDefinitions: [
      {
        AttributeName: "userId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "userId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
};

export default UsersTable;
