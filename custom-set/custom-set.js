const PRESENT = Symbol();

export class CustomSet {
  #set
  #length

  constructor(list) {
    this.#set = {};
    this.#length = 0;
    if (list)
      list.forEach(data => this.add(data));
  }

  get items() { return Object.keys(this.#set) }
  get length() { return this.#length; }

  empty() {
    return this.#length === 0;
  }

  contains(data) {
    return this.#set[data] === PRESENT;
  }

  add(data) {
    if (this.contains(data)) return this;

    this.#set[data] = PRESENT;
    this.#length += 1;
    return this;
  }

  isSubset(set) {
    if (this.length > set.length) return false;

    return Object.keys(this.#set).every(data => set.contains(data));
  }

  disjoint(set) {
    return ! Object.keys(this.#set).some(data => set.contains(data));
  }

  eql(set) {
    if (set.length != this.length) return false;

    return this.isSubset(set);
  }

  union(set) {
    var result = new CustomSet()
    //this.items.forEach(data => result.add(data))
    //set.items.forEach(data => result.add(data))
    // likely far more performant?
    result.#set = { ...this.#set, ...set.#set };
    result.#length = Object.keys(result.#set).length;
    return result
  }

  intersection(set) {
    var result = new CustomSet()
    var [smallerList, largerList] = [set, this];
    // sort lists
    if (smallerList.length > largerList.length) {
      [smallerList, largerList] = [largerList, smallerList];
    }

    smallerList.items.forEach(data => {
      if (largerList.contains(data)) result.add(data);
    })
    return result;
  }

  difference(set) {
    var result = new CustomSet()
    this.items.forEach(data =>{ 
      if (!set.contains(data))
        result.add(data);
    })
    return result;
  }
}
