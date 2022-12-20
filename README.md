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
```

## components/FruitItem.js
```javascript
import { Component } from "../core/core";

export default class FruitItem extends Component {
  constructor(payload){
    super({
      tagName: 'li',
      props: payload.props
    })
  }
  render(){
    this.el.innerHTML = /*html*/`
      <span>${this.props.name}</span>
      <span>${this.props.price}</span>
    `
    this.el.addEventListener('click', () => {
      console.log(this.props.name, this.props.price);
    })
  }
}
```

## App.js
```javascript
import FruitItem from "./components/FruitItem"
import { Component } from "./core/core"

export default class App extends Component{
  constructor(){
    super({
      state: {
        fruits: [
          { name: 'Apple', price: 1000},
          { name: 'Banana', price: 2000},
          { name: 'Cherry', price: 3000},
        ]
      }
    })
  }
  render() {
    this.el.innerHTML = /*html*/ `
      <h1>FRUITS</h1>
      <ul></ul>
    `
    const ulEl = this.el.querySelector('ul')
    ulEl.append(
       ...this.state.fruits
      .map(fruit => new FruitItem({
        props: {
          name: fruit.name,
          price: fruit.price
        }
      }).el))
  }
}
```

