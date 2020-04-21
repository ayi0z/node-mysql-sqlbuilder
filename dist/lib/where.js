"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const operator_1 = require("../operator");
class WhereComparison {
    constructor(f, v, c = '$eq') {
        this.field = f;
        this.cmd = c;
        this.value = v;
    }
    toSql() {
        return `${sqlstring_1.escapeId(this.field)} ${operator_1.OperatorCMD[this.cmd]} ${sqlstring_1.escape(this.value)}`;
    }
}
class WhereNin {
    constructor(f, v, c) {
        this.field = f;
        this.cmd = c;
        this.value = v;
    }
    toSql() {
        let sql = undefined;
        sql = Array.isArray(this.value)
            ? `${this.value.map(i => sqlstring_1.escape(i)).join(',')}`
            : this.value.select();
        return `${sqlstring_1.escapeId(this.field)} ${operator_1.OperatorCMD[this.cmd]} (${sql})`;
    }
}
class WhereLike {
    constructor(f, v, c = '$like') {
        this.field = f;
        this.cmd = c;
        this.value = v;
    }
    toSql() {
        return `${sqlstring_1.escapeId(this.field)} ${operator_1.OperatorCMD[this.cmd]} ${sqlstring_1.escape(this.value)}`;
    }
}
function OperatorBuilder(f, cmd, v) {
    if (operator_1.IsComparisonOperator(cmd)) {
        return new WhereComparison(f, v, cmd);
    }
    if (operator_1.IsNinOperator(cmd)) {
        return new WhereNin(f, v, cmd);
    }
    if (operator_1.IsLikeOperator(cmd)) {
        return new WhereLike(f, v, cmd);
    }
}
class WhereItem {
    constructor(f, opt, aor = '$and') {
        this.value = [];
        this.aor = aor;
        this.field = f;
        this._load(opt);
    }
    _load(opt) {
        if (typeof opt === 'string' || typeof opt === 'number') {
            this.value.push(OperatorBuilder(this.field, '$eq', opt));
        }
        else if (Array.isArray(opt)) {
            opt.forEach(o => this.value.push(new WhereItem(this.field, o)));
        }
        else {
            for (const key in opt) {
                if (operator_1.IsAndOrOperator(key))
                    this.value.push(new WhereItem(this.field, opt[key], key));
                else if (operator_1.IsOperatorType(key)) {
                    this.value.push(OperatorBuilder(this.field, key, opt[key]));
                }
                else
                    throw new Error(`Invalid arguments in whereitem near ${key}`);
            }
        }
    }
    toSql() {
        if (!this.field)
            return undefined;
        if (!this.value.length)
            return undefined;
        if (this.value.length === 1)
            return this.value[0].toSql();
        return `(${this.value
            .map(i => i.toSql())
            .filter(i => i)
            .join(` ${operator_1.OperatorCMD[this.aor]} `)})`;
    }
}
class Where {
    constructor(_where, aor = '$and') {
        this.aor = aor;
        this.item = this._load(_where);
    }
    _load(opt) {
        if (typeof opt === 'string')
            return this._loadStr(opt);
        else if (Array.isArray(opt))
            return this._loadArr(opt);
        else if (typeof opt === 'object')
            return this._loadObj(opt);
        else
            throw new Error('Type of arguments in Where must be string or json ');
    }
    _loadStr(opt) {
        return opt;
    }
    _loadArr(opt) {
        return opt.map(o => new Where(o));
    }
    _loadObj(opt) {
        const item = [];
        for (const key in opt) {
            if (operator_1.IsAndOrOperator(key))
                item.push(new Where(opt[key], key));
            else if (typeof key === 'string')
                item.push(new WhereItem(key, opt[key]));
            else
                throw new Error('Type of arguments in Where must be string or json ');
        }
        return item;
    }
    toSql() {
        if (typeof this.item === 'string')
            return `${this.item}`;
        if (!this.item.length)
            return undefined;
        const sql = [];
        for (const k of this.item) {
            const isql = k.toSql();
            if (isql)
                sql.push(isql);
        }
        return sql.length > 1
            ? `(${sql.join(` ${operator_1.OperatorCMD[this.aor]} `)})`
            : `${sql.join(` ${operator_1.OperatorCMD[this.aor]} `)}`;
    }
}
exports.Where = Where;
