# Process and Thread

The concepts of `process` and `thread` is developed gradually, so that we are confused a lot by different documents.

## Before 1960s
There is no `thread` at all. The process mean:  
1. The basic unit of dispatch and execution;
2. Ownership of resources including program context. Operation system will protect the owership to avoiding resource conflict.  

## After 1960s Before 2003
In 1967, IBM developed OS/360 and realized **Multiprogramming with a Variable Number of Tasks**. Operation system switch process by switching process context -- that's what we said **concurrency**. During this time, tasks looked like thread indeed. The term of thread alse made an early appearance. In this model, thread existed in the form of user-level-thread. Operation system did not aware of the existence of thread and still dispatched process.

## After 2003
Intel and AMD have found out a fact the growth of the CPU frequency barely improve the entire performance. The performance would even decreased because of overheating. We need a processor be able to solve more than 2 threads. In 2004, Pentium 4 realized Hyper-Threading. And in 2005, Intel announced its `EM64T` processor with **2 cores** and `Pentium D840`. Every core can solve more than one threads and thread and process became different totally.  
  
* Thread is basic unit of execution and dispatch;
* Process is the ownership or resources.  

## Why we need?

1. The creation, termination and switching overhead of a thread is much lower than a process's.
2. Due to sharing address space, the communication of threads is much more effient than processes'.  

| Per process items | Per thread items |
| :------------- |:-------------|
| Address space | Program counter |
| Global variables | Registers |
| Open files | Stack |
| Child processes | |
| Pending alarms | |
| Signals and signal handlers | |
| Accounting information | |

Besides, the processor is conscious of the existence of threads and dispatch them -- that's **Kernel mode** which is most prevalent model. So in the classical proceess-thread model - `kenel-level threads supported Unix`:
1. Process is **container** of resources, include at least one threads;  
2. The basic unit of Kernel dispatchment is **thread** instead of process; (I think I wrote this sentence 3 times ...)  
3. All threads in the same process share the **shared resouces**, including address space, open files, etc. But they maintain their own registers, stacks(about 1M), PC, etc.

## Important exception - Linux!
Linux is different from the classical model. The boundary between thread and process is pretty 'fuzzy'.  

### Linus' view

The [email][1] is from Linus in 1996. His main point is following:  
> There is NO reason to think 'threads' and 'processes' are separate entities. He thought the only difference is '**context of execution**'...  

> A "context of execution", hereby called COE, is just the conglomerate of all the state of that COE. That state includes things like CPU state (registers etc), MMU state (page mappings), permission state (uid, gid) and various "communication states" (open files, signal handlers etc).  

Anyway, the viewpoint of Linus was still somehow similar to the classical model at least in the sharing resource aspect.  

### Task instead of Process or Thread
In Linux OS, `task_struct` is the data structure represent both process and thread.
> Everything is simply a runnable task.  

In this way, a process with `single-thread` is represented by one `task_struct` while a process with `multi-thread` is represented by multiple `task_struct`.  

In 2000, Linux introduce a new system call `clone` which is similar to `fork`. But it can allocate the resource by the `thread` layer! This make their boundary more obscure. Because no matter what it is a process or thread, it is created by `clone` a `task` existed fundamentally. When `CLONE_VM` is set, there is a thread created. When `CLONE_VM` is NOT set, there is a process created.  

As for kernel of Linux, every task has its unique `PID(Process IDentifier)`, though it may be a thread in classical model. Also every task has a `TGID(Task Group ID)`. The threads in same process have the same `TGID`.
::: tip Why PID?
The name of PID(Process IDentifier) is too popular to be given up. And Linus did not regard thread and process as the different entities.
:::  

### TOP PS
The instuction `TOP`, `PS` return different `PID` really confused me a lot until I found this [answer][2].


## Reference:  
[进程和线程之间有什么根本性的区别? - by linH][2]  
[进程和线程之间有什么根本性的区别? - by Anonym][5]  
[进程和线程之间有什么根本性的区别? - by Bing][6]  
[If threads share the same PID, how can they be identified?][3]  
[指令级并行，线程级并行，数据级并行区别？线程的概念是什么？][4]  
[Concurrent Programming][7]

[1]: http://lkml.iu.edu/hypermail/linux/kernel/9608/0191.html
[2]: https://www.zhihu.com/question/44087187/answer/136188761
[3]: https://stackoverflow.com/questions/9305992/if-threads-share-the-same-pid-how-can-they-be-identified
[4]: https://www.zhihu.com/question/21823699/answer/111606716
[5]: https://www.zhihu.com/question/44087187/answer/96885903
[6]: https://www.zhihu.com/question/44087187/answer/1956524384
[7]: https://erlang.org/doc/getting_started/conc_prog.html