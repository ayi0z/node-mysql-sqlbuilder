import { throwTest, toBeTest } from './common'
import { Group } from '../../src/lib'

const good: [string, string][] = [
    ['fieldname', '`fieldname`'],
    ['tablename.fieldname', '`tablename`.`fieldname`'],
    ['fieldname Ax  tn ', '`fieldnameAxtn`']
]
good.forEach(i => toBeTest(Group, i[1], i[0]))

const bad = [
    'table name . field name.f1',
    '',
    ' ',
    1
]
bad.forEach(i => throwTest(Group, i))