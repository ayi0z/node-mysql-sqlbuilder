/* eslint-disable @typescript-eslint/no-explicit-any */
import { toBeTest, throwTest } from './common'
import { Order } from '../../src/lib'

describe('good order by string', () => {
    const good: [any, string][] = [
        [['filename'], '`filename` ASC'],
        [['tablename.filename', 'DESC'], '`tablename`.`filename` DESC'],
    ]
    good.forEach(i => toBeTest(Order, i[1], ...i[0]))
})

describe('bad order by string', () => {
    const bad = [
        'table name . field name.f1',
        ' tab lename.fil en ame ',
        '',
        '     ',
        1,
        ' . field name    ',
    ]
    bad.forEach(i => throwTest(Order, i))
})