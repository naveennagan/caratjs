import { vdom } from './vdom';
import { render } from './render';
import { watcher } from './watcher';
var parser = new DOMParser();
var caratRegexExpression = /\{([0-9A-Za-z ]+)\}/g;
var Carat = function (view, fields) {
  //check for look part make it cumpulsory
  // check for fields part
  if (!view) {
    throw "View part of the component is not defined ! ";
  }
  this.view = view;
  this.fields = fields;

  this.getVDom = () => {
    //parse view part and create vdom objects
    //step 1 --- interpolate view part with properties
    var interpolatedTemplate = this.interpolate(this.view, this.fields);

    //step 2 --- created html doc    
    var htmlDoc = parser.parseFromString(interpolatedTemplate, "text/html");

    //step 3 --- create vdom
    var vdom = this.createVdomFromDOM(htmlDoc, {});

    return vdom;

  },
    this.createVdomFromDOM = (htmlDOM, parent) => {
      if (!htmlDOM) {
        return {};
      }
      var dom = new vdom();
      var children = [];
      var htmlDOMchildNodes = htmlDOM.childNodes;
      for (var i = 0; i < htmlDOMchildNodes.length; i++) {
        var childNode = this.createVdomFromDOM(htmlDOMchildNodes[i], dom);
        children.push(childNode);
      }
      var htmlAttrs = htmlDOM.attributes;
      dom.init("DIV", htmlDOM.nodeValue, children, parent, htmlAttrs);
      return dom;
    },
    this.evaluateExpression = (expression, fields) => {
      var fieldKeys = Object.keys(fields);
      var fieldString = "";
      fieldKeys.map((fieldKey) => {
        fieldString += `var ${fieldKey}=${fields[fieldKey]};`;
      });

      //declare all variables from fields and append it to expression;
      var functionalExpression = `function(){
         var value="";
      ${fieldString}
      value= ${expression} 
      return value;
      }`;
    },
    this.interpolate = (view, fields) => {
      while (view.match(caratRegexExpression)) {
        text.replace(regex,
          (m) => {
            var expression = m.slice(1, -1);
            var value = this.evaluateExpression(expression, fields);
            return value;
          });
      }
    }
}

Carat.prototype.mount = (component, mount) => {
  //render component and mount it to dom.
  var renderedComponent = render(component, mount);
  //add event listeners
  watcher.addEventListener(component, mount);

  return renderedComponent;
};

module.exports = Carat;