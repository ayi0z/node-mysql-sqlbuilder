import assert from 'assert';
import {IFieldFn} from '../../src/isqlbuilder';

export const toBeTest = <T extends IFieldFn>(
  c: new (...args: any[]) => T,
  be: string,
  ...opt: any[]
): void => {
  test(`'${opt}' => '${be}'`, () => {
    expect(new c(...opt).toSql()).toBe(be);
  });
};
export const throwTest = <T extends IFieldFn>(
  c: new (...args: any[]) => T,
  ...opt: any[]
): void => {
  test(`'${opt}' => throws error`, () => {
    assert.throws(() => new c(...opt).toSql());
  });
};
