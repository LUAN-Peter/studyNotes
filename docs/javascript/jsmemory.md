# JavaScript Memory Management

Unlike the C/C++, we do not need to operate the memory on our own. The JavaScript engine allocates or frees memory automatically. But if we want to build up high-performanced Web application, we must have clear understanding it. Besides, it can help us understand the `Execution Logic of JavaScript` better.  
As for memory management, it should contains at least 3 parts:  
* Allocation of memory(Store).
* Usage of memory.
* Release or free memory has allocated. (Garbage Collection)  

Referenced by [MDN][1]  

## How allocate memory  
As mentioned before in [JavaScript Data Types][2], JavaScript is a **Dynamic & Weak** programming language, which means its variable can be interpreted as any type of data(Dynamic), and can be 'implicitly conversed' into another type(Weak). Besides, there are 2 data types of JavaScript: primitive or structural type.  
So here we throw the conclusion directly:  
* No matter what types of data they are, the memory always store bits like '...010...011...'.
* Primitive store in the **Stack**.
* Structural type data store in both **Stack** and **Heap**.  

::: tip Recognization of data type
I have read an article about the source code of v8 engine. It recognize the data type by the last few bits of data.  
For example, if the binary sequence is end with `000`, v8 engine will regard it as an `Object`. However, `null` is also end with `000`! That's the reason why `typeof null` would return `true`. The [strategy][3] is Hamming Code.  

ECMAScript has released a fixed [proposal][4] in 2016 while it has been rejected because of compability. 
:::

### Runtime Model
Runtime model consists of a **Stack Space**, **Heap Space** and **Queue Space**, as showing below: 
![Image][5]

**Stack**, also named as **Call Stack**, is used to store the `Executive Of Context(EOC)`.  
**Heap** is a bulk of storage that we store **Object** data. They may be disordered in a lower dimension.  
**Queue** is a list of messages need to be processed later. We would clarify in [Event Execution][8].  
For example, if we run the following code:  
```js
let name = 'Peter';
let n2 = name;
let obj = { name: 'Peter' };
```  
The stack will store the variables:  
![Image][6]  
Obviously, we store the address of the referenced in Stack and the real data are stored in the Heap. Hence, if we declare a new variable `obj2` and run `obj2 = obj`. `obj` will pass the `[addr]`(address) to `obj2`, which mean they are pointing to the same object! The image shows the procedure:
![Image][7]  

## Why need Stack & Heap Space
People may issue question like this: *can we store all data in stack space?* The answer is **Nope**. It is related to switching of **COE(Context of Execution)**. We modify our code a little:  
```js
let name = 'Mary';
function f() {
    let name = 'Peter';
    let n2 = name;
    let obj = { name: 'Peter' };
}
f();
```  
JavaScript will enter `f()`'s COE while executing `let obj = { name: 'Peter' };` in `f()`. The memory is shown like this: 
![Image][9]  
In the `f()`'s COE, the property `name` is `Peter` instead of `Mary`. Stack is used to maintain the property of COE. However, we have to do the garbage collection and recover after execution. We move the **Stack-top pointer** to the `Global COE` marking the current `evironment` -- another name of COE.   
Generally, the data in Heap can be arbitrarily huge. As a result, if we put them into the Stack, it would take a long time to do the recovery which would affect the execution of next function. Tackfully, if we keep them in Heap, we can recovery them when there is no urgent task.  

## Garbage Collection
> http://lkml.iu.edu/hypermail/linux/kernel/9608/0191.html

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[2]: ./dataType.html
[3]: https://2ality.com/2013/10/typeof-null.html
[4]: https://web.archive.org/web/20160331031419/http://wiki.ecmascript.org:80/doku.php?id=harmony:typeof_null
[5]: ../.vuepress/public/assets/img/MemoryStructure1.png
[6]: ../.vuepress/public/assets/img/MemoryStructure2.png
[7]: ../.vuepress/public/assets/img/MemoryStructure3.png
[8]: ./eventExec.html
[9]: ../.vuepress/public/assets/img/MemoryStructure4.png