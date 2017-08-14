import Vue from 'vue'
import Router from 'vue-router'

// import all routed components/pages
// .vue ending is important, since there are js, css and html files named like it
import AppWheel from '../components/App-Wheel/App-Wheel.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'App-Wheel',
            component: AppWheel,
            props: {}
        }
    ]
})
