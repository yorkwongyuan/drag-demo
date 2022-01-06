export function getComponentRotatedStyle (style) {
  style = { ...style }
  style.right = style.left + style.width
  style.bottom = style.top + style.height
  return style
}

// 给样式的值加上单位px
export function getStyle (style, filter = []) {
  const needUnits = [
    'width',
    'height',
    'left',
    'top',
    'borderWidth',
    'fontSize'
  ]
  const result = {}
  Object.keys(style).forEach(key => {
    // 不得包含的属性
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        result[key] = style[key] + (needUnits.includes(key) ? 'px' : '')
      } else {
        result.transform = `rotate(${style[key]}deg)`
      }
    }
  })
  return result
}
