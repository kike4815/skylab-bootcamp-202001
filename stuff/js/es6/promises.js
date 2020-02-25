new Promise((resolve, reject) => 
    resolve('ok')
    //reject(new Error('hola mundo'))
)
    .then(console.log) // ok
    .then(() => 1)
    .then(console.log) // 1
    .then(() => { throw 2 })
    .then(console.log)
    .then(() => 3)
    .catch(console.error) // 2 red
    .then(console.log) // undefined
    .then(() => 4)
    .then(v => v + 1)
    .then(v => v * 10)
    .then(console.log) // 50
    .then(v => v > 50 && (() => { throw 5 })())
    .catch(console.error)
    .then(console.log) // false
    .then(v => v * 10)
    .then(console.log) // NaN
    .then(() => Promise.resolve(5))
    .then(v => v * 1000)
    .then(console.log) // 5000
    .then(() => Promise.reject(6))
    .then(v => v / 10)
    .catch(console.error) // 6
    .then(() => new Promise((resolve, reject) => setTimeout(() => resolve(7), 3000)))
    .then(console.log) // 7 3s later
    .then(() => fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=gold'))
    .then(res => res.json())
    .then(console.log) // [...]
    .then(() => new Promise((resolve, reject) => setTimeout(() => resolve(8), 2000)))
    .then(console.log) // 8 2s later
