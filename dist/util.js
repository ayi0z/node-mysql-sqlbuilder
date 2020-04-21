"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CopFn = {
    gt: (x, y) => x > y,
    eq: (x, y) => x === y,
    lt: (x, y) => x < y
};
exports.PartInStrCountCheck = (exp, reg, count = 0, cop = 'eq') => {
    const pointMatch = exp.match(reg);
    return pointMatch ? CopFn[cop](pointMatch.length, count) : false;
};
exports.ShakeFieldName = (f) => {
    if (!f)
        throw new Error(`Field name can not be null / undifiend: ${f}`);
    const field = f.replace(/\s/g, '');
    if (!field)
        throw new Error(`Field name can not be whitespace: ${f}`);
    if (exports.PartInStrCountCheck(field, /\./g, 1, 'gt'))
        throw new Error(`Too much '.' in field name: ${f}`);
    if (new RegExp(/^\./).test(field))
        throw new Error(`Invalid table name of field name: ${f}`);
    return field;
};
exports.ShakeTableName = (f) => {
    if (!f)
        throw new Error(`Table name can not be null / undifiend: ${f}`);
    let [name, alias] = f.split(/ as /i);
    name = name?.replace(/\s/g, '');
    if (!name)
        throw new Error(`Table name can not be whitespace: ${f}`);
    alias = alias?.replace(/\s/g, '');
    if (exports.PartInStrCountCheck(name, /\./g, 0, 'gt'))
        throw new Error(`The charactor '.' should not exists in table name: ${f}`);
    return [name, alias];
};
