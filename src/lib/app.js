import Navigo from "navigo";
import Handlebars from "handlebars";
import { Templates, Styles } from "./template";
import { Signal } from "./signal";
import { CreateElement } from "./dom";

const app = document.getElementById('app');

export let $this = null;
export let $app = null;

export const Router = new Navigo("/", { hash: true });

export function Render(name, data = {}) {
  const element = Templates.find(t => t.path.includes(name))?.html;
  const style = Styles.find(t => t.path.includes(name))?.style;

  if (element === null || element === undefined) {
    throw new Error(`Template ${name} is not found.`);
  }

  const template = Handlebars.compile(element);

  const tpl = (values => CreateElement(`<${name}><style>${style}</style>${template(values)}</${name}>`));

  window.$this = Signal(data, (values) => {
    app.replaceChildren(tpl(values));
    window; $app = app;
  });

  $this = window.$this;
  $app = window.$app;

}

export function App(routes) {
  Router.on(routes).resolve();
}
