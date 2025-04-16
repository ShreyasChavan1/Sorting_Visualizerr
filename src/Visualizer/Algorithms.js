//mergesort

export const Mergesort = async (array, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  const aux = [...array]; // Only once

  await mergesortHelper(array, 0, array.length - 1, aux, visualiseArray,setComparisons,setSwaps);

  for (let k = 0; k < array.length; k++) {
    await visualiseArray(k, array[k], null, null, false);
  }

  
};

const mergesortHelper = async (array, start, end, aux, visualiseArray, incrementComparison, incSwaps) => {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  await mergesortHelper(array, start, mid, aux, visualiseArray, incrementComparison, incSwaps);
  await mergesortHelper(array, mid + 1, end, aux, visualiseArray, incrementComparison, incSwaps);

  await merge(array, start, mid, end, aux, visualiseArray, incrementComparison, incSwaps);
};

const merge = async (array, start, mid, end, aux, visualiseArray, incrementComparison, incSwaps) => {
  for (let i = start; i <= end; i++) {
    aux[i] = array[i]; 
  }

  let i = start;
  let j = mid + 1;
  let k = start;

  while (i <= mid && j <= end) {
    incrementComparison(prev => prev + 1);

    if (aux[i] <= aux[j]) {
      await visualiseArray(i, aux[i], j, aux[j], true); 
      array[k++] = aux[i++];
      await visualiseArray(k - 1, array[k - 1], null, null, false); 
    } else {
      await visualiseArray(i, aux[i], j, aux[j], true); 
      array[k++] = aux[j++];
      incSwaps(prev => prev + 1);
      await visualiseArray(k - 1, array[k - 1], null, null, false); 
    }
    
  }

  while (i <= mid) {
    array[k++] = aux[i++];
    await visualiseArray(k - 1, array[k - 1], null, null, false);
  }

  while (j <= end) {
    array[k++] = aux[j++];
    await visualiseArray(k - 1, array[k - 1], null, null, false);
  }
};


// -------------------------------------------------------------------------------------------------------------------------------------------
  

//quicksort
export const Quicksort = async (mainarray, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  let low = 0;
  let high = mainarray.length - 1;

  await quicksorthelper(mainarray, low, high, visualiseArray, setComparisons,setSwaps);

  for (let k = 0; k < mainarray.length; k++) {
      await visualiseArray(k, mainarray[k], null, null, false);
  }


};

const quicksorthelper = async (mainarray, low, high, visualiseArray, incrementComparison, incSwaps) => {
  if (low >= high) return;

  const partitionIndex = await quick(mainarray, low, high, visualiseArray, incrementComparison, incSwaps);

  await quicksorthelper(mainarray, low, partitionIndex - 1, visualiseArray, incrementComparison, incSwaps);
  await quicksorthelper(mainarray, partitionIndex + 1, high, visualiseArray, incrementComparison, incSwaps);
};

const quick = async (mainarray, low, high, visualiseArray, incrementComparison, incSwaps) => {
  let pivotValue = mainarray[low];
  let i = low + 1;
  let j = high;

  while (i <= j) {
      while (i <= high) {
          incrementComparison(prev => prev + 1);  
          if (mainarray[i] > pivotValue) break;
          i++;
      }

      while (j >= low) {
          incrementComparison(prev => prev + 1);  
          if (mainarray[j] <= pivotValue) break;
          j--;
      }

      await visualiseArray(i, mainarray[i], j, mainarray[j], true);
      if (i < j) {
          [mainarray[i], mainarray[j]] = [mainarray[j], mainarray[i]];
          incSwaps(prev => prev + 1);
          await visualiseArray(i, mainarray[i], j, mainarray[j], false);
      }
  }


  [mainarray[low], mainarray[j]] = [mainarray[j], mainarray[low]];
  incSwaps(prev => prev + 1);
  await visualiseArray(low, mainarray[low], j, mainarray[j], false);

  return j;
};


  
// -------------------------------------------------------------------------------------------------------------------------------------------

//Heapsort
export const Heapsort = async (mainarray, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  let size = mainarray.length;


  for (let i = Math.floor(size / 2) - 1; i >= 0; --i) {
    await heapify(mainarray, size, i, visualiseArray, setComparisons, setSwaps);
  }

  for (let j = size - 1; j > 0; --j) {
    let temp = mainarray[0];
    mainarray[0] = mainarray[j];
    mainarray[j] = temp;
    setSwaps(prev => prev + 1);

    await visualiseArray(0, mainarray[0], j, mainarray[j], false);
    await heapify(mainarray, j, 0, visualiseArray, setComparisons, setSwaps);
  }

  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false);
  }


};

const heapify = async (mainarray, size, i, visualiseArray, incrementComparison, incrementSwap) => {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;

  await visualiseArray(left,mainarray[left],max,mainarray[max],true);
  if (left < size) {
    incrementComparison(prev => prev + 1);
    if (mainarray[left] > mainarray[max]) {
      max = left;
    }
  }

  if (right < size) {
    incrementComparison(prev => prev +1);
    if (mainarray[right] > mainarray[max]) {
      max = right;
    }
  }

  if (max !== i) {
    let temp = mainarray[i];
    mainarray[i] = mainarray[max];
    mainarray[max] = temp;
    incrementSwap(prev => prev + 1);

    await visualiseArray(i, mainarray[i], max, mainarray[max], false);
    await heapify(mainarray, size, max, visualiseArray, incrementComparison, incrementSwap);
  }
};


// -------------------------------------------------------------------------------------------------------------------------------------------

//quadratic ones
// bubble sort EZ!
export const Bubblesort = async (mainarray, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  let n = mainarray.length;

  for (let i = 0; i < n - 1; i++) {
    let isswapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      setComparisons(prev => prev+1);

      await visualiseArray(j,mainarray[j],j+1,mainarray[j+1],true);
      if (mainarray[j] > mainarray[j + 1]) {
        let temp = mainarray[j];
        mainarray[j] = mainarray[j + 1];
        mainarray[j + 1] = temp;

        setSwaps(prev => prev+1);
        isswapped = true;
        await visualiseArray(j, mainarray[j], j + 1, mainarray[j + 1], false);
      }
    }

    if (!isswapped) break; 
  }

  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false);
  }


};



// -------------------------------------------------------------------------------------------------------------------------------------------

//Selection sort EZ!
export const Selectionsort = async(mainarray,visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) =>{
  setComparisons(0);
  setSwaps(0);
  let n = mainarray.length;
  let min = 0;
  for(let i = 0;i < n - 1;i++){
    min = i;
    for(let j = i + 1; j < n ;j++){
      setComparisons(prev => prev+1);
      await visualiseArray(j,mainarray[j],min,mainarray[min],true)
      if(mainarray[j] < mainarray[min]){
        min = j;
      }
    }
    
      let temp = mainarray[i];
      mainarray[i] = mainarray[min];
      mainarray[min] = temp;
      setSwaps(prev => prev+1);
      await visualiseArray(i,mainarray[i],min,mainarray[min],false);
    
  }
  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false); 
  }

}


// -------------------------------------------------------------------------------------------------------------------------------------------

//insertionsort
export const Insertionsort = async (mainarray, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  let n = mainarray.length;

  for (let i = 1; i < n; i++) {
    let key = mainarray[i];
    let j = i - 1;

    while (j >= 0 && mainarray[j] > key) {
      setComparisons(prev => prev + 1); 
      mainarray[j + 1] = mainarray[j];
      setSwaps(prev => prev + 1); 
      await visualiseArray(j + 1, mainarray[j + 1], j, mainarray[j], true );
      j--;
    }

    mainarray[j + 1] = key;
    await visualiseArray(j + 1, key, i, mainarray[i], false);
  }

  for (let k = 0; k < mainarray.length; k++) {
    await visualiseArray(k, mainarray[k], null, null, false);
  }
};



// -------------------------------------------------------------------------------------------------------------------------------------------

//shakersort
export const Shakersort = async(mainarray,visualiseArray,setComparisons = ()=>{},setSwaps = () => {})=>{
  setComparisons(0);
  setSwaps(0);
  let l = 0;
  let r = mainarray.length - 1;
  let swapped;
  do{
    swapped = false;
    for(let i = l;i < r;i++){
      setComparisons(prev => prev+1);
      await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],true);
      if(mainarray[i] > mainarray[i + 1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i + 1],mainarray[i]];
        setSwaps(prev => prev+1);
        swapped = true;
        await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],false);
      }
    }
    r--;
    for(let j = r; j > l ;j--){
      setComparisons(prev=>prev + 1);
      if(mainarray[j] < mainarray[j - 1]){
        [mainarray[j],mainarray[j - 1]] = [mainarray[j - 1],mainarray[j]];
        setSwaps(prev => prev + 1);
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
async function flip(arr, k, visualiseArray, setSwaps = () => {}) {
  let left = 0;
  while (left < k) {
      setSwaps(prev => prev + 1); 
      await visualiseArray(left, arr[left], k, arr[k], true);
      [arr[left], arr[k]] = [arr[k], arr[left]];
      await visualiseArray(left, arr[left], k, arr[k], false);

      k--;
      left++;
  }
}
async function max_index(arr, k,setComparisons =() => {}) {
  let index = 0;
  for (let i = 1; i < k; i++) {
    setComparisons(prev => prev + 1);
      if (arr[i] > arr[index]) {
          index = i;
      }
  }
  return index;
}

export async function Pancakesort(arr, visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) {
  setComparisons(0);
  setSwaps(0);
  let n = arr.length;
  while (n > 1) {
      let maxdex = await max_index(arr, n,setComparisons);
      if (maxdex !== n - 1) {
          await flip(arr, maxdex, visualiseArray,setSwaps);
          await flip(arr, n - 1, visualiseArray,setSwaps);
      }
      n--;
  }
  for (let k = 0; k < arr.length; k++) {
    await visualiseArray(k, arr[k], null, null, false); 
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------
//oddevensort
export const Oddevensort = async(mainarray,visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) =>{
  setComparisons(0);
  setSwaps(0);
  let n = mainarray.length;
  let sorted = false;
  while(!sorted){
    sorted = true;
    for(let i = 1 ; i < n - 1 ; i+=2){
      setComparisons(prev => prev + 1);
      if(mainarray[i] > mainarray[i+1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i+1],mainarray[i]];
        setSwaps(prev => prev + 1);
        sorted = false;
        await visualiseArray(i,mainarray[i],i + 1,mainarray[i + 1],true);
      }
    }

    for(let i = 0; i < n - 1; i+=2){
      setComparisons(prev => prev + 1);
      if(mainarray[i] > mainarray[i+1]){
        [mainarray[i],mainarray[i+1]] = [mainarray[i+1],mainarray[i]];
        setSwaps(prev => prev + 1);
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
export const Bitonicsort = async (arr, visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) => {
  let n = arr.length;
  let k, j, l, i, temp;
      for (k = 2; k <= n; k *= 2) {
          for (j = k / 2; j > 0; j /= 2) {
              for (i = 0; i < n; i++) {
                  l = i ^ j;
                  if (l > i) {
                    setComparisons(prev => prev + 1);
                      if (
                          ((i & k) === 0 && arr[i] > arr[l]) ||
                          ((i & k) !== 0 && arr[i] < arr[l])
                      ) {
                          temp = arr[i];
                          arr[i] = arr[l];
                          arr[l] = temp;
                          setSwaps(prev => prev + 1);
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
export const Shellsort = async (arr, visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) => {
  let n = arr.length;
  setComparisons(0);
  setSwaps(0);

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let key = arr[i];
      let j = i;

      while (j >= gap) {
        setComparisons(prev => prev + 1); 
        if (arr[j - gap] > key) {
          arr[j] = arr[j - gap];
          setSwaps(prev => prev + 1);
          await visualiseArray(j, arr[j], j - gap, arr[j - gap], true);
          j -= gap;
        } else {
          break;
        }
      }
      if (j !== i) {
        arr[j] = key;
        await visualiseArray(j, arr[j], i, arr[i], false);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    await visualiseArray(i, arr[i], null, null, false);
  }
};



// -------------------------------------------------------------------------------------------------------------------------------------------
//radix sort not so Ez !!!
const getmax = (arr, n) => {
  let max = 0;
  for (let i = 0; i < n; i++) {
    if (max < arr[i].toString().length) {
      max = arr[i].toString().length;
    }
  }
  return max;
};

const getpos = (num, place) => {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
};

export const Radixsort = async (arr, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  let n = arr.length;
  let max = getmax(arr, n);

  for (let i = 0; i < max; i++) {
    let bucket = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      bucket[getpos(arr[j], i)].push(arr[j]);
      setComparisons(prev => prev + 1); 
      await visualiseArray(j, arr[j], null, null, true);
    }

    arr = [].concat(...bucket);
    setSwaps(prev => prev + n); 

    for (let k = 0; k < arr.length; k++) {
      await visualiseArray(k, arr[k], null, null, false);
    }
  }
  return arr;
};
;


//-------------------------------------------------------------------------------------------------------------------------------------------
//combsort kinda EZ ?

export const Combsort = async(arr,visualiseArray,setComparisons = ()=>{},setSwaps = () => {}) =>{
  setComparisons(0);
  setSwaps(0);
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
      setComparisons(prev => prev + 1);
      if(arr[i] > arr[sm]){
        [arr[i],arr[sm]] = [arr[sm],arr[i]];
        setSwaps(prev => prev + 1);
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

const isSorted = (arr, setComparisons) => {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

const shuffle = async (arr, visualiseArray, setSwaps) => {
  let n = arr.length, index;
  while (n > 0) {
    index = Math.floor(Math.random() * n);
    n--;
    if (index !== n) {
      [arr[n], arr[index]] = [arr[index], arr[n]];
      setSwaps(prev => prev + 1);
      await visualiseArray(n, arr[n], index, arr[index], true);
    }
  }
  return arr;
}

export const Bongosort = async (arr, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  setComparisons(0);
  setSwaps(0);
  
  let sorted = false;
  let maxAttempts = 50;  
  let attempts = 0;
  
  while (!sorted && attempts < maxAttempts) {
    setComparisons(prev => prev + 1);
    arr = await shuffle(arr, visualiseArray, setSwaps);
    sorted = isSorted(arr, setComparisons);
    attempts++;
  }
  
  return arr;
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//stoogesort?

export const Stoogesort = async (arr, visualiseArray, setComparisons = () => {}, setSwaps = () => {}) => {
  let l = 0;
  let h = arr.length - 1;

  setComparisons(0);
  setSwaps(0);

  await stoogehelper(arr, l, h, visualiseArray, setComparisons, setSwaps);

  for (let k = 0; k < arr.length; k++) {
    await visualiseArray(k, arr[k], null, null, false);
  }
}

const stoogehelper = async (arr, l, h, visualiseArray, setComparisons, setSwaps) => {
  if (l >= h) return;

  setComparisons(prev => prev + 1); 

  if (arr[l] > arr[h]) {
    [arr[l], arr[h]] = [arr[h], arr[l]];
    setSwaps(prev => prev + 1);
    await visualiseArray(l, arr[l], h, arr[h], true);
  }

  if (h - l + 1 > 2) {
    let t = parseInt((h - l + 1) / 3, 10);

    await stoogehelper(arr, l, h - t, visualiseArray, setComparisons, setSwaps);
    await stoogehelper(arr, l + t, h, visualiseArray, setComparisons, setSwaps);
    await stoogehelper(arr, l, h - t, visualiseArray, setComparisons, setSwaps);
  }
}
