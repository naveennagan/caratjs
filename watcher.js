import vdom from './vdom';
import render from './render';
var events = ['click'];
var watcher = (renderedComponent, component, mount, cb) => {
  events.map((eventName) => {
    renderedComponent.addEventListener(eventName, (e) => {
      console.log("  Re Render the component !  ");
      cb(component, mount);
    });
  });
}
export default watcher;
