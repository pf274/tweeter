import { awsTableResourceType } from "../../src/Types/awsResource";
const PromptsTable: awsTableResourceType = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: `prompts-${process.env.STAGE}`,
    AttributeDefinitions: [
      {
        AttributeName: "promptId",
        AttributeType: "S",
      },
      {
        AttributeName: "collectionIds",
        AttributeType: "SS",
      },
    ],
    KeySchema: [
      {
        AttributeName: "promptId",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
};

export default PromptsTable;
