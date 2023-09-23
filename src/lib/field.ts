import {IFieldFn, IAggrType, DistAllType} from '../isqlbuilder';
import {escapeId} from 'sqlstring';
import {ShakeFieldName} from '../util';

export class AggrField implements IFieldFn {
  aggr: IAggrType;
  field: string;
  disAll: DistAllType;
  alias?: string | undefined;
  constructor(aggr: IAggrType, field: string, disAll: DistAllType = 'ALL') {
    this.aggr = aggr;
    this.disAll = disAll;
    const [f, a] = ShakeFieldName(field);
    this.field = f;
    this.alias = a;
  }

  toSql(): string {
    const field = `${this.aggr}(${this.disAll} ${escapeId(this.field)})`;
    return this.alias ? `${escapeId(field)} AS ${escapeId(this.alias)}` : escapeId(field);
  }
}

export class FnField implements IFieldFn {
  field: string;
  alias?: string;
  constructor(f: string, alias?: string) {
    this.field = f;
    this.alias = alias;
  }
  toSql(): string {
    return this.alias ? `${escapeId(this.field)} AS ${escapeId(this.alias)}` : this.field;
  }
}

export class Field implements IFieldFn {
  field: string | IFieldFn;
  constructor(f: string | IFieldFn) {
    this.field = f;
  }

  toSql(): string {
    if (typeof this.field === 'string') {
      const [field, alias] = ShakeFieldName(this.field);
      return alias ? `${escapeId(field)} AS ${escapeId(alias)}` : escapeId(field);
    } else {
      return this.field.toSql() as string;
    }
  }
}
