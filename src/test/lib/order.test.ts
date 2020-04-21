/* eslint-disable @typescript-eslint/no-explicit-any */
import { toBeTest, throwTest } from './common'
import { Order } from '../../lib'

const good: [any, string][] = [
    [['filename'], '`filename` ASC'],
    [['tablename.filename', 'DESC'], '`tablename`.`filename` DESC'],
    [[' tab lename.fil en ame ', 'DESC'], '`tablename`.`filename` DESC']
]
good.forEach(i => toBeTest(Order, i[1], ...i[0]))

const bad = [
    'table name . field name.f1',
    '',
    '     ',
    1,
    ' . field name    ',
]
bad.forEach(i => throwTest(Order, i))