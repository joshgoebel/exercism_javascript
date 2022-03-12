export class LinkedList {
    constructor () {
        /*
        preHead and postTail are fake nodes out "past" the head and tail
        of the list... this removes all edge cases from adding and removing
        elements... since now all operations are always guaranteed to happen
        "in the middle" of the list, rather than at the edges
        */
        this._preHead = new Node()
        this._postTail = new Node(null, {previous: this.preHead })
        this._preHead.next = this.postTail
    }

    get postTail() {
        return this._postTail
    }

    get preHead() {
        return this._preHead
    }

    get head() {
        return this.preHead.next
    }

    get tail() {
        return this.postTail.previous
    }

    /* public API */

    push (data) {
        this.insert(data,{ between: [this.tail, this.postTail] })
    }

    unshift(data) { // add to beginning
        this.insert(data, { between: [this.preHead, this.head] })
    }

    pop () {
        return this.remove(this.tail).data
    }

    shift() { // from beginning
        return this.remove(this.head).data
    }

    delete(data) {
        let node = this.findNode(data)
        if (node)
            this.remove(node)
    }

    count() {
        var count = 0
        for (let _ of this) {
            count++
        }
        return count
    }

    // private api

    findNode(data) {
        // return [...this].find(node => node.data == data )
        for (let node of this) {
            if (node.data == data) {
                return node
            }
        }
    }

    *[Symbol.iterator]() {
        let node = this.head
        while (node !== this.postTail) {
            yield node
            node = node.next
        }
    }

    insert(data, {between: [previous, next]}) {
        let node = new Node(data,{previous,next})

        previous.next = node
        next.previous = node
    }

    remove(node) {
        node.previous.next = node.next
        node.next.previous = node.previous
        return node
    }
}

class Node {
    constructor(data, {previous, next} = {}) {
        this._data = data
        this.previous = previous
        this.next = next
    }

    get data() {
        return this._data
    }
}