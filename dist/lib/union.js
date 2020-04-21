"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Union {
    constructor(u) {
        this.union = u;
    }
    toSql() {
        return typeof this.union === 'string' ? this.union : this.union.SqlBuilder().select();
    }
}
exports.Union = Union;
