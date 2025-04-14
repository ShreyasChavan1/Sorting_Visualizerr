
self.onmessage = async function (e) {
    const { array, code } = e.data;
    try {
      const sortFunction = new Function("array", "visualize", `
        ${code}
        if (typeof customSort !== "function") throw new Error("No function named 'customSort'");
        return customSort(array, visualize);
      `);
      await sortFunction(array, (i, v, j, v2, isCompare) => {
        self.postMessage({
          type: "visualize",
          payload: { i, v, j, v2, isCompare },
        });
      });
      self.postMessage({ type: "done" });
    } catch (err) {
      self.postMessage({ type: "error", error: err.message });
    }
  };
  