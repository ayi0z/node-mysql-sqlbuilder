import SqlBuilder from './index'

const t = (sql: string): void => {
    console.log(sql)
}

const sql = new SqlBuilder().table('test as tst')
    .field('id')
    // .field(['id', 'name'])
    // .field(['a.id', 'a.name'])
    .where({
        id: 1,
        'alias.name': 'Tom',
        'age': { '$gt': '20', '$lt': 30 },
        '$or': [
            { gender: 'man', country: 'CN' },
            { from: 'e' },
            { '$or': { math: 90, english: 80 } }
        ],
        lang: {
            '$or': ['zh', 'chinese', { '$ne': 'en' }]
        },
        likeNum: { '$in': [1, 3, 5, 7, 9] },
        likeColor: { '$nin': ['yellow', 'black'] }
    })
    // .where({ id: 12 })
    // .where('birthday=2099')
    .select()
t(sql)