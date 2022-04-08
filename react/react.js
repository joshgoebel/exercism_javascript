const EV_CALCULATE = "calculate"
const EV_CHANGES_COMPLETE = "changesComplete"

const HasCallbacks = (base)  => class extends base {
  constructor() {
    super()
    this.callbacks = new Set()
  }

  addCallback(callback) {
    this.callbacks.add(callback)
  }

  removeCallback(callback) {
    this.callbacks.delete(callback)
  }

  fireCallbacks() {
    this.callbacks.forEach(cb => cb.fire(this))
  }
}

const HasDependentEvents = (base) => class extends base {
  constructor() {
    super();
    this.dependents = new Set()
  }

  providesSource(cell) {
    this.dependents.add(cell);
  }

  fire(...events) {
    events.forEach((event) =>
      this.dependents.forEach(listener => listener[`ev:${event}`]())
    )
  }
}

const mixin = (...mixins) => mixins.reduce((acc, mix) => mix(acc), class {})

class ValueCell extends mixin(HasCallbacks, HasDependentEvents) {
  constructor(value) {
    super();
    // private values aren't inherited, so we use fake privacy
    this._value = value
  }

  get value() {
    return this._value;
  }
}

export class InputCell extends ValueCell {
  constructor(value) {
    super(value)
  }

  setValue(new_value) {
    if (new_value===this.value) { return }

    this._value = new_value
    this.fire(EV_CALCULATE, EV_CHANGES_COMPLETE)
  }
}

export class ComputeCell extends ValueCell {
  #priorValue
  #computeFn
  #sourceCells
  constructor(sourceCells, computeFn) {
    super()
    this.#registerInputs(sourceCells)
    this.#computeFn = computeFn

    this.#calculateInitialValue()
  }

  #calculateInitialValue() {
    this.#recalc()
    this.#priorValue = this._value
  }

  #registerInputs(sourceCells) {
    this.#sourceCells = sourceCells
    this.#sourceCells.forEach(cell => cell.providesSource(this))
  }

  #recalc() {
    this._value = this.#computeFn(this.#sourceCells)
  }

  #hasChanged() {
    return this.value != this.#priorValue;
  }

  // when an Cell changes it fires the changed event
  // which propagates to all dependencies down the line
  "ev:calculate"() {
    this.#recalc()
    this.fire(EV_CALCULATE)
  }

  // this is fired after changes are complete. It's a separate
  // event to make sure the changed event has fully propagated
  // before any callbacks are fired
  "ev:changesComplete"() {
    if (this.#hasChanged() ) {
      this.fireCallbacks()
      this.#priorValue = this.value
    }
    this.fire(EV_CHANGES_COMPLETE)
  }
}

// const addEvent = (klass, method, fn) => {
//     klass.prototype[`ev:${method}`] = fn
// }

// addEvent(ComputeCell, CALCULATE, function() {
//     this.recalc()
//     this.fire(CALCULATE)
// })

export class CallbackCell {
  #callback
  #values
  constructor(callback) {
    this.#callback = callback
    this.#values = []
  }

  fire(boundCell) {
    this.#values.push(this.#callback(boundCell))
  }

  get values() {
    return this.#values.slice();
  }
}