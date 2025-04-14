(function(){"use strict";self.onmessage=async function(e){const{array:o,code:s}=e.data;try{await new Function("array","visualize",`
        ${s}
        if (typeof customSort !== "function") throw new Error("No function named 'customSort'");
        return customSort(array, visualize);
      `)(o,(r,a,n,c,i)=>{self.postMessage({type:"visualize",payload:{i:r,v:a,j:n,v2:c,isCompare:i}})}),self.postMessage({type:"done"})}catch(t){self.postMessage({type:"error",error:t.message})}}})();
