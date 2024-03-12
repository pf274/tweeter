export interface TweeterRequest {
  queryParameters: { [key: string]: string };
  pathParameters: { [key: string]: string };
  body: any;
  method: string;
  endpoint: string;
}
