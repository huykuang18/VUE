<template>
  <div>
    <div>
      Hello, <b>{{account}}</b>!
      <button class="btn" @click="logout">Thoát</button>
    </div>

    <input
      type="text"
      class="todo-input"
      placeholder="Nhập thêm task"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animate__fadeInUp"
      leave-active-class="animate__fadeOutDown"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="anyRemaining"
        @removedTodo="removeTodo"
        @finishedEdit="finishedEdit"
      >
        <!-- <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed" />
          <div
            v-if="!todo.editing"
            @dblclick="editTodo(todo)"
            class="todo-item-label"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </div>
          <input
            v-else
            class="todo-item-edit"
            type="text"
            v-model="todo.title"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            v-focus
            @keyup.esc="cancelEdit(todo)"
          />
        </div> -->
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input
            type="checkbox"
            :checked="anyRemaining"
            @change="checkAllTodos"
          />
          Chọn tất cả</label
        >
      </div>
      <div>Còn {{ remaining }} mục cần làm</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">
          Tất cả
        </button>
        <button
          :class="{ active: filter == 'active' }"
          @click="filter = 'active'"
        >
          Đang hoạt động
        </button>
        <button
          :class="{ active: filter == 'completed' }"
          @click="filter = 'completed'"
        >
          Đã hoàn thành
        </button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">
            Xóa mục hoàn thành
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "todo-list",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: this.$store.state.newTodo,
      idForTodo: this.$store.state.idForTodo,
      beforeEditCache: this.$store.state.beforeEditCache,
      filter: this.$store.state.filter,
      editing: this.$store.state.editing,
      todos: this.$store.state.todos,
      account: sessionStorage.user
    };
  },
  mounted() {
    if (this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  computed: {
    ...mapGetters({
      todosList: "todos",
    }),
    remaining() {
      return this.$store.getters.remain;
    },
    anyRemaining() {
      return this.remaining === 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todosList;
      } else if (this.filter == "active") {
        return this.todosList.filter((todo) => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todosList.filter((todo) => todo.completed);
      }
      return this.todosList;
    },
    showClearCompletedButton() {
      return this.$store.getters.showButton;
    },
  },
  // directives: {
  //   focus: {
  //     // định nghĩa cho directive
  //     inserted: function (el) {
  //       el.focus();
  //     },
  //   },
  // },
  methods: {
    addTodo() {
      this.$store.dispatch("add", this.newTodo);
    },
    // editTodo(todo) {
    //   this.beforeEditCache = todo.title;
    //   todo.editing = true;
    // },
    // doneEdit(todo) {
    //   if (todo.title.trim() == "") {
    //     todo.title = this.beforeEditCache;
    //   }
    //   todo.editing = false;
    // },
    // cancelEdit(todo) {
    //   todo.title = this.beforeEditCache;
    //   todo.editing = false;
    // },
    removeTodo(item) {
      this.$store.dispatch("remove", item);
    },
    checkAllTodos() {
      this.$store.dispatch("checkAll", "");
    },
    clearCompleted() {
      this.$store.dispatch("clear", "");
    },
    finishedEdit(data) {
      this.$store.dispatch("finishedEdit", data);
    },
    logout() {
      sessionStorage.removeItem('user');
      this.$router.replace({name: 'login'});
    }
  },
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}

.todo-input:focus {
  outline: 0;
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.35s;
}

.remove-item {
  cursor: pointer;
  margin-left: 15px;
}

.remove-item:hover {
  color: red;
}

.info-item {
  cursor: pointer;
  border: black 1px solid;
  color: black;
  padding: 5px;
  text-decoration: none;
  margin-left: 100px;
}

.info-item:hover {
  background: lightgreen;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 18px;
  color: #2c3e50;
  margin-left: 12px;
  widows: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
}

.todo-item-edit:focus {
  outline: none;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  margin: 5px;
  cursor: pointer;
}
button:hover {
  background-color: lightgreen;
}
button:focus {
  outline: none;
}

.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
