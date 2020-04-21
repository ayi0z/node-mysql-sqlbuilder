import { IFieldFn } from "../isqlbuilder";
export declare class Group implements IFieldFn {
    field: string;
    constructor(f: string);
    toSql(): string;
}
