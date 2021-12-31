<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        // dateClick: this.handleDateClick,
        selectable:"true",
        select: this.handleDateClick
      }
    }
  },
  methods:{
    handleDateClick: function(arg) {
      console.log(this.formatDateWithoutHour(arg.startStr))
    },
    formatDateWithoutHour(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      let hour, minute
      hour = d.getHours();
      minute =d.getMinutes()
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [day, month, year].join('/')
    },
  },
}
</script>
