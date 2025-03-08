//mergesort

export const Mergesort = async (array, visualiseArray , setComparisons = ()=>{},setSwaps = () => {}) => {
  let comparisons = 0;
  let swaps = 0;
  const auxArray = [...array];
  await mergesortHelper(array, 0, array.length - 1, auxArray, visualiseArray,() => comparisons++,() => swaps++);
  for (let k = 0; k < array.length; k++) {
    await visualiseArray(k, array[k], null, null, false); 
  }
  setComparisons(comparisons);
  setSwaps(swaps);
};

const mergesortHelper = async (mainarray, start, end, aux, visualiseArray,incrementComparison,incSwaps) => {
  if (start >= end) return; 

  let mid = Math.floor((start + end) / 2);
  
 
  await mergesortHelper(aux, start, mid, mainarray, visualiseArray,incrementComparison,incSwaps);
  await mergesortHelper(aux, mid + 1, end, mainarray, visualiseArray,incrementComparison,incSwaps);
  
  await merge(mainarray, start, mid, end, aux, visualiseArray,incrementComparison,incSwaps);


};

const merge = async (mainarray, start, mid, end, aux, visualiseArray,incrementComparison,incSwaps) => {
  let i = start; 
  let j = mid + 1; 
  let k = start; 

  while (i <= mid && j <= end) {
    incrementComparison();
    if (aux[i] <= aux[j]) {
      mainarray[k++] = aux[i++];
      await visualiseArray(k - 1, mainarray[k - 1],i-1,mainarray[i -1 ],true);
    } else {
      mainarray[k++] = aux[j++];
      incSwaps(); 
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

};


// -------------------------------------------------------------------------------------------------------------------------------------------
  

//quicksort
  export const Quicksort = async (mainarray, visualiseArray,setComparisons = () => {}) => {
    let low = 0;
    let high = mainarray.length - 1;
    await quicksorthelper(mainarray, low, high, visualiseArray);
    for (let k = 0; k < mainarray.length; k++) {
      await visualiseArray(k, mainarray[k], null, null, false); 
    }
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
  }
 
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
  for (let k = 0; k < arr.length; k++) {
    await visualiseArray(k, arr[k], null, null, false); 
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
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
  }
}


//weird sorts

// -------------------------------------------------------------------------------------------------------------------------------------------
//Bitonic sort
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
      await visualiseArray(i, arr[i], undefined, undefined, false); 
  }
};



// -------------------------------------------------------------------------------------------------------------------------------------------
//Shellsort
export const Shellsort = async (arr, visualiseArray) => {
  let n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let key = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > key) {
        arr[j] = arr[j - gap];
        await visualiseArray(j, arr[j], j - gap, arr[j - gap], true); 
        j -= gap;
      }

      arr[j] = key;
      await visualiseArray(j, key, i, arr[i], false);
    }
  }

  for (let i = 0; i < n; i++) {
    await visualiseArray(i, arr[i], null, null, false);
  }
};



// -------------------------------------------------------------------------------------------------------------------------------------------
//radix sort not so Ez !!!
const getmax =(arr,n)=>{
  let max = 0;
  for(let i = 0 ; i < n ;i++){
    if(max < arr[i].toString().length){
      max = arr[i].toString().length;
    }
  }
  return max;
}
const getpos = (num,place) =>{
      return Math.floor(Math.abs(num)/ Math.pow(10,place)) % 10;
}
export const Radixsort = async(arr,visualiseArray) => {
  let n = arr.length;
  let max = getmax(arr,n);

  for(let i = 0; i < max ;i++){
      let bucket = Array.from({length : 10}, () => [ ]);
      for(let j = 0 ; j < arr.length ; j++){
          bucket[getpos(arr[j],i)].push(arr[j]);

          await visualiseArray(j, arr[j], null, null, true);
      }
      arr = [ ].concat(...bucket);

      for (let k = 0; k < arr.length; k++) {
        await visualiseArray(k, arr[k], null, null, false); 
      }
  }
  return arr;
}


//-------------------------------------------------------------------------------------------------------------------------------------------
//combsort kinda EZ ?

export const Combsort = async(arr,visualiseArray) =>{
  let size = arr.length;
  let shrink = 1.3;
  let gap = size;
  let sorted = false;

  while(!sorted){
    gap = parseInt(gap/shrink);
    if(gap <= 1){
      sorted = true;
      gap = 1;
    }

    for(let i = 0; i < size - gap ;i++){
      let sm = gap + i;
      if(arr[i] > arr[sm]){
        [arr[i],arr[sm]] = [arr[sm],arr[i]];
        sorted = false;
        await visualiseArray(i, arr[i], sm,arr[sm] ,true);
      }
    }
  }
  for (let k = 0; k < arr.length; k++) {
      await visualiseArray(k, arr[k], null, null, false); 
    }
  
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//bongosort >

const isSorted = (arr) =>{
  let n = arr.length;
  for(let i = 1 ; i < n ; i++){
    if(arr[i] < arr[i - 1]){
      return false;
    }
  }
  return true;
}
const shuffle =async (arr,visualiseArray)=>{
  var n = arr.length , index;
  while(n > 0){
    index = Math.floor(Math.random() * n);
    n--;
    [arr[n],arr[index]] = [arr[index],arr[n]];
    await visualiseArray(n,arr[n],index,arr[index],true);
  }
  return arr;
}
export const Bongosort = async(arr,visualiseArray) =>{
  var sorted = false;
  let maxattemps = 50;
  let attempts = 0;
  while(!sorted && attempts < maxattemps){
    arr = await shuffle(arr,visualiseArray);
    sorted = isSorted(arr);
    attempts++;
  }
  return arr;
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//stoogesort?

export const Stoogesort = async(arr,visualiseArray) =>{
  let l = 0;
  let h = arr.length - 1;

  await stoogehelper(arr,l,h,visualiseArray);

  for (let k = 0; k < arr.length; k++) {
      await visualiseArray(k, arr[k], null, null, false); 
  }
}
const stoogehelper = async(arr,l,h,visualiseArray) => {
  if(l >= h) return;

  if(arr[l] > arr[h]){
    [arr[l],arr[h]] = [arr[h],arr[l]];
    await visualiseArray(l,arr[l],h,arr[h],true);
  }

  if(h - l + 1 > 2){
    let t = parseInt((h - l + 1)/3,10);

   await stoogehelper(arr,l,h - t,visualiseArray);
   await stoogehelper(arr,l + t,h,visualiseArray);
   await stoogehelper(arr,l,h - t,visualiseArray);
  }
}