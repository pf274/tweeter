import { ServiceError } from "../../../../utils/ServiceError";
import { DatabaseDAO } from "../interfaces/DatabaseDAO";
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class DynamoDBDAO implements DatabaseDAO {
  private tableName: string;
  private _client: DynamoDBDocumentClient | null = null;

  private get client(): DynamoDBDocumentClient {
    if (this._client === null) {
      const client = new DynamoDBClient({ region: "us-east-1" });
      this._client = DynamoDBDocumentClient.from(client);
    }
    return this._client;
  }
  public constructor(tableName: string) {
    this.tableName = tableName;
  }
  async save(attributeName: string, attributeValue: string, data: object): Promise<void> {
    try {
      const params: PutCommandInput = {
        TableName: this.tableName,
        Item: {
          ...data,
          [attributeName]: attributeValue,
        },
      };
      const command = new PutCommand(params);
      await this.client.send(command);
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error saving dynamodb item: ${(err as Error).message}`);
    }
  }
  async getMany(
    maxCount: number,
    firstItem?: string,
    attributeName?: string,
    attributeValue?: string,
    indexName?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }> {
    try {
      const params: QueryCommandInput = {
        TableName: this.tableName,
        Limit: maxCount,
        ExclusiveStartKey: firstItem ? {} : undefined,
      };
      if (attributeValue && attributeName) {
        if (indexName) {
          params.IndexName = indexName;
        }
        params.KeyConditionExpression = `${attributeName} = :value`;
        params.ExpressionAttributeValues = {
          ":value": attributeValue,
        };
      }
      if (firstItem && attributeName) {
        params.ExclusiveStartKey = {
          [attributeName]: firstItem,
        };
      }
      const command = new QueryCommand(params);
      const result = await this.client.send(command);
      const items = result.Items as object[];
      const lastItemReturned = result.LastEvaluatedKey as string | undefined;
      return { items, lastItemReturned };
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error querying dynamodb items: ${(err as Error).message}`);
    }
  }
  async delete(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<void> {
    try {
      const params: DeleteCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: attributeValue,
        },
      };
      if (secondaryAttributeName && secondaryAttributeValue) {
        params.Key![secondaryAttributeName] = secondaryAttributeValue;
      }
      const command = new DeleteCommand(params);
      await this.client.send(command);
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error deleting dynamodb item: ${(err as Error).message}`);
    }
  }
  async get(
    attributeName: string,
    attributeValue: string,
    secondaryAttributeName?: string,
    secondaryAttributeValue?: string
  ): Promise<object | null> {
    try {
      const params: GetCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: attributeValue,
        },
      };
      if (secondaryAttributeName && secondaryAttributeValue) {
        params.Key![secondaryAttributeName] = secondaryAttributeValue;
      }
      const command = new GetCommand(params);
      const results = await this.client.send(command);
      return results.Item ? (results.Item as object) : null;
    } catch (err) {
      console.error(err);
      if ((err as Error).name === "ResourceNotFoundException") return null;
      throw new ServiceError(500, `Error getting dynamodb item: ${(err as Error).message}`);
    }
  }
  async update(attributeName: string, attributeValue: string, data: object): Promise<object> {
    try {
      const params: UpdateCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: attributeValue,
        },
        UpdateExpression: "set #data = :data",
        ExpressionAttributeNames: {
          "#data": "data",
        },
        ExpressionAttributeValues: {
          ":data": data,
        },
      };
      const command = new UpdateCommand(params);
      const results = await this.client.send(command);
      return results.Attributes as object;
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error updating dynamodb item: ${(err as Error).message}`);
    }
  }
}

function getAttributeType(value: any): string {
  const dataType: string = typeof value;
  switch (dataType) {
    case "string":
      return "S";
    case "number":
      return "N";
    case "boolean":
      return "BOOL";
    case "object":
      return Array.isArray(value) ? "L" : "M";
    default:
      return "S";
  }
}

function convertObject(obj: object): object {
  const convertedData: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(obj)) {
    const dataType = getAttributeType(value);
    if (dataType === "M") {
      convertedData[key] = convertObject(value as object);
    } else if (dataType === "L") {
      convertedData[key] = convertArray(value as any[]);
    } else if (dataType === "N") {
      convertedData[key] = {
        N: JSON.stringify(value),
      };
    } else {
      convertedData[key] = {
        [dataType]: value,
      };
    }
  }
  return convertedData;
}

function convertArray(arr: any[]): any[] {
  const convertedData = [];
  for (const value of arr) {
    const dataType = getAttributeType(value);
    if (dataType === "M") {
      convertedData.push(convertObject(value as object));
    } else if (dataType === "L") {
      convertedData.push(convertArray(value as any[]));
    } else if (dataType === "N") {
      convertedData.push({
        N: JSON.stringify(value),
      });
    } else {
      convertedData.push({
        [dataType]: value,
      });
    }
  }
  return convertedData;
}
