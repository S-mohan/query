
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

var $tplPost = document.getElementById('tpl-post')
var $tplGroup = document.getElementById('tpl-group')

// 实例化句柄
var quertInstance = new Query(sourceData)

// let res = quertInstance
// .where('count.comments', 'gt', 0)
// .where([
//   ['title', 'like', 'javascript'],
//   ['tags', 'like', 'javascript', 'or'],
// ])
// .find()
// console.log(res)


function init() {
  $skip[0].value = 0
  $skip[0].max = dataLength
  $limit[0].value = dataLength
  $search.click()
}


var isGroup = false


/**
 * 拼接sql
 * @returns {String}
 */
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


/**
 * 简单模板渲染
 * @param {Element} $tpl
 * @param {Object} data
 * @returns {String} 
 */
function render($tpl, data) {
  return $tpl.innerHTML.replace(/{(\w+)}/g, function (a, b) {
    return data[b]
  })
}


/**
 * 执行SQL
 * @param {String} sql 
 */
function exec(sql) {
  try {
    var res = new Function('return ' + sql)()
    $result.innerHTML = ''
    if (!res || !res.length) {
      $result.innerHTML = '<li style="color:red">no records</li>'
      return
    }
    res.forEach(function (item) {
      if (!isGroup) {
        $result.innerHTML += render($tplPost, {
          title: item.title,
          createTime: item.createTime,
          author: item.copyright.author,
          comments: item.count.comments,
          tags: item.tags.join(',')
        })
      } else {
        $result.innerHTML += render($tplGroup, {
          id: item._id,
          count: item.count
        })
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
  setTimeout(init, 0)
})



init()