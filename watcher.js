import { vdom } from './vdom';
var events = ['click'];
var watcher = {
  addEventListener: (component) => {
    events.map((eventName) => {
      document.addEventListener(eventName, (e) => {
        console.log("Re Render the component ! ");
      });
    });
  }
}
exports.watcher = watcher;