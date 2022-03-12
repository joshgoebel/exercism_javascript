
const DIGIT_REGEX = /[-+]?\d+/
const OPERATOR_REGEX = /^[+-/*]$/
const DEFINE_FUNCTION = ":"
const FUNCTION_END = ";"

const isNumerical = (x) => x.match(DIGIT_REGEX)
const isOperator = (x) => x.match(OPERATOR_REGEX)
const caseInsensative = (x) => x.toLowerCase()

const operations = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
}

const instructions = [
    "dup",
    "drop",
    "swap",
    "over"
]

const validInstruction = (token) =>  instructions.includes(token)

class Parser {
    constructor(program) {
        this.stream = program.split(" ")[Symbol.iterator]()
    }
    fetchUntil(op) {
        let token, ops = []
        while((token = this.fetch()) != op) {
            if (token==null) {
                throw('Expected more program.')
            }
            ops.push(token)
        }
        return ops
    }
    fetch() {
        return this.stream.next().value
    }
}

export class Forth {
    constructor() {
        this.stack = []
        this.userFunctions = []
    }

    evaluate(code) {
        let token
        this.parser = new Parser(code)
        while (token = this.parser.fetch()) {
            this._eval(token)
        }
    }

    _eval(token) {
        token = caseInsensative(token)
        if (isNumerical(token)) {
            this.push(Number(token))
        } else if (this.userFunctions[token]) {
            this.execUserFunc(token)
        } else if (isOperator(token)) {
            this.execOp(token)
        } else if (validInstruction(token)) {
            this.execInst(token)
        } else if (token == DEFINE_FUNCTION) {
            this.defineFunction()
        } else {
            throw(`Unknown command`)
        }
    }

    execInst(token) {
        this[`op_${token}`]()
    }
    execOp(token) {
        this[`op_${operations[token]}`]()
    }

    execUserFunc(name) {
        let func = this.userFunctions[name]
        func.forEach(inst => this._eval(inst))
    }

    defineFunction() {
        let name = this.parser.fetch().toLowerCase()
        if (isNumerical(name)) {
            throw('Invalid definition')
        }
        this.userFunctions[name] = this.parser.fetchUntil(";")
    }

    push() {
        for (let v of arguments)
            this.stack.push(v)
    }
    pop() {
        if (this.stackEmpty) {
            throw('Stack empty')
        }
        return this.stack.pop()
    }

    get stackEmpty() {
        return this.stack.length == 0
    }

    /* operations */

    op_add() {
        this.push(this.pop() + this.pop())
    }

    op_subtract() {
        let [a,b ] = [this.pop(), this.pop()]
        this.push(b - a)
    }

    op_multiply() {
        this.push(this.pop() * this.pop())
    }

    op_divide() {
        let [dividend,divisor] = [this.pop(), this.pop()]
        if (dividend==0) {
            throw('Division by zero')
        }
        this.push(Math.floor(divisor/ dividend))
    }

    op_dup() {
        let a = this.pop()
        this.push(a, a)
    }

    op_drop() {
        this.pop()
    }

    op_swap() {
        let [b,a] = [this.pop(), this.pop()]
        this.push(b,a)
    }

    op_over() {
        let [last,secondToLast] = [this.pop(), this.pop()]
        this.push(secondToLast,last,secondToLast)
    }

}