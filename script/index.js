const readline = require('readline')

console.log(process.argv)
console.log(process.env.NODE_ENV)

// 用于读取命令行参数的库 minimist
// 用于着色的库 chalk
// 用于展示进度条的库 progress
// 用于命令行操作的库 inquirer

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(`你叫什么名字?\n`, (name) => {
  console.log(`你好 ${name}!`)
  rl.close()
})
