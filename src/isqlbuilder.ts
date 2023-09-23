import {OperatorType, AorOperator} from './operator';

export type SortType = 'ASC' | 'DESC';
export type DistAllType = 'ALL' | 'DISTINCT';
export type JoinOnType = 'FULL' | 'LEFT' | 'RIGHT' | 'INNER';
export type IAggrType = 'COUNT' | 'SUM' | 'AVG' | 'MAX' | 'MIN';
type WhereFieldType = {[index: string]: string | number | OperatorType};
export type WhereArgType =
  | string
  | {[index in AorOperator]: WhereFieldType | WhereFieldType[]}
  | WhereFieldType;

export interface IFieldFn {
  toSql(): string | undefined | [string, string];
}
export interface IWhereOperator extends IFieldFn {
  cmd: OperatorType['operator'];
  field: string;
  value: OperatorType['item'];
}
export interface DataType {
  [index: string]: number | string | bigint;
}
export interface IAggr {
  fun: IAggrType;
  field: string;
  disAll: DistAllType;
  alias?: string;
}

export interface ISqlBuilder {
  table(opt: string): this;
  field(opt: string[] | string): this;
  where(opt: string | object): this;
  set(opt: string | object): this;
  order(opt: string, so: SortType): this;
  group(opt: string[]): this;
  having(opt: string | object): this;
  limit(begin: number, end?: number): this;

  count(opt: IAggr['field'], disAll: IAggr['disAll'], alias?: IAggr['alias']): this;
  sum(opt: IAggr['field'], disAll: IAggr['disAll'], alias?: IAggr['alias']): this;
  avg(opt: IAggr['field'], disAll: IAggr['disAll'], alias?: IAggr['alias']): this;
  max(opt: IAggr['field'], disAll: IAggr['disAll'], alias?: IAggr['alias']): this;
  min(opt: IAggr['field'], disAll: IAggr['disAll'], alias?: IAggr['alias']): this;

  union(opt: string | ISql): this;
  unionAll(opt: string | ISql): this;

  select(): string;
  update(): string;
  delete(): string;
  insert(): string | string[];

  Sql(): ISql;
}

export interface ISql {
  table: IFieldFn;
  fields?: IFieldFn[];
  where?: IFieldFn[];
  sets?: IFieldFn[];
  order?: IFieldFn[];
  group?: IFieldFn[];
  having?: IFieldFn[];
  limit?: IFieldFn;
  data?: IFieldFn[];
  join?: IJoin[];

  union?: IFieldFn[];
  unionAll?: IFieldFn[];

  SqlBuilder(): ISqlBuilder;
}

export interface IJoin extends IFieldFn {
  on(on: [string, string] | WhereArgType | ([string, string] | WhereArgType)[]): this;
  /**
   * 返回SqlBuilder
   */
  gon(): ISqlBuilder;
}
