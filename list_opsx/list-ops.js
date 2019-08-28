const withNewList = (fn) => {
  let list = new List()
  fn(list)
  return list
}

export class List {
  constructor(items = []) {
    this._items = [...items]
  }

  // yes, this is meant to modify in place AFAICT from my
  // understanding of the instructions
  append(other) {
    other.forEach(el => this.push(el) )
    return this
  }

  concat(list_of_lists) {
    list_of_lists = new List([this,...list_of_lists])
    return list_of_lists.eachWithObject(new List(),
      (all, list) => all.append(list) )
  }

  filter(filterFunc) {
    return this.eachWithObject(new List(), (list, el) => {
      filterFunc(el) && list.push(el)
    })
  }

  map(mapFunc) {
    return this.eachWithObject(new List(),
      (list, el) => list.push(mapFunc(el))
    )
  }

  forEach(func) {
    for (let el of this) {
      func(el)
    }
  }

  length(item) {
    let c = 0
    for (let _ of this) c++
    return c
  }

  push(item) {
    this._items = [...this, item]
  }

  unshift(item) {
    this._items = [item, ...this]
  }

  get values() {
    return [...this]
  }

  foldl(foldFunc, acc) {
    for (let el of this) {
      acc = foldFunc(acc, el)
    }
    return acc
  }

  eachWithObject(obj,foldFunc) {
    for (let el of this) {
      foldFunc(obj, el)
    }
    return obj
  }

  foldr(foldFunc, acc) {
    return this.reverse().foldl(foldFunc, acc)
  }

  reverse() {
    return this.eachWithObject(new List(),
      (list, el) => list.unshift(el)
    )
  }

  // just borrow array's iterator
  [Symbol.iterator]() {
    return this._items[Symbol.iterator]()
  }
}
