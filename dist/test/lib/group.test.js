"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const lib_1 = require("../../lib");
const good = [
    ['fieldname', '`fieldname`'],
    ['tablename.fieldname', '`tablename`.`fieldname`'],
    ['fieldname Ax  tn ', '`fieldnameAxtn`']
];
good.forEach(i => common_1.toBeTest(lib_1.Group, i[1], i[0]));
const bad = [
    'table name . field name.f1',
    '',
    ' ',
    1
];
bad.forEach(i => common_1.throwTest(lib_1.Group, i));
