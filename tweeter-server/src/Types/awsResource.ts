import { AwsResourceDependsOn } from "@serverless/typescript";

export type awsResourceType = {
  Type: string;
  Properties?: { [key: string]: any };
  CreationPolicy?: { [key: string]: any };
  DeletionPolicy?: string;
  DependsOn?: AwsResourceDependsOn;
  Metadata?: { [key: string]: any };
  UpdatePolicy?: {};
  UpdateReplacePolicy?: string;
  Condition?: string;
};

type awsTableAttribute = {
  AttributeName: string;
  AttributeType: string;
};

type awsTableKey = {
  AttributeName: string;
  KeyType: string;
};

type awsTableProperties = {
  TableName: string;
  AttributeDefinitions: awsTableAttribute[];
  KeySchema: awsTableKey[];
  ProvisionedThroughput: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
};

export type awsPermissionStatement = {
  Effect: "Allow" | "Deny";
  Action: string[];
  Resource: string;
};

export type awsTableResourceType = {
  Type: "AWS::DynamoDB::Table";
  Properties: awsTableProperties;
};

export type awsFunctionResourceType = {
  Type: "AWS::Lambda::Function";
  Properties: {
    Handler: string;
    Role: string;
    Code: string;
    Runtime: string;
    Environment?: {
      Variables: {
        [key: string]: string;
      };
    };
  };
};
