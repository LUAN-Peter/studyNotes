# Other

## Brick Wall
[to LeetCode 554][1]
> There is a rectangular brick wall in front of you with n rows of bricks. The **i-th** row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.  
Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.  
Given the 2D array wall that contains the information about the wall, return the minimum number of crossed bricks after drawing such a vertical line.  
**Input**: \[\[1, 2, 2, 1\], \[3, 1, 2\], \[1, 3, 2\], \[2, 4\], \[3, 1, 2\], \[1, 3, 1, 1\]\]  
**Output**: 2  

![Image][2]

### Thinking: 
Maybe we change our mind. Transform the least bricks to the most brick, as `least_bricks = height - most_gaps`. So we can build up a `Hash Map` to record the number of gaps in different postions. We can maintain the `Max_gaps` to acquire result quickly.

### Solution: 
```js
/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
    const gapsMap = new Map();
    let maxGaps = 0;
    for (const w of wall) {
        let wide = 0;
        for (let i = 0; i < w.length - 1; i++) {
            brick = w[i];
            wide += brick;
            if (gapsMap.has(wide)) {
                gapsMap.set(wide, gapsMap.get(wide) + 1);
            } else {
                gapsMap.set(wide, 1);
            }
            maxGaps = Math.max(gapsMap.get(wide), maxGaps);
        }
    }
    return wall.length - maxGaps;
};
```

[1]: https://leetcode-cn.com/problems/brick-wall/
[2]: ../.vuepress/public/assets/img/brickWall.png