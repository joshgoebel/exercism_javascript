const OPEN = Symbol();
const CLOSED = Symbol();

export class BankAccount {
  #status
  #balance

  constructor() {
    this.#status = CLOSED;
    this.#balance = 0;
  }

  open() {
    if (this.isOpen) { throw(new ValueError()) };

    this.#status = OPEN;
  }

  close() {
    if (this.isClosed) { throw(new ValueError()) };

    this.#status = CLOSED;
    this.#balance = 0;
  }

  deposit(amount) {
    if (this.isClosed) { throw(new ValueError()) };
    if (amount < 0) { throw(new ValueError()) };

    this.#balance += amount;
  }

  withdraw(amount) {
    if (this.isClosed) { throw(new ValueError()) };
    if (amount > this.#balance) { throw(new ValueError()) };
    if (amount < 0) { throw(new ValueError()) };
    
    this.#balance -= amount;
  }

  get balance() {
    if (this.isClosed) { throw(new ValueError()) };

    return this.#balance;
  }

  get isOpen() { return this.#status === OPEN };
  get isClosed() { return this.#status === CLOSED };
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
