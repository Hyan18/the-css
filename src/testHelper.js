export function findCell (wrapper, x, y) {
  return wrapper.children().find('Cell').findWhere(n => n.prop('x') === x && n.prop('y') === y)
}
