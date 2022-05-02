const { NotImplementedError } = require('../extensions/index.js')

const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  // rootNode
  constructor() {
    this.rootNode = null
  }
  root() {
    return this.rootNode
  }

  add(data) {
    function addWithin(node, data) {
      if (!node) {
        return new Node(data)
      }

      if (node.data === data) {
        return node
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data)
      } else {
        node.right = addWithin(node.right, data)
      }

      return node
    }

    this.rootNode = addWithin(this.rootNode, data)
  }

  has(data) {
    function search(node, data) {
      if (!node) {
        return false
      }

      if (node.data === data) {
        return true
      }

      return data < node.data
        ? search(node.left, data)
        : search(node.right, data)
    }

    return search(this.rootNode, data)
  }

  find(data) {
    function search(node, data) {
      if (!node) {
        return null
      }

      if (node.data === data) {
        return node
      }

      return data < node.data
        ? search(node.left, data)
        : search(node.right, data)
    }

    return search(this.rootNode, data)
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) {
        return null
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }

        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let maxFromLeft = node.left

        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right
        }
        node.data = maxFromLeft.data

        node.left = removeNode(node.left, maxFromLeft.data)

        return node
      }
    }

    this.rootNode = removeNode(this.rootNode, data)
  }

  min() {
    if (!this.rootNode) {
      return null
    }

    let min = this.rootNode
    while (min.left) {
      min = min.left
    }

    return min.data
  }

  max() {
    if (!this.rootNode) {
      return null
    }

    let max = this.rootNode
    while (max.right) {
      max = max.right
    }

    return max.data
  }
}
// const tree = new BinarySearchTree()

// tree.add(7)
// tree.add(1)
// tree.add(2)
// console.log(tree.find(5))
// console.log(tree.root())
module.exports = {
  BinarySearchTree,
}
