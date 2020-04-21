"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
test(`CheckPartInStr: `, () => {
    expect(util_1.PartInStrCountCheck('abcdeas.d..c', /\./g, 3)).toBeTruthy();
    expect(util_1.PartInStrCountCheck('abcdeas.d..c', /cdeas\.d/g, 1)).toBeTruthy();
    expect(util_1.PartInStrCountCheck('g54877r534gt7', /5/g, 2, 'eq')).toBeTruthy();
    expect(util_1.PartInStrCountCheck('o87y978g7r56d5487', /8/i, 2, 'lt')).toBeTruthy();
    expect(util_1.PartInStrCountCheck('12353', /3/g, 1, 'lt')).toBeFalsy();
    expect(util_1.PartInStrCountCheck('hf7uguy', /cdeas\.d/g, 0, 'gt')).toBeFalsy();
    expect(util_1.PartInStrCountCheck('', /1234/g, 1, 'gt')).toBeFalsy();
});
