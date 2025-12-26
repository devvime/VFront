import { Render } from "../../lib/app";
import Contact from "../contact/contact";

export default function Home(params) {
  return Render('home', {
    imports: [Contact],
    start() { },
    name: 'Victor',
    count: 0,
    setCount() {
      this.count += 1;
    }
  });
}
