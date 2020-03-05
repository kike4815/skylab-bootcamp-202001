async function hello(name) {
    return name
}/**/

/*function hello(name) {
    return Promise.resolve(name)
}/**/

/*function hello(name) {
    return new Promise((resolve, reject) => {
       resolve(name)
    })
}/**/

/*async function hello(name) {
    throw new Error(name)
}/**/

/*function hello(name) {
    return Promise.reject(new Error(name))
}/**/

/*function hello(name) {
    return new Promise((resolve, reject) => {
       reject(new Error(name))
    })
}/**/

hello('Pepito').then(console.log).catch(console.error)