var clickEvents = ['onclick'];
var render = function (vdom, mount) {
  if (vdom.type === "DIV") {
    //create element with
    var velem = document.createElement("div");
    var attributes = vdom.props || [];
    //If functional attributes , parse them and change the context.
    for (var i = 0; i < attributes.length; i++) {
      var attribute = attributes.item(i);
      if (clickEvents.indexOf(attribute["nodeName"]) != -1) {
        var attributeValue = attribute["nodeValue"];
        var attributeFunction = Function(attributeValue);
        attributeFunction = attributeFunction.bind(vdom);
        velem.setAttribute(attribute["nodeName"], attributeFunction);
      }
      else {
        velem.setAttribute(attribute["nodeName"], attribute["nodeValue"]);
      }
    }
    //if div has content create text node and append it to div
    vdom.content ? velem.appendChild(document.createTextNode(vdom.content)) : "";
    //if it has children recursively call them with updated mount point i.e. velem
    vdom.children.map((child) => {
      render(child, velem)
    });
    mount && mount != null && mount.appendChild ? mount.appendChild(velem) : "";
    return mount;
  }
  else {
    return mount;
  }
}

export default render;