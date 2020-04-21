import { Table } from '../../src/lib/table'
import { throwTest, toBeTest } from './common'

const good: [string, string][] = [
    ['tablename', '`tablename`'],
    ['tablename As  tn ', '`tablename` AS `tn`'],
    ['tablename Ax  tn ', '`tablenameAxtn`'],
    ['tablename as ', '`tablename`'],
    ['tablename as a b', '`tablename` AS `ab`']
]
good.forEach(i => toBeTest(Table, i[1], i[0]))

const bad = ['  as tn ',
    '',
    ' ',
    ' table.name as tn ',
    1]
bad.forEach(i => throwTest(Table, i))