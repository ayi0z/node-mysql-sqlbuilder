"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Limit {
    constructor(b, e) {
        this.begin = b;
        this.end = e;
    }
    toSql() {
        const b = ` LIMIT ${this.begin}`;
        return this.end === undefined ? b : `${b},${this.end}`;
    }
}
exports.Limit = Limit;
