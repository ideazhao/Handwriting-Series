function promise_all (iterable) {
    return new Promise ((resolve, reject) => {
        let count = 0;
        let arr = [];
        for (let i = 0, l = iterable.length; i < l; i ++) {
            iterable[i].then(val => {
                count++;
                arr[i] = val;
                if (count === l) {
                    resolve(arr);
                }
            }, reject);
        }
    });
}