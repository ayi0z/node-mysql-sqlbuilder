import {PartInStrCountCheck, ShakeFieldName, ShakeTableName} from '../src/util';

describe('PartInStrCountCheck', () => {
  it(`CheckPartInStr: `, () => {
    expect(PartInStrCountCheck('abcdeas.d..c', /\./g, 3)).toBeTruthy();
    expect(PartInStrCountCheck('abcdeas.d..c', /cdeas\.d/g, 1)).toBeTruthy();
    expect(PartInStrCountCheck('g54877r534gt7', /5/g, 2, 'eq')).toBeTruthy();
    expect(PartInStrCountCheck('o87y978g7r56d5487', /8/i, 2, 'lt')).toBeTruthy();
    expect(PartInStrCountCheck('12353', /3/g, 1, 'lt')).toBeFalsy();
    expect(PartInStrCountCheck('hf7uguy', /cdeas\.d/g, 0, 'gt')).toBeFalsy();
    expect(PartInStrCountCheck('', /1234/g, 1, 'gt')).toBeFalsy();
  });
});

describe('ShakeTableName', () => {
  it('return right table name and alias', () => {
    expect(ShakeTableName('user')).toStrictEqual(['user', undefined]);
    expect(ShakeTableName('user as  usr')).toStrictEqual(['user', 'usr']);
  });
  it('throw error if invalid table name provides', () => {
    expect(() => ShakeTableName('         ')).toThrowError(
      "Table name can not be whitespace: '         '"
    );
    expect(() => ShakeTableName('user.s as user')).toThrowError(
      "The charactor '.' should not exists in table name: 'user.s as user'"
    );
    expect(() => ShakeTableName(' as user')).toThrowError(
      "Table name can not be whitespace: ' as user'"
    );
    expect(() => ShakeTableName('us er as usr')).toThrowError(
      "Table name can not inclouds whitespace: 'us er as usr'"
    );
    expect(() => ShakeTableName('user as us r')).toThrowError(
      "Table name alias can not inclouds whitespace and '.': 'user as us r'"
    );
    expect(() => ShakeTableName('user as usr as ur')).toThrowError(
      "Too much key word 'as' in table name: 'user as usr as ur'"
    );
    expect(() => ShakeTableName('user as ')).toThrowError("Table name alias losts in 'user as '");
  });
});

describe('ShakeFieldName', () => {
  it('return right field name', () => {
    expect(ShakeFieldName('name')).toStrictEqual(['name', undefined]);
    expect(ShakeFieldName('account.name')).toStrictEqual(['account.name', undefined]);
    expect(ShakeFieldName(' name as xm ')).toStrictEqual(['name', 'xm']);
    expect(ShakeFieldName(' account.name  as xm ')).toStrictEqual(['account.name', 'xm']);
  });

  it('throw error if invalid field name provides', () => {
    expect(() => ShakeFieldName('         ')).toThrowError(
      "Field name can not be whitespace: '         '"
    );
    expect(() => ShakeFieldName('account.name.age')).toThrowError(
      "Too much '.' in field name: 'account.name.age'"
    );
    expect(() => ShakeFieldName('na me')).toThrowError(
      "Field name can not inclouds whitespace: 'na me'"
    );
    expect(() => ShakeFieldName('account.na me')).toThrowError(
      "Field name can not inclouds whitespace: 'account.na me'"
    );
    expect(() => ShakeFieldName('acco unt.name')).toThrowError(
      "Field name can not inclouds whitespace: 'acco unt.name'"
    );
    expect(() => ShakeFieldName('name as n.ame')).toThrowError(
      "Field name alias can not inclouds whitespace and '.': 'name as n.ame'"
    );
    expect(() => ShakeFieldName('account.name as account name')).toThrowError(
      "Field name alias can not inclouds whitespace and '.': 'account.name as account name'"
    );
    expect(() => ShakeFieldName('.name')).toThrowError("Invalid table name of field name: '.name'");
    expect(() => ShakeFieldName('name as nam as ne')).toThrowError(
      "Too much key word 'as' in field name: 'name as nam as ne'"
    );
    expect(() => ShakeFieldName('name as ')).toThrowError("Field name alias losts in 'name as '");
  });
});
