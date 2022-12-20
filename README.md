## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <script src="./src/main.js" defer type="module"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## main.js
```javascript
import App from './App'
const root = document.querySelector('#root')
root.append(new App().el)
```

## core/core.js
```javascript
///// Component /////
export class Component {
  constructor(payload = {}){
    const { tagName = 'div' } = payload
    this.el = document.createElement(tagName)
    this.render()
  }
  render(){
    // ....
  }
}
```

## App.js
```javascript
import { Component } from "./core/core"

export default class App extends Component{
  constructor(){
    super({
      tagName: 'h1'
    })
  }
  render() {
    this.el.textContent = 'Hello~ Vanilla.js'
  }
}
```

