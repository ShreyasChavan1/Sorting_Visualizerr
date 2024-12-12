export const mergesort = async (array, visualiseArray) => {
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
      await visualiseArray(k - 1, mainarray[k - 1],i-1,mainarray[i -1 ],true);
    }
  
    while (j <= end) {
      mainarray[k++] = aux[j++];
      await visualiseArray(k - 1, mainarray[k - 1],j - 1,mainarray[j -1],true);
    }
  
    console.log(`Merged: ${mainarray.slice(start, end + 1)}`);
  };


  
  