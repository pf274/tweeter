import {
  AttributeValue,
  DeleteItemCommand,
  DeleteItemCommandInput,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { ServiceError } from "../../../../utils/ServiceError";
import { DatabaseDAO } from "../interfaces/DatabaseDAO";

export class DynamoDBDAO implements DatabaseDAO {
  private tableName: string;
  private _client: DynamoDBClient | null = null;

  private get client(): DynamoDBClient {
    if (this._client === null) {
      this._client = new DynamoDBClient({ region: "us-east-1" });
    }
    return this._client;
  }
  public constructor(tableName: string) {
    this.tableName = tableName;
  }
  async save(attributeName: string, attributeValue: string, data: object): Promise<void> {
    try {
      const params: PutItemCommandInput = {
        TableName: this.tableName,
        Item: {
          ...data,
          [attributeName]: { S: attributeValue },
        },
      };
      const command = new PutItemCommand(params);
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
    attributeValue?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }> {
    try {
      const params: QueryCommandInput = {
        TableName: this.tableName,
        Limit: maxCount,
        ExclusiveStartKey: firstItem ? {} : undefined,
      };
      if (attributeValue && attributeName) {
        params.KeyConditionExpression = `${attributeName} = :value`;
        params.ExpressionAttributeValues = {
          ":value": {
            S: attributeValue,
          },
        };
      }
      if (firstItem && attributeName) {
        params.ExclusiveStartKey = {
          [attributeName]: {
            S: firstItem,
          },
        };
      }
      const command = new QueryCommand(params);
      const result = await this.client.send(command);
      const items = result.Items as object[];
      const lastItemReturned = result.LastEvaluatedKey?.S as string | undefined;
      return { items, lastItemReturned };
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error querying dynamodb items: ${(err as Error).message}`);
    }
  }
  async delete(attributeName: string, attributeValue: string): Promise<void> {
    try {
      const params: DeleteItemCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: {
            S: attributeValue,
          },
        },
      };
      const command = new DeleteItemCommand(params);
      await this.client.send(command);
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error deleting dynamodb item: ${(err as Error).message}`);
    }
  }
  async get(attributeName: string, attributeValue: string): Promise<object> {
    try {
      const command = new GetItemCommand({
        TableName: this.tableName,
        Key: {
          [attributeName]: {
            S: attributeValue,
          },
        },
      });
      const results = await this.client.send(command);
      return results.Item as object;
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error getting dynamodb item: ${(err as Error).message}`);
    }
  }
  async update(attributeName: string, attributeValue: string, data: object): Promise<object> {
    try {
      const convertedData = convertObject(data);
      const params: UpdateItemCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: {
            S: attributeValue,
          },
        },
        UpdateExpression: "set #data = :data",
        ExpressionAttributeNames: {
          "#data": "data",
        },
        ExpressionAttributeValues: {
          ":data": convertedData as AttributeValue,
        },
      };
      const command = new UpdateItemCommand(params);
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
    } else {
      convertedData.push({
        [dataType]: value,
      });
    }
  }
  return convertedData;
}
