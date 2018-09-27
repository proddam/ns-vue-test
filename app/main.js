import Vue from 'nativescript-vue'
import App from './components/App'
import './styles.scss'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('Gradient', () => require('nativescript-gradient').Gradient)

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
