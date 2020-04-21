import { Table } from "./table";
import { ISqlBuilder, IJoin, JoinOnType, WhereArgType } from "../isqlbuilder";
import { Where } from "./where";
export declare class Join implements IJoin {
    cmd: JoinOnType;
    builder: ISqlBuilder;
    table: Table;
    ons?: ([string, string] | Where)[];
    constructor(t: Table, builder: ISqlBuilder, cmd?: JoinOnType);
    on(on: WhereArgType | [string, string]): this;
    gon(): ISqlBuilder;
    toSql(): string;
}
