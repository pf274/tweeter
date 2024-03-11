import { awsTableResourceType } from "../../src/Types/awsResource";
const CollectionsTable: awsTableResourceType = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: `collections-${process.env.STAGE}`,
    AttributeDefinitions: [
      {
        AttributeName: "collectionId",
        AttributeType: "S",
      },
      {
        AttributeName: "userId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "collectionId",
        KeyType: "HASH",
      },
      {
        AttributeName: "userId",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
};

export default CollectionsTable;
