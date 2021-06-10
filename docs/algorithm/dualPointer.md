# Dual Pointers
> Pointer stores the address value of data. In other words, it points to the location of the target data.


Sometimes we can use dual pointers(or two pointers) to simplify calculation. There are 2 kinds of techniques most widely used. The one is **Fast-Slow Pointers**, the other is **Collided Pointers**. But anyway, they just move in different direction, and the nature still not change.

## Trapping Rain Water
[to LeetCode 42][1]
> Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.  
**Input**: \[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1\]  
**Output**: 6  

![Image][2]  
### Thinking:
The maximum trapping water in position `i` depends on the minimum between the maximum on the left and right sides. Then we have `Volumn[i] = Max(0, Height[i] - Min(Max_left, Max_right))`. 


So we can use **Collided Pointers** to scan the array, and maintain the maximum. However, we should consider how to move the pointer next. I handle the smaller one between `left` and `right`.  


Here we prove the rationality. Assuming `height[left] < height[right]`, we have `Max_left < Max_right`, vice versa. To prove this step, just consider `Max_left = height[left]` and `Max_right = height[right]` at the beginning. So we can only assure the smaller's `left and right boundaries`. Then we add the smaller's capacity to the `result` and move it to the next one. After moving it, we update the maximum corresponding. During the process, the side(left or right) with maximum value pointed currently, also has the maximum. That is to say in formula: `height[left] < height[right] => Max_left < Max_right`, vice versa.  
And then it is kinds of mathmatical induction.
### Solution:
```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let result = 0;
    const N = height.length;
    let left = 0, right = N - 1;
    let maxLeft = height[left], maxRight = height[right];
    while (left <= right) {
        if (height[left] < height[right]) {
            result += Math.max(Math.min(maxLeft, maxRight) - height[left], 0);
            left++;
            maxLeft = Math.max(height[left], maxLeft);
        } else {
            result += Math.max(Math.min(maxLeft, maxRight) - height[right], 0);
            right--;
            maxRight = Math.max(height[right], maxRight);
        }
    }
    return result;
};
```

## Remove Duplicated Sorted Array 2
[to LeetCode 80][3]
> Given a **sorted** array nums, remove the duplicates in-place such that duplicates appeared at most **twice** and return the **new length**. Do not allocate extra space for another array; you must do this by modifying the input array in-place with **O(1)** extra memory.  
Clarification:  
Confused why the returned value is an integer, but your answer is an array?  
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller.  
**Input**: \[1, 1, 1, 2, 2, 3\]  
**Output**: 5, nums = \[1, 1, 2, 2, 3\]  

### Thinking:
We can deduct that if `nums[i] == nums[i - 2]`, the number of value in `i` position will be 2 or more, because it is a sorted array. So we can consider using **Fast-Slow Pointers** - to maintains a slow pointer and a fast pointer. The slow pointer records the position of the actual array we want to return, that is to say point to the end of the result array. Though we do not cut the array, can we still get the result from the first `slow` number of the array. The fast pointer records the position we are checking.

### Solution:
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    const N = nums.length;
    if (N <= 2) {
        return N;
    }
    let slow = 2, fast = 2;
    while (fast < N) {
        if (nums[fast] != nums[slow - 2]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
};
```



[1]: https://leetcode-cn.com/problems/trapping-rain-water/
[2]: https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png
[3]: https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/