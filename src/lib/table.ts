import { IFieldFn } from "../isqlbuilder"
import { escapeId } from 'sqlstring'
import { ShakeTableName } from "../util"

export class Table implements IFieldFn {
    name: string
    alias?: string
    constructor(tablename: string) {
        const [name, alias] = ShakeTableName(tablename)
        this.name = name
        this.alias = alias
    }

    toSql(): string {
        return this.alias ? `${escapeId(this.name)} AS ${escapeId(this.alias)}` : escapeId(this.name)
    }
}