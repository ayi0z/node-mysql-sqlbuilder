import { IFieldFn, IAggrFnType, DistAllType } from "../isqlbuilder"
import { escapeId } from 'sqlstring'

export class AggrField implements IFieldFn {
    fun: IAggrFnType
    field: string
    disAll: DistAllType
    alias?: string | undefined
    constructor(fn: IAggrFnType, field: string, disAll: DistAllType = 'ALL', alias?: string) {
        this.fun = fn
        this.field = field
        this.disAll = disAll
        this.alias = alias
    }

    toSql(): string {
        const field = `${this.fun}(${this.disAll} ${escapeId(this.field)})`
        return this.alias ? `${field} AS ${escapeId(this.alias)}` : field
    }

}

export class Field implements IFieldFn {
    field: string | IFieldFn
    constructor(f: string | IFieldFn) {
        this.field = f
    }

    toSql(): string {
        if (typeof this.field === 'string') {
            let [field, alias] = this.field.split(/ as /i)
            field = field?.trim()
            if (!field) throw new Error(`Invalid field name: ${this.field}.`)

            alias = alias?.trim()
            return alias ? `${escapeId(field)} AS ${escapeId(alias)}` : escapeId(field)
        } else {
            return this.field.toSql() as string
        }
    }
}