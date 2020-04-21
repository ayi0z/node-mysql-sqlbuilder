"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
class Set {
    constructor(f) {
        this.field = f;
    }
    toSql() {
        if (typeof this.field === 'string')
            return this.field;
        const ks = [];
        for (const k in this.field) {
            ks.push(`${sqlstring_1.escapeId(k)} = ${sqlstring_1.escape(this.field[k])}`);
        }
        return ks.join(',');
    }
}
exports.Set = Set;
