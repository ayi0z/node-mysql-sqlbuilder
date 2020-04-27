import { Table } from '../../src/lib'
import { throwTest, toBeTest } from './common'

describe('good table name', () => {
    const good: [string, string][] = [
        ['tablename', '`tablename`'],
        ['tablename As  tn ', '`tablename` AS `tn`'],
    ]
    good.forEach(i => toBeTest(Table, i[1], i[0]))
})

describe('bad table name', () => {
    const bad = ['  as tn ',
        '',
        ' ',
        'table.name',
        'tablename as ',
        'tablename as',
        'tablename Ax  tn ',
        ' table.name as tn ',
        'tablename as a b',
        1]
    bad.forEach(i => throwTest(Table, i))
})