import { IFieldFn, IAggrFnType, DistAllType } from "../isqlbuilder"
import { escapeId } from 'sqlstring'
import { ShakeFieldName } from '../util'

export class AggrField implements IFieldFn {
    fun: IAggrFnType
    field: string
    disAll: DistAllType
    alias?: string | undefined
    constructor(fn: IAggrFnType, field: string, disAll: DistAllType = 'ALL') {
        this.fun = fn
        this.disAll = disAll
        const [f, a] = ShakeFieldName(field)
        this.field = f
        this.alias = a
    }

    toSql(): string {
        const field = `${this.fun}(${this.disAll} ${escapeId(this.field)})`
        return this.alias && `${field} AS ${escapeId(this.alias)}` || field
    }

}

export class FnField implements IFieldFn {
    field: string
    alias?: string
    constructor(f: string, alias?: string) {
        this.field = f;
        this.alias = alias
    }
    toSql(): string {

        return this.alias && `${this.field} AS ${escapeId(this.alias)}` || this.field
    }
}

export class Field implements IFieldFn {
    field: string | IFieldFn
    constructor(f: string | IFieldFn) {
        this.field = f
    }

    toSql(): string {
        if (typeof this.field === 'string') {
            const [field, alias] = ShakeFieldName(this.field)
            return alias && `${escapeId(field)} AS ${escapeId(alias)}` || escapeId(field)
        } else {
            return this.field.toSql() as string
        }
    }
}