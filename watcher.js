import vdom from './vdom';
import render from './render';
var events = ['click'];
var watcher = (component, mount, cb) => {
  events.map((eventName) => {
    mount.addEventListener(eventName, (e) => {
      console.log("  Re Render the component !  ");
      cb(component, mount);
    });
  });
}
export default watcher;
