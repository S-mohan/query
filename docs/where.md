### where 查询构造器

###### Syntax
```javascript
/**
 * @param {String} field
 * @param {String} expression
 * @param {String | RegExp | Function} condition
 * @param {String} relation {and(default) | or}
 */
query.where(field, expression, condition, relation)
// array group
query.where([[field, expression, condition, relation], [field, expression, condition, relation]])

```
['eq', '=', 'neq', '<>', 'gt', '>', 'gte', '>=', 'lt', '<', 'lte', '<=', 'like', 'in', 'nin', 'exists']
###### expression 
expression | description | example
---- | --- | ---
`eq` / `=` |  等于（`===`）| where('age', 'eq', 18)
`neq` / `<>` |  不等于(`!==`) | where('sex', 'neq', 'male')
`gt` / `>` |   大于(`>`) | where('price', 'gt', 17)
`gte` / `>=`  | 大于等于 (`>=`) | where('price', 'gte', 17)
`lt` / `<` |  小于(`<`) | where('price', '<', 17)
`lte` / `<=` |  小于等于(`<=`) | where('price', '<=', 17)
`like` |  模糊查询 | where('title', 'like', 'javascript')
`in` |  in查询 | where('tag', 'in', ['javascript', 'vue'])
`nin` |  不再in查询 | where('tag', 'nin', ['javascript', 'vue'])
`exists` |  字段是否存在 | | where('author', 'exists')