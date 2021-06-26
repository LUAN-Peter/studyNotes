# Union Find
```js
class UF {
    constructor(n) {
        this.parents = new Array(n).fill(0).map((val, id) => id);
        this.count = n;
    }
    find(i) {
        let temp = this.parents[i];
        if (temp == i) {
            return i;
        } else {
            this.parents[i] = this.find(temp);
            return this.parents[i];
        }
    }
    union(a, b) {
        let aP = this.find(a);
        let bP = this.find(b);
        if (aP != bP) {
            this.parents[aP] = bP;
            this.count--;
        }
        return;
    }
    isConnected(a, b) {
        return this.find(a) === this.find(b);
    }
}
```