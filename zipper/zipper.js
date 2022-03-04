export function deepClone(node) {
    let fresh = Object.assign({}, node)
    for (let key in node) {
        if (typeof fresh[key] === "object" && fresh[key] !== null)
            fresh[key] = deepClone(fresh[key])
    }
    return fresh
}

export class Zipper {
    // points to a node in a larger tree data structure
    node
    // points to the parent node (of `node`)
    parent
    // tracks which of the parents two keys (`right` or `left`) points
    // to `node`, this is to allow the us to create a new parent when
    // traversing upwards that has the correct downward pointer to `node`
    childKey

    static fromTree(tree) {
        // this isn't strictly necessary but it's done just for safety such
        // that Zipper owns the data and it can't be mutated later
        return new Zipper(deepClone(tree))
    }

    constructor(node, {parent, childKey} = {}) {
        this.node = node
        this.parent = parent
        this.childKey = childKey
    }

    left() {
        if (!this.node.left) return null;

        return new Zipper(this.node.left, {parent: this, childKey: "left"})
    }

    right() {
        if (!this.node.right) return null;

        return new Zipper(this.node.right, {parent: this, childKey: "right"})
    }

    setLeft(left) {
        let newNode = {...this.node, left }
        return new Zipper(newNode, { parent: this.parent, childKey: this.childKey })
    }

    setRight(right) {
        let newNode = { ...this.node, right }
        return new Zipper(newNode, { parent: this.parent, childKey: this.childKey })
    }

    setValue(value) {
        let newNode = {...this.node, value }
        return new Zipper(newNode, {parent: this.parent, childKey: this.childKey})
    }

    value = () =>  this.node.value

    up() {
        if (this.isRoot) return null;

        return new Zipper(
            {
                ...this.parent.node,
                // rewrite `left` or `right` paretn key to point to the
                // current iteration of `this.node` (because it may have
                // changed since we descended)
                [this.childKey]: this.node,
            },
            {
                parent: this.parent.parent,
                childKey: this.parent.childKey
            })
    }

    get isRoot() {
        return !this.parent
    }

    // returns the top-most node (ie, the full tree)
    toTree() {
        let pos = this
        while (!pos.isRoot) {
            pos = pos.up()
        }
        return pos.node
    }

}