import { ISqlBuilder } from './isqlbuilder'

export type ComparisonOperator = {
    operator: '$eq' | '$ne' | '$gt' | '$gte' | '$lt' | '$lte'
    item: number | string
}
export function IsComparisonOperator(v: string): v is ComparisonOperator["operator"] {
    return v === '$eq' || v === '$ne'
        || v === '$gt' || v === '$gte'
        || v === '$lt' || v === '$lte'
}

export type NinOperator = {
    operator: '$in' | '$nin'
    item: ISqlBuilder | (string | number)[]
}
export function IsNinOperator(v: string): v is NinOperator["operator"] {
    return v === '$in' || v === '$nin'
}

export type LikeOperator = {
    operator: '$like'
    item: string
}
export function IsLikeOperator(v: string): v is LikeOperator["operator"] {
    return v === '$like'
}

export type OperatorType = {
    operator: ComparisonOperator["operator"]
    item: ComparisonOperator["item"]
} | {
    operator: NinOperator["operator"]
    item: NinOperator["item"]
} | {
    operator: LikeOperator["operator"]
    item: LikeOperator["item"]
}
export function IsOperatorType(v: string): v is OperatorType["operator"] {
    return IsComparisonOperator(v) || IsNinOperator(v) || IsLikeOperator(v)
}

export type AorOperator = '$and' | '$or'
export function IsAndOrOperator(v: string): v is AorOperator {
    return v === '$and' || v === '$or'
}

export const OperatorCMD = {
    '$eq': '=',
    '$ne': '!=',
    '$gt': '>',
    '$gte': '>=',
    '$lt': '<',
    '$lte': '<=',
    '$in': 'IN',
    '$nin': 'NOT IN',
    '$like': 'LIKE',
    '$and': 'AND',
    '$or': 'OR'
}