import { IFieldFn, WhereArgType } from '../isqlbuilder';
import { AorOperator } from '../operator';
export declare class Where implements IFieldFn {
    private aor;
    private item;
    constructor(_where: WhereArgType, aor?: AorOperator);
    private _load;
    private _loadStr;
    private _loadArr;
    private _loadObj;
    toSql(): string | undefined;
}
