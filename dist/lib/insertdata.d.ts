import { IFieldFn, DataType, ISql } from "../isqlbuilder";
export declare class InsertData implements IFieldFn {
    data: DataType | ISql;
    constructor(d: DataType | ISql);
    toSql(): [string, string];
}
