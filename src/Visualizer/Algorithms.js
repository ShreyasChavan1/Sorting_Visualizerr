//mergesort
export const Mergesort = async (array, visualiseArray) => {
    const auxArray = [...array];
    await mergesortHelper(array, 0, array.length - 1, auxArray, visualiseArray);
  };
  
  const mergesortHelper = async (mainarray, start, end, aux, visualiseArray) => {
    if (start >= end) return; 
  
    let mid = Math.floor((start + end) / 2);
    
   
    await mergesortHelper(aux, start, mid, mainarray, visualiseArray);
    await mergesortHelper(aux, mid + 1, end, mainarray, visualiseArray);
    
    await merge(mainarray, start, mid, end, aux, visualiseArray);
  };
  
  const merge = async (mainarray, start, mid, end, aux, visualiseArray) => {
    let i = start; 
    let j = mid + 1; 
    let k = start; 
  
    while (i <= mid && j <= end) {
      if (aux[i] <= aux[j]) {
        mainarray[k++] = aux[i++];
        await visualiseArray(k - 1, mainarray[k - 1],i-1,mainarray[i -1 ],true);
      } else {
        mainarray[k++] = aux[j++];
        await visualiseArray(k - 1, mainarray[k - 1],j - 1,mainarray[j -1],true);
      }
      
    }
  
    while (i <= mid) {
      mainarray[k++] = aux[i++];
      await visualiseArray(k - 1, mainarray[k - 1],i-1,mainarray[i -1 ],false);
    }
  
    while (j <= end) {
      mainarray[k++] = aux[j++];
      await visualiseArray(k - 1, mainarray[k - 1],j - 1,mainarray[j -1],false);
    }
  
    console.log(`Merged: ${mainarray.slice(start, end + 1)}`);
  };

// -------------------------------------------------------------------------------------------------------------------------------------------
  

//quicksort
  export const Quicksort = async (mainarray, visualiseArray) => {
    let low = 0;
    let high = mainarray.length - 1;
    await quicksorthelper(mainarray, low, high, visualiseArray);
  };
  
  const quicksorthelper = async (mainarray, low, high, visualiseArray) => {
    if (low >= high) return; 
  
    const partitionIndex = await quick(mainarray, low, high, visualiseArray);
   
    await quicksorthelper(mainarray, low, partitionIndex - 1, visualiseArray);
    await quicksorthelper(mainarray, partitionIndex + 1, high, visualiseArray);
  };
  
  const quick = async (mainarray, low, high, visualiseArray) => {
    let pivotIndex = low; 
    let pivotValue = mainarray[pivotIndex];
    let i = low + 1;
    let j = high;
  
    while (i <= j) {
      while (i <= high && mainarray[i] <= pivotValue) i++;
      while (j >= low && mainarray[j] > pivotValue) j--;
  
      if (i < j) {
       
        let temp = mainarray[i];
        mainarray[i] = mainarray[j];
        mainarray[j] = temp;
        
        await visualiseArray(i, mainarray[i], j, mainarray[j], true);
      }
    }
    
    let temp = mainarray[low];
    mainarray[low] = mainarray[j];
    mainarray[j] = temp;
    
    await visualiseArray(low, mainarray[low], j, mainarray[j], true);
  
    return j;
  };
  
  
// -------------------------------------------------------------------------------------------------------------------------------------------

//Heapsort
export const Heapsort = async(mainarray,visualiseArray)=>{
  let size = mainarray.length;

  for(let i = Math.floor(size/2) - 1; i >= 0; --i) {
    await heapify(mainarray,size,i,visualiseArray);
  }

  for(let j = size-1 ; j >0 ; --j){
    let temp = mainarray[0];
    mainarray[0] = mainarray[j];
    mainarray[j] = temp;

    await visualiseArray(0,mainarray[0],j,mainarray[j],true);
    await heapify(mainarray,j,0,visualiseArray);
  }
}

const heapify = async(mainarray,size,i,visualiseArray) => {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;
  if(left < size && mainarray[left] > mainarray[max]){
    max = left;
  }
  if(right < size && mainarray[right] > mainarray[max]){
    max = right;
  }
  if(max !== i){
    let temp = mainarray[i];
    mainarray[i] = mainarray[max];
    mainarray[max] = temp;
    await visualiseArray(i,mainarray[i],max,mainarray[max],true);

    await heapify(mainarray,size,max,visualiseArray);
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------

//quadratic ones
// bubble sort EZ!
export const Bubblesort = async(mainarray,visualiseArray) =>{
  let n = mainarray.length;
  for(let i = 0; i < n-1 ;i++){
    let isswaped = false;
    for(let j = 0 ; j < n - i - 1 ; j++){
      if(mainarray[j] > mainarray[j+1]){
        let temp = mainarray[j];
        mainarray[j] = mainarray[j+1];
        mainarray[j+1] = temp;
        
        isswaped = true;
        await visualiseArray(j,mainarray[j],j+1,mainarray[j+1],true);
      }
    }
    if(!isswaped) break;
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------

//Selection sort EZ!
export const Selectionsort = async(mainarray,visualiseArray) =>{
  let n = mainarray.length;
  let min = 0;
  for(let i = 0;i < n - 1;i++){
    min = i;
    for(let j = i + 1; j < n ;j++){
      if(mainarray[j] < mainarray[min]){
        min = j;
      }
    }
    
      let temp = mainarray[i];
      mainarray[i] = mainarray[min];
      mainarray[min] = temp;

      await visualiseArray(i,mainarray[i],min,mainarray[min],true);
    
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------


//insertionsort
export const Insertionsort = async(mainarray,visualiseArray)=>{
  let n = mainarray.length;
  let key;
  for(let i = 1 ; i < n ;i++){
    key = mainarray[i];
    let j = i - 1;
    while(j >= 0 && mainarray[j] > key){
      mainarray[j + 1] = mainarray[j];
      await visualiseArray(j + 1, mainarray[j + 1], j, mainarray[j], true);
      j--;
    }
    mainarray[j + 1]  = key;
    await visualiseArray(j + 1, key, i, mainarray[i], false);
  }
}

// -------------------------------------------------------------------------------------------------------------------------------------------

//shakersort
export const Shakersort = async(mainarray,visualiseArray)=>{
  let l = 0;
  let r = mainarray.length - 1;
  let swapped;
  do{
    swapped = false;
    for(let i = l;i < r;i++){
      if(mainarray[i] > mainarray[i + 1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i + 1],mainarray[i]];
        swapped = true;
        await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],true);
      }
    }
    r--;
    for(let j = r; j > l ;j--){
      if(mainarray[j] < mainarray[j - 1]){
        [mainarray[j],mainarray[j - 1]] = [mainarray[j - 1],mainarray[j]];
        swapped = true;
        await visualiseArray(j,mainarray[j],j - 1,mainarray[j- 1],true);
      }
    }
    l++;
  }while(swapped);
 
}

// -------------------------------------------------------------------------------------------------------------------------------------------

//pancake sort ?


async function flip(arr, k, visualiseArray) {
  let left = 0;
  while (left < k) {
      [arr[left], arr[k]] = [arr[k], arr[left]];

      // Visualize the flipping process
      await visualiseArray(left, arr[left], k, arr[k], true);

      k--;
      left++;
  }
}

async function max_index(arr, k) {
  let index = 0;
  for (let i = 1; i < k; i++) {
      if (arr[i] > arr[index]) {
          index = i;
      }
  }
  return index;
}

export async function Pancakesort(arr, visualiseArray) {
  let n = arr.length;
  while (n > 1) {
      let maxdex = await max_index(arr, n);

      if (maxdex !== n - 1) {
          
          await flip(arr, maxdex, visualiseArray);

         
          await flip(arr, n - 1, visualiseArray);
      }

      n--;
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------
//oddevensort
export const Oddevensort = async(mainarray,visualiseArray) =>{
  let n = mainarray.length;
  let sorted = false;
  while(!sorted){
    sorted = true;
    for(let i = 1 ; i < n - 1 ; i+=2){
      if(mainarray[i] > mainarray[i+1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i+1],mainarray[i]];
        sorted = false;
        await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],true);
      }
    }

    for(let i = 0; i < n - 1; i+=2){
      if(mainarray[i] > mainarray[i+1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i+1],mainarray[i]];
        sorted = false;
        await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],true);
      }
    }
  }
}

// -------------------------------------------------------------------------------------------------------------------------------------------
export const Bitonicsort = async (arr, visualiseArray) => {
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
                         
                          await visualiseArray(i, arr[i], l, arr[l], true);
                      }
                  }
              }
          }
      }
  for (let i = 0; i < n; i++) {
      await visualiseArray(i, arr[i], undefined, undefined, false); // Force final visualization
  }
};
//pending debugging