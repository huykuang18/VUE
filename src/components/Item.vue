<template>
  <div>
    <h2>Thông tin chi tiết công việc</h2>
    <p>Tên task: {{ item.title }}</p>
    <p>Trạng thái: {{ item.completed == true ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "item",
  data() {
    return {
      item: {}
    }
  },
  created() {
    let id = this.$route.params.id;
    this.$store.dispatch("fetchItem", id);
  },
  watch: {
    itemData(val) {
      this.item = JSON.parse(JSON.stringify(val));
    }
  },
  computed: {
    ...mapGetters({
      itemData: "item"
    })
  },
  methods: {
  },
};
</script>

<style>
</style>