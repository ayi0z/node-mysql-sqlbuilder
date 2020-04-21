import { IFieldFn, DataType, ISql } from "../isqlbuilder"
import { escapeId, escape } from 'sqlstring'
import { Sql } from "../index"

export class InsertData implements IFieldFn {
    data: DataType | ISql

    constructor(d: DataType | ISql) {
        this.data = d
    }

    toSql(): [string, string] {
        let field: string, values: string
        if (this.data instanceof Sql) {
            if (this.data.fields?.length) {
                field = this.data.fields.map(f => f.toSql()).join(',')
                values = this.data.SqlBuilder().select()
            } else throw new Error('data is required')
        } else {
            const f: string[] = [],
                v: (string | number | bigint)[] = []
            for (const k in this.data) {
                f.push(escapeId(k))
                v.push(escape((this.data as DataType)[k]))
            }
            field = f.join(',')
            values = `VALUES (${f.join(',')})`
        }
        if (field.trim() && values.trim()) return [field, values]
        throw new Error('Invalid data')
    }
}