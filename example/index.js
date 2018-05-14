
const query = Query(data)

// 分页
query
//.where('allowComment', 'eq', true)
.sort({
  _id : 'asc',
  createTime : 'desc',
})

console.log(query.count())

let list = query
.skip(0)
.limit(10)
.find()
console.log(list)

query
.reset()
.where('category.id', 'eq', '580e36986dd7c320d45984ae')
.where('tags', 'like', '有道')
.limit(1)
console.log(query.find())


