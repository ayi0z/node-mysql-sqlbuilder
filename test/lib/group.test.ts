import { throwTest, toBeTest } from './common'
import { Group } from '../../src/lib'

describe('good group field', () => {
    const good: [string, string][] = [
        ['fieldname', '`fieldname`'],
        ['tablename.fieldname', '`tablename`.`fieldname`'],
        ['tablename.fieldname as a', '`tablename`.`fieldname`'],
    ]
    good.forEach(i => toBeTest(Group, i[1], i[0]))
})

describe('bad group field', () => {
    const bad = [
        'fieldname Ax  tn ',
        'table name . field name.f1',
        'tablename.field.name',
        'tablename.fie ld.name',
        '',
        ' ',
        1
    ]
    bad.forEach(i => throwTest(Group, i))
})