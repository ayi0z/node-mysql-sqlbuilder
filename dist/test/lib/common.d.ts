import { IFieldFn } from '../../isqlbuilder';
export declare const toBeTest: <T extends IFieldFn>(c: new (...args: any[]) => T, be: string, ...opt: any[]) => void;
export declare const throwTest: <T extends IFieldFn>(c: new (...args: any[]) => T, ...opt: any[]) => void;
