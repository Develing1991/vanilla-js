## core/core.js
```javascript
///// Component /////
export class Component {
  constructor(payload = {}){
    const { 
      tagName = 'div',
      state = {} 
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
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
      state: {
        inputText: ''
      }
    })
  }
  render() {
    this.el.classList.add('search')
    this.el.innerHTML = /*html*/`
      <input/>
      <button>Click</button>
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      this.state.inputText = inputEl.value
    })

    const buttonEl = this.el.querySelector('button')
    buttonEl.addEventListener('click', () => {
      console.log(this.state.inputText);
    })
  }
}
```

<img src="https://user-images.githubusercontent.com/54789601/208614812-e6075f45-e07a-49c0-bbe7-2a8bf3aeb178.png">
<img src="https://user-images.githubusercontent.com/54789601/208614895-94d34e69-e13d-455a-a914-fb188de24e36.png">
