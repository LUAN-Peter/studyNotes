# Dynamic Optimisation

> Once a quiz refers to dynamic programming, it must be 'Medium' level in LeetCode at least. But I failed to finishing `0 - 1 knapsack` just now. It's really annoying. It's time to make the end. If sub-problems can be nested recursively inside larger problem - which means dynamic programming is applicable, then there is a relationship between the value of large problem and the value of sub-problem. Just like the equation $dp[i + 1] = a\times dp[i] + b$.  
This method is vital with realistic significance. For instances, we could find the shortest path in a particular map, or calculate how to combine various coupons to acquire maximum discount when we buy something in Taobao.
[Wiki][1][XiaoWu][7]

## 0 - 1 Knapsack Problem
[to Wiki][2]  
[to GeeksForGeeks][3]
> Given weights and values of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. In other words, given two integer arrays `val[0, ..., n - 1]` and `wt[0, ..., n - 1]` which represent values and weights associated with n items respectively. Also given an integer `W` which represents knapsack capacity, find out the maximum value subset of `val[]` such that sum of the weights of this subset is smaller than or equal to `W`. You cannot break an item, either pick the complete item or don’t pick it (That' why we call **0 - 1 property**).  
**Input**: W = 50, value = \[60, 100, 120\], weight = \[10, 20, 30\]  
**Output**: 220  

### Thinking:  
To solve a dynamic optimisation problem. We'd better analyze the brute-force algorithm. In this situations, the brute-force algorithm is exhaustive search. Then we can seek for another way to 'optimisation'.  

**Brute-force algorithm**: 
Here provide the simplest solution. We consider calculating the total weight and value of all subsets. From all subsets, we pick the `maximum value` subset whose `total weight` is smaller than `W`. It's a bad methods. Time complexity is $O(n^3)$, $O(n^2)$ for acquire the all sub-sets and $O(n)$ for calculate the weight or value. And we need additional(auxiliary) $O(2^n)$ space to store all subsets. The code is `Solution 1`  

**Brute-force algorithm with Recursion**:
To consider all subsets of items, there can be 2 cases for every item:  
1. The item is included in the optimal set.
2. The item is NOT included in the optimal set.

Therefore, the maximum value can be obtained from `n` items is the max of the following  two values:  
1. Maximum value obtained by `n - 1` items and `W` weight. (Drop the $n^{th}$ item)  
2. Maximum value obtained by `n - 1` items plus the $n^{th}$ value and `W` minus the weight of the $n^{th}$ item. (Include the $n^{th}$ item)  
![Image][4]
It's hard to come up with this idea in the first time. We may forget it even in nervous rack. But it doesn't matter. Just remember this model and try to transform other problem into this model. As practising more, we would be skillful. Theoretically, the time complexity of this method is $O(2^n)$. But we donnot need additional space. The auxiliary space should be `O(1)`. The code is `Solution 2`.  

**Dynamic programming**:
As the image above shows, we calculate the `Recursive(20, -1)` twice. The repetitive computation will be increased repadily as the data growing. In a word, the problem has **overlapping sub-problems** so that we can use dynamic optimisation.  
The core of dynamic optimisation is **recording the status** in order to use them again. When we need a particular data, if we haven't figured out, we just figure it out. While if we have, we just need to look it up. Mostly, the time complexity of look up a calculated data is `O(1)`. Sometimes, we need the additional space to store the status.  
In this case, we build up a 2-dimension array `dp[N][M]`. `N` means the total number of items, and `M` means the maximum weight(from `0` to `W - 1`). So `dp[i][j]` represents **if we take the first `i` items (start from 0) into consideration, and the maximum value should below or equal to `j`-weight, what is the maximum value could we achieve?**  
::: tip What kinds of data structrue can we use?
We can make a `Map` or `Table`. In my opinion, if we build up a `Map`, it is more likely a method of recursive with **pruning**. It's also brilliant but here we are talking about dynamic programming. So we turn to build up a `Table` finally.  
:::
It's easy to deduce the transition equation:  
<div style="text-align: center;">$dp[i][j]=Max\left\{
    \begin{aligned}
    dp[i-1][j] \\
    dp[i-1][j-weight[i]] + value[i]
    \end{aligned}
    \right\}.$</div> 
  
Then we should consider the boundaries and calculation direction. If `i < 0`, it means we do not choose anything and the `dp[i][j]` should be `0`. If `j < 0`, it means we have no weight left, and the `dp[i][j]` should be also `0`. We use **sentinel** to solve these boundary conditions.  
<div style="margin:auto;">
| W/N | 0 | 1  | 2 | 3 | 
| :--------: |:---| :--| :-- | :-- |
| **0** | 0 | 0 | 0 | 0 |
| **1** | 0 | 0 | 0 | 0 |
| **...** | 0 | 0 | 0 | 0 |
| **10** | 0 | 60 | 60 | 60 |
| **...** | 0 | 60 | 60 | 60 |
| **20** | 0 | 60 | Max(60, 100) | 100 |
| **...** | 0 | 60 | 100 | 100 |
| **30** | 0 | 60 | Max(100, 60 + 100) | Max(160, 120) |
| **...** | 0 | 60 | 160 | 160 |
| **40** | 0 | 60 | 160 | Max(160, 120 + 60) |
| **...** | 0 | 60 | 160 | 180 |
| **50** | 0 | 60 | 160 | Max(180, 100 + 120) |
</div>  

The time complexity is $O(NW)$, where `N` is the number of weight element and `W` is capacity. As we need a 2-dimension array, the auxiliary space is $O(NW)$. The code is `Solution 3`.

**Recursion with Memorization Search**: We have mentioned about using `Map` to store the record. And we could apply it in recursion. That is memorization search - an extension of recursive approach. The code is `Solution 4` and easy to comprehend.

**Dynamic Programming with Optimized Space Complexity**: Actually, only one one-dimension array is enough to solve the problem. According to the following formula:  
<div style="text-align: center;">$dp[i][j]=Max\left\{
    \begin{aligned}
    dp[i-1][j] \\
    dp[i-1][j-weight[i]] + value[i]
    \end{aligned}
    \right\}.$</div>  
| ![Image][5] | 
|:--:| 
| *Original Direction* |  
We can change the direction of filling the table to make sure the origin data will not be modified. And we only need the `left one` data and `upper data` while doing the transference.  
| ![Image][6] | 
|:--:| 
| *New Direction* |  
So we are able to compress the array into a one-dimension. The code is `Solution 5`.

### Solution 1: 
```js
// Brute-force Algorithm
function knapsacks(W, value, weight) {
    let allSet = (function () {
        let list = new Array(value.length).fill(0).map((v, i) => i);
        return tranverse(list);
    })();
    let max = 0;
    for (let one of allSet) {
        let sumWeight = one.reduce((a, x) => a += weight[x], 0);
        console.log(sumWeight);
        if (sumWeight > W) {
            continue;
        }
        let sumValue = one.reduce((a, x) => a += value[x], 0);
        max = Math.max(sumValue, max);
    }
    return max;
    // 获取一个集合的所有子集
    function tranverse(list) {
        const N = list.length;
        let result = [[]];
        for (let i = 0; i < N; i++) {
            let len = result.length;
            for (let j = 0; j < len; j++) {
                let temp = result[j].slice();
                temp.push(list[i]);
                result.push(temp);
            }
        }
        return result;
    }
}
let W = 50, value = [60, 100, 120], weight = [10, 20, 30];
let maxValue = knapsacks(W, value, weight);
console.log(maxValue);
```  

### Solution 2:  
```js
// Brute-force algorithm with Recursion
function knapsacks(W, value, weight) {
    let N = value.length;
    return recursive(W, N - 1);
    /**
     * @param {number} W: 还剩W可用
     * @param {number} N: 当前是前N个
     * @return {number}
     */
    function recursive(W, n) {
        // 如果超重了，或者递归到n < 0的情况了，那就不能再加重量了。
        if (W <= 0 || n < 0) {
            return 0;
        }
        // 如果就大于目标重量，那就不加(这个只是剪枝，删了也可以，因为会返回0)
        if (weight[n] > W) {
            return recursive(W, n - 1);
        }
        // 在两个值中选最大的：
        // 1. 选了n，因此要从W - weight[n]过来，这样至少留了weight[n]的空间
        // 2. 不选n, 从上一个过来就行
        return Math.max(recursive(W - weight[n], n - 1) + value[n], recursive(W, n - 1));
    }
}
let W = 50, value = [60, 100, 120], weight = [10, 20, 30];
let maxValue = knapsacks(W, value, weight);
console.log(maxValue);
```  

### Solution 3:
```js
// Dynamic Programming
function knapsacks(W, value, weight) {
    let N = value.length;
    // N + 1和W + 1多出来的那个是哨兵(Sentinel)，减少边界判断
    let dp = new Array(N + 1).fill(0).map((v, i) => new Array(W + 1).fill(0));
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= W; j++) {
            // 这个判断还是要的，万一j - weight[i - 1] < 0的话会报错的。
            // 注意我们加了一个哨兵，所以index变成i - 1了。
            if (weight[i - 1] > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i - 1]] + value[i - 1]);
            }
        }
    }
    return dp[N][W];
}
let W = 50, value = [60, 100, 120], weight = [10, 20, 30];
let maxValue = knapsacks(W, value, weight);
console.log(maxValue);
```  

### Solution 4:
```js
function knapsacks(W, value, weight) {
    let N = value.length;
    let map = new Array(N + 1).fill(0).map((v, i) => new Array(W + 1).fill(-1));
    for (let i = 0; i <= N; i++) {
        map[i][0] = 0;
    }
    for (let i = 0; i <= W; i++) {
        map[0][i] = 0;
    }
    return recursive(W, N);
    function recursive(W, n) {
        // 如果超重了，或者递归到n < 0的情况了，那就不能再加重量了。
        if (W <= 0 || n <= 0) {
            return 0;
        }
        if (map[n][W] != -1) {
            return map[n][W];
        }
        // 如果就大于目标重量，那就不加(这个只是剪枝，删了也可以，因为会返回0)
        if (weight[n - 1] > W) {
            mapmap[n][W] = recursive(W, n - 1);
            return map[n][W];
        }
        // 在两个值中选最大的：
        // 1. 选了n，因此要从W - weight[n - 1]过来，这样至少留了weight[n - 1]的空间(weight从0开始，跟Solution1有点不一样)
        // 2. 不选n, 从上一个过来就行
        map[n][W] = Math.max(recursive(W - weight[n - 1], n - 1) + value[n - 1], recursive(W, n - 1));
        return map[n][W];
    }
}
let W = 50, value = [60, 100, 120], weight = [10, 20, 30];
let maxValue = knapsacks(W, value, weight);
console.log(maxValue);
```  

### Solution 5:
```js
// Dynamic Programming with Optimized Space Complexity
function knapsacks(W, value, weight) {
    let N = value.length;
    let map = new Array(W + 1).fill(0);
    for (let i = 0; i < N; i++) {
        for (let j = W; j >= 0; j--) {
            if (j < weight[i]) {
                continue;
            }
            map[j] = Math.max(map[j], map[j - weight[i]] + value[i]);
        }
    }
    return map[W];
}
let W = 50, value = [60, 100, 120], weight = [10, 20, 30];
let maxValue = knapsacks(W, value, weight);
console.log(maxValue);
```

[1]: https://en.wikipedia.org/wiki/Dynamic_programming
[2]: https://en.wikipedia.org/wiki/Knapsack_problem
[3]: https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
[4]: ../.vuepress/public/assets/img/01knapsack1.png
[5]: ../.vuepress/public/assets/img/01knapsack2.png
[6]: ../.vuepress/public/assets/img/01knapsack3.png
[7]: https://www.cxyxiaowu.com/8536.html