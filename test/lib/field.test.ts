import { Field, AggrField, FnField } from '../../src/lib'
import { throwTest, toBeTest } from './common'

describe('good field name', () => {
    describe('field name is string', () => {
        const good: [string, string][] = [
            ['fieldname', '`fieldname`'],
            ['tablename.fieldname', '`tablename`.`fieldname`'],
            ['tablename.fieldname As fn ', '`tablename`.`fieldname` AS `fn`'],
        ]
        good.forEach(i => toBeTest(Field, i[1], i[0]))
    })

    describe('aggr field', () => {
        it('count', () => {
            let f = new Field(new AggrField('COUNT', 'fieldname', 'ALL'))
            expect(f.toSql()).toBe('COUNT(ALL `fieldname`)')

            f = new Field(new AggrField('COUNT', 'fieldname as fn', 'ALL'))
            expect(f.toSql()).toBe('COUNT(ALL `fieldname`) AS `fn`')
        })
        it('avg', () => {
            let f = new Field(new AggrField('AVG', 'fieldname', 'DISTINCT'))
            expect(f.toSql()).toBe('AVG(DISTINCT `fieldname`)')

            f = new Field(new AggrField('AVG', 'fieldname as fn', 'ALL'))
            expect(f.toSql()).toBe('AVG(ALL `fieldname`) AS `fn`')
        })
        it('min', () => {
            let f = new Field(new AggrField('MIN', 'fieldname', 'ALL'))
            expect(f.toSql()).toBe('MIN(ALL `fieldname`)')

            f = new Field(new AggrField('MIN', 'fieldname as fn', 'DISTINCT'))
            expect(f.toSql()).toBe('MIN(DISTINCT `fieldname`) AS `fn`')
        })
        it('max', () => {
            let f = new Field(new AggrField('MAX', 'fieldname'))
            expect(f.toSql()).toBe('MAX(ALL `fieldname`)')

            f = new Field(new AggrField('MAX', 'fieldname as fn', 'DISTINCT'))
            expect(f.toSql()).toBe('MAX(DISTINCT `fieldname`) AS `fn`')
        })
    })

    it('sql function field', () => {
        let f = new Field(new FnField('CEIL(1.4)'))
        expect(f.toSql()).toBe('CEIL(1.4)')
        f = new Field(new FnField('CEIL(1.4)', 'ceil'))
        expect(f.toSql()).toBe('CEIL(1.4) AS `ceil`')
        f = new Field(new FnField('IFNULL(id, 0)', 'ifn'))
        expect(f.toSql()).toBe('IFNULL(id, 0) AS `ifn`')
    })
})

describe('bad field name', () => {
    describe('field name is string', () => {
        const bad = ['  as tn ',
            '',
            ' ',
            'fieldname as ',
            'fieldname as',
            'fieldname Ax  tn ',
            'fieldname as a b',
            1]
        bad.forEach(i => throwTest(Field, i))
    })
})