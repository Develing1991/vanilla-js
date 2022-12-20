import Home from '../routes/Home'
import About from '../routes/About'
import { creatRouter } from '../core/core'

export default creatRouter([
  {path: '#/', component: Home},
  {path: '#/about', component: About},
])