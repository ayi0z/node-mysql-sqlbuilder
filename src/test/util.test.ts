import { PartInStrCountCheck, ShakeFieldName, ShakeTableName } from '../util'

test(`CheckPartInStr: `, () => {
    expect(PartInStrCountCheck('abcdeas.d..c', /\./g, 3)).toBeTruthy()
    expect(PartInStrCountCheck('abcdeas.d..c', /cdeas\.d/g, 1)).toBeTruthy()
    expect(PartInStrCountCheck('g54877r534gt7', /5/g, 2,'eq')).toBeTruthy()
    expect(PartInStrCountCheck('o87y978g7r56d5487', /8/i, 2, 'lt')).toBeTruthy()
    expect(PartInStrCountCheck('12353', /3/g, 1, 'lt')).toBeFalsy()
    expect(PartInStrCountCheck('hf7uguy', /cdeas\.d/g, 0, 'gt')).toBeFalsy()
    expect(PartInStrCountCheck('', /1234/g, 1, 'gt')).toBeFalsy()
});