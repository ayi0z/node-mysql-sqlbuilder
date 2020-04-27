"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const util_1 = require("../util");
class AggrField {
    constructor(fn, field, disAll = 'ALL') {
        this.fun = fn;
        this.disAll = disAll;
        const [f, a] = util_1.ShakeFieldName(field);
        this.field = f;
        this.alias = a;
    }
    toSql() {
        const field = `${this.fun}(${this.disAll} ${sqlstring_1.escapeId(this.field)})`;
        return this.alias && `${field} AS ${sqlstring_1.escapeId(this.alias)}` || field;
    }
}
exports.AggrField = AggrField;
class FnField {
    constructor(f, alias) {
        this.field = f;
        this.alias = alias;
    }
    toSql() {
        return this.alias && `${this.field} AS ${sqlstring_1.escapeId(this.alias)}` || this.field;
    }
}
exports.FnField = FnField;
class Field {
    constructor(f) {
        this.field = f;
    }
    toSql() {
        if (typeof this.field === 'string') {
            const [field, alias] = util_1.ShakeFieldName(this.field);
            return alias && `${sqlstring_1.escapeId(field)} AS ${sqlstring_1.escapeId(alias)}` || sqlstring_1.escapeId(field);
        }
        else {
            return this.field.toSql();
        }
    }
}
exports.Field = Field;
