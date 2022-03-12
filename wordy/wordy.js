const throws = (err) => { throw err }
const OPERATIONS = {
  "plus": (acc, n) => acc + n,
  "multiplied by": (acc, n) => acc * n,
  "minus": (acc, n) => acc - n,
  "divided by": (acc, n) => acc / n
}
const VALID_OPERATIONS = Object.keys(OPERATIONS)

// a simple union regex:
//
// - positive or negative number
// - single word, possibly followed by `by`
// - `?`
const WORD_PROBLEM_LEXER_RE = /[+-]?\d+|\w+( by)?|[?]/g

class Stream {
  constructor(data, {regex}) {
    this.items = data.match(regex)
  }
  peek() {
    return this.items[0]
  }
  consumeNext() {
    return this.items.shift()
  }
  consume(term) {
    return this.consumeNext() === term || null
  }
  expect(...terms) {
    terms.forEach((term) => {
      this.consume(term) || throws(new Error("Unknown operation"))
    })
  }
}

export class WordProblem {
  constructor(question) {
    this.question = question
  }
  answer() {
    this.stream = new Stream(this.question, {regex: WORD_PROBLEM_LEXER_RE})
    this.stream.expect("What", "is")

    let acc = this.expectNumber();
    while(this.stream.peek()) {
      if (this.stream.peek() === "?") break;

      let [op, operand] = [this.expectOp(), this.expectNumber()]
      acc = OPERATIONS[op](acc, operand)
    }

    this.stream.expect("?")
    return acc
  }
  expectNumber() {
    return Number(this.stream.consumeNext()) || throws(new Error("Syntax error"))
  }
  expectOp() {
    let op = this.stream.consumeNext()
    // for some reason we want a syntax error if the op is a number
    // vs an invalid opcode error - blame it on the specs
    if (Number(op)) throw new Error("Syntax error")

    if (!VALID_OPERATIONS.includes(op)) throw new Error("Unknown operation")
    return op
  }
}

export const answer = (question) => {
  return new WordProblem(question).answer()
}
