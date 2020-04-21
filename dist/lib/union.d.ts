import { IFieldFn, ISql } from "../isqlbuilder";
export declare class Union implements IFieldFn {
    union: string | ISql;
    constructor(u: string | ISql);
    toSql(): string;
}
