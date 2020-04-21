import { IFieldFn, SortType } from "../isqlbuilder";
export declare class Order implements IFieldFn {
    field: string;
    sort: SortType;
    constructor(f: string, s?: SortType);
    toSql(): string;
}
