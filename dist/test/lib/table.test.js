"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../lib/table");
const common_1 = require("./common");
const good = [
    ['tablename', '`tablename`'],
    ['tablename As  tn ', '`tablename` AS `tn`'],
    ['tablename Ax  tn ', '`tablenameAxtn`'],
    ['tablename as ', '`tablename`'],
    ['tablename as a b', '`tablename` AS `ab`']
];
good.forEach(i => common_1.toBeTest(table_1.Table, i[1], i[0]));
const bad = ['  as tn ',
    '',
    ' ',
    ' table.name as tn ',
    1];
bad.forEach(i => common_1.throwTest(table_1.Table, i));
