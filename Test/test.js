//include file caratjs
var caratTestComponent = new Carat(
  "<div onclick={changeName}> {name} </div>", {
    name: "Test Component ! ",
    size: 10,
    changeName: () => {
      return "Changed Through click !";
    }
  });

//mount the component 
var mountElement = document.getElementById("root");
Carat.mount(caratTestComponent, mountElement);

