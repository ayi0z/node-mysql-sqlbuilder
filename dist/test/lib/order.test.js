"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const lib_1 = require("../../lib");
const good = [
    [['filename'], '`filename` ASC'],
    [['tablename.filename', 'DESC'], '`tablename`.`filename` DESC'],
    [[' tab lename.fil en ame ', 'DESC'], '`tablename`.`filename` DESC']
];
good.forEach(i => common_1.toBeTest(lib_1.Order, i[1], ...i[0]));
const bad = [
    'table name . field name.f1',
    '',
    '     ',
    1,
    ' . field name    ',
];
bad.forEach(i => common_1.throwTest(lib_1.Order, i));
