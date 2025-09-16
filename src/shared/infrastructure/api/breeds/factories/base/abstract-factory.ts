export interface AbstractFactory<T> {
  createFromResponse(data: any): T;
  createManyFromResponse(data: any[]): T[];
}
