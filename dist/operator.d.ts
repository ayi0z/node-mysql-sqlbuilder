import { ISqlBuilder } from './isqlbuilder';
export declare type ComparisonOperator = {
    operator: '$eq' | '$ne' | '$gt' | '$gte' | '$lt' | '$lte';
    item: number | string;
};
export declare function IsComparisonOperator(v: string): v is ComparisonOperator["operator"];
export declare type NinOperator = {
    operator: '$in' | '$nin';
    item: ISqlBuilder | (string | number)[];
};
export declare function IsNinOperator(v: string): v is NinOperator["operator"];
export declare type LikeOperator = {
    operator: '$like';
    item: string;
};
export declare function IsLikeOperator(v: string): v is LikeOperator["operator"];
export declare type OperatorType = {
    operator: ComparisonOperator["operator"];
    item: ComparisonOperator["item"];
} | {
    operator: NinOperator["operator"];
    item: NinOperator["item"];
} | {
    operator: LikeOperator["operator"];
    item: LikeOperator["item"];
};
export declare function IsOperatorType(v: string): v is OperatorType["operator"];
export declare type AorOperator = '$and' | '$or';
export declare function IsAndOrOperator(v: string): v is AorOperator;
export declare const OperatorCMD: {
    $eq: string;
    $ne: string;
    $gt: string;
    $gte: string;
    $lt: string;
    $lte: string;
    $in: string;
    $nin: string;
    $like: string;
    $and: string;
    $or: string;
};
