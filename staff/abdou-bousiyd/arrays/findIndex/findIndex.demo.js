console.log('Demo findIndex')

//params
var nums = [5, 55, 20, 56, 20]
var callback = element => element > 50

//aray original

var data = nums.findIndex(callback)
console.log(data)

//array replica

var res = findIndex(nums, callback)

console.log(res)
