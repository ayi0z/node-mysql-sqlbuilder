"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const util_1 = require("../util");
class Table {
    constructor(tablename) {
        const [name, alias] = util_1.ShakeTableName(tablename);
        this.name = name;
        this.alias = alias;
    }
    toSql() {
        return this.alias && `${sqlstring_1.escapeId(this.name)} AS ${sqlstring_1.escapeId(this.alias)}` || sqlstring_1.escapeId(this.name);
    }
}
exports.Table = Table;
