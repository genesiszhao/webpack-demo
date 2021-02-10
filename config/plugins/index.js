const {
  SyncHook, // 同步钩子
  SyncBailHook, // 如果有返回值，下个钩子就不会继续执行了
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable')

class Listion {
  constructor() {
    // 初始化
    this.hooks = {
      go: new SyncHook(['address']),
    }
  }
  tap() {
    // 添加回调函数
    this.hooks.go.tap('class', (address) => {
      console.log(address)
    })
  }
  start() {
    this.hooks.go.call('c318')
  }
}

const listen = new Listion()
listen.tap()
listen.start()
