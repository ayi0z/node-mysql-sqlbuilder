import { ISqlBuilder, IFieldFn, IWhereOperator, WhereArgType } from '../isqlbuilder'
import { escape, escapeId } from 'sqlstring'

import {
    ComparisonOperator, NinOperator,
    LikeOperator, OperatorType, AorOperator,
    IsAndOrOperator, IsOperatorType, OperatorCMD,
    IsComparisonOperator, IsLikeOperator, IsNinOperator
} from '../operator'

class WhereComparison implements IWhereOperator {
    cmd: ComparisonOperator["operator"]
    value: ComparisonOperator["item"]
    field: string

    constructor(f: string, v: ComparisonOperator["item"], c: ComparisonOperator["operator"] = '$eq') {
        this.field = f
        this.cmd = c
        this.value = v
    }

    toSql(): string {
        return `${escapeId(this.field)} ${OperatorCMD[this.cmd]} ${escape(this.value)}`
    }
}

class WhereNin implements IWhereOperator {
    cmd: NinOperator["operator"]
    value: NinOperator["item"]
    field: string

    constructor(f: string, v: NinOperator["item"], c: NinOperator["operator"]) {
        this.field = f
        this.cmd = c
        this.value = v
    }

    toSql(): string {
        let sql: string | undefined = undefined
        sql = Array.isArray(this.value)
            ? `${this.value.map(i => escape(i)).join(',')}`
            : (this.value as ISqlBuilder).select()
        return `${escapeId(this.field)} ${OperatorCMD[this.cmd]} (${sql})`
    }
}

class WhereLike implements IWhereOperator {
    cmd: LikeOperator["operator"]
    value: LikeOperator["item"]
    field: string

    constructor(f: string, v: LikeOperator["item"], c: LikeOperator["operator"] = '$like') {
        this.field = f
        this.cmd = c
        this.value = v
    }

    toSql(): string {
        return `${escapeId(this.field)} ${OperatorCMD[this.cmd]} ${escape(this.value)}`
    }
}

function OperatorBuilder(f: string, cmd: OperatorType["operator"], v: OperatorType["item"]): IWhereOperator | undefined {
    if (IsComparisonOperator(cmd)) {
        return new WhereComparison(f, v as ComparisonOperator["item"], cmd)
    }
    if (IsNinOperator(cmd)) {
        return new WhereNin(f, v as NinOperator["item"], cmd)
    }
    if (IsLikeOperator(cmd)) {
        return new WhereLike(f, v as LikeOperator["item"], cmd)
    }
}
/**
 * @example
 * eg1:     {f0: 1}
 * eg2:     {f1: { '$gt':1, '$lt':10 }}
 * eg3:     { 
 *              f2: {
 *                  '$or':{
 *                      '$gt':1,
 *                      '$lt':10
 *                  },
 *               } 
 *          }
 */
type OptOperatorType = number | string | { [index in ComparisonOperator["operator"]]?: ComparisonOperator["item"] }
    | { [index in NinOperator["operator"]]?: NinOperator["item"] }
    | { [index in LikeOperator["operator"]]?: LikeOperator["item"] }
    | { [index in AorOperator]?: OptOperatorType | (OptOperatorType | string | number)[] }

class WhereItem implements IFieldFn {
    aor: AorOperator
    field: string
    value: (IWhereOperator | IFieldFn)[] = []

    constructor(f: string, opt: OptOperatorType, aor: AorOperator = '$and') {
        this.aor = aor
        this.field = f
        this._load(opt)
    }

    private _load(opt: any): void {
        if (typeof opt === 'string' || typeof opt === 'number') {
            this.value.push(OperatorBuilder(this.field, '$eq', opt) as IWhereOperator)
        } else if (Array.isArray(opt)) {
            opt.forEach(o => this.value.push(new WhereItem(this.field, o)))
        } else {
            for (const key in opt) {
                if (IsAndOrOperator(key)) this.value.push(new WhereItem(this.field, opt[key] as OptOperatorType, key))
                else if (IsOperatorType(key)) {
                    this.value.push(OperatorBuilder(this.field, key, opt[key]) as IWhereOperator)
                }
                else throw new Error(`Invalid arguments in whereitem near ${key}`)
            }
        }
    }

    toSql(): string | undefined {
        if (!this.field) return undefined

        if (!this.value.length) return undefined

        if (this.value.length === 1) return this.value[0].toSql() as string

        return `(${this.value
            .map(i => i.toSql())
            .filter(i => i)
            .join(` ${OperatorCMD[this.aor]} `)})`
    }
}

/**
 * @param opt string | object
 * @example
 * 例1: "a=1 AND b='abc'" => "(a=1 AND b='abc')"
 * 例2: {a:1, b:'abc'} => "(a = 1 AND b = 'abc')"
 * 例3: {
    '$and': { a: 1, b: 'abc' },
    '$or': {
        a: 2,
        b: 'xyz',
        e: {
            '$or': {
                '$in': [1, 2, 3],
                '$gt': 20
            },
            '$and': {
                '$eq': 1,
                '$lt': 30,
                '$or': {
                    '$lte': 50,
                    '$gte': 20
                }
            }
        }
    },
    d: { '$gt': 1, '$lt': 10 }
} => "((a = 1 AND b = 'abc') AND (a = 2 OR b = 'xyz' OR ((e IN ('1','2','3') OR e > 20) AND (e = 1 AND e < 30 AND (e <= 50 OR e >= 20)))) AND (d > 1 AND d < 10))"
 */
export class Where implements IFieldFn {
    private aor: AorOperator
    private item: string | (WhereItem | Where)[]

    constructor(_where: WhereArgType, aor: AorOperator = '$and') {
        this.aor = aor
        this.item = this._load(_where)
    }

    private _load(opt: any): string | (WhereItem | Where)[] {
        if (typeof opt === 'string') return this._loadStr(opt)
        else if (Array.isArray(opt)) return this._loadArr(opt)
        else if (typeof opt === 'object') return this._loadObj(opt)
        else throw new Error('Type of arguments in Where must be string or json ')
    }
    private _loadStr(opt: string): string {
        return opt
    }
    private _loadArr(opt: any[]): Where[] {
        return opt.map(o => new Where(o))
    }
    private _loadObj(opt: any): (Where | WhereItem)[] {
        const item: (Where | WhereItem)[] = []
        for (const key in opt) {
            if (IsAndOrOperator(key)) item.push(new Where(opt[key], key))
            else if (typeof key === 'string') item.push(new WhereItem(key, opt[key]))
            else throw new Error('Type of arguments in Where must be string or json ')
        }

        return item
    }

    toSql(): string | undefined {
        if (typeof this.item === 'string') return `${this.item}`

        if (!this.item.length) return undefined

        const sql: string[] = []
        for (const k of this.item) {
            const isql = k.toSql()
            if (isql) sql.push(isql)
        }

        return sql.length > 1
            ? `(${sql.join(` ${OperatorCMD[this.aor]} `)})`
            : `${sql.join(` ${OperatorCMD[this.aor]} `)}`
    }
}
