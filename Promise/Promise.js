function isFunction (obj) {
    return typeof obj === 'function';
}
function isObject (obj) {
    return !!(obj && typeof obj === 'object');
}
function isPromise (obj) {
    return obj instanceof Promise;
}
function isThenable (obj) {
    return (isFunction(obj) || isObject(obj)) && 'then' in obj;
}
function transition (promise, state, result) {
    // 一旦变成非 pending 状态，就不可逆
    if (promise.state !== 'pending') return;
    promise.state = state;
    promise.result = result;
    setTimeout(() => promise.callbacks.forEach(callback => handleCallback(callback, state, result)));
}
function resolvePromise (promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    } 
    if (isPromise(result)) {
        return result.then(resolve, reject);
    } 
    if (isThenable(result)) {
      try {
        let then = result.then;
        if (isFunction(then)) {
          return new Promise(then.bind(result)).then(resolve, reject);
        }
      } catch (error) {
        return reject(error);
      }
    }
    resolve(result);
}
function handleCallback (callback, state, result) {
    let { onFulfilled, onRejected, resolve, reject } = callback;
    try {
        if (state === 'fulfilled') {
            isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
        } else if (state === 'rejected') {
            isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
        }
    } catch (e) {
        reject(e);
    }
}
class Promise {
    constructor (executor) {
        this.state = 'pending';
        this.result = undefined;
        this.callbacks = [];
        let onFulfilled = value => transition(this, 'fulfilled', value);
        let onRejected = reason => transition(this, 'rejected', reason);
        // 保证 resolve 或 reject 只有一次调用
        let flag = false;
        let resolve = value => {
            if (flag) return;
            flag = true;
            resolvePromise(this, value, onFulfilled, onRejected);
        };
        let reject = reason => {
            if (flag) return;
            flag = true;
            onRejected(reason);
        };
        try {
           executor(resolve, reject); 
        } catch (e) {
            reject(e);
        }
    }
    then (onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            let callback = { onFulfilled, onRejected, resolve, reject };
            if (this.state === 'pending') {
                this.callbacks.push(callback);
            } else {
                setTimeout(() => {
                    handleCallback(callback, this.state, this.result);
                });
            }
        });
    }
    catch (onRejected) {
        this.then(undefined, onRejected);
    }
    // 无论成功还是失败都会执行，一般都会传递前一个 promise 的状态，只有在 onFinally 抛出错误（显示抛出或 reject）的时候才会返回一个 rejected 的 promise
    finally (onFinally) {
        return this.then(
            val => Promise.resolve(onFinally()).then(() => val),
            rea => Promise.resolve(onFinally()).then(() => { throw rea; })
        );
    }
    static resolve (value) {
        if (isPromise(value)) return value;
        return new Promise ((resolve, reject) => resolve(value));
    }
    static reject (reason) {
        return new Promise ((resolve, reject) => reject(reason));
    }
    // 当所有 promise 都返回 fulfilled 的时候，它才会返回一个 fulfilled 的 promise，里面包含了对应结果的数组，否则只要一个 promise 返回 rejected，它就会返回一个 rejected 的 promise，其中包含第一个 rejected 的 promise 抛出的错误信息
    static all (iterable) {
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
    // 只要有一个 promise 返回 fulfilled 或 rejected，它就会返回一个 fulfilled 或 rejected 的 promise
    static race (iterable) {
        return new Promise ((resolve, reject) => {
            for (const p of iterable) {
                p.then(resolve, reject);
            }
        });
    }
    // 当所有 promise 都 fulfilled 或 rejected 后，返回一个包含对应结果的数组
    static allSettled (iterable) {
        return new Promise ((resolve, reject) => {
            let count = 0;
            let arr = [];
            function handle (state, index, result) {
                arr[index] = {
                    status: state,
                    [state === 'fulfilled' ? 'value' : 'reason']: result
                };
                count++;
				if (count === iterable.length) {
                    resolve(arr);
                }
            }
            for (let i = 0, l = iterable.length; i < l; i ++) {
                iterable[i].then(val => handle ('fulfilled', i, val), rea => handle ('rejected', i, rea));
            }
        });
    }
    // 只要有一个 promise 成功，就会返回一个成功的 promise，否则返回一个 AggregateError 类型实例的失败 promise
    static any (iterable) {
        return new Promise ((resolve, reject) => {
            let count = 0;
            let arr = [];
            for (let i = 0, l = iterable.length; i < l; i ++) {
                iterable[i].then(resolve, rea => {
                    count++;
                    arr[i] = rea;
                    if (count === l) {
                        reject(new AggregateError(arr));
                    }
                });
            }
        });
    }
}
