# Depth-first Search
> Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. [Wiki][1] Depth-first is more like a train of thought than a particular methods. Traverse a tree is a vivid example. How do we used to traverse a binary tree? We think of depth-first search or breadth-first search immediately. As for DFS, we move deeper **firstly** as always. That's why we call it depth-first.  
More importantly, DFS is easy to trace out the route. So we use it if the problem need us return the **path**.
<!-- //毋意，毋必，毋固，毋我。 ——《论语》 -->

## 2-Tree Pre/In/Post order Traversal
[to LeetCode 144][2]  
[to LeetCode 94][3]  
[to LeetCode 145][4]
> Given the `root` of a binary tree, return the **preorder / inorder / postorder** traversal of its nodes' values.  

### Thinking: 
No matter whether preorder or inorder or postorder traversal, they are all completed easily with DFS. 
Moreover, preorder traversal is used to display the path of a certain node which is used to **output the file path**. Inorder traversal is used to do the **calculation** in the underlying computer. Postorder traversal is useful in many scenerios as it can pass the node information after solving the left and right sub-trees. **Calculate the size of a file** is one of examples.  
There is no need to give unnecessary details about the primary solution which are Solution 1, 2, 3 respectively.  
![Image][5]

### Solution 1:
```js
// Preorder Traversal
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const result = [];
    dfs(root);
    return result;
    function dfs(head) {
        if (head == null) {
            return;
        }
        result.push(head.val);
        dfs(head.left);
        dfs(head.right);
    }
};
```

### Solution 2:
```js
// Inorder Traversal
var inorderTraversal = function(root) {
    const result = [];
    dfs(root);
    return result;
    function dfs(head) {
        if (head == null) {
            return;
        }
        dfs(head.left);
        result.push(head.val);
        dfs(head.right);
    }
};
```

### Solution 3:
```js
// Postorder Traversal
var postorderTraversal = function(root) {
    const result = [];
    dfs(root);
    return result;
    function dfs(head) {
        if (head == null) {
            return;
        }
        dfs(head.left);
        dfs(head.right);
        result.push(head.val);
    }
};
```

## Upgraded Inorder Traversal
> Same as above.

### Thinking: 
We can complete inorder traversal with `iteration method` instead of `recurssion`. Compared to recurssion, `iteration method` is hassle-free in `stack overflow` and execute faster.  
But in a realistic project, we had better choose recurssion when it comes to DFS. Recurssion is more legible and modified-easy.  
Here we use a stack to simulate the recurssive progress:  
1. Try to move to the leftest node, and record all the node on the tracing way.
2. Pop and output the top stack element. This element is the `left`. In this way, the new top stack element would be the `middle`.
3. Move to the right sub-tree so as to tracing the `right`.  
  
The code is **Solution 1**.
***  
The spacial complexity is still $O(n)$, and we can improve to $O(1)$ with `Morris Algorithm`. [Morris Traversal][6]
::: danger Be Cautious!
Morris traversal would change the structure of tree, though the algorithm would correct the pointer at last! Sometimes you may debug by printing out the binary tree, which may cause endless loop because of ring.
:::
The procedure is showing as below:  
![Image][7]
In a word, Morris traversal employ the recursion with a `predecessor` or `successor` instead of a stack. The procedure is similar to the ordinary iteration method. The code is **Solution 2**.

### Solution 1:
```js
// Iteration Version
var inorderTraversal = function(root) {
    if (root == null) {
        return [];
    }
    let result = [];
    let record = [];
    let index = root;
    while (index || record.length != 0) {
        while (index) {
            record.push(index);
            index = index.left;
        }
        index = record.pop();
        result.push(index.val);
        index = index.right;
    }
    return result;
};
```
```js
// Morris Algorithm
var inorderTraversal = function(root) {
    const result = [];
    let pre = null;
    let index = root;
    while (index) {
        if (index.left) {
            pre = index.left;
            while (pre.right && pre.right != index) {
                pre = pre.right;
            }
            if (pre.right == null) {
                pre.right = index;
                index = index.left;
            } else {
                result.push(index.val);
                index = index.right;
                pre.right = null;
            }
        } else {
            result.push(index.val);
            index = index.right;
        }
    }
    return result;
};
```  

## Deep Copy an Object
> A deep copy means the fields are dereferenced. When you change the `primitives` in the old object, the new object should not be changed. Also, we need to take the prototype chain into consideration.  

### Thinking:  
We should complete the algorithm with depth-first search template. And there are something we need to pay attention to:  
* What kinds of `data types` will be in an object? 
![Image][10]
According to [dataType][8], they will be **String**, **Number**, **Null**, **Undefined**, **Symbol**, **Boolean**, **BigInt**, **Object**. In these cases, we can return directly when the type is **String**, **Number**, **Null**, **Undefined**, **Boolean**, **BigInt**. When we solve the referenced variable, we perceive the difference among **Array**, **Map**, **Set**, **Function** and **Object**. If the variable is of **Function**, we pass it to the new object directly because only shall we need provide a entry. And we create a new instance and invoke the copy function recurrsively when meeting **Array**, **Map**, **Set**, **Function** and **Object** types.   
Okay, there is only **Symbol** type left. We have 2 strategy in fact: Create a new one, or use the old one. Here we choose the second strategy.  

::: tip Acquisition of fields
We had better acquire the iterator to acquire all fields of an object with method `Reflect.ownkeys()`. According to [MDN][9], `Reflect.ownKeys` returns an array of the target object's own property keys. Its return value is equivalent to `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`. `Object.getOwnPropertyNames(target)` can return all properties including those **non-enumerable**, except for **Symbol**. And `Object.getOwnPropertySymbols(target))` returns an array of all symbol properties upon a given object.
:::  

::: warning More about Function solution
1. Sometimes, we have to change `this` direction with `Function.prototype.bind()`. But I yet to figured out how to design gracefully.  
2. Do NOT forget **Generator** function!
:::  
* How to judge the type?  
We can use `Object.prototype.toString()` to detect object class and type as well. [MDN][11]

### Solution:
```js
let obj = {
    'str': 'myString',
    'list': [1, 2, 3],
    'mySymbol': Symbol('sym'),
    'subObj': {
        's': 'myString2',
        'list2': [4, 5, 6]
    },
    'map': new Map([
        ['old1', 'oldVal1'],
        ['old2', 'oldVal2']
    ]),
    'set': new Set(['old1', 'old2']),
    myFunc: () => console.log('This is myFunc'),
    myGenerator: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
}
obj.__proto__ = {
    "protoAttr": "Element in proto chain"
}
function duplicateObj(obj) {
    return dfs(obj);
    function dfs(obj) {
        let thisType = type(obj);
        if (thisType == 'object') {
            let newObj = {};
            for (let key of Reflect.ownKeys(obj)) {
                newObj[key] = dfs(obj[key]);
            }
            // 原型链修改
            newObj.__proto__ = obj.__proto__;
            return newObj;
        }
        if (thisType == 'array') {
            let newArray = [];
            for (const elem of obj) {
                newArray.push(dfs(elem));
            }
            return newArray;
        }
        if (thisType == 'map') {
            let newMap = new Map();
            for (const [tag, value] of obj.entries()) {
                newMap.set(dfs(tag), dfs(value));
            }
            newMap.__proto__ = obj.__proto__;
            return newMap;
        }
        if (thisType == 'set') {
            let newSet = new Set();
            for (const [tag, value] of obj.entries()) {
                newSet.add(dfs(value));
            }
            newSet.__proto__ = obj.__proto__;
            return newSet;
        }
        return obj;
    }
    function type(obj) {
        let realType = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        if (realType == 'generatorfunction') {
            return 'function';
        }
        return realType;
    }
}
let newObj = duplicateObj(obj);
console.log(newObj);
// 检测Symbol
console.log(newObj.mySymbol == obj.mySymbol);
// 检测原型链
console.log(newObj.protoAttr);
// 检测函数
newObj.myFunc();
// 检测生成器
let gen = newObj.myGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// 检测Map, Set
obj.map.set('newTag', 'newValue');
obj.set.add('new');
console.log("old: ", obj);
console.log("new: ", newObj);
```

[1]: https://en.wikipedia.org/wiki/Depth-first_search
[2]: https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
[3]: https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
[4]: https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
[5]: ../.vuepress/public/assets/img/binaryTree1.png
[6]: https://www.educative.io/edpresso/what-is-morris-traversal
[7]: ../.vuepress/public/assets/img/Morris.png
[8]: ../javascript/dataType.html#data-types
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
[10]: ../.vuepress/public/assets/img/behaviorsTypes.png
[11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class