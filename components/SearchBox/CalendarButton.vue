<template>
  <div v-on-clickaway="hideCalendar" class="calendar-button">
    <img class="calendar-button__icon" src="/images/svgs/calendar.svg" @click.stop="showCalendar = !showCalendar" />
    <div v-if="showCalendar" v-on-clickaway="hideCalendar" class="calendar-button__picker-container">
      <div class="calendar-button__picker__header">
        <label class="calendar-button__picker__header_year">{{ selectedMonth.year }}</label>
        <label class="calendar-button__picker__header_month">{{ selectedMonth.month }}</label>
      </div>
      <month-picker v-model="selectedMonth" no-default :months="months" @input="onInputCalendar" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ComponentOptions } from 'vue'
import { mixin as ClickAway } from 'vue-clickaway'
import { MonthPicker } from 'vue-month-picker'

import { MonthPickerDate } from './types'

@Component({
  name: 'calendar-button',
  components: { MonthPicker },
  mixins: [ClickAway as ComponentOptions<Vue>]
})
export default class CalendarButton extends Vue {
  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  showCalendar = false
  selectedMonth = {
    from: null,
    to: null,
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear()
  }

  hideCalendar() {
    this.showCalendar = false
  }

  onInputCalendar(date: MonthPickerDate) {
    this.$emit('calendar', date)
    this.showCalendar = false
  }
}
</script>

<style lang="scss" scoped>
$searchBoxHeight: 50px;

.calendar-button {
  height: $searchBoxHeight;
  border: 1px solid $colorLightGreen;
  border-left: none;
  border-right: none;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.calendar-button__icon {
  width: 30px;
  height: 30px;
  margin: auto 10px;
}

.calendar-button__picker-container {
  position: absolute;
  top: $searchBoxHeight;
  @media (max-width: 870px) {
    right: 10px;
  }
  @media (min-width: 870px) {
    left: 10px;
  }
  z-index: 10;
  background: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 20px;
  color: navy;

  ::v-deep .month-picker__container {
    width: 20rem;
  }

  ::v-deep .month-picker__year {
    display: flex;
    button {
      border: none;
      background: transparent;
      color: navy;
    }
  }

  ::v-deep .month-picker {
    display: flex;
    justify-content: center;
    box-shadow: none;
    .month-picker__month {
      border: none;
    }
  }
}

.calendar-button__picker__header {
  @include col;
  align-items: flex-start;
  background: $colorLightBlue;
  padding: 10px 30px;

  .calendar-button__picker__header_year {
    color: $colorNavy;
    @include typography(xl, default, bold);
  }

  .calendar-button__picker__header_month {
    color: $colorNavy;
    @include typography(xxl, default, bold);
  }
}
</style>
