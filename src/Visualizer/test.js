function Bitonicsort(arr) {
  let n = arr.length;
  let k, j, l, i, temp;

      for (k = 2; k <= n; k *= 2) {
          for (j = k / 2; j > 0; j /= 2) {
              for (i = 0; i < n; i++) {
                  l = i ^ j;
                  if (l > i) {
                      if (
                          ((i & k) == 0 && arr[i] > arr[l]) ||
                          ((i & k) !== 0 && arr[i] < arr[l])
                      ) {
                          temp = arr[i];
                          arr[i] = arr[l];
                          arr[l] = temp;
                         
                          // console.log(`Swapping: ${arr[i]} with ${arr[l]}`); // Log for debugging
                      }
                  }
              }
          }
      }
      return arr;
  };

const testArray = [34, 7, 23, 32, 5, 62, 8, 3];

// Execute bitonic sort on the array
const sortedArray = Bitonicsort([...testArray]); // Use a copy to preserve the original

console.log("Original Array:", testArray);
console.log("Sorted Array:", sortedArray);