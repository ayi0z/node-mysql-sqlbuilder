import { IFieldFn, IAggrFnType, DistAllType } from "../isqlbuilder";
export declare class AggrField implements IFieldFn {
    fun: IAggrFnType;
    field: string;
    disAll: DistAllType;
    alias?: string | undefined;
    constructor(fn: IAggrFnType, field: string, disAll?: DistAllType, alias?: string);
    toSql(): string;
}
export declare class Field implements IFieldFn {
    field: string | IFieldFn;
    constructor(f: string | IFieldFn);
    toSql(): string;
}
