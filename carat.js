import vdom from './vdom';
import render from './render';
//import { watcher } from './watcher';
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

    console.log("Interpolated Template ", interpolatedTemplate);
    //step 2 --- created html doc    
    var htmlBody = parser.parseFromString(interpolatedTemplate, "text/html");

    var htmlDoc = htmlBody.body.childNodes[0];

    console.log("HTML Parsed ", htmlDoc);

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
      console.log("Child nodes ", htmlDOMchildNodes);
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
      return "Interpolated Value";
    },
    this.interpolate = (view, fields) => {
      return view.replace(caratRegexExpression,
        (m) => {
          var expression = m.slice(1, -1);
          var value = this.evaluateExpression(expression, fields);
          return "'" + value + "'";
        });
      // while (view.match(caratRegexExpression)) {
      //   view.replace(caratRegexExpression,
      //     (m) => {
      //       var expression = m.slice(1, -1);
      //       var value = this.evaluateExpression(expression, fields);
      //       return value;
      //     });
      // }
    }
}

Carat.mount = (component, mountelement) => {
  //render component and mount it to dom.
  var vdom = component.getVDom();
  console.log("Created VDOM ", vdom);
  var renderedComponent = render(vdom, mountElement);
  console.log("Rendered Component is ", renderedComponent);
  mountelement.innerHtml = renderedComponent;
  //add event listeners
  // watcher(component, mount);

  return renderedComponent;
};

export default Carat;