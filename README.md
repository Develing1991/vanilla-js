## components/TheHeader.js
```javascript
import { Component } from "../core/core";

export default class TheHeader extends Component{
  constructor(){
    super({
      tagName: 'header'
    })
  }
  render(){
    this.el.innerHTML = /*html*/ `
      <a href="#/">Main!</a>
      <a href="#/about">About!</a>
    `
    
  }
}
```

## routes/About.js
```javascript
import { Component } from "../core/core";

export default class About extends Component{
  render(){
    this.el.innerHTML = /*html*/`
      <h1>About Page!</h1>
    `
  }
}
```

## routes/Home.js
```javascript
import { Component } from "../core/core";

export default class Home extends Component{
  render(){
    this.el.innerHTML = /*html*/`
      <h1>Home Page!</h1>
    `
  }
}
```

## routes/index.js
```javascript
import Home from '../routes/Home'
import About from '../routes/About'
import { creatRouter } from '../core/core'

export default creatRouter([
  {path: '#/', component: Home},
  {path: '#/about', component: About},
])
```

## core/core.js
```javascript
///// Component /////
export class Component {
  constructor(payload = {}){
    const { 
      tagName = 'div',
      state = {},
      props = {}
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render(){
    // ....
  }
}

///// Router /////
function routeRender(routes){
  
}
export function creatRouter(routes) {
  return function(){
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}
```

## App.js
```javascript
import TheHeader from "./components/TheHeader"
import { Component } from "./core/core"

export default class App extends Component{
  
  render() {
    const routeView = document.createElement('router-view')
    this.el.append(
      new TheHeader().el,
      routeView
    )
  }
}
```

## Main.js
```javascript
import App from './App'
import router from './routes/index'

const root = document.querySelector('#root')
root.append(new App().el)
router()
```

