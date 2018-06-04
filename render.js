var render = function (vdom, mount) {
  if (vdom.type === "DIV") {
    //create element with
    var velem = document.createElement("div");
    //if div has content create text node and append it to div
    vdom.content ? velem.appendChild(document.createTextNode(vdom.content)) : "";
    //if it has children recursively call them with updated mount point i.e. velem
    vdom.children.map((child) => {
      render(child, velem)
    });
    mount.appendChild(velem);
    return mount;
  }
  else {
    return mount;
  }
}

exports.render = render;