<template>
  <div>
     <vue-element-loading :active="true" spinner="ring" color="#FF547C" />
  </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'
import Tenant from "@/models/Tenant";
import CalendarEvent from '@/models/CalendarEvent'
import Calendar from '@/models/Calendar'

export default {
  components: {
    VueElementLoading
  },  
  created() {
    const editingEvent = JSON.parse(localStorage.getItem("event"))
    const calendar = new Calendar({id: this.$store.state.auth.user.profile.defaultCalendarId})
    let newEvent = new CalendarEvent({
      calendar: calendar,
      title: editingEvent.title,
      occasion: editingEvent.occasion?editingEvent.occasion.name:"",
      eventStartMillis: editingEvent.eventStartMillis,
      eventEndMillis: editingEvent.eventEndMillis,
      numberOfParticipants: editingEvent.numberOfParticipants,
      budgetPerPerson: 0,
      totalBudget: 0,
      status: "draft",
      currency: "USD",
      eventType: editingEvent.eventType,
      category: editingEvent.occasion?editingEvent.occasion.name:"",
      editable: true,
      location: editingEvent.location
    })
      .for(this.defaultCalendar)
      .save()
      .then(response => {
        localStorage.removeItem("event")
        const signedLink = atob(this.$route.query.callback)
        const callback = 
        // this.$router.push({path:"events"})
        document.location.href = `${signedLink}&redirectURL=`
      })
      .catch(error => {
        this.$router.push({path:"events"})
      });
  }
}
</script>
<style lang="scss" scoped>

</style>