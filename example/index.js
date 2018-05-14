
const query = Query(data)

// 分页
query
//.where('allowComment', 'eq', true)
.sort({
  _id : 'asc',
  createTime : 'desc',
})
.skip(0)
.limit(10)

let list = query.find()
console.log(list)

query
.reset()
.where('category.id', 'eq', '580e36986dd7c320d45984ae')
.where('tags', 'like', '有道')

console.log(query.find())


