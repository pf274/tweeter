import { awsTableResourceType } from "../../src/Types/awsResource";
const VideosTable: awsTableResourceType = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: `videos-${process.env.STAGE}`,
    AttributeDefinitions: [
      {
        AttributeName: "videoId",
        AttributeType: "S",
      },
      {
        AttributeName: "userId",
        AttributeType: "S",
      },
      {
        AttributeName: "promptIds",
        AttributeType: "SS",
      },
      {
        AttributeName: "collectionIds",
        AttributeType: "SS",
      },
    ],
    KeySchema: [
      {
        AttributeName: "videoId",
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

export default VideosTable;
