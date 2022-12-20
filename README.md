## routes/About.js
```javascript
import { Component } from "../core/core";

export default class About extends Component{
  render(){
    const { a, b, c} = history.state
    this.el.innerHTML = /*html*/`
      <h1>About Page!</h1>
      <h2>${a}</h2>
      <h2>${b}</h2>
      <h2>${c}</h2>
    `
  }
}
```

## core/core.js
```javascript
///// Component /////
  ...

///// Router /////
function routeRender(routes){
  if(!location.hash){
    history.replaceState(null, '', '/#/')
  }
  const routerView = document.querySelector('router-view')
  
  // http://localhost:1234/#/about?a=123&b=456
  const [hash, queryString = '' ] = location.hash.split('?')
  const query = queryString.split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=')
    acc[key] = value
    return acc
  }, {})
  history.replaceState(query, '');

  //  /#\/about\/?$/.test('#/about')
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = '';
  routerView.append( new currentRoute.component().el )

  scrollTo(0, 0)
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

## index.html
```html
<link rel="stylesheet" href="./src/main.css">
```

## main.css
```css
body {
  height: 3000px;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, .5);
}
```
<img src="https://user-images.githubusercontent.com/54789601/208774975-773695e5-9777-4c01-8f34-d06bd53b6fff.png">

