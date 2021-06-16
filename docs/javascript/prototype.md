# Prototype

According to the [MDN][1], prototypes are the mechanism by which JS objects inherit features from on another. There is a traditional version, which uses `function`, etc. Also, there is a modern one in [ECMAScript 2015][2] concerning `classes`.  

To have a better acquisition of these obscure concepts, we had better learn the [object][3] relative before.  

## Basis
JavaScript is described as a prototype-based language. To a certain object, it has `prototype` object, which is still an object. So this `prototype` object **maybe**(NOT always) has its own `prototype` object... This is refered to the `prototype chain`. As I said before, not every prototype object has opportunity to have another prototype object. In the most of cases, it will only have the `Object.prototype`, which means it is just inherits the Object. And the `Object.prototype` inherits nothing, which means it is the end of the `prototype chain`. By the way, how can we find the `prototype` of a certain object? We use `__proto__` here. It is complex here. So we need illustrations to clarify more clearly.

### Dull Clarification
This example is from MDN.
Here is a constructor of `Person()`, and we must familiar with it:
```js
function Person(first, last, age) {
    this.name = {
        'first': first,
        'last': last
    };
    this.age = age;
}
```
Here is an instance:
```js
let person1 = new Person('Peter', 'Luan', 20);
```
In this case, I would give what the prototype chain is firstly:  
$person1\rightarrow Person.prototype \rightarrow Object.prototype \rightarrow null$ and  
$Person\rightarrow Function.prototype \rightarrow Object.prototype \rightarrow null$.  
The $\rightarrow$ is `__proto__` in fact.
![Image][4]
The figure showing above has two prototype chains, with blue lines and red lines. The purple line is their same part, as `blue + red == purple`.  
In the first prototype chain, the strangest thing is we have not establish `Person.prototype` at all. In fact, it would be built up automatically when we declare the `consturctor`. There is nothing inside, except a pointer points to `Object.prototype`.  
In the second prototype chain, the constructor's `__proto__` point to `Function.prototype`. It's not confusing because the `Person` is **constructor function**. After you write down those code 'function Person ...', an instance of `Function` has been established. So the instance, or the function instance, will generate a pointer, named `__proto__` to point to the `Function.prototype`. 
::: tip Something about Function object
As the "JavaScript Ninja" saying, functions are first-class objects in JavaScript. (Use function like a variable)
* Can be stored in a variable, object, or array.
* Can be passed as an argument to a function.
* Returned from a function.

In my opinion, the function is just a entrance address so as to pass or store. According to [ECMAScript][5], if an Object realize the \[\[Call\]\] insides, it will be recognized as `Function` instead of `Object` by `typeof`
:::


## Analogy to Reality
Maybe it is still intricate. Well, make an analogy maybe help us comprehend this part better. As we seen, the `father class`, like `Object Class` above, has a construtor and a prototype. We can draw an analogy between the `father class` and `teacher`. The construtor is to generate a teacher, like the teacher in school, or Bond Education, whatever. And the `prototype` is the stuff teachers want to impart to their students. We can call it 'knowledge library'.  
For a certain student, or `student instance`, its `__proto__` point to the 'knowledge library' from teacher.

## ECMAScript 2015 Classes
According to ECMAScript 6.0(as MDN saying released in 2015), it provides a `class` syntax to JavaScript, which is easier and cleaner. It is similar to `class` in C++ or Java.  

::: warning Syntactic Sugar
But actually, 'class' writing style is just **syntactic sugar**.
:::  

To create a subclass, we can use `extend` keyword. Just like the code following:
```js
class Son extends Father {
  constructor(fatherName, fatherAge, name, age) {
    super(fatherName, fatherAge);
    this.name = name;
    this.age = age;
  }
}
let son1 = new Son('Tom', 50, 'Tomson', 20);
```  

There is something strange here. The `super()` looks unnatural. JavaScript engine won't intialized for the father class automatically. So we have to use `super` invoke the father class's constructor.  
To acknowledge more, we had better move to [JavaScript Inheritance][6].


[1]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
[2]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance#ecmascript_2015_classes
[3]: ./object
[4]: ../.vuepress/public/assets/img/prototype.png
[5]: https://tc39.es/ecma262/#sec-function-objects
[6]: ./inheritance