export default {
    add({ commit }, newTodo) {
        commit('add', newTodo)
    },
    remove({ commit }, item) {
        commit('remove', item)
    },
    checkAll({ commit }) {
        commit('checkAll', '')
    },
    clear({ commit }) {
        commit('clear', '')
    },
    finishedEdit({ commit }, data) {
        commit('finishedEdit', data)
    },
    doneEdit({ commit }, item) {
        commit('doneEdit', item)
    },
    fetchItem({ commit }, idItem) {
        // TODO get api item
        commit("getItem", idItem);
    }
}