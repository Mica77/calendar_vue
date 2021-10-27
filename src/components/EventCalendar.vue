<template>
  <div class="event-calendar">
    <div class="event-calendar__header">
      <div class="event-calendar__manage">
        <div
          class="event-calendar__arrow event-calendar__arrow--back"
          @click="prevMonth"
        ></div>
        <div class="event-calendar__title">{{ title }}</div>
        <div
          class="event-calendar__arrow event-calendar__arrow--forward"
          @click="nextMonth"
        ></div>
      </div>
    </div>

    <div class="event-calendar__week week calendar-grid">
      <div
        class="week__item"
        v-for="weekday in weekdays"
        :key="weekday.index"
        :class="{
          'week__item--weekend': weekday.index == 0 || weekday.index == 6,
        }"
      >
        {{ weekday.name }}
      </div>
    </div>

    <event-calendar-body
      class="event-calendar__body calendar-grid"
      :style="{
        gridTemplateRows: `repeat(${calendarRowsCount}, minmax(0, 1fr))`,
      }"
      :date="date"
      :events="currentEvents"
    />
  </div>
</template>


<script>
import EventCalendarBody from "@/components/EventCalendarBody.vue";
const moment = require("moment");

export default {
  name: "EventCalendar",
  components: {
    EventCalendarBody,
  },
  props: {
    events: {
      type: Array,
    },
  },
  data: () => ({
    date: null,
  }),
  computed: {
    weekdays() {
      let weekdays = moment.weekdays().map((name, index) => ({
        index,
        name,
      }));

      if (moment().startOf("week").day() == 1) {
        //if weekdays begin with Sunday
        const sunday = weekdays[0];
        weekdays = weekdays.slice(1);
        weekdays.push(sunday);
      }

      return weekdays;
    },
    title() {
      return moment(this.date).year() == moment().year()
        ? this.date.format("MMMM")
        : this.date.format("MMMM yy");
    },
    currentDateFrom() {
      return moment(this.date).startOf("week");
    },
    currentDateTo() {
      return moment(this.date).endOf("month").endOf("week");
    },
    currentEvents() {
      return this.events.filter((ev) => {
        const currentMoment = moment(ev.date).startOf("day");
        return (
          currentMoment >= this.currentDateFrom &&
          currentMoment <= this.currentDateTo
        );
      });
    },
    calendarRowsCount() {
      return (this.currentDateTo.diff(this.currentDateFrom, "days") + 1) / 7;
    },
  },
  created() {
    this.date = moment().startOf("month");
  },
  methods: {
    prevMonth() {
      this.date = moment(this.date).add(-1, "months");
    },
    nextMonth() {
      this.date = moment(this.date).add(1, "months");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$headerHeight: 40px;
$weeksHeight: 20px;

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
}

.week {
  &__item {
    font-weight: 600;
    letter-spacing: 0.1px;
    text-transform: uppercase;
    font-size: 12px;
    padding: 0.1rem;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    height: $weeksHeight;

    &--weekend {
      color: #888;
    }
  }
}

.event-calendar {
  &__header {
    display: flex;
    padding: 0.5rem 0;
    min-height: $headerHeight;
    max-height: $headerHeight;
    box-sizing: border-box;
  }

  &__week {
    min-height: $weeksHeight;
    max-height: $weeksHeight;
    box-sizing: border-box;
  }

  &__manage {
    display: flex;
    align-items: center;
  }

  &__arrow {
    cursor: pointer;
    font-size: 20px;
    color: #999;

    &--back::after {
      content: "\003C";
    }
    &--forward::after {
      content: "\003E";
    }
  }

  &__title {
    color: navy;
    text-transform: uppercase;
    padding: 0 0.5rem;
    min-width: 100px;
    font-size: 14px;
    font-weight: 600;
  }

  &__body {
    height: calc(100% - $headerHeight - $weeksHeight);
  }
}
</style>
