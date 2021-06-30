<template>
  <div>
    <form @submit.prevent="login">
      <div :class="'alert' + [isActive ? '' : 'notActive']">{{ message }}</div>
      <input
        class="login-input"
        type="text"
        name="email"
        placeholder="Nhập email"
        v-model="loginInfo.email"
      />
      <input
        class="login-input"
        type="password"
        name="password"
        placeholder="Nhập mật khẩu"
        v-model="loginInfo.password"
      />
      <button type="submit" class="btn-login">Đăng nhập</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      loginInfo: {
        email: null,
        password: null,
      },
      message: null,
      isActive: false,
    };
  },
  computed: {
    ...mapGetters({
      userList: "users",
    }),
  },
  methods: {
    login() {
      if (this.loginInfo.email == null || this.loginInfo.password == null) {
        this.isActive = true;
        this.message = "Email và mật khẩu không được để trống!";
      } else {
        this.userList.forEach((user) => {
          if (this.loginInfo.email == user.email && this.loginInfo.password == user.password) {
            sessionStorage.user = user.email;
            this.$router.replace({ name: "todo-list" });
          } else {
            this.isActive = true;
            this.message = "Email hoặc mật khẩu không đúng!";
          }
        });
      }
    },
  },
};
</script>

<style>
.alert {
  width: 60%;
  text-align: left;
  font-size: 14px;
  color: red;
  background: rgb(238, 221, 221);
  padding: 10px 18px;
  margin-bottom: 16px;
  margin-left: 20%;
}
.notActive {
  display: none;
}
.login-input {
  width: 60%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}

.login-input:focus {
  outline: 0;
}

.btn-login {
  width: 60%;
  height: 50px;
  padding: 10px 18px;
  font-size: 18px;
  cursor: pointer;
}
</style>