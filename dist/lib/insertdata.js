"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const index_1 = require("../index");
class InsertData {
    constructor(d) {
        this.data = d;
    }
    toSql() {
        var _a;
        let field, values;
        if (this.data instanceof index_1.Sql) {
            if ((_a = this.data.fields) === null || _a === void 0 ? void 0 : _a.length) {
                field = this.data.fields.map(f => f.toSql()).join(',');
                values = this.data.SqlBuilder().select();
            }
            else
                throw new Error('data is required');
        }
        else {
            const f = [], v = [];
            for (const k in this.data) {
                f.push(sqlstring_1.escapeId(k));
                v.push(sqlstring_1.escape(this.data[k]));
            }
            field = f.join(',');
            values = `VALUES(${v.join(',')})`;
        }
        if (field.trim() && values.trim())
            return [field, values];
        throw new Error('Invalid data');
    }
}
exports.InsertData = InsertData;
