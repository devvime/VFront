import { Render, $this } from "../../lib/app";

export default function Home(params) {
  Render('home', {
    name: 'Victor',
    count: 0,
    setCount: () => {
      $this.count += 1;
    }
  });
}
