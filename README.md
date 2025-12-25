# VFront

Simple SPA with Signals.

### Install

```bash
npm i vfront
```

index.html

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vfront</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### Create component

Structure

```
├── src/            
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.html
│   │   │   ├── home.scss
│   │   │   └── home.ts
```

```js
import { Render, $this } from "vfront";

export default function Home(params) {
  // Render(htmlFileUniqueName, objectSignal)
  Render('home', {
    name: 'Steve',
    count: 0,
    setCount: () => {
      $this.count += 1;
    }
  });
}
```

```html
<h1>Hello {{name}}.</h1>
<p>Count: {{count}}</p>
<button onclick="$this.setCount()">Click here</button>
```

### Create route

```js
import Home from "./pages/home/home";

export default {
  '/': (params) => Home(params)
}
```

### Start app

```js
import { App } from 'vfront';
import routes from './routes';

App(routes);
```
