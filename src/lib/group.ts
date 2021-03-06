import { IFieldFn } from "../isqlbuilder"
import { escapeId } from 'sqlstring'
import { ShakeFieldName } from "../util"

export class Group implements IFieldFn {
    field: string
    constructor(f: string) {
        this.field = ShakeFieldName(f)[0]
    }

    toSql(): string {
        return escapeId(this.field)
    }
}