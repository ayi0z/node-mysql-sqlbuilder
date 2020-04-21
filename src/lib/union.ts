import { IFieldFn, ISql } from "../isqlbuilder"

export class Union implements IFieldFn {
    union: string | ISql
    constructor(u: string | ISql) {
        this.union = u
    }

    toSql(): string {
        return typeof this.union === 'string' ? this.union : this.union.SqlBuilder().select()
    }
}