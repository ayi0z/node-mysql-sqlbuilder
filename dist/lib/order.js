"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const util_1 = require("../util");
class Order {
    constructor(f, s = 'ASC') {
        this.field = util_1.ShakeFieldName(f);
        this.sort = s;
    }
    toSql() {
        return `${sqlstring_1.escapeId(this.field)} ${this.sort}`;
    }
}
exports.Order = Order;
