import { Table } from "./table";
import { ISqlBuilder, IJoin, JoinOnType, WhereArgType } from "../isqlbuilder"
import { escapeId } from 'sqlstring'
import { Where } from "./where";

export class Join implements IJoin {
    cmd: JoinOnType
    builder: ISqlBuilder
    table: Table
    ons?: ([string, string] | Where)[]
    constructor(t: Table, builder: ISqlBuilder, cmd: JoinOnType = 'INNER') {
        this.table = t
        this.builder = builder
        this.cmd = cmd
    }

    on(on: WhereArgType | [string, string]): this {
        this.ons = this.ons || []
        if (Array.isArray(on)) this.ons.push(on as [string, string])
        else this.ons.push(new Where(on))

        return this
    }

    gon(): ISqlBuilder {
        if (this.builder) return this.builder
        throw new Error('Must bind sql instance.')
    }

    toSql(): string {
        if (this.ons?.length) {
            return `${this.cmd} JOIN ${this.table.toSql()} ON ${this.ons.map(i => {
                return Array.isArray(i) ? `${escapeId(i[0])}=${escapeId(i[1])}` : i.toSql()
            }).join(' AND ')}`
        }
        return `${this.cmd} JOIN ${this.table.toSql()}`
    }
}