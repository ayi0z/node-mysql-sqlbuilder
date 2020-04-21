"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
class AggrField {
    constructor(fn, field, disAll = 'ALL', alias) {
        this.fun = fn;
        this.field = field;
        this.disAll = disAll;
        this.alias = alias;
    }
    toSql() {
        const field = `${this.fun}(${this.disAll} ${sqlstring_1.escapeId(this.field)})`;
        return this.alias ? `${field} AS ${sqlstring_1.escapeId(this.alias)}` : field;
    }
}
exports.AggrField = AggrField;
class Field {
    constructor(f) {
        this.field = f;
    }
    toSql() {
        if (typeof this.field === 'string') {
            let [field, alias] = this.field.split(/ as /i);
            field = field === null || field === void 0 ? void 0 : field.trim();
            if (!field)
                throw new Error(`Invalid field name: ${this.field}.`);
            alias = alias === null || alias === void 0 ? void 0 : alias.trim();
            return alias ? `${sqlstring_1.escapeId(field)} AS ${sqlstring_1.escapeId(alias)}` : sqlstring_1.escapeId(field);
        }
        else {
            return this.field.toSql();
        }
    }
}
exports.Field = Field;
