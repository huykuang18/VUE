<template>
  <div>
    <h2>Thông tin chi tiết công việc</h2>
    <p>Tên task: {{ item.name }}</p>
    <p>Số lượng người tham gia: {{ item.member }}</p>
    <p>Thời gian bắt đầu: {{ item.date_from }}</p>
    <p>Thời gian dự kiến hoàn thành: {{ item.date_to }}</p>
  </div>
</template>

<script>
export default {
  name: "item",
  data() {
    return {
      item: {}
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
      '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      var list_items = {
        1: {
          name: "Task 1",
          member: "2",
          date_from: "2021-05-20",
          date_to: "2021-06-20",
        },
        2: {
          name: "Task 2",
          member: "1",
          date_from: "2021-05-30",
          date_to: "2021-07-01",
        },
      };

      this.item = list_items[this.$route.params.id];
    },
  },
};
</script>

<style>
</style>