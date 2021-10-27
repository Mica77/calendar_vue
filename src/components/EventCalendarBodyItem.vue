<template>
  <div
    class="calendar-day"
    :class="{
      'calendar-day--weekend': isWeekend,
      'calendar-day--today': isToday,
    }"
  >
    <div class="calendar-day__day-of-month">{{ date.format("D") }}</div>
    <div class="calendar-day__content events">
      <div class="events__event-wraper" v-for="event in events" :key="event.id">
        <div :class="eventClass(event)" class="events__event">
          {{ eventTitle(event) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");

export default {
  name: "EventCalendarBodyItem",
  props: {
    date: {
      type: Object,
      require: true,
    },
    events: {
      type: Array,
    },
  },
  computed: {
    isToday() {
      return this.date.isSame(moment().startOf("day"));
    },
    isWeekend() {
      return this.date.day() == 0 || this.date.day() == 6;
    },
  },
  methods: {
    eventClass(event) {
      return `events__event--${event.type}`;
    },
    eventTitle(event) {
      return `${moment(event.date).format("HH:mm")} ${event.name}`;
    },
  },
};
</script>


<style scoped lang="scss">
$dayHeight: 1.7rem;

.calendar-day {
  border: thin solid #eee;
  position: relative;

  &__day-of-month {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
  }

  &__content {
    margin-top: $dayHeight;
    height: calc(100% - $dayHeight);
    overflow: auto;
  }

  &--weekend .calendar-day__day-of-month {
    color: violet;
  }

  &--today {
    border-color: #555;
  }

  &--today .calendar-day__day-of-month {
    color: greenyellow;
  }
}

.events {
  list-style-type: none;
  padding: 0;

  &__event-wraper {
    display: flex;
    height: 20px;
    margin-bottom: 2px;
  }

  &__event {
    overflow: hidden;
    white-space: nowrap;
    height: 20px;
    text-overflow: ellipsis;

    &:hover {
      overflow: inherit;
      position: absolute;
      z-index: 2;
    }

    &--red {
      background-color: #ffcccb;
      color: red;
    }

    &--green {
      background-color: #90ee90;
      color: green;
    }

    &--orange {
      background-color: #ffd7b5;
      color: orange;
    }
  }
}
</style>