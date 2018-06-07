import { vdom } from 'vdom';
var events = ['click'];
var watcher = {
  addEventListener: (component) => {
    events.map((eventName) => {
      document.addEventListener(eventName, (e) => {
        component.render();
      });
    });
  }
}
exports.watcher = watcher;