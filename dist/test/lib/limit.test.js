"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const lib_1 = require("../../lib");
const good = [
    [1, ' LIMIT 1'],
    [[1, 20], ' LIMIT 1,20'],
    [[0, 20], ' LIMIT 0,20']
];
good.forEach(i => common_1.toBeTest(lib_1.Limit, i[1], i[0]));
