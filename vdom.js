var vdomTypes = ["NONE", "DIV"];

function vdom() {
  this.isTypeValid = function (type) {
    return vdomTypes.indexOf(type) != -1 ? type : "NONE"
  },
    this.vdom = {
      init: (type, content, children, parent) => {
        this.vdom.type = this.isTypeValid(type);
        this.vdom.content = content;
        this.vdom.children = children;
        this.vdom.parent = parent;
      },
      type: "NONE",
      children: [],
      content: "",
      parent: {}
    };
  return this.vdom;
}
exports.vdom = vdom;