import { IFieldFn } from "../isqlbuilder";
export declare class Table implements IFieldFn {
    name: string;
    alias?: string;
    constructor(tablename: string);
    toSql(): string;
}
