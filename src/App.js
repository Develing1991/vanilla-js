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