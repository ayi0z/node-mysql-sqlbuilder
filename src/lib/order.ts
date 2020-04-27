import { IFieldFn, SortType } from "../isqlbuilder"
import { escapeId } from 'sqlstring'
import { ShakeFieldName } from '../util'

export class Order implements IFieldFn {
    field: string
    sort: SortType

    constructor(f: string, s: SortType = 'ASC') {
        this.field = ShakeFieldName(f)[0]
        this.sort = s
    }

    toSql(): string {
        return `${escapeId(this.field)} ${this.sort}`
    }
}