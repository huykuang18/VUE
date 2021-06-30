export default {
    count: (state) => {
        return state.count
    },
    showButton: (state) => {
        return state.todos.filter((todo) => todo.completed).length > 0
    },
    remain: (state) => {
        return state.todos.filter((todo) => !todo.completed).length
    },
    todos: (state) => state.todos,
    item: state => state.item,
    users: state => state.users,
}