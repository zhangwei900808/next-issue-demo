export const tile2nest = (array, key, pKey, childrenKey) => {
  if (!array || array.constructor !== Array) {
    return array
  }
  // 复制一份，避免修改原始数组
  let ary = [...array]
  key = key || 'id'
  pKey = pKey || 'pid'
  childrenKey = childrenKey || 'children'
  // 定义一个待移除数组
  let ary2remove = []
  ary.map(item => {
    if (item[key] !== item[pKey]) {
      // 找父节点
      let p = ary.filter(c => c[key] === item[pKey])
      if (p && p.length == 1) {
        p[0].children = p[0].children || []
        // 将子节点放到父节点中
        p[0].children.push(item)
        ary2remove.push(item[key])
      }
    }
  })
  // 遍历移除待删除对象
  ary2remove.map(item => {
    ary = ary.filter(c => c[key] !== item)
  })
  return ary
}
