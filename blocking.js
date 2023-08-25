// const fs = require('fs')

// const data = fs.readFileSync('./package.json', 'utf8')
// console.log(data)
// console.log("hi")

// Path: non-blocking.js

const fs = require('fs/promises')

// fs.readFile('./package.json', 'utf8').then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
const data = (async () => {
    const data = await fs.readFile('./package.json', 'utf8')
    console.log(data)
})
data()
console.log("hi")
