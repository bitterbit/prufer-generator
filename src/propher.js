// Calculate the paths between nodes for a given prufer series
export function doPrufer(prufer){
    if (prufer.length === 0){
      return [1,2];
    }
  
    let paths = [];
    let singleItems = [];
    for (var i=1; i<=prufer.length+2; i++){
      if (prufer.indexOf(i) == -1) {
        singleItems.push(i);
      }
    }
    // console.log("single items", singleItems);
  
    while (prufer.length > 0){
      var path = handlePruferItem(prufer, singleItems, paths);
      paths.push(path);
    }
    paths.push([singleItems[0], singleItems[1]]);
    return paths;
}

// Will handle the first item of the prufer list
function handlePruferItem(prufer, singles){ 
    var connectTo = singles[0];
    var node = prufer[0];
    singles.splice(0, 1); // remove
    prufer.splice(0, 1);
  
    // When the node is no longer in the prufer series we add it to the singles list.
    // This means we have one more edge left to connect to it.
    if (prufer.indexOf(node) == -1) {
      singles.push(node);
      singles.sort();
      // console.log("Added to singles", singles);
    }
    return [connectTo, node];
}
  