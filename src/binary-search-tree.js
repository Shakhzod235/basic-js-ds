const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.tree) {
      this.tree = newNode;
      return;
    }

    let current = this.tree;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.tree;
    while (current) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  find(data) {
    let current = this.tree;
    while (current) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }

  remove(data) {
    this.tree = this.removeNode(this.tree, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      let minRight = this.findMin(node.right);
      node.data = minRight.data;
      node.right = this.removeNode(node.right, minRight.data);
    }
    return node;
  }

  min() {
    if (!this.tree) {
      return null;
    }
    return this.findMin(this.tree).data;
  }

  max() {
    if (!this.tree) {
      return null;
    }
    return this.findMax(this.tree).data;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};