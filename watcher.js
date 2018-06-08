import vdom from './vdom';
import render from './render';
var events = ['click'];
var watcher = (component, mount) => {
  events.map((eventName) => {
    document.addEventListener(eventName, (e) => {
      console.log("Re Render the component ! ");
      render(component, mount);
    });
  });
}
export default watcher;
