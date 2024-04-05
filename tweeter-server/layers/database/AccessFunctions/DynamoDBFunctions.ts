import { ServiceError } from "../../../utils/ServiceError";
import { AbstractDatabaseFunctions, TableEntry, SaveEntry } from "./AbstractDatabaseFunctions";
import {
  BatchGetCommand,
  BatchGetCommandInput,
  BatchWriteCommand,
  BatchWriteCommandInput,
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class DynamoDBFunctions extends AbstractDatabaseFunctions {
  private _client: DynamoDBDocumentClient | null = null;

  private get client(): DynamoDBDocumentClient {
    if (this._client === null) {
      const client = new DynamoDBClient({ region: "us-east-1" });
      this._client = DynamoDBDocumentClient.from(client);
    }
    return this._client;
  }
  public constructor(tableName: string) {
    super(tableName);
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

  async getManySpecific(entries: TableEntry[]) {
    if (entries.length === 0) return [];
    try {
      const params: BatchGetCommandInput = {
        RequestItems: {
          [this.tableName]: {
            Keys: entries.map((entry) => {
              const returnVal = {
                [entry.attributeName]: entry.attributeValue,
              };
              if (entry.secondaryAttributeName && entry.secondaryAttributeValue) {
                returnVal[entry.secondaryAttributeName] = entry.secondaryAttributeValue;
              }
              return returnVal;
            }),
          },
        },
      };
      const command = new BatchGetCommand(params);
      const results = await this.client.send(command);
      return results.Responses![this.tableName] as object[];
    } catch (err) {
      console.error(err);
      throw new ServiceError(
        500,
        `Error getting many specific dynamodb items: ${(err as Error).message}`
      );
    }
  }

  async getMany(
    maxCount: number,
    firstItem?: object,
    attributeName?: string,
    attributeValue?: string,
    indexName?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }> {
    if (attributeName && attributeValue) {
      return this.doQuery(maxCount, attributeName, attributeValue, firstItem, indexName);
    } else {
      return this.doScan(maxCount, firstItem);
    }
  }

  async doQuery(
    maxCount: number,
    attributeName: string,
    attributeValue: string,
    firstItem?: object,
    indexName?: string
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }> {
    try {
      const params: QueryCommandInput = {
        TableName: this.tableName,
        Limit: maxCount,
        ExclusiveStartKey: firstItem ? firstItem : undefined,
        KeyConditionExpression: `${attributeName} = :value`,
        ExpressionAttributeValues: {
          ":value": attributeValue,
        },
      };
      if (indexName) {
        params.IndexName = indexName;
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

  async doScan(
    maxCount: number,
    firstItem?: object
  ): Promise<{ items: object[]; lastItemReturned: string | undefined }> {
    try {
      const params: ScanCommandInput = {
        TableName: this.tableName,
        Limit: maxCount,
        ExclusiveStartKey: firstItem ? firstItem : undefined,
      };
      const command = new ScanCommand(params);
      const result = await this.client.send(command);
      const items = result.Items as object[];
      const lastItemReturned = result.LastEvaluatedKey as string | undefined;
      return { items, lastItemReturned };
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error scanning dynamodb items: ${(err as Error).message}`);
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
    if (Object.keys(data).length === 0) {
      console.log("DynamoDB update warning: No data to update");
      return (await this.get(attributeName, attributeValue)) || {};
    }
    try {
      const params: UpdateCommandInput = {
        TableName: this.tableName,
        Key: {
          [attributeName]: attributeValue,
        },
        UpdateExpression: `SET `,
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        ReturnValues: "ALL_NEW",
      };

      params.UpdateExpression += Object.keys(data)
        .map((key) => `#${key} = :${key}`)
        .join(", ");
      for (const [key, value] of Object.entries(data)) {
        params.ExpressionAttributeNames![`#${key}`] = key;
        params.ExpressionAttributeValues![`:${key}`] = value;
      }
      const command = new UpdateCommand(params);
      const results = await this.client.send(command);
      return results.Attributes as object;
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error updating dynamodb item: ${(err as Error).message}`);
    }
  }

  async saveMany(data: SaveEntry[]) {
    try {
      const params: BatchWriteCommandInput = {
        RequestItems: {
          [this.tableName]: data.map((entry) => ({
            PutRequest: {
              Item: {
                ...entry.data,
                [entry.attributeName]: entry.attributeValue,
              },
            },
          })),
        },
      };
      const command = new BatchWriteCommand(params);
      await this.client.send(command);
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error saving dynamodb items: ${(err as Error).message}`);
    }
  }

  async deleteMany(data: TableEntry[]) {
    try {
      const params: BatchWriteCommandInput = {
        RequestItems: {
          [this.tableName]: data.map((entry) => {
            const returnVal = {
              DeleteRequest: {
                Key: {
                  [entry.attributeName]: entry.attributeValue,
                },
              },
            };
            if (entry.secondaryAttributeName && entry.secondaryAttributeValue) {
              returnVal.DeleteRequest!.Key[entry.secondaryAttributeName] =
                entry.secondaryAttributeValue;
            }
            return returnVal;
          }),
        },
      };
      const command = new BatchWriteCommand(params);
      await this.client.send(command);
    } catch (err) {
      console.error(err);
      throw new ServiceError(500, `Error deleting dynamodb items: ${(err as Error).message}`);
    }
  }
}
