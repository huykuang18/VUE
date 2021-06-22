import Vue from 'vue'
import VueRouter from 'vue-router'
import Item from '../components/Item.vue'
import TodoList from '../components/TodoList.vue'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "todo-list",
    component: TodoList
}, {
    path: '/task/:id',
    name: 'item',
    component: Item,
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router