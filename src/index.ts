import { ISql, ISqlBuilder, SortType, DataType, DistAllType, IJoin, JoinOnType, WhereArgType } from "./isqlbuilder"
import {
    Table, Field, AggrField, Where, Set, Order,
    Group, Limit, Union, InsertData, Join
} from './lib'

export class Sql implements ISql {
    table!: Table
    fields?: Field[]
    where?: Where[]
    sets?: Set[]
    order?: Order[]
    group?: Group[]
    having?: Where[]
    limit?: Limit
    data?: InsertData[]
    join?: IJoin[]

    union?: Union[]
    unionAll?: Union[]

    private _sb: ISqlBuilder
    constructor(sb: ISqlBuilder) {
        this._sb = sb
    }

    SqlBuilder(): ISqlBuilder {
        return this._sb
    }
}

/**
 * SqlBuilder SQL语句构建器:  
 * 增 INSERT  
 * 删 SELECT  
 * 改 DELETE  
 * 查 UPDATE
 */
export class SqlBuilder implements ISqlBuilder {
    private _Sql: ISql
    /**
     * 
     * @param table 可选， 表名称，也可通过.table()设置
     */
    constructor(table?: string) {
        this._Sql = new Sql(this)
        if (table) this.table(table)
    }
    /**
     * 设置表名称 tablename
     * @param opt 表名称,
     * @example
     * eg. 'tablename'
     * eg. 'tablename as tablename_alias'
     */
    table(opt: string): this {
        this._Sql.table = new Table(opt)
        return this
    }
    /**
     * 设置查询字段
     * @param opt 查询字段, 多个字段用数组表示，字段别名用点表示
     * @example
     * eg. 'id'
     * eg. ['id','name']
     * eg. ['a.id','a.name']
     */
    field(opt: string | string[]): this {
        const fields = Array.isArray(opt) ? opt.map(i => new Field(i)) : [new Field(opt)]
        this._Sql.fields = this._Sql.fields?.concat(fields) || fields
        return this
    }
    /**
     * 聚合函数count
     * @param opt 聚合计算的查询字段名称
     * @param disAll 是否去重复： ALL(default) / DISTINCT
     * @param alias 聚合字段别名
     * @example
     * eg. ('id', 'DISTINCT', 'idcount') => COUNT(DISTINCT `id`) AS `idcount`
     */
    count(opt: string, disAll: DistAllType = 'ALL', alias?: string): this {
        const aggr: Field[] = [new Field(new AggrField('COUNT', opt, disAll, alias))]
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr
        return this
    }
    /**
     * 聚合函数sum
     * @param opt 聚合计算的查询字段名称
     * @param disAll 是否去重复： ALL(default) / DISTINCT
     * @param alias 聚合字段别名
     * @example
     * eg. ('id', 'DISTINCT', 'idsum') => SUM(DISTINCT `id`) AS `idsum`
     */
    sum(opt: string, disAll: DistAllType = 'ALL', alias?: string): this {
        const aggr: Field[] = [new Field(new AggrField('SUM', opt, disAll, alias))]
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr
        return this
    }
    /**
     * 聚合函数avg
     * @param opt 聚合计算的查询字段名称
     * @param disAll 是否去重复： ALL(default) / DISTINCT
     * @param alias 聚合字段别名
     * @example
     * eg. ('id', 'DISTINCT', 'idavg') => AVG(DISTINCT `id`) AS `idavg`
     */
    avg(opt: string, disAll: DistAllType = 'ALL', alias?: string): this {
        const aggr: Field[] = [new Field(new AggrField('AVG', opt, disAll, alias))]
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr
        return this
    }
    /**
     * 聚合函数max
     * @param opt 聚合计算的查询字段名称
     * @param disAll 是否去重复： ALL(default) / DISTINCT
     * @param alias 聚合字段别名
     * @example
     * eg. ('id', 'DISTINCT', 'maxid') => MAX(DISTINCT `id`) AS `maxid`
     */
    max(opt: string, disAll: DistAllType = 'ALL', alias?: string): this {
        const aggr: Field[] = [new Field(new AggrField('MAX', opt, disAll, alias))]
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr
        return this
    }
    /**
     * 聚合函数min
     * @param opt 聚合计算的查询字段名称
     * @param disAll 是否去重复： ALL(default) / DISTINCT
     * @param alias 聚合字段别名
     * @example
     * eg. ('id', 'DISTINCT', 'minid') => MIN(DISTINCT `id`) AS `minid`
     */
    min(opt: string, disAll: DistAllType, alias?: string): this {
        const aggr: Field[] = [new Field(new AggrField('MIN', opt, disAll, alias))]
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr
        return this
    }
    /**
     * 过滤条件where
     * @param opt where条件, 字符串(不带where关键字) 或 json
     * @example 
     * eg. "age>20 and gender='Male'"
     * eg. 
     */
    where(opt: string | object): this {
        if (opt) {
            this._Sql.where = this._Sql.where || []
            this._Sql.where.push(new Where(opt as WhereArgType))
        }
        return this
    }
    set(opt: string | DataType): this {
        this._Sql.sets = this._Sql.sets || []
        this._Sql.sets.push(new Set(opt))
        return this
    }
    data(opt: DataType | ISql | (DataType | ISql)[]): this {
        this._Sql.data = this._Sql.data || []
        const opts: (DataType | ISql)[] = Array.isArray(opt) ? opt : [opt]
        opts.forEach(o => {
            if (o) this._Sql.data?.push(new InsertData(o))
        })
        return this
    }
    order(opt: string, so: SortType = "ASC"): this {
        this._Sql.order = this._Sql.order || []
        this._Sql.order.push(new Order(opt, so))
        return this
    }
    group(opt: string | string[]): this {
        opt = typeof opt === 'string' ? opt.split(',').filter(i => i) : opt
        const groups: Group[] = opt.map(i => new Group(i))
        this._Sql.group = this._Sql.group?.concat(groups) || groups
        return this
    }
    having(opt: string | object): this {
        if (opt) {
            this._Sql.having = this._Sql.having || []
            this._Sql.having.push(new Where(opt as WhereArgType))
        }
        return this
    }
    limit(begin: number, end?: number): this {
        this._Sql.limit = new Limit(begin, end)
        return this
    }
    union(opt: string | ISql): this {
        this._Sql.union = this._Sql.union || []
        this._Sql.union.push(new Union(opt))
        return this
    }
    unionAll(opt: string | ISql): this {
        this._Sql.unionAll = this._Sql.unionAll || []
        this._Sql.unionAll.push(new Union(opt))
        return this
    }
    join(table: string, cmd: JoinOnType = 'INNER'): IJoin {
        this._Sql.join = []
        const join: IJoin = new Join(new Table(table), this, cmd)
        this._Sql.join.push(join)
        return join
    }

    /**
     * 创建sql => select
     */
    select(): string {
        return `SELECT ${this._fields()} FROM ${this._table()}${this._join()}${this._where()}${this._group()}${this._union()}${this._unionAll()}${this._order()}${this._limit()};`
    }
    /**
     * 创建sql => update
     */
    update(): string {
        return `UPDATE ${this._table()} SET ${this._sets()}${this._where()};`
    }
    /**
     * 创建sql => delete
     */
    delete(): string {
        return `DELETE FROM ${this._table()} ${this._where()};`
    }
    /**
     * 创建sql => insert
     */
    insert(): string | string[] {
        const ins: [string, string][] = this._data()
        if (ins.length === 1) return `INSERT INTO ${this._table()} (${ins[0][0]}) ${ins[0][1]};`
        else return ins.map(i => `INSERT INTO ${this._table()} (${i[0]}) ${i[1]};`)
    }

    private _table(): string {
        return this._Sql.table.toSql() as string
    }
    private _fields(): string {
        const fields: string[] | undefined = this._Sql.fields?.map(f => f.toSql() as string)
        if (fields?.length) return fields.join(',')
        throw new Error('fields is required')
    }
    private _sets(): string {
        const sets = this._Sql.sets?.map(s => s.toSql())
        if (sets?.length) return `${sets?.join(',')}`
        throw new Error('sets is required')
    }
    private _where(): string {
        if (this._Sql.where?.length) {
            return ` WHERE ${this._Sql.where.map(i => i.toSql()).filter(i => i).join(' AND ')}`
        }
        return ''
    }
    private _group(): string {
        let group: string | undefined
        if (this._Sql.group?.length) group = ` GROUP BY ${this._Sql.group.map(g => g.toSql()).join(', ')}`

        if (group) {
            if (this._Sql.having?.length)
                group = `${group} HAVING ${this._Sql.having.map(i => i.toSql()).join(' AND ')}`
            return group
        }

        return ''
    }
    private _order(): string {
        if (this._Sql.order?.length)
            return ` ORDER BY ${this._Sql.order.map(i => i.toSql()).join(', ')}`
        return ''
    }
    private _limit(): string {
        return this._Sql.limit ? this._Sql.limit.toSql() as string : ''
    }
    private _data(): [string, string][] {
        if (this._Sql.data?.length) {
            return this._Sql.data.map(d => d.toSql() as [string, string])
        }
        throw new Error('data is required')
    }
    private _union(): string {
        const ul = this._Sql.union?.map(i => i.toSql() as string)
        return ul ? ` UNION ${ul.join(' UNION ')}` : ''
    }
    private _unionAll(): string {
        const ul = this._Sql.unionAll?.map(i => i.toSql() as string)
        return ul ? ` UNION ALL ${ul.join(' UNION ALL ')}` : ''
    }
    private _join(): string {
        if (this._Sql.join?.length) {
            return ` ${this._Sql.join.map(i => i.toSql()).join(' ')}`
        }
        return ''
    }

    Sql(): ISql {
        return this._Sql
    }
}
