"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
exports.toBeTest = (c, be, ...opt) => {
    test(`'${opt}' => '${be}'`, () => {
        expect(new c(...opt).toSql()).toBe(be);
    });
};
exports.throwTest = (c, ...opt) => {
    test(`'${opt}' => throws error`, () => {
        assert.throws(() => new c(...opt).toSql());
    });
};
