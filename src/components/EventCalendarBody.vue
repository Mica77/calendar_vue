<script>
import EventCalendarBodyItem from "@/components/EventCalendarBodyItem.vue";
const moment = require("moment");

export default {
  name: "EventCalendarBody",
  components: {
    EventCalendarBodyItem,
  },
  props: {
    dateFrom: {
      type: Object,
    },
    dateTo: {
      type: Object,
    },
    events: {
      type: Array,
    },
  },
  render: function (createElement) {
    const items = [];

    let currentDate = this.dateFrom;

    while (currentDate <= this.dateTo) {
      const events = this.dayEvents(currentDate);
      items.push(
        createElement(EventCalendarBodyItem, {
          props: {
            date: currentDate,
            events,
          },
        })
      );

      currentDate = moment(currentDate).add(1, "days");
    }

    return createElement("div", {}, items);
  },
  methods: {
    dayEvents(mom) {
      const date = moment(mom).startOf("day");

      return this.events.filter((ev) => {
        const currentMoment = moment(ev.date).startOf("day");
        return currentMoment.isSame(date);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
