function promise_race (iterable) {
    return new Promise ((resolve, reject) => {
        for (const p of iterable) {
            p.then(resolve, reject);
        }
    });
}