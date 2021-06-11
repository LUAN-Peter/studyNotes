# Greedy Algorithm

> Greedy 'algorithm' is a strategy or a thought instead of a certain algorithm in my opinion. We choose the optimal choice at every step so as to find the overall optimization.  
While in most cases, greedy algorithm is not suitable. So we always have to prove the effectiveness of greedy algorithm. As we know, **Huffman Coding** and **Dijkstra's Algorithm** are famous greedy algorithm.  

## Rabbits in Forest
[to LeetCode 781][1]
> In a forest, each rabbit has some color. Some subset of rabbits (possibly all of them) tell you how many other rabbits have the same color as them. Those answers are placed in an array.  
Return the minimum number of rabbits that could be in the forest.  
**Input**: \[1, 1, 2\]  
**Output**: 5  

![Image][2]
### Thinking: 
The problem need the minimum number of rabbits. After analyzation, we can deduct that there should be at least `n + 1` rabbits have same color, if there are `n + 1` rabbits said have seen `n` same color. This step can 'utilize' the rabbits given mostly, or to say to minimize the 'potential' rabbits. In the program, we can build up a **Hash Map**. If a tuple has accumulates to the certain value, we can sum it up to result and delete it.  
Actually, the step judging the accumulation is trivial. The Official solution has a better method. Firstly, we just need to group rabbits with the same value into smae group, and record their number. Then if there are `x` rabbits answer `y`, we have $number_{min}=\lceil\frac{x}{y+1}\rceil\times(y+1)$. The first part $\lceil\frac{x}{y+1}\rceil$ is the number of color among those rabbits answer `y`. And the second part $y+1$ is the number of rabbits of every color. In this case, we have `Solution B`.

### Solution A: 
```js
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    const map = new Map();
    let result = 0;
    for (const answer of answers) {
        map.set(answer, map.get(answer) + 1 || 1);
        if (map.get(answer) == answer + 1) {
            result += answer + 1;
            map.delete(answer);
        }
    }
    for (let key of map.keys()) {
        result += key + 1;
    }
    return result;
};
```
### Solution B:
```js
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    const map = new Map();
    let result = 0;
    for (const answer of answers) {
        map.set(answer, map.get(answer) + 1 || 1);
    }
    for (let [key, value] of map.entries()) {
        result += Math.ceil(value / (key + 1)) * (key + 1);
    }
    return result;
};
```

[1]: https://leetcode-cn.com/problems/rabbits-in-forest/
[2]: /assets/img/rabbit.png