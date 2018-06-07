# caratjs
A Simple Virtual DOM framework for dummies.
Inspired from REACT.
Made it, for understanding the internals of REACT and what kind of problems
one faces while developing such a framework from scratch.

STEPS 
1) A parser to convert dom element to Carat VDOM object.
2) A Carat VDOM functional class
3) A patcher to check for the differences in the dom. If parents are same 
   recursively check for changes in its children.
4) A render to convert vdom into real dom
5) A watcher to check for events upon which a re-render is done.

Example - 

//include file carat_output.js

//for building a fresh output run "npm run build"

var caratTestComponent = new Carat(
  "<div size = {size} onclick={changeName}> {name} </div>", {
    name: "Test Component ! ",
    size: 10,
    changeName: () => {
      return " Changed Through click !";
    }
  });

//mount the component 
var mountElement = document.getElementById("root");
Carat.mount(caratTestComponent, mountElement);

   


