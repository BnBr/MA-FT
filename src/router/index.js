import Vue from 'vue'
import Router from 'vue-router'

// import all routed components/pages
// .vue ending is important, since there are js, css and html files named like it
import AppSMList from '../components/App-SM-List/App-SM-List.vue'
import AppSMControl from '../components/App-SM-Control/App-SM-Control.vue'



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'App-SM-List',
            component: AppSMList,
            props: {}
        },
        {
            path: '/control/:SMTopic',
            name: 'App-SM-Control',
            component: AppSMControl,
            props: true
        }
    ]
})
