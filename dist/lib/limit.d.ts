import { IFieldFn } from "../isqlbuilder";
export declare class Limit implements IFieldFn {
    begin: number;
    end?: number;
    constructor(b: number, e?: number);
    toSql(): string;
}
