# Execution Context

> Execution Context, abbreviated form EC, is an abstract concept used by `ECMA-262` specification for **typitication** and **differenciation** of an execution code.  

> In layman's term, Execution Context roughly equates to the `environment` that the JavaScript code is executing in.  

The standard doesn't define the accurate structure of EC. Logically, set of EC form a `stack`. The bottom of the `stack` is `global execution context`. The top is the `active execution context`. The stack would be modified by push or pop during entering or exiting various kinds of EC.  

## Types of EC
There are 3 types of EC: *Global*, *Function* and *Eval*.  

To make things clear, we could define the stack of execution context as an array:  
``` js
// Pseudo-code
ExecutionContextStack = [];
```  
A new EC would be pushed into the stack every time one entering a function, even if the function is called **recurssively** or as **constructor**. Also the `eval` function can also trigger a push-in under unusual circumstances.  

### Global  
The EC generated at `Program` level. For example, load extenal `.js` files or run code inside the `<script></script>`. So it looks like an initialization:  
```js
// Pseudo-code
ExecutionContextStack = [
    GlobalContext
];
```

### Function  
The stack would be pushed into a new elements when entering a new function showed as following:    
```js
function foo(tag) {
    if (tag) {
        return;
    }
    foo(true);
}
foo(false);
```
The ECStack would be modified:  
```js
// Pseudo-code

// First activation
ExecutionContextStack = [
    <foo> FunctionContext,
    GlobalContext
];

// Recurssively activation
ExecutionContextStack = [
    <foo> FunctionContext, // Recurssively
    <foo> FunctionContext,
    GlobalContext
];
```  

Besides, every `return` of a function would exit the current execution context, and ECStack would do the pop behavior accordingly. After all this code finished, ECStack would contain `GlobalContext` only. So if there is a endless recurssive function, the function's execution context will be pushed into ECStack unceasingly until exceeding the `Maximum call stack size`. That's the reason why **Stack Overflow**.  

### Eval  
There are something different when calling a `eval` function. In this case, there is a new concept of `calling context`.  
```js
eval('var x = 1');
(function foo() {
    eval('var y = 2');
})();
console.log(x); // 1
console.log(y); // "y" is not defined
```

The ECStack would be modified like following:  
```js
// Pseudo-code

// Initialization
ExecutionContextStack = [
    GlobalContext
];

// eval('var x = 1');
ExecutionContextStack = [
    {
        context: evalContext,
        callingContext: GlobalContext
    },
    GlobalContext
];

// exit eval('var x = 1');
ExecutionContextStack = [
    GlobalContext
];

// call foo()
ExecutionContextStack = [
    <foo> FunctionContext,
    GlobalContext
];

// eval('var y = 2');
ExecutionContextStack = [
    {
        context: evalContext,
        callingContext: <foo> FunctionContext
    },
    <foo> FunctionContext,
    GlobalContext
];

// exit eval('var y = 2');
ExecutionContextStack = [
    <foo> FunctionContext,
    GlobalContext
];

// foo() return
ExecutionContextStack = [
    GlobalContext
];
```

:::warning ALWAYS avoid using eval()
`eval()` is a dangerous function because it executes the code with the privileges of the caller! It could be affected by a malicious party.  
`eval` is slower than the alternatives because it has to invode the JavaScript interpreter. While others are optimized by modern JS engines. Modern JS engines convert javascript to machine code.  
The [window.Function()][2] can replace `eval()`.
:::

# EC Lifecycle
Generally, we divide the EC life cycle into 3 parts: Creating, Execution and Termination.  

## VO and AO
We had better learn about what is VO(**V**ariable **O**bject) and AO(**A**ctivation **O**bject) to help us comprehend the lifecycle better.  
**VO** is an object storing the **identifiers** can be visited in EC, including:  
* arguments object
* Key-Value of Arguments and parameters
* Function declaration
* Variable declaration
* this  

**AO** is an object generated from VO. Once creating a new EC or entering a function, **AO** would be created with all elements come from VO.
:::warning VO and AO are both spec
The concepts of VO and AO exist in the specification only. According to specification, we cannot visit the data from **VO** because of JavaScript engine. We can only visit data from **AO** once we enter a function. It looks like something has be triggered. That's why we call it **activation object**.  
We seldom use both after ES5! We should learn [Lexical & Variable Environment][3] more.
:::

## Compile Stage
Compile Stage - creating stage will do the following work:  
* Create **Scope Chain**
* Create AO from VO:  
    * Create arguments object
    * Create Key-Value of arguments and parameters
    * Create function declaration
    * Create variable declaration
* Create this

There is something interesting here: 
1. Variable and Function **hoisting**.
2. [Lexical environment and Variable environment][3];

To learn more about hoisting, we should recognize that JavaScript will do `compiling` before executing. When JavaScript do the compiling, it will hoist the **function** or **variable** with `var` keyword.  

Look over **variable** hoisting firistly:  
```js
console.log(a); // undefined
console.log(b); // Uncaught ReferenceError: b is not defined
var a = 1;
let b = 2;
console.log(a); // 1
console.log(b); // 2
```
The `var` will hoist the declaration the identifier to the front-most of the code but `let` not.  

---

Then we look over **function** hoisting:
```js
console.log(foo1); // [Function: foo1]
foo1(); // 1

console.log(foo2); // undefined
foo2(); // Uncaught TypeError: foo2 is not a function

console.log(foo3); // Uncaught TypeError: foo3 is not a function
foo3(); // Uncaught TypeError: foo3 is not a function

function foo1() {
    console.log(1);
}
var foo2 = function() {
    console.log(2);
}
let foo3 = function() {
    console.log(3);
}
```
JavaScript engine scans the whole code before executing. When it find the `function` declaration, it will hoist it. As for `foo2`, the JS engine would regard it as a variable. So it would only hoist it with initial value `undefined`.  

The reason why we need hoisting is very interesting. It's easy to comprehend why we need hoisting in `function` - if we want to invoke a function, we must create it before. And this feature would not cause too many problems. However, hoisting a `variable` is really a bad idea. It would pollute global object and confuse programmer. Maybe we can glimpse the attitude according to Branden's twitter:  
![Image][3]

[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
[3]: ../.vuepress/public/assets/img/whyHoist.png