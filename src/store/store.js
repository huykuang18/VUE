import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getter from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [{
                email: "nqh.rma@gmail.com",
                password: "123456"
            },
            {
                email: "nqh@gmail.com",
                password: "123456"
            },
            {
                email: "ptu@gmail.com",
                password: "123456"
            },
        ],
        todos: [{
                id: 1,
                title: "Task 1",
                completed: false,
                editing: false,
            },
            {
                id: 2,
                title: "Task 2",
                completed: false,
                editing: false,
            },
            {
                id: 3,
                title: "Task 3",
                completed: false,
                editing: false,
            },
        ],
        item: {},
        newTodo: null,
        idForTodo: 4,
        beforeEditCache: null,
        filter: "all",
        editing: false,
    },
    mutations: mutations,
    getters: getter,
    actions: actions
})