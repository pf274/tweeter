export abstract class AbstractStorageFunctions {
  abstract save(data: Buffer, contentType: string, fileName: string): Promise<string>;
}
