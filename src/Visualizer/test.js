function getmax(arr,n){
    let max = 0;
    for(let i = 0 ; i < n ;i++){
      if(max < arr[i].toString().length){
        max = arr[i].toString().length;
      }
    }
    return max;
  }
  
  function getpos (num,place) {
        return Math.floor(Math.abs(num)/ Math.pow(10,place)) % 10;
  }
  //radix sort not so Ez !!!
function Radixsort (arr) {
    let n = arr.length;
    let max = getmax(arr,n);

    for(let i = 0; i < max ;i++){
        let bucket = Array.from({length : 10}, () => [ ]);
        for(let j = 0 ; j < arr.length ; j++){
            bucket[getpos(arr[j],i)].push(arr[j]);
        }
        arr = [ ].concat(...bucket);
    }
    return arr;
  }

const testArray = [34, 7, 23, 32, 5, 62, 8, 3];

// Execute bitonic sort on the array
const sortedArray = Radixsort([...testArray]); // Use a copy to preserve the original

console.log("Original Array:", testArray);
console.log("Sorted Array:", sortedArray);