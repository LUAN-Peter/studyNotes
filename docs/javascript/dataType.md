# JavaScript Data Types

> There is a question among all interviews: how many kinds of data types are there in JavaScript? I felt perplexed at first. People could always answer the properties or usages when there is a given data type. So I think it's necessary to collating overall.  

## Dynamic & Weak Type
JavaScript is a **dynamic** and **weak(loosely)** programming language. Dynamic means variables in JavaScript are not directly associated with any particular value type. As for weak or loosely property, there is no precise technical definition of what the terms mean actually. [Wiki][1] But generally, weak(loosely) programming language allow variables to change their types at compile-time, which can avoid most of the errors.  

<quadrantal-diagram />

## Data Types
The latest ECMAScript standard defines **9** types. Six of them are **primitives**. Two are **structural** types. Especially, there is one structural root primitive: **null**.
> In the Chinese version, it said that there are only **8** types. It excludes the **Function type** belonging to structural types. I think it is reasonable. Strictly to say, every Function constructor is derived from the Object constructor. Maybe the English one just focuses on the results of **typeof** operation.  

* Six **Data Types** are primitives:
    * undefined
    * Boolean
    * Number
    * String
    * BigInt
    * Symbol
* Two(or One) **Strutural Type(s)**. Someone may call them **Reference types**. But we should be **cautious** about it! Let me explain it later.
    * Object
    * Function (Remain Controversial)
* **Structural Root** Primitive:
    * null

::: warning Usage of typeof
The `typeof` function should be only used for the purpose of checking **Data Types**. It's pointless to check the **Strutural types**. And even when it comes to null, `typeof` would return `object` magically.  Maybe `instanceof` can help us to check those derived from `Object`. But there might still be misconceptions.
:::
```js
// A new type function referenced
function type(obj, showFullClass) {
    // 这一段不知道在干嘛
    if (showFullClass && typeof obj == 'object') {
        return Object.prototype.toString.call(obj);
    }
    // 很明显输出null，前一段null + ''变字符串，后一段转小写
    if (obj == null) {
        return (obj + '').toLowerCase();
    }
    // 对obj调用Object.prototype.toString()，返回[type, Object]
    let deepType = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    if (deepType == 'generatorfunction') {
        return 'function';
    }
    if (deepType.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/)) {
        return deepType;
    }
    if (typeof obj == 'object' || typeof obj == 'function') {
        return 'object';
    }
    return typeof obj;
}

class TEST {
    constructor() {
        this.val = 'Test Value'
    }
}
console.log(type(null))    // null
console.log(type(undefined))   // undefined
console.log(type([]))  // array
console.log(type(new TEST()))  // object
```
## Always pass by VALUE
I used to think data types are passed by value, while structural types by reference. Just like the code following:
```js
function changeObj(obj) {
    obj.val += 10;
}
let obj = { val: 10 };
changeObj(obj);
console.log(obj.val);    // 20
```
But I was wrong. JavaScript is **always** passed by value! When a variable refers to an object(or something derived from Object), the value is a **reference(or address)** to the object, which represents the location of the target instead of the 'real' target.  
Changing the value of a variable **never** changes the underlying primitive or object. It just points the variable to a new primitive or object. 
At the same time, changing a property of an object can do change the underlying object. It is saying:
```js
function testChange(obj1, obj2) {
    obj1 = { val: 1 };
    obj2.val = 1;
}
obj1 = {};
obj2 = {};
testChange(obj1, obj2);
// I change the value of a variable, and the underlying object is not changed.
// Obj1 point to a new Object, the older one may collected by GC(Garbage Collector)
console.log(obj1);  // {}
// I change the property of a variable, and the underlying object is changed.
console.log(obj2);  // { val: 1 }
```
We could learn more from [Is JavaScript a pass-by-reference or pass-by-value language?][2] or [JavaScript by reference vs. by value][3];

[1]: https://en.wikipedia.org/wiki/Strong_and_weak_typing
[2]: https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
[3]: https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value
