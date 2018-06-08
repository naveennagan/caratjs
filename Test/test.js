//include file caratjs
var caratTestComponent = new Carat(
  "<div size = {size} onclick={changeName}> {name} </div>", {
    name: "Test Component ! ",
    size: 10,
    changeName: () => {
      console.log("This context ", this);
      this.name = "Changed the component content ! " + new Date();
    }
  });

//mount the component 
var mountElement = document.getElementById("root");
Carat.mount(caratTestComponent, mountElement);

