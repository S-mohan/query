## hooks
> 字段格式化内置钩子函数

### date
> 将一个字段的值格式化为指定的日期格式

##### example
```javascript
query.to('createTime', 'date', {args: ['yy-MM-dd']})
```
##### args: datetime Type
- `y / yy` : year/fullYear, '18'/'2018'
- `M / MM`: month/fullMonth, '5'/'05'
- `d / dd`: day/fullDay, '9'/'09'
- `h / hh`: hour/fullHour, '9'/'09'
- `m / mm`: minute/fullMinute, '9'/'09'
- `s / ss`: second/fullSecond, '9'/'09'
- `q / qq`: quarter/fullQuarter, '2'/'02'

### number
> 将一个字段的值格式化为数字

##### example
```javascript
// views: '30'
query.to('views', 'number')
// views: 30
```

### int
> 将一个字段的值格式化为整数

##### example
```javascript
// price: 30.25
query.to('price', 'int')
// price: 30
```

### zero
> 将一个字段的空值('', null, undefined, false, 0)格式化为 0

##### example
```javascript
// price: null
query.to('price', 'zero')
// price: 0
```

### boolean
> 将一个字段的空值('', null, undefined, false, 0)格式化为 false, 非空值转换为 true

##### example
```javascript
// read: null
// updated: 1
query.to('read', 'boolean')
query.to('updated', 'boolean')
// read: false
// updated: true
```

### string
> 将一个字段的值转化为字符串

##### example
```javascript
// views: 10
query.to('views', 'string')
// views: '10'
```

### lower
> 将一个字段的值转化为小写

##### example
```javascript
// author: 'SMOHAN'
query.to('author', 'lower')
// author: 'smohan'
```

### upper
> 将一个字段的值转化为大写

##### example
```javascript
// author: 'smohan'
query.to('author', 'upper')
// author: 'SMOHAN'
```