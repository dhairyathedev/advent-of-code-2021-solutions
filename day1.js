const arr = [1, 2, 4, 5, 8]
let count = 1

for (let i = 1; i < arr.length; i++) {
		const increaseCheck = arr[i] > arr[i-1]
		if(increaseCheck){
				count++			
		}
}
console.log(count-1)
