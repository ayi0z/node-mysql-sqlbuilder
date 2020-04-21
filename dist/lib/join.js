"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const where_1 = require("./where");
class Join {
    constructor(t, builder, cmd = 'INNER') {
        this.table = t;
        this.builder = builder;
        this.cmd = cmd;
    }
    on(on) {
        this.ons = this.ons || [];
        if (Array.isArray(on))
            this.ons.push(on);
        else
            this.ons.push(new where_1.Where(on));
        return this;
    }
    gon() {
        if (this.builder)
            return this.builder;
        throw new Error('Must bind sql instance.');
    }
    toSql() {
        if (this.ons?.length) {
            return `${this.cmd} JOIN ${this.table.toSql()} ON ${this.ons.map(i => {
                return Array.isArray(i) ? `${sqlstring_1.escapeId(i[0])}=${sqlstring_1.escapeId(i[1])}` : i.toSql();
            }).join(' AND ')}`;
        }
        return `${this.cmd} JOIN ${this.table.toSql()}`;
    }
}
exports.Join = Join;
