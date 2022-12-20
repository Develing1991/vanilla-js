## store/message.js
```javascript
import { Store } from "../core/core";

export default new Store({
  message : 'Hello~'
})
```

## core/core.js
```javascript
///// Component /////
  ...

///// Router /////
  ...

//// Store /////
export class Store {
  constructor(state){
    this.state = {}
    this.observers = {}
    for(const key in state){
      Object.defineProperty(this.state, key, {
        get: () => state[key], // state['message']
        set: (val) => {
          state[key] = val
          this.observers[key]()
          
        }
      })
    }
  }
  subscribe(key, cb) {
    this.observers[key] = cb
  }
}
```

## components/Message.js
```javascript
import { Component } from "../core/core";
import messageStore from "../store/message";

export default class Message extends Component{
  constructor(){
    super()
    messageStore.subscribe('message', () => {
      this.render()
    })
  }
  render(){
    this.el.innerHTML = /*HTML*/`
      <h2>${messageStore.state.message}</h2>
    `
  }
}
```
## components/TextField.js
```javascript
import { Component } from "../core/core";
import messageStore from "../store/message";

export default class TextField extends Component{
  render(){
    this.el.innerHTML = /*html*/`
      <input value="${messageStore.state.message}"> 
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      //console.log(inputEl.value);
      messageStore.state.message = inputEl.value // set
    })
  }
}
```

## routes/Home.js
```javascript
import { Component } from "../core/core";
import TextField from "../components/TextField";
import Message from "../components/Message";

export default class Home extends Component{
  render(){
    this.el.innerHTML = /*html*/`
      <h1>Home Page!</h1>
    `
    this.el.append( 
      new TextField().el
      ,new Message().el 
    )
  
  }
}
```

<img src="https://user-images.githubusercontent.com/54789601/208780718-d9cfae22-d7d8-48a1-9a0d-67c9154fc065.png">


