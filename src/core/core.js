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