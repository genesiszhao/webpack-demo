process.nextTick(() => {
  // 下一个刻度之前执行
})

setImmediate(() => {})
// 约等于
setTimeout(() => {}, 0)
