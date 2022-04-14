// JS实现一个带并发限制的异步调度器
// 最大并发数为2
class Scheduler {
    
    constructor(maxNum){
      this.list = [];//用来承载还未执行的异步
      this.count = 0; //用来计数
      this.maxNum = maxNum
    }

    add(fn) {    
        this.count >= this.maxNum ? await new Promise((resolve) => { this.list.push(resolve) }) : "";
 
        this.count++;
    
        const result = await fn();
    
        this.count--;
    
        if (this.list.length > 0) {
        this.list.shift()();
        }
    
        return result;

    }
    // ...
  }
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  const scheduler = new Scheduler()
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
      .then(() => console.log(order))
  }
  
  addTask(1000, '1')
  addTask(500, '2')
  addTask(300, '3')
  addTask(400, '4')// output: 2 3 1 4
  // 一开始，1、2两个任务进入队列
  // 500ms时，2完成，输出2，任务3进队
  // 800ms时，3完成，输出3，任务4进队
  // 1000ms时，1完成，输出1
  // 1200ms时，4完成，输出4
  