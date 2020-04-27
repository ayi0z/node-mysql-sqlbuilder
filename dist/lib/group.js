"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const util_1 = require("../util");
class Group {
    constructor(f) {
        this.field = util_1.ShakeFieldName(f)[0];
    }
    toSql() {
        return sqlstring_1.escapeId(this.field);
    }
}
exports.Group = Group;
