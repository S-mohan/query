
var sourceData = window.postsData
var dataLength = sourceData.length

var $search = document.getElementById('search')
var $reset = document.getElementById('reset')
var $code = document.getElementById('code')
var $result = document.getElementById('result')


var $where = document.getElementsByName('where')
var $sort = document.getElementsByName('sort')
var $skip = document.getElementsByName('skip')
var $limit = document.getElementsByName('limit')
var $group = document.getElementsByName('group')




// 实例化句柄
var quertInstance = new Query(sourceData)





function init() {
  $skip[0].value = 0
  $skip[0].max = dataLength
  $limit[0].value = dataLength
  $search.click()
}




var isGroup = false

function getQuery() {
  var queries = Object.create(null)

  $where.forEach(function (where) {
    if (where.checked) {
      if (!queries.where) {
        queries.where = []
      }
      queries.where.push(where.value)
    }
  })

  $sort.forEach(function (sort) {
    if (sort.checked) {
      queries.sort = sort.value
      return false
    }
  })

  if ($skip[0].value >= 0) {
    queries.skip = +$skip[0].value
  }

  if ($limit[0].value >= 1) {
    queries.limit = +$limit[0].value
  }


  $group.forEach(function (group) {
    if (group.checked) {
      queries.group = group.value
      return false
    }
  })

  var queryString = ''

  if (queries.where && queries.where.length) {
    queryString += queries.where.join('')
  }
  if (queries.group) {
    isGroup = true
    queryString += queries.group
  } else {
    isGroup = false
  }
  if (queries.sort) {
    queryString += queries.sort
  }
  if (queries.skip >= 0) {
    queryString += '.skip(' + queries.skip + ')'
  }
  if (queries.limit >= 1) {
    queryString += '.limit(' + queries.limit + ')'
  }
  return queryString
}


function exec(sql) {
  try {
    var res = new Function('return ' + sql)()
    console.log(res)
    $result.innerHTML = ''
    res.forEach(function (item) {
      if (isGroup) {
        $result.innerHTML += '<li>' + item._id + '____count:___' + item.count + '</li>'
      } else {
        $result.innerHTML += '<li>' + item.title + '</li>'
      }
    })
  } catch (e) {
    console.log(e)
  }
}


$search.addEventListener('click', function () {
  var queries = getQuery()
  var sql = 'quertInstance.reset()' + queries + '.find()'
  $code.innerHTML = sql.replace(/\)\./gm, ')\n.')
  exec(sql)
})
//

$reset.addEventListener('click', function () {
  init()
})



init()