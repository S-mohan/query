

function Query (data) {
  if (!(this instanceof Query)) {
    return new Query(data)
  }

  if (!Array.isArray(data)) {
    // todo
  }

  this.source = data

  this.target = null

  this.sorts = Object.create(null)

  this.take = Object.create(null)

  this.query = Object.create(null)
}

Query.version = '__VERSION__'

// 原型
const QP = Query.prototype


QP.skip = function () {}


QP.limit = function () {}

//   // where
//   where() { }

//   like() { }

//   in() { }

//   between() { }

//   skip() { }

//   limit() { }

//   desc() { }

//   asc() { }

//   groupby()

//   find() { }

//   findOne() { }

//   destroy() { }


const query = Query([])

console.log(query)
