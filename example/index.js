
const query = Query(data)

// // 分页
query
  //.where('allowComment', 'eq', true)
  .sort({
    _id: 'asc',
    createTime: 'desc',
  })
  .group('category.name')
  .group('count.comments')

console.log(query.find())  


// console.log(query.count())

// // 当前query是上一个query的结果集
// let list = query
//   .skip(0)
//   .limit(10)
//   .find()
// console.log(list)

// // like
// query
//   .reset()
//   .where('category.id', 'eq', '580e36986dd7c320d45984ae')
//   .where('tags', 'like', '有道')
//   .limit(1)
// console.log(query.find())

// // 通过之自定义方法，取只有三个标签的文章
// query
//   .reset()
//   .where('tags', 'custom', value => value.length === 3)

// console.log(query.find())