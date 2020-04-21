import { IFieldFn, DataType } from "../isqlbuilder"
import { escapeId, escape } from 'sqlstring'

export class Set implements IFieldFn {
    field: string | DataType
    constructor(f: string | DataType) {
        this.field = f
    }
    toSql(): string {
        if (typeof this.field === 'string') return this.field

        const ks: string[] = []
        for (const k in this.field) {
            ks.push(`${escapeId(k)} = ${escape(this.field[k])}`)
        }
        return ks.join(',')
    }
}