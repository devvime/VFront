import Navigo from "navigo";
import Handlebars from "handlebars";
import { Templates, Styles } from "./template";
import { Signal } from "./signal";
import { CreateElement } from "./dom";

const app = document.getElementById('app');

export const Router = new Navigo("/", { hash: true });

export function App(routes) {
  Router.on(routes).resolve();
}

export function Render(name, data = {}) {
  const element = Templates.find(t => t.path.includes(name))?.html;
  const style = Styles.find(t => t.path.includes(name))?.style;

  if (element === null || element === undefined) {
    throw new Error(`Template ${name} is not found.`);
  }

  const template = Handlebars.compile(element);
  const tpl = (values => CreateElement(`<div><style>${style}</style>${template(values)}</div>`));

  const target = app.querySelectorAll(name);

  if (target.length > 0) {
    const component = Signal(data, (values) => {
      app.querySelectorAll(name).forEach(item => {
        item.replaceChildren(tpl(values));
      });
      if (values.start && !window[name]) {
        values.start();
      }
      if (values.imports && values.imports.length > 0) {
        values.imports.forEach(a => a());
      }
    });

    window[name] = component;
    return component;
  }

  const component = Signal(data, (values) => {
    app.replaceChildren(tpl(values));
    Signal(data, (values) => {
      app.querySelectorAll(name).forEach(item => {
        item.replaceChildren(tpl(values));
      });
      if (values.start && !window[name]) {
        values.start();
      }
      if (values.imports && values.imports.length > 0) {
        values.imports.forEach(a => a());
      }
    });
  });

  window[name] = component;
  return component;
}
