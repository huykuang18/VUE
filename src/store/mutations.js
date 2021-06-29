export default {
    add(state, newTodo) {
        if (newTodo.length == 0) {
            return;
        }

        state.todos.push({
            id: state.idForTodo,
            title: newTodo,
            completed: false,
        });

        state.newTodo = null;
        state.idForTodo++;
    },
    remove(state, item) {
        const index = state.todos.indexOf(item)
        state.todos.splice(index, 1)
    },
    checkAll(state) {
        state.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clear(state) {
        state.todos = state.todos.filter((todo) => !todo.completed);
    },
    finishedEdit(state, data) {
        state.todos.splice(data.index, 1, data.todo)
    },
    doneEdit(state) {
        state.editting = null
    },
    getItem(state, idItem) {
        let item = state.todos.filter(todo => String(todo.id) === String(idItem));
        if (item[0]) state.item = item[0];
    },
    setAuthenticated(state, status) {
        state.authenticated = status;
    },
}