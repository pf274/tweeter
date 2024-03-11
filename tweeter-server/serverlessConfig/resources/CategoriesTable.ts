import { awsTableResourceType } from "../../src/Types/awsResource";
const CategoriesTable: awsTableResourceType = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: `categories-${process.env.STAGE}`,
    AttributeDefinitions: [
      {
        AttributeName: "categoryId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "categoryId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
};

export default CategoriesTable;
