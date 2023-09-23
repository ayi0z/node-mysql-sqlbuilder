const copFn = {
  gt: (x: number, y: number): boolean => x > y,
  eq: (x: number, y: number): boolean => x === y,
  lt: (x: number, y: number): boolean => x < y,
};
/**
 * 检查字符串中正则匹配到的次数
 * @param exp string search in
 * @param reg regular expression
 * @param count 预计次数
 * @param cop 'gt' | 'eq' | 'lt', 匹配次数与预计次数相比较
 * @returns 返回实际匹配次数与预计次数的比较结果
 */
export const PartInStrCountCheck = (
  exp: string,
  reg: RegExp,
  count = 0,
  cop: 'gt' | 'eq' | 'lt' = 'eq'
): boolean => {
  const pointMatch = exp.match(reg);
  return !!(pointMatch && copFn[cop](pointMatch.length, count));
};
/**
 * 检查字段名称是否合法, 不通过则抛出异常
 * @param f 字段名
 * @returns 合法的字段名称
 * @example [tablename.]fieldname[ as alias]
 * @description
 * 1. 字段名称不能为空
 * 2. 字段名称不能是空白字符
 * 3. 字段名称中最多只能含有一个"."
 * 4. 字段名称内部不能有空白字符
 * 5. 字段名称不能以.开始
 * 6. 别名不能含有"." 和 空白字符
 */
export const ShakeFieldName = (f: string): [string, string | undefined] => {
  if (!f) throw new Error(`Field name can not be null / undifiend: ${f}`);

  if (PartInStrCountCheck(f, /\./g, 1, 'gt')) throw new Error(`Too much '.' in field name: '${f}'`);

  if (PartInStrCountCheck(f, / as /gi, 1, 'gt'))
    throw new Error(`Too much key word 'as' in field name: '${f}'`);

  let [name, alias] = f.split(/ as /i);

  if (!name?.replace(/\s/g, '')) throw new Error(`Field name can not be whitespace: '${f}'`);

  name = name.trim();
  if (PartInStrCountCheck(name, /\s/g, 0, 'gt'))
    throw new Error(`Field name can not inclouds whitespace: '${f}'`);

  if (/^\./.test(name)) throw new Error(`Invalid table name of field name: '${f}'`);

  if (PartInStrCountCheck(f, / as /gi, 1, 'eq')) {
    if (alias?.replace(/\s/g, '')) {
      alias = alias.trim();
      if (PartInStrCountCheck(alias, /\s|\./g, 0, 'gt'))
        throw new Error(`Field name alias can not inclouds whitespace and '.': '${f}'`);
    } else {
      throw new Error(`Field name alias losts in '${f}'`);
    }
  }

  return [name, alias];
};
/**
 * 检查表名是否合法, 不通过则抛出异常
 * @param f
 * @returns 合法的表名称和别名 [tablename, alias]
 * @example tablename[ as alias]
 * @description
 * 1. 表名不能为空
 * 2. 表名不能是空白字符
 * 3. 表名/别名内部不能出现空白字符
 * 4. 表名不能出现"."
 */
export const ShakeTableName = (f: string): [string, string | undefined] => {
  if (!f) throw new Error(`Table name can not be null / undifiend: '${f}'`);

  if (PartInStrCountCheck(f, /\./g, 0, 'gt'))
    throw new Error(`The charactor '.' should not exists in table name: '${f}'`);

  if (PartInStrCountCheck(f, / as /gi, 1, 'gt'))
    throw new Error(`Too much key word 'as' in table name: '${f}'`);

  let [name, alias] = f.split(/ as /i);

  if (!name?.replace(/\s/g, '')) throw new Error(`Table name can not be whitespace: '${f}'`);

  name = name.trim();

  if (PartInStrCountCheck(name, /\s/g, 0, 'gt'))
    throw new Error(`Table name can not inclouds whitespace: '${f}'`);

  if (PartInStrCountCheck(f, / as /gi, 1, 'eq')) {
    if (alias?.replace(/\s/g, '')) {
      alias = alias.trim();
      if (PartInStrCountCheck(alias, /\s|\./g, 0, 'gt'))
        throw new Error(`Table name alias can not inclouds whitespace and '.': '${f}'`);
    } else {
      throw new Error(`Table name alias losts in '${f}'`);
    }
  }

  return [name, alias];
};
