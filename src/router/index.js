import Vue from 'vue'
import VueRouter from 'vue-router'
import Item from '../components/Item.vue'
import TodoList from '../components/TodoList.vue'
import Login from '../components/Login.vue'
// import store from '../store/store'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "todo-list",
    component: TodoList,
    meta: { requiresAuth: true }
}, {
    path: "/task/:id",
    name: "item",
    component: Item,
    meta: { requiresAuth: true }
}, {
    path: "/login",
    name: "login",
    component: Login,
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!sessionStorage.user) {
            next({
                name: "login"
            })
        } else {
            next()
        }
    } else if (to.name == "login" && sessionStorage.user != null) {
        next({
            name: "todo-list"
        })
    } else {
        next()
    }
})

export default router