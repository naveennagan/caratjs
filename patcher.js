var hasher = function (attrs) {
  let keys = Object.keys(attrs);
  var hashKey = "CARAT";
  var hashContent = keys.map((key) => {
    hashKey += attrs[key];
  });
  return hashKey;
};

var patcher = function (vdom, realdom) {
  var updates = [];

  //base case
  var isPatchable = vdom.getHash() === realdom.getHash();
  // if patchable ignore children anyhow they will be part of render cycle
  if (isPatchable) {
    updates.push(vdom);
    return updates;
  }
  else {
    // get children of vdom
    var vdomChildren = vdom.getChildren();
    //get children of realdom
    var realdomChildren = realdom.getChildren();
    //for each child corresponding to vdom and realdom
    for (var i = 0; i < vdomChildren.length; i++) {
      var childUpdates = patcher(vdomChildren[i], realdomChildren[i]);
      updates.push(childUpdates);
    }
  }
  return updates;
}

exports.patcher = patcher;

