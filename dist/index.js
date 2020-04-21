"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
class Sql {
    constructor(sb) {
        this._sb = sb;
    }
    SqlBuilder() {
        return this._sb;
    }
}
exports.Sql = Sql;
class SqlBuilder {
    constructor(table) {
        this._Sql = new Sql(this);
        if (table)
            this.table(table);
    }
    table(opt) {
        this._Sql.table = new lib_1.Table(opt);
        return this;
    }
    field(opt) {
        const fields = Array.isArray(opt) ? opt.map(i => new lib_1.Field(i)) : [new lib_1.Field(opt)];
        this._Sql.fields = this._Sql.fields?.concat(fields) || fields;
        return this;
    }
    count(opt, disAll = 'ALL', alias) {
        const aggr = [new lib_1.Field(new lib_1.AggrField('COUNT', opt, disAll, alias))];
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr;
        return this;
    }
    sum(opt, disAll = 'ALL', alias) {
        const aggr = [new lib_1.Field(new lib_1.AggrField('SUM', opt, disAll, alias))];
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr;
        return this;
    }
    avg(opt, disAll = 'ALL', alias) {
        const aggr = [new lib_1.Field(new lib_1.AggrField('AVG', opt, disAll, alias))];
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr;
        return this;
    }
    max(opt, disAll = 'ALL', alias) {
        const aggr = [new lib_1.Field(new lib_1.AggrField('MAX', opt, disAll, alias))];
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr;
        return this;
    }
    min(opt, disAll, alias) {
        const aggr = [new lib_1.Field(new lib_1.AggrField('MIN', opt, disAll, alias))];
        this._Sql.fields = this._Sql.fields?.concat(aggr) || aggr;
        return this;
    }
    where(opt) {
        if (opt) {
            this._Sql.where = this._Sql.where || [];
            this._Sql.where.push(new lib_1.Where(opt));
        }
        return this;
    }
    set(opt) {
        this._Sql.sets = this._Sql.sets || [];
        this._Sql.sets.push(new lib_1.Set(opt));
        return this;
    }
    data(opt) {
        this._Sql.data = this._Sql.data || [];
        const opts = Array.isArray(opt) ? opt : [opt];
        opts.forEach(o => {
            if (o)
                this._Sql.data?.push(new lib_1.InsertData(o));
        });
        return this;
    }
    order(opt, so = "ASC") {
        this._Sql.order = this._Sql.order || [];
        this._Sql.order.push(new lib_1.Order(opt, so));
        return this;
    }
    group(opt) {
        opt = typeof opt === 'string' ? opt.split(',').filter(i => i) : opt;
        const groups = opt.map(i => new lib_1.Group(i));
        this._Sql.group = this._Sql.group?.concat(groups) || groups;
        return this;
    }
    having(opt) {
        if (opt) {
            this._Sql.having = this._Sql.having || [];
            this._Sql.having.push(new lib_1.Where(opt));
        }
        return this;
    }
    limit(begin, end) {
        this._Sql.limit = new lib_1.Limit(begin, end);
        return this;
    }
    union(opt) {
        this._Sql.union = this._Sql.union || [];
        this._Sql.union.push(new lib_1.Union(opt));
        return this;
    }
    unionAll(opt) {
        this._Sql.unionAll = this._Sql.unionAll || [];
        this._Sql.unionAll.push(new lib_1.Union(opt));
        return this;
    }
    join(table, cmd = 'INNER') {
        this._Sql.join = [];
        const join = new lib_1.Join(new lib_1.Table(table), this, cmd);
        this._Sql.join.push(join);
        return join;
    }
    select() {
        return `SELECT ${this._fields()} FROM ${this._table()}${this._join()}${this._where()}${this._group()}${this._union()}${this._unionAll()}${this._order()}${this._limit()};`;
    }
    update() {
        return `UPDATE ${this._table()} SET ${this._sets()}${this._where()};`;
    }
    delete() {
        return `DELETE FROM ${this._table()} ${this._where()};`;
    }
    insert() {
        const ins = this._data();
        if (ins.length === 1)
            return `INSERT INTO ${this._table()} (${ins[0][0]}) ${ins[0][1]};`;
        else
            return ins.map(i => `INSERT INTO ${this._table()} (${i[0]}) ${i[1]};`);
    }
    _table() {
        return this._Sql.table.toSql();
    }
    _fields() {
        const fields = this._Sql.fields?.map(f => f.toSql());
        if (fields?.length)
            return fields.join(',');
        throw new Error('fields is required');
    }
    _sets() {
        const sets = this._Sql.sets?.map(s => s.toSql());
        if (sets?.length)
            return `${sets?.join(',')}`;
        throw new Error('sets is required');
    }
    _where() {
        if (this._Sql.where?.length) {
            return ` WHERE ${this._Sql.where.map(i => i.toSql()).filter(i => i).join(' AND ')}`;
        }
        return '';
    }
    _group() {
        let group;
        if (this._Sql.group?.length)
            group = ` GROUP BY ${this._Sql.group.map(g => g.toSql()).join(', ')}`;
        if (group) {
            if (this._Sql.having?.length)
                group = `${group} HAVING ${this._Sql.having.map(i => i.toSql()).join(' AND ')}`;
            return group;
        }
        return '';
    }
    _order() {
        if (this._Sql.order?.length)
            return ` ORDER BY ${this._Sql.order.map(i => i.toSql()).join(', ')}`;
        return '';
    }
    _limit() {
        return this._Sql.limit ? this._Sql.limit.toSql() : '';
    }
    _data() {
        if (this._Sql.data?.length) {
            return this._Sql.data.map(d => d.toSql());
        }
        throw new Error('data is required');
    }
    _union() {
        const ul = this._Sql.union?.map(i => i.toSql());
        return ul ? ` UNION ${ul.join(' UNION ')}` : '';
    }
    _unionAll() {
        const ul = this._Sql.unionAll?.map(i => i.toSql());
        return ul ? ` UNION ALL ${ul.join(' UNION ALL ')}` : '';
    }
    _join() {
        if (this._Sql.join?.length) {
            return ` ${this._Sql.join.map(i => i.toSql()).join(' ')}`;
        }
        return '';
    }
    Sql() {
        return this._Sql;
    }
}
exports.default = SqlBuilder;
