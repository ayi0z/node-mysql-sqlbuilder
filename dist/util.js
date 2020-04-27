"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CopFn = {
    gt: (x, y) => x > y,
    eq: (x, y) => x === y,
    lt: (x, y) => x < y
};
exports.PartInStrCountCheck = (exp, reg, count = 0, cop = 'eq') => {
    const pointMatch = exp.match(reg);
    return !!(pointMatch && CopFn[cop](pointMatch.length, count));
};
exports.ShakeFieldName = (f) => {
    if (!f)
        throw new Error(`Field name can not be null / undifiend: ${f}`);
    if (exports.PartInStrCountCheck(f, /\./g, 1, 'gt'))
        throw new Error(`Too much '.' in field name: '${f}'`);
    if (exports.PartInStrCountCheck(f, / as /ig, 1, 'gt'))
        throw new Error(`Too much key word 'as' in field name: '${f}'`);
    let [name, alias] = f.split(/ as /i);
    if (!(name === null || name === void 0 ? void 0 : name.replace(/\s/g, '')))
        throw new Error(`Field name can not be whitespace: '${f}'`);
    name = name.trim();
    if (exports.PartInStrCountCheck(name, /\s/g, 0, 'gt'))
        throw new Error(`Field name can not inclouds whitespace: '${f}'`);
    if (/^\./.test(name))
        throw new Error(`Invalid table name of field name: '${f}'`);
    if (exports.PartInStrCountCheck(f, / as /ig, 1, 'eq')) {
        if (alias === null || alias === void 0 ? void 0 : alias.replace(/\s/g, '')) {
            alias = alias.trim();
            if (exports.PartInStrCountCheck(alias, /\s|\./g, 0, 'gt'))
                throw new Error(`Field name alias can not inclouds whitespace and '.': '${f}'`);
        }
        else {
            throw new Error(`Field name alias losts in '${f}'`);
        }
    }
    return [name, alias];
};
exports.ShakeTableName = (f) => {
    if (!f)
        throw new Error(`Table name can not be null / undifiend: '${f}'`);
    if (exports.PartInStrCountCheck(f, /\./g, 0, 'gt'))
        throw new Error(`The charactor '.' should not exists in table name: '${f}'`);
    if (exports.PartInStrCountCheck(f, / as /ig, 1, 'gt'))
        throw new Error(`Too much key word 'as' in table name: '${f}'`);
    let [name, alias] = f.split(/ as /i);
    if (!(name === null || name === void 0 ? void 0 : name.replace(/\s/g, '')))
        throw new Error(`Table name can not be whitespace: '${f}'`);
    name = name.trim();
    if (exports.PartInStrCountCheck(name, /\s/g, 0, 'gt'))
        throw new Error(`Table name can not inclouds whitespace: '${f}'`);
    if (exports.PartInStrCountCheck(f, / as /ig, 1, 'eq')) {
        if (alias === null || alias === void 0 ? void 0 : alias.replace(/\s/g, '')) {
            alias = alias.trim();
            if (exports.PartInStrCountCheck(alias, /\s|\./g, 0, 'gt'))
                throw new Error(`Table name alias can not inclouds whitespace and '.': '${f}'`);
        }
        else {
            throw new Error(`Table name alias losts in '${f}'`);
        }
    }
    return [name, alias];
};
