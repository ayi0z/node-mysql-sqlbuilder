import { IFieldFn, DataType } from "../isqlbuilder";
export declare class Set implements IFieldFn {
    field: string | DataType;
    constructor(f: string | DataType);
    toSql(): string;
}
