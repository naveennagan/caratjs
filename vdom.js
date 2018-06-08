var vdomTypes = ["NONE", "DIV"];

function vdom() {
  this.isTypeValid = function (type) {
    return vdomTypes.indexOf(type) != -1 ? type : "NONE"
  },
    this.vdom = {
      init: (type, content, children, parent, props, context) => {
        this.vdom.type = this.isTypeValid(type);
        this.vdom.content = content || "";
        this.vdom.children = children || [];
        this.vdom.parent = parent || {};
        this.vdom.props = props || {};
        context ? this.context = context : "";
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
      getContext: () => {
        return vdom.context;
      },
      type: "NONE",
      children: [],
      content: "",
      parent: {},
      props: {},
      context: {}
    };
  return this.vdom;
}

export default vdom;