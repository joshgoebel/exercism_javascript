export class BinarySearchTree {
  #left
  #right
  #data

  constructor(data = null) {
    this.#left = null
    this.#right = null
    this.#data = data
  }

  get data() {
    return this.#data
  }
  get right() {
    return this.#right
  }

  get left() {
    return this.#left
  }

  insert(data) {
    if (this.#data === null) {
      this.#data = data
    } else if (data <= this.#data) {
      (this.#left ??= new BinarySearchTree())
        .insert(data)
    } else {
      (this.#right ??= new BinarySearchTree())
        .insert(data)
    }
  }

  each(fn) {
    this.left?.each(fn)
    fn(this.data)
    this.right?.each(fn)
  }
}
