export default interface IReq<Entity> {
  create?: (instance: Entity) => Promise<Entity>;
  fetch?: (id: string) => Promise<Entity>;
  fetchAll?: () => Promise<Entity[]>;
  update?: (id: string, update: Partial<Entity>) => Promise<Entity>;
  delete?: (id: string) => Promise<any>;
  [extraProps: string]: ((...param: any) => Promise<any>) | undefined;
}
