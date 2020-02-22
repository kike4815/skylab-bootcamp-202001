console.log('Demo find')

//params
var nums = [5, 12, 20, 44, 55, 67, 70];

// array original

var data = nums.find( element => element > 50 )
console.log(data)

//array replica

var result = find(nums, element => element > 20)
console.log(result)


