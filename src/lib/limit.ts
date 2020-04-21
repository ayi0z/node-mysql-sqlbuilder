import { IFieldFn } from "../isqlbuilder"

export class Limit implements IFieldFn {
    begin: number
    end?: number
    constructor(b: number, e?: number) {
        this.begin = b
        this.end = e
    }
    toSql(): string {
        const b = ` LIMIT ${this.begin}`
        return this.end === undefined ? b : `${b},${this.end}`
    }
}