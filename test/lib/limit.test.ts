/* eslint-disable @typescript-eslint/no-explicit-any */
import { toBeTest } from './common'
import { Limit } from '../../src/lib'

const good: [any, string][] = [
    [1, ' LIMIT 1'],
    [[1, 20], ' LIMIT 1,20'],
    [[0, 20], ' LIMIT 0,20']
]
good.forEach(i => toBeTest(Limit, i[1], i[0]))
