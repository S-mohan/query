
var testData = [
  {
    "id": 94,
    "user_id": 4,
    "name": "BCD",
    "probe_mac": "C8:EE:A6:31:A7:99",
    "range": -30,
    "status": 1,
    "created_at": "2018-05-08 08:52:36",
    "updated_at": "2018-05-08 08:52:36"
  },
  {
    "id": 80,
    "user_id": 4,
    "name": "BCD",
    "probe_mac": "DC:4F:22:0B:76:60",
    "range": -100,
    "status": 1,
    "created_at": "2018-05-07 08:59:38",
    "updated_at": "2018-05-07 17:46:53"
  },
  {
    "id": 25,
    "user_id": 4,
    "name": "有数据测试店铺1",
    "probe_mac": "C8:EE:A6:31:A7:09",
    "range": -50,
    "status": 1,
    "created_at": "2018-04-28 10:57:11",
    "updated_at": "2018-05-08 09:26:15"
  }
]


const query = Query(testData)

let _query = query
  // .where('range', 'lte', -30)
  // .where('name', 'like', '店铺')
  .where('id', 'exists')
  .sort('id', 'asc')
  .sort('name', 'desc')

console.log(_query.count())
console.log(_query.find())


// query.like('name', '店铺')
// query.like('probe_mac', '09')
// query.skip(0).limit(10)

console.log(query)

