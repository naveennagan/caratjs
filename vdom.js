var vdomTypes = ["NONE", "DIV"];

function vdom() {
  this.isTypeValid = function (type) {
    return vdomTypes.indexOf(type) != -1 ? type : "NONE"
  },
    this.vdom = {
      init: (type, content, children, parent, props) => {
        this.vdom.type = this.isTypeValid(type);
        this.vdom.content = content || "";
        this.vdom.children = children || [];
        this.vdom.parent = parent || {};
        this.vdom.props = props || {};
      },
      getHash: () => {
        let keys = Object.keys(this.vdom.props);
        var hashKey = "CARAT";
        var hashContent = keys.map((key) => {
          hashKey += this.vdom.props[key];
        });
        return hashKey;
      },
      getChildren: () => {
        return this.vdom.children;
      },
      type: "NONE",
      children: [],
      content: "",
      parent: {},
      props: {}
    };
  return this.vdom;
}

export default vdom;