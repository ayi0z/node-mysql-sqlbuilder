const CopFn = {
    gt: (x: number, y: number): boolean => x > y,
    eq: (x: number, y: number): boolean => x === y,
    lt: (x: number, y: number): boolean => x < y
}
/**
 * Check the regular expression match the number of occurrences of characters in a string
 * @param exp string search in
 * @param reg regular expression
 * @param count 
 * @param cop 'gt' | 'eq' | 'lt'
 */
export const PartInStrCountCheck = (exp: string, reg: RegExp, count = 0, cop: 'gt' | 'eq' | 'lt' = 'eq'): boolean => {
    const pointMatch = exp.match(reg)
    return pointMatch ? CopFn[cop](pointMatch.length, count) : false
}

export const ShakeFieldName = (f: string): string => {
    if (!f) throw new Error(`Field name can not be null / undifiend: ${f}`)

    const field: string = f.replace(/\s/g, '')
    if (!field) throw new Error(`Field name can not be whitespace: ${f}`)

    if (PartInStrCountCheck(field, /\./g, 1, 'gt')) throw new Error(`Too much '.' in field name: ${f}`)

    if (new RegExp(/^\./).test(field)) throw new Error(`Invalid table name of field name: ${f}`)

    return field
}

export const ShakeTableName = (f: string): [string, string | undefined] => {
    if (!f) throw new Error(`Table name can not be null / undifiend: ${f}`)

    let [name, alias] = f.split(/ as /i)

    name = name?.replace(/\s/g, '')
    if (!name) throw new Error(`Table name can not be whitespace: ${f}`)

    alias = alias?.replace(/\s/g, '')

    if (PartInStrCountCheck(name, /\./g, 0, 'gt')) throw new Error(`The charactor '.' should not exists in table name: ${f}`)
    return [name, alias]
}
