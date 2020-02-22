console.log('Demo filter')

// params
var a = [5, 12, 20, 44, 55, 67, 70];


//array original
var data = a.filter(ele => ele > 40)
console.log(data)

// array replica

var res = filter(a, ele => ele > 50)
console.log(res)
