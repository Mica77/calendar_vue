<script>
import EventCalendarBodyItem from "@/components/EventCalendarBodyItem.vue";
const moment = require("moment");

export default {
  name: "EventCalendarBody",
  components: {
    EventCalendarBodyItem,
  },
  props: {
    date: {
      type: Object,
    },
    events: {
      type: Array,
    },
  },
  render: function (createElement) {
    const items = [];

    for (let mom of this.dates) {
      const events = this.dayEvents(mom);
      items.push(
        createElement(EventCalendarBodyItem, {
          props: {
            date: mom,
            events,
          },
        })
      );
    }
    return createElement("div", {}, items);
  },
  computed: {
    dates() {
      let dates = [];

      const dateFrom = moment(this.$props.date).startOf("week");
      const dateTo = moment(this.$props.date).endOf("month").endOf("week");

      let currentDate = dateFrom;

      while (currentDate <= dateTo) {
        dates.push(currentDate);
        currentDate = moment(currentDate).add(1, "days");
      }

      return dates;
    },
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
