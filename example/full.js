var sourceData = window.postsData


var $keyword = document.getElementById('keyword')
var $searchBtn = document.getElementById('search')
var $list = document.getElementById('list')
var $sort = document.getElementById('sort')
var $pagination = document.getElementById('pagination')
var $paginationInfo = document.getElementById('paginationInfo')
var $listTPL = document.getElementById('tpl-list')
var $pageTPL = document.getElementById('tpl-page')

var params = {
  page: 1,
  limit: 5,
  sort: ''
}


var quertInstance = new Query(sourceData)

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


function renderList (list) {
  $list.innerHTML = ''
  if (list && list.length) {
    list.forEach(item => {
      $list.innerHTML += render($listTPL, {
        id: item._id,
        title: item.title,
        author: item.copyright.author,
        tags: item.tags,
        views: item.count.views,
        createTime: item.createTime.replace(/T/g, ' ').replace(/\.\d{3}Z/, '')
      })
    })
  } else {
    $list.innerHTML = '<tr><td colspan="6" class="eof">暂无记录</td></tr>'
  }
}

// 渲染分页
function renderPager (pages, count) {
  if (count === 0) {
    $pagination.style.display = 'none';
    $paginationInfo.style.display = 'none';
  } else {
    $pagination.style.display = 'block';
    $paginationInfo.style.display = 'block';
  }
  $pagination.innerHTML = ''
  for (var i = 1; i <= pages; i++) {
    $pagination.innerHTML += render($pageTPL, {
      page: i,
      className: i === params.page ? 'active' : ''
    })
  }
  $paginationInfo.innerHTML = '共<b> ' + count + ' </b>条记录，当前第 ' + params.page + ' / ' + pages + ' 页'
}


function getList(page) {
  if (page) {
    params.page = page
  }
  var query = quertInstance.reset()
  var kewyord = $keyword.value.trim()
  if (kewyord) {
    query.where([
      ['title', 'like', kewyord],
      ['tags', 'like', kewyord, 'or'],
      ['copyright.author', 'like', kewyord, 'or']
    ])
  }
  if (params.sort) {
    query.sort(params.sort, 'desc')
  }
  var count = query.count()
  var pages = Math.ceil(count / params.limit)
  if (params.page > pages) {
    params.page = 1
  }
  query
    .skip(params.limit * (params.page - 1))
    .limit(params.limit)

  var list = query.find()
  renderList(list)
  renderPager(pages, count)
}

getList()

$pagination.addEventListener('click', function (e) {
  e = e || window.e 
  if (e.target.nodeName === 'LI') {
    e.stopPropagation()
    var page = e.target.getAttribute('data-page')
    page = Number(page)
    if (page !== params.page) {
      getList(page)
    }
  }
})


$sort.addEventListener('click', function (e) {
  e = e || window.e 
  if (e.target.nodeName === 'BUTTON') {
    e.stopPropagation()
    var sort = e.target.getAttribute('data-value')
    if (sort !== params.sort) {
      params.sort = sort
      Array.prototype.slice.call($sort.querySelectorAll('button')).forEach(function(button) {
        if (button === e.target) {
          button.classList.add('active')
        } else {
          button.classList.remove('active')
        }
      })
      getList()
    }
  }
})


$searchBtn.addEventListener('click', function() {
  getList(1)
})