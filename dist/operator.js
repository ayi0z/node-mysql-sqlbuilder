"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function IsComparisonOperator(v) {
    return v === '$eq' || v === '$ne'
        || v === '$gt' || v === '$gte'
        || v === '$lt' || v === '$lte';
}
exports.IsComparisonOperator = IsComparisonOperator;
function IsNinOperator(v) {
    return v === '$in' || v === '$nin';
}
exports.IsNinOperator = IsNinOperator;
function IsLikeOperator(v) {
    return v === '$like';
}
exports.IsLikeOperator = IsLikeOperator;
function IsOperatorType(v) {
    return IsComparisonOperator(v) || IsNinOperator(v) || IsLikeOperator(v);
}
exports.IsOperatorType = IsOperatorType;
function IsAndOrOperator(v) {
    return v === '$and' || v === '$or';
}
exports.IsAndOrOperator = IsAndOrOperator;
exports.OperatorCMD = {
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
};
