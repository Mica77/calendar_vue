<template>
  <div id="app">
    <event-calendar :events="events" style="height: 80vh" />
  </div>
</template>

<script>
import EventCalendar from "@/components/EventCalendar.vue";

export default {
  name: "App",
  components: {
    EventCalendar,
  },
  data: () => ({
    events: [],
  }),
  mounted() {
    this.events = [
      {
        id: 1,
        name: "gfhgf jhgfjgfdv iuyt g ukghft oioi",
        date: "2021-10-27 12:00:00",
        type: "green",
      },
      {
        id: 2,
        name: "gfhgf jhgfjgfdv iuyt g ukghft oioi",
        date: "2021-10-27 10:00:00",
        type: "orange",
      },
      {
        id: 3,
        name: "gfhgf jhgfjgfdv iuyt g ukghft oioi",
        date: "2021-10-28 16:40:00",
        type: "red",
      },
      {
        id: 4,
        name: "gfhgf jhgfjgfdv iuyt g ukghft oioi",
        date: "2021-10-27 21:00:00",
        type: "red",
      },
      {
        id: 5,
        name: "gfhgf jhgfjgfdv iuyt g ukghft oioi",
        date: "2021-10-27 07:90:00",
        type: "red",
      },
    ];
  },
};
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
