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
          //this.observers[key]()
          this.observers[key].forEach(observer => observer(val))
        }
      })
    }
  }
  subscribe(key, cb) {
    // this.observers['message'] = () => {}
    // { message: () => {} }
    // { message: [() => {}, () => {}, () => {} ...] }
    // { message: [ cb1, cb2, cb3 ...] }
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb]
  }
}
```

## components/Title.js
```javascript
import { Component } from "../core/core";
import messageStore from "../store/message";

export default class Title extends Component {
  constructor(){
    super({
      tagName: 'h1'
    })
    messageStore.subscribe('message', (val) => {
      console.log(`Title : ${val}`);
      this.render()
    })
  }
  render(){
    this.el.textContent = `Title : ${messageStore.state.message} `
  }
}
```

## routes/Home.js
```javascript
import { Component } from "../core/core";
import TextField from "../components/TextField";
import Message from "../components/Message";
import Title from "../components/Title";

export default class Home extends Component{
  render(){
    this.el.innerHTML = /*html*/`
      <h1>Home Page!</h1>
    `
    this.el.append( 
        new TextField().el
      , new Message().el 
      , new Title().el
    )
  
  }
}
```


